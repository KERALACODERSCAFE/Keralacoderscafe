import { beforeEach, describe, expect, it, vi } from "vitest";

const { redisMock } = vi.hoisted(() => ({
  redisMock: {
    get: vi.fn(),
    set: vi.fn(),
    lpush: vi.fn(),
  },
}));

vi.mock("@/lib/redis", () => ({
  redis: redisMock,
}));

import { submitContactForm } from "./contact";
import { isValidEmail } from "@/lib/validation";

function buildFormData(fields: Record<string, string>) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    formData.set(key, value);
  }
  return formData;
}

describe("isValidEmail", () => {
  it("accepts well-formed addresses", () => {
    expect(isValidEmail("dev@example.com")).toBe(true);
  });

  it("rejects addresses without an @ or domain", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("dev@")).toBe(false);
  });
});

describe("submitContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects submissions missing required fields", async () => {
    const result = await submitContactForm(
      buildFormData({ name: "", email: "", message: "" })
    );
    expect(result).toEqual({ success: false, error: "Please fill in all fields." });
  });

  it("rejects an invalid email address", async () => {
    const result = await submitContactForm(
      buildFormData({ name: "Dev", email: "not-an-email", message: "Hello" })
    );
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/valid email/i);
  });

  it("rejects an over-length message", async () => {
    const result = await submitContactForm(
      buildFormData({ name: "Dev", email: "dev@example.com", message: "x".repeat(2001) })
    );
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/under/i);
  });

  it("silently accepts honeypot submissions without touching redis", async () => {
    const result = await submitContactForm(
      buildFormData({ name: "Bot", email: "bot@example.com", message: "spam", company: "Acme" })
    );
    expect(result).toEqual({ success: true });
    expect(redisMock.lpush).not.toHaveBeenCalled();
  });

  it("stores a valid submission and rate-limits the sender", async () => {
    redisMock.get.mockResolvedValueOnce(null);

    const result = await submitContactForm(
      buildFormData({ name: "Dev", email: "dev@example.com", message: "Hello team!" })
    );

    expect(result).toEqual({ success: true });
    expect(redisMock.lpush).toHaveBeenCalledWith(
      "contact:submissions",
      expect.stringContaining("dev@example.com")
    );
    expect(redisMock.set).toHaveBeenCalledWith(
      "contact:ratelimit:dev@example.com",
      "true",
      { ex: 60 }
    );
  });

  it("blocks a second submission from the same email within the rate-limit window", async () => {
    redisMock.get.mockResolvedValueOnce("true");

    const result = await submitContactForm(
      buildFormData({ name: "Dev", email: "dev@example.com", message: "Hello again" })
    );

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/already sent/i);
    expect(redisMock.lpush).not.toHaveBeenCalled();
  });
});

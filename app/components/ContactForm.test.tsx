import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "./ContactForm";
import { submitContactForm } from "@/app/actions/contact";

vi.mock("@/app/actions/contact", () => ({
  submitContactForm: vi.fn(),
}));

const submitContactFormMock = vi.mocked(submitContactForm);

describe("ContactForm", () => {
  beforeEach(() => {
    submitContactFormMock.mockReset();
  });

  it("shows a success message once the server action resolves successfully", async () => {
    submitContactFormMock.mockResolvedValueOnce({ success: true });
    const user = userEvent.setup();

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Dev");
    await user.type(screen.getByLabelText(/email/i), "dev@example.com");
    await user.type(screen.getByLabelText(/message/i), "Hello team!");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(screen.getByText(/message sent/i)).toBeInTheDocument()
    );
    expect(submitContactFormMock).toHaveBeenCalledTimes(1);
  });

  it("surfaces the server-reported error and keeps the form visible", async () => {
    submitContactFormMock.mockResolvedValueOnce({
      success: false,
      error: "Please enter a valid email address.",
    });
    const user = userEvent.setup();

    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), "Dev");
    await user.type(screen.getByLabelText(/email/i), "dev@example.com");
    await user.type(screen.getByLabelText(/message/i), "Hello team!");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/please enter a valid email address/i)
      ).toBeInTheDocument()
    );
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });
});

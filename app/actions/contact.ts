"use server";

import { redis } from "@/lib/redis";
import { isValidEmail } from "@/lib/validation";

const CONTACT_LIST_KEY = "contact:submissions";
const RATE_LIMIT_SECONDS = 60;
const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2000;

export type ContactFormState = {
  success: boolean;
  error?: string;
};

export async function submitContactForm(formData: FormData): Promise<ContactFormState> {
  // Honeypot: hidden field that only bots fill in. Report success so bots
  // don't learn the field is a trap, but drop the submission.
  const honeypot = String(formData.get("company") || "").trim();
  if (honeypot) {
    return { success: true };
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all fields." };
  }
  if (!isValidEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }
  if (name.length > MAX_NAME_LENGTH) {
    return { success: false, error: "Name is too long." };
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return { success: false, error: `Message must be under ${MAX_MESSAGE_LENGTH} characters.` };
  }

  if (!redis) {
    return { success: false, error: "Contact form is temporarily unavailable. Please email us directly." };
  }

  try {
    const rateLimitKey = `contact:ratelimit:${email.toLowerCase()}`;
    const recentlySubmitted = await redis.get(rateLimitKey);
    if (recentlySubmitted) {
      return { success: false, error: "You've already sent a message recently. Please wait a moment before trying again." };
    }

    await redis.lpush(
      CONTACT_LIST_KEY,
      JSON.stringify({
        name,
        email,
        message,
        submittedAt: new Date().toISOString(),
      })
    );
    await redis.set(rateLimitKey, "true", { ex: RATE_LIMIT_SECONDS });

    return { success: true };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { success: false, error: "Something went wrong. Please try again later." };
  }
}

"use client";

import { useRef, useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);

    if (result.success) {
      setStatus("success");
      formRef.current?.reset();
    } else {
      setStatus("idle");
      setError(result.error || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-gray-100 bg-slate-50 p-8 rounded-[2rem] flex flex-col items-center text-center gap-3 h-full justify-center">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
          <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
        </div>
        <h3 className="font-bold text-slate-800 text-base">Message sent!</h3>
        <p className="text-xs text-slate-500 font-medium max-w-xs">
          Thanks for reaching out — we&apos;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs font-bold uppercase tracking-wider text-[#00B9A5] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="border border-gray-100 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm flex flex-col gap-4"
    >
      {/* Honeypot: hidden from real users, catches bots that fill every input */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00B9A5] focus:border-transparent"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00B9A5] focus:border-transparent"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          maxLength={2000}
          className="mt-1.5 w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00B9A5] focus:border-transparent resize-none"
          placeholder="How can we help?"
        />
      </div>

      {error && <p className="text-xs font-bold text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#00B9A5] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#00a894] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send message
          </>
        )}
      </button>
    </form>
  );
}

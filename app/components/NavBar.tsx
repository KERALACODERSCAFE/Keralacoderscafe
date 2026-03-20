"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import KccCupMark from "./KccCupMark";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Contributors", href: "#contributors" },
  { name: "Projects", href: "#projects" },
  { name: "Guidelines", href: "#guidelines" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav className="mx-auto max-w-[1280px] rounded-full border border-black/10 bg-white/72 px-5 py-3 shadow-[0_18px_50px_rgba(17,17,17,0.08)] backdrop-blur-xl sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              aria-label="Kerala Coders Cafe home"
              className="flex min-w-0 items-center gap-3"
            >
              <div className="h-11 w-11 shrink-0 rounded-full shadow-[0_8px_20px_rgba(17,17,17,0.12)]">
                <KccCupMark className="h-full w-full" />
              </div>

              <div className="min-w-0">
                <div className="truncate text-[0.96rem] font-semibold tracking-[-0.03em] text-black">
                  Kerala Coders Cafe
                </div>
                <div className="hidden truncate text-xs text-black/52 sm:block">
                  Community for builders, learners, and open-source contributors
                </div>
              </div>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-black/66 transition-colors duration-200 hover:text-black"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="https://chat.whatsapp.com/Kd3tVwJfjjh0HRZtoYfxcm"
                target="_blank"
                rel="noopener"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-kcc-paper transition-transform duration-300 hover:-translate-y-0.5"
              >
                Join WhatsApp
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/70 text-black transition-colors hover:bg-white md:hidden"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 md:hidden ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
          aria-label="Close menu overlay"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute inset-x-4 top-4 rounded-[2rem] border border-black/10 bg-kcc-paper p-6 shadow-[0_24px_80px_rgba(17,17,17,0.15)] transition-transform duration-300 ${
            isOpen ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 shrink-0 rounded-full">
                <KccCupMark className="h-full w-full" />
              </div>

              <div>
                <div className="text-lg font-semibold tracking-[-0.03em] text-black">
                  Kerala Coders Cafe
                </div>
                <div className="mt-1 text-sm text-black/56">
                  A warm internet corner for people who build.
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl border border-black/10 bg-white/60 px-4 py-3 text-sm font-medium text-black/76"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            href="https://chat.whatsapp.com/Kd3tVwJfjjh0HRZtoYfxcm"
            target="_blank"
            rel="noopener"
            onClick={() => setIsOpen(false)}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-kcc-paper"
          >
            Join WhatsApp
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}

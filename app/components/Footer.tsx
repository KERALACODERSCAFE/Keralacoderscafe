import Link from "next/link";
import SectionReveal from "./SectionReveal";
import { GITHUB_REPO_URL, WHATSAPP_GATE_PATH } from "../lib/site-links";

const quickLinks = [
  { label: "About", href: "/#about" },
  { label: "Contributors", href: "/contributors" },
  { label: "Projects", href: "/#projects" },
  { label: "Get Involved", href: "/#join" },
];

const resources = [
  {
    label: "GitHub",
    href: GITHUB_REPO_URL,
  },
  {
    label: "WhatsApp",
    href: WHATSAPP_GATE_PATH,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--ui-border-soft)] px-6 pb-12 pt-14 md:px-12">
      <div className="mx-auto max-w-[1320px] border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] shadow-[0_22px_56px_rgba(0,0,0,0.16)]">
        <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(220px,0.7fr)_minmax(220px,0.7fr)]">
          <SectionReveal className="border-b border-[color:var(--ui-border-soft)] px-6 py-10 md:px-10 lg:border-b-0 lg:border-r lg:border-r-[color:var(--ui-border-soft)]">
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--ui-page-text-soft)]">
              Kerala Coders Cafe
            </div>
            <h2 className="mt-5 max-w-[760px] text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-[color:var(--ui-page-text)]">
              Kerala Coders
              <span className="ml-4 inline-block font-[family-name:var(--font-editorial)] italic tracking-[-0.035em] text-[color:var(--ui-page-text)] [text-shadow:0_2px_12px_var(--ui-heading-shadow)]">
                Cafe
              </span>
            </h2>
            <p className="mt-5 max-w-[620px] text-base leading-8 text-[color:var(--ui-page-text-muted)]">
              A Kerala-first community for developers, designers, contributors,
              and curious people who want to learn in public and build with
              others.
            </p>
            <div className="mt-7 inline-flex border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] px-4 py-2 font-[family-name:var(--font-hand)] text-[1.6rem] leading-none text-[color:var(--ui-page-text-muted)]">
              built slowly, shared openly
            </div>
          </SectionReveal>

          <SectionReveal
            delay={0.08}
            className="border-b border-[color:var(--ui-border-soft)] px-6 py-10 md:px-10 lg:border-b-0 lg:border-r lg:border-r-[color:var(--ui-border-soft)]"
          >
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--ui-page-text-soft)]">
              Explore
            </div>
            <div className="mt-6 flex flex-col">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="border-b border-[color:var(--ui-border-soft)] py-3 text-sm text-[color:var(--ui-page-text-muted)] transition-colors hover:text-[color:var(--ui-page-text)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.14} className="px-6 py-10 md:px-10">
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--ui-page-text-soft)]">
              Connect
            </div>
            <div className="mt-6 flex flex-col">
              {resources.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener" : undefined}
                  className="border-b border-[color:var(--ui-border-soft)] py-3 text-sm text-[color:var(--ui-page-text-muted)] transition-colors hover:text-[color:var(--ui-page-text)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SectionReveal>
        </div>

        <div className="flex flex-col gap-4 border-t border-[color:var(--ui-border-soft)] px-6 py-5 text-sm text-[color:var(--ui-page-text-soft)] md:px-10 lg:flex-row lg:items-center lg:justify-between">
          <div>&copy; {new Date().getFullYear()} Kerala Coders Cafe.</div>
          <div>Built in Kerala for people who build.</div>
        </div>
      </div>
    </footer>
  );
}

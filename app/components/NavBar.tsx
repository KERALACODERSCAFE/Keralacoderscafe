"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  FolderKanban,
  MessageCircle,
  Sparkles,
  Users2,
} from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import KccCupMark from "./KccCupMark";
import ThemeToggle from "./ThemeToggle";
import { WHATSAPP_GATE_PATH } from "../lib/site-links";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Contributors", href: "#contributors" },
  { name: "Projects", href: "#projects" },
  { name: "Join", href: "#join" },
];

const mobileNavLinks = [
  { name: "About", href: "#about", icon: Sparkles, sectionId: "about" },
  {
    name: "People",
    href: "#contributors",
    icon: Users2,
    sectionId: "contributors",
  },
  {
    name: "Projects",
    href: "#projects",
    icon: FolderKanban,
    sectionId: "projects",
  },
  { name: "Join", href: "#join", icon: MessageCircle, sectionId: "join" },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 24);
  });

  useEffect(() => {
    const sectionElements = mobileNavLinks
      .map((link) => ({
        id: link.sectionId,
        element: document.getElementById(link.sectionId),
      }))
      .filter(
        (
          section,
        ): section is { id: string; element: HTMLElement } => section.element !== null,
      );

    if (sectionElements.length === 0) {
      return;
    }

    let ticking = false;

    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * 0.42;
      let nextActiveSection = sectionElements[0].id;

      for (const section of sectionElements) {
        if (marker >= section.element.offsetTop - 24) {
          nextActiveSection = section.id;
        } else {
          break;
        }
      }

      setActiveSection((current) =>
        current === nextActiveSection ? current : nextActiveSection,
      );
      ticking = false;
    };

    const requestUpdate = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateActiveSection);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 md:px-4 md:pt-4 lg:px-6">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`w-full border-b px-4 py-3 transition-all duration-300 md:mx-auto md:max-w-[1320px] md:rounded-full md:border md:px-5 lg:px-6 ${
            isScrolled
              ? "border-[color:var(--ui-border-strong)] bg-[color:var(--ui-nav-bg-scrolled)] shadow-[0_10px_28px_rgba(0,0,0,0.18)] backdrop-blur-xl md:shadow-[0_20px_60px_rgba(0,0,0,0.24)]"
              : "border-[color:var(--ui-border-soft)] bg-[color:var(--ui-nav-bg)] shadow-[0_6px_18px_rgba(0,0,0,0.08)] backdrop-blur-md md:shadow-[0_14px_40px_rgba(0,0,0,0.14)]"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              aria-label="Kerala Coders Cafe home"
              className="flex min-w-0 items-center gap-3"
            >
              <motion.div
                whileHover={{ rotate: -6, scale: 1.03 }}
                transition={{ duration: 0.25 }}
                className="h-11 w-11 shrink-0 rounded-full"
              >
                <KccCupMark className="h-full w-full" />
              </motion.div>

              <div className="min-w-0">
                <div className="truncate text-[0.98rem] font-semibold tracking-[-0.03em] text-[color:var(--ui-page-text)]">
                  Kerala Coders Cafe
                </div>
                <div className="hidden truncate text-xs text-[color:var(--ui-page-text-soft)] sm:block">
                  Kerala&apos;s developer community for builders and contributors
                </div>
              </div>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-[color:var(--ui-page-text-muted)] transition-colors duration-200 hover:text-[color:var(--ui-page-text)]"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <ThemeToggle />
              <Link
                href={WHATSAPP_GATE_PATH}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-[color:var(--ui-button-primary-bg)] px-5 text-sm font-semibold text-[color:var(--ui-button-primary-text)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Join WhatsApp
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <ThemeToggle className="md:hidden" />
          </div>
        </motion.nav>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-[60] md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          className="w-full border-t border-[color:var(--ui-border-strong)] bg-[color:var(--ui-nav-bg-scrolled)] px-2 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-12px_36px_rgba(0,0,0,0.2)] backdrop-blur-xl"
        >
          <div className="grid grid-cols-4 gap-1">
            {mobileNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.sectionId;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`inline-flex min-h-[4.25rem] flex-col items-center justify-center gap-1.5 px-2 py-2 text-[0.72rem] font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[color:var(--ui-surface-hover)] text-[color:var(--ui-page-text)]"
                      : "text-[color:var(--ui-page-text-muted)] hover:bg-[color:var(--ui-surface)] hover:text-[color:var(--ui-page-text)]"
                  }`}
                >
                  <Icon
                    className={`h-4.5 w-4.5 transition-transform duration-200 ${
                      isActive ? "scale-110" : ""
                    }`}
                  />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </>
  );
}

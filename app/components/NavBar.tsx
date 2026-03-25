"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import KccCupMark from "./KccCupMark";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Contributors", href: "#contributors" },
  { name: "Projects", href: "#projects" },
  { name: "Guidelines", href: "#guidelines" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [isVisible, setIsVisible] = useState(true);
  const isClickScroll = useRef(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide-on-scroll logic (disabled during programmatic nav clicks)
      if (!isClickScroll.current) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      }
      
      lastScrollY = currentScrollY;

      // Section tracking logic
      const sections = navLinks.map(link => {
        const id = link.href === "#" ? "" : link.href.substring(1);
        const element = id ? document.getElementById(id) : document.body;
        return { name: link.name, element };
      });

      // Find which section is currently in view
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    isClickScroll.current = true;
    setTimeout(() => {
      isClickScroll.current = false;
    }, 1000); // Wait for smooth scroll to finish
  };

  return (
    <>
      <div 
        className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm px-4 pt-4 sm:px-6 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav className="mx-auto max-w-[1280px] px-5 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Kerala Coders Cafe home"
              className="flex min-w-0 items-center gap-3 group"
            >
              <div className="h-10 w-10 shrink-0 group-hover:scale-105 transition-transform">
                <KccCupMark className="h-full w-full" />
              </div>

              <div className="min-w-0">
                <div className="truncate text-[1.1rem] font-bold tracking-tight text-black">
                  Kerala Coders Cafe
                </div>
              </div>
            </Link>

            {/* Desktop Nav Links — ✦ prefixed */}
            <div className="hidden items-center gap-2 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`group flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-black transition-all hover:text-kcc-accent ${activeSection === link.name
                      ? "border-2 border-black rounded-full"
                      : ""
                    }`}
                >
                  <span className="text-kcc-accent text-sm leading-none">
                    ✦
                  </span>
                  {link.name.toUpperCase()}
                </Link>
              ))}

              <Link
                href="/join"
                className="ml-2 inline-flex h-10 items-center gap-2 border-2 border-black bg-kcc-accent px-5 rounded-full text-sm font-medium uppercase text-white hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                Join
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center border border-black rounded-md bg-white text-black hover:bg-gray-100 transition-all md:hidden"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-200 md:hidden ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          aria-label="Close menu overlay"
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute inset-x-4 top-4 border border-gray-200 rounded-lg bg-white p-6 shadow-xl transition-transform duration-300 ${isOpen ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0">
                <KccCupMark className="h-full w-full" />
              </div>

              <div>
                <div className="text-lg font-bold tracking-tight text-black">
                  Kerala Coders Cafe
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center border border-gray-300 rounded-md bg-white text-black hover:bg-gray-100"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  setIsOpen(false);
                  handleNavClick();
                }}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium text-black hover:bg-gray-50 rounded-lg transition-all ${activeSection === link.name ? "bg-gray-100" : ""
                  }`}
              >
                <span className="text-kcc-accent text-sm leading-none">✦</span>
                {link.name.toUpperCase()}
              </Link>
            ))}
          </div>

          <Link
            href="/join"
            onClick={() => setIsOpen(false)}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 border-2 border-black bg-kcc-accent rounded-full px-5 text-sm font-medium uppercase text-white hover:bg-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            Join the community
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </>
  );
}
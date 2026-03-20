"use client";

import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Contributors", href: "#contributors" },
    { name: "Projects", href: "#projects" },
    { name: "Join", href: "#join" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-kcc-bg/80 backdrop-blur-xl border-b border-kcc-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-3xl md:text-4xl font-black tracking-tight text-kcc-gold"
              style={{ fontFamily: "var(--font-newsreader)" }}
            >
              KCC
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs tracking-widest text-kcc-text-dim hover-gold uppercase font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/atomrobic/keralacoderscafe-saas"
              target="_blank"
              rel="noopener"
              className="text-kcc-text hover:text-kcc-gold transition-colors hidden sm:block"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>code</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-kcc-text hover:text-kcc-gold transition-colors p-1"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "28px" }}>
                {isOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar (Slidebar) */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar Content */}
        <div
          className={`absolute right-0 top-0 h-full w-[80%] max-w-xs bg-kcc-bg/95 backdrop-blur-2xl border-l border-kcc-border p-8 shadow-2xl transition-transform duration-500 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end mb-12">
            <button
              onClick={() => setIsOpen(false)}
              className="text-kcc-text hover:text-kcc-gold transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "32px" }}>close</span>
            </button>
          </div>

          <div className="flex flex-col gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-bold tracking-tight text-kcc-text hover:text-kcc-gold transition-all duration-300 transform ${
                  isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  fontFamily: "var(--font-headline)"
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="absolute bottom-12 left-8 right-8">
            <Link
              href="https://github.com/atomrobic/keralacoderscafe-saas"
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 text-kcc-text-dim hover:text-kcc-gold transition-colors"
            >
              <span className="material-symbols-outlined">code</span>
              <span className="text-xs tracking-widest uppercase">GitHub</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

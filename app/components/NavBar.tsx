"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-kcc-bg/90 backdrop-blur-xl border-b border-kcc-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div
            className="text-3xl md:text-4xl font-black tracking-tight text-kcc-gold"
            style={{ fontFamily: "var(--font-newsreader)" }}
          >
            KCC
          </div>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          {["About", "Contributors", "Projects", "Join"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs tracking-widest text-kcc-text-dim hover-gold uppercase"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex gap-4">
          <Link
            href="https://github.com/atomrobic/keralacoderscafe-saas"
            target="_blank"
            rel="noopener"
            className="text-kcc-text hover:text-kcc-gold transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>code</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import KccCupMark from "./KccCupMark";

const navLinks = [
  { name: "Home", href: "/", type: "scroll" },
  { name: "Contributors", href: "/#contributors", type: "scroll" },
  { name: "Projects", href: "/#projects", type: "scroll" },
  { name: "Community", href: "/#about", type: "scroll" },
  { name: "Guidelines", href: "/#guidelines", type: "scroll" },
];

export default function NavBar() {
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
        const hashIndex = link.href.indexOf("#");
        const id = hashIndex !== -1 ? link.href.substring(hashIndex + 1) : "";
        const element = id ? document.getElementById(id) : document.body;
        return { name: link.name, element };
      });

      // Find which section is currently in view
      const scrollPosition = window.scrollY + 200; // Increased offset for better detection

      let foundSection = "Home";
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const offsetTop = rect.top + window.scrollY;
          if (scrollPosition >= offsetTop) {
            foundSection = section.name;
            break;
          }
        }
      }

      if (!isClickScroll.current) {
        setActiveSection(foundSection);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (name: string) => {
    setActiveSection(name);
    isClickScroll.current = true;
    setTimeout(() => {
      isClickScroll.current = false;
    }, 1200); // Slightly longer wait for smooth scroll
  };

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="border-b-2 border-dashed border-black/10">
        <nav className="mx-auto max-w-[1280px] px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Kerala Coders Cafe home"
              className="flex items-center gap-2 sm:gap-3 group shrink-0"
            >
              <div className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 group-hover:scale-105 transition-transform">
                <KccCupMark className="h-full w-full" />
              </div>
              <div className="text-base sm:text-[1.1rem] font-bold tracking-tight text-black whitespace-nowrap">
                Kerala Coders Cafe
              </div>
            </Link>

            {/* Navigation Links with Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap overflow-x-auto scrollbar-hide justify-start sm:justify-center order-3 sm:order-2 w-full sm:w-auto mt-2 sm:mt-0 pb-1 sm:pb-0">
              {navLinks.map((link, index) => (
                <div key={link.name} className="flex items-center gap-1.5 sm:gap-2">
                  <Link
                    href={link.href}
                    onClick={() => handleNavClick(link.name)}
                    className={`text-xs sm:text-sm font-bold uppercase tracking-tight transition-colors ${activeSection === link.name
                      ? "text-black"
                      : "text-black/60 hover:text-black"
                      }`}
                  >
                    {link.name}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <span className="text-kcc-accent font-black text-base sm:text-lg leading-none">
                      •
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Join Button */}
            <Link
              href="/join"
              className="inline-flex h-9 sm:h-10 items-center gap-1.5 sm:gap-2 border-2 border-black bg-[#FFD600] px-3 sm:px-5 rounded-full text-xs sm:text-sm font-black uppercase text-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0 order-2 sm:order-3"
            >
              <span className="hidden sm:inline">Join the Community</span>
              <span className="sm:hidden">Join the Community</span>
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
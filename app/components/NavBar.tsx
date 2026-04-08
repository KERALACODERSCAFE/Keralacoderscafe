"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import KccCupMark from "./KccCupMark";

const navLinks = [
  { name: "Home", href: "/", type: "scroll" },
  { name: "Community", href: "/#about", type: "scroll" },
  { name: "Contributors", href: "/#contributors", type: "scroll" },
  { name: "Projects", href: "/#projects", type: "scroll" },
];

export default function NavBar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [activeSection, setActiveSection] = useState(() => {
    const defaultLink = navLinks.find(link => link.href === pathname);
    return defaultLink ? defaultLink.name : "Home";
  });

  const [isVisible, setIsVisible] = useState(true);
  const isClickScroll = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!isClickScroll.current) {
        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          setIsVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;

      if (window.location.pathname === "/") {
        const sections = navLinks.map(link => {
          const hashIndex = link.href.indexOf("#");
          const id = hashIndex !== -1 ? link.href.substring(hashIndex + 1) : "";
          const element = id ? document.getElementById(id) : (link.name === "Home" ? document.body : null);
          return { name: link.name, element };
        });

        const scrollPosition = window.scrollY + 200;
        let foundSection = "Home";
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section.element) {
            const rect = section.element.getBoundingClientRect();
            if (scrollPosition >= rect.top + window.scrollY) {
              foundSection = section.name;
              break;
            }
          }
        }
        if (!isClickScroll.current) {
          setActiveSection(foundSection);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      const activeLink = navLinks.find(link => link.href === pathname);
      if (activeLink) {
        setActiveSection(activeLink.name);
      }
    }
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    if (href.startsWith("/#") && pathname !== "/") {
      e.preventDefault();
      window.location.href = href;
      return;
    }

    if (pathname === "/" && href === "/") {
      e.preventDefault();
      lenis?.scrollTo(0, { duration: 1.5 });
    }

    if (pathname === "/" && href.includes("#")) {
      e.preventDefault();
      const hash = href.startsWith("/#") ? `#${href.split("#")[1]}` : href;
      lenis?.scrollTo(hash, { duration: 1.5 });
    }

    setActiveSection(name);
    isClickScroll.current = true;
    setTimeout(() => {
      isClickScroll.current = false;
    }, 1200);
  };

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="border-b-2 border-dashed border-black/10">
        <nav className="mx-auto max-w-[1280px] px-4 py-2.5 sm:py-3 sm:px-6">
          <div className="flex items-center justify-between gap-3 flex-wrap lg:flex-nowrap">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Kerala Coders Cafe home"
              className="flex items-center gap-2 group shrink-0 order-1"
            >
              <div className="h-8 w-8 sm:h-10 sm:w-10 shrink-0 group-hover:scale-105 transition-transform">
                <KccCupMark className="h-full w-full" />
              </div>
              <div className="text-sm sm:text-base lg:text-[1.1rem] font-bold tracking-tight text-black whitespace-nowrap uppercase">
                Kerala Coders Cafe
              </div>
            </Link>

            {/* Navigation Links with Dots */}
            <div className="flex items-center gap-2 sm:gap-4 flex-nowrap overflow-x-auto scrollbar-hide justify-start lg:justify-center order-3 lg:order-2 w-full lg:w-auto mt-1 lg:mt-0 pb-1 lg:pb-0 px-2 lg:px-0">
              {navLinks.map((link, index) => (
                <div key={link.name} className="flex items-center gap-2">
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.name)}
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-tight transition-colors whitespace-nowrap ${activeSection === link.name
                      ? "text-black border-b-2 border-black"
                      : "text-black/60 hover:text-black"
                      }`}
                  >
                    {link.name}
                  </Link>
                  {index < navLinks.length - 1 && (
                    <span className="text-kcc-accent font-black text-xs opacity-30 leading-none">
                      •
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Join Button */}
            <Link
              href="/join"
              className="inline-flex h-8 sm:h-10 items-center gap-1.5 sm:gap-2 border-2 border-black bg-[#FFD600] px-3 sm:px-5 rounded-full text-[10px] sm:text-xs font-black uppercase text-black hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0 order-2 lg:order-3"
            >
              <span className="hidden sm:inline">Join the Community</span>
              <span className="sm:hidden">Join</span>
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
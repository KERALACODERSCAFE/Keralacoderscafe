"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import AuthButton from "./AuthButton";

const navLinks = [
  { name: "Home", href: "/", type: "scroll" },
  { name: "Community", href: "/#about", type: "scroll" },
  { name: "Contributors", href: "/#contributors", type: "scroll" },
  { name: "Projects", href: "/#projects", type: "scroll" },
  { name: "Careers", href: "/careers", type: "page" },
  { name: "Blog", href: "/blog", type: "page" },
  { name: "Teams", href: "/teams", type: "page" },
  { name: "About", href: "/#footer", type: "scroll" },
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
      const activeLink = navLinks.find(link =>
        link.type === "page"
          ? pathname.startsWith(link.href)
          : link.href === pathname
      );
      if (activeLink) {
        setActiveSection(activeLink.name);
      }
    } else {
      setActiveSection("Home");
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname) {
      if (pathname.startsWith("/blog") || pathname.startsWith("/teams")) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [pathname]);


  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, name: string) => {
    // Let Next.js Link handle navigation to hash routes.
    // This preserves default hash navigation to homepage sections.
    if (href.startsWith("/#") && pathname !== "/") {
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

  const isDarkNav = pathname?.startsWith("/blog") || pathname?.startsWith("/teams");

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-sm transition-all duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"
        } ${isDarkNav ? "bg-black/95" : "bg-white/95"}`}
    >
      <div className={`border-b-2 border-dashed ${isDarkNav ? "border-white/10" : "border-black/10"}`}>
        <nav className="w-full px-4 py-2.5 sm:py-3 sm:px-6">
          <div className="flex items-center justify-between gap-3 flex-wrap lg:flex-nowrap">
            {/* Logo */}
            <Link
              href="/"
              aria-label="Kerala Coders Cafe home"
              className="flex items-center gap-2 group shrink-0 order-1"
            >

              <svg viewBox="0 0 720 250" className={`h-8 sm:h-10 md:h-12 w-auto shrink-0 group-hover:scale-105 transition-transform origin-left ${isDarkNav ? "text-white" : "text-black"}`}>
                <defs>
                  <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Playwrite+IE:wght@400&display=swap');
                    .nav-text-kerala { font: 900 110px 'Montserrat', sans-serif; letter-spacing: 16px; fill: currentColor; }
                    .nav-text-coders { font: 900 92px 'Montserrat', sans-serif; letter-spacing: 6px; fill: currentColor; opacity: 0.95; }
                    .nav-text-cafe { 
                      font: 400 85px 'Playwrite IE', cursive; 
                      fill: #d95715; 
                      animation: writeCafe 6s ease-in-out infinite;
                    }
                    @keyframes writeCafe {
                      0%, 10% { clip-path: inset(-20% 120% -20% -20%); opacity: 0; }
                      15% { opacity: 1; }
                      35%, 85% { clip-path: inset(-20% -20% -20% -20%); opacity: 1; }
                      95%, 100% { clip-path: inset(-20% -20% -20% -20%); opacity: 0; }
                    }
                  `}</style>
                </defs>
                <g>
                  <text x="10" y="100" className="nav-text-kerala">KERALA</text>
                  <text x="15" y="195" className="nav-text-coders">CODERS</text>
                  <text x="450" y="195" className="nav-text-cafe" transform="rotate(-8, 450, 195)">Cafe</text>
                </g>
                <g transform="translate(680, 20)">
                  {['#FCCC12', '#FF7112', '#EF1541', '#6E55DC', '#069DE0', '#05AC3F'].map((c, i) => (
                    <circle key={i} cy={i * 32} r={12} fill={c} />
                  ))}
                </g>
              </svg>
            </Link>

            {/* Navigation Links with Dots */}
            <div className="flex items-center gap-2 sm:gap-4 flex-nowrap overflow-x-auto scrollbar-hide justify-start lg:justify-center order-3 lg:order-2 w-full lg:w-auto mt-1 lg:mt-0 pb-1 lg:pb-0 px-2 lg:px-0">
              {navLinks.map((link, index) => (
                <div key={link.name} className="flex items-center gap-2">
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href, link.name)}
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-tight transition-colors whitespace-nowrap ${activeSection === link.name
                        ? isDarkNav
                          ? "text-white border-b-2 border-white"
                          : "text-black border-b-2 border-black"
                        : isDarkNav
                          ? "text-white/60 hover:text-white"
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

            <Link
              href="/join"
              className={`inline-flex h-8 sm:h-10 items-center gap-1.5 sm:gap-2 border-2 bg-kcc-green px-3 sm:px-5 rounded-full text-[10px] sm:text-xs font-black uppercase transition-all shrink-0 order-2 lg:order-3 hover:translate-x-[-1px] hover:translate-y-[-1px] ${isDarkNav
                  ? "border-white/80 text-black hover:bg-white hover:text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.25)]"
                  : "border-black text-black hover:bg-black hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                }`}
            >
              <span className="hidden sm:inline">Join the Community</span>
              <span className="sm:hidden">Join</span>
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
            </Link>

            {/* Auth Button */}
            <AuthButton />
          </div>
        </nav>
      </div>
    </div>
  );

}
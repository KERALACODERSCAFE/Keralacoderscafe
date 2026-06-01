"use client";

import Link from "next/link";
import { Github, MessageCircle, Mail, Twitter } from "lucide-react";
import { useLenis } from "lenis/react";

type FooterLink = {
  label: string;
  href: string;
  highlight?: boolean;
};

const exploreLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
];

const communityLinks: FooterLink[] = [
  { label: "Contributors", href: "#contributors" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Join", href: "/join" },
];

const resourcesLinks: FooterLink[] = [
  { label: "GitHub", href: "https://github.com/KERALACODERSCAFE/Keralacoderscafe" },
  { label: "WhatsApp", href: "/join" },
  { label: "X", href: "https://x.com/Keralacoders" },
  { label: "Freelance Enquiries", href: "mailto:keralacoderscafe@gmail.com?subject=Freelance%20Enquiry", highlight: true },
];

export default function Footer() {
  const lenis = useLenis();

  const handleQuickLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      lenis?.scrollTo(href, { duration: 1.5 });
    }
  };

  return (
    <footer id="footer" className="relative w-full overflow-x-clip mt-16 pt-16">
      
      {/* Black Background - normal horizontal block that fills the bottom */}
      <div className="absolute top-[80px] left-0 right-0 bottom-0 bg-black z-0" />

      {/* Slanted shape that covers the transition */}
      <div 
        className="absolute top-0 left-0 w-full h-[150px] bg-black z-0"
        style={{
          transform: "skewY(-4deg)",
          transformOrigin: "center",
        }}
      />

      {/* Cyan Banner - skewed perfectly parallel to the black background's slanted top */}
      <div 
        className="absolute top-[-20px] left-[-5%] w-[110%] bg-[#00D9C0] flex items-center z-10"
        style={{
          height: "110px",
          transform: "skewY(-4deg)",
          transformOrigin: "center",
        }}
      >
        <FooterMarquee />
      </div>

      {/* Horizontal Footer Content */}
      <div className="relative z-20 px-6 pt-32 pb-20 md:px-12 lg:px-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-16 lg:gap-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

            {/* Column 1: Brand */}
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-4">
                Kerala Coders Cafe
              </h2>
              <p className="text-white/70 text-sm mb-10 max-w-sm font-medium leading-relaxed">
                A Kerala-first community for developers, designers, contributors,
                and curious people who want to learn in public and build with others.
              </p>
              <div className="flex gap-4">
                <Link href="https://github.com/KERALACODERSCAFE/Keralacoderscafe" target="_blank" rel="noopener"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F5A524] text-black hover:scale-110 transition-transform" aria-label="GitHub">
                  <Github className="w-5 h-5 fill-black" />
                </Link>
                <Link href="/join"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F5A524] text-black hover:scale-110 transition-transform" aria-label="WhatsApp Community">
                  <MessageCircle className="w-5 h-5 fill-black" />
                </Link>
                <Link href="mailto:keralacoderscafe@gmail.com"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F5A524] text-black hover:scale-110 transition-transform" aria-label="Email">
                  <Mail className="w-5 h-5 fill-black" />
                </Link>
                <Link href="https://x.com/Keralacoders" target="_blank" rel="noopener"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F5A524] text-black hover:scale-110 transition-transform" aria-label="X (Twitter)">
                  <Twitter className="w-5 h-5 fill-black" />
                </Link>
              </div>
            </div>

            {/* Column 2: Explore */}
            <div className="lg:ml-auto">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-6">Explore</h3>
              <div className="flex flex-col gap-4">
                {exploreLinks.map((link) => (
                  <Link key={link.label} href={link.href}
                    onClick={(e) => handleQuickLinkClick(e, link.href)}
                    className="text-sm font-bold text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: Community */}
            <div className="lg:ml-auto">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-6">Community</h3>
              <div className="flex flex-col gap-4">
                {communityLinks.map((link) => (
                  <Link key={link.label} href={link.href}
                    onClick={(e) => handleQuickLinkClick(e, link.href)}
                    className="text-sm font-bold text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 4: Resources */}
            <div className="lg:ml-auto">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-6">Resources</h3>
              <div className="flex flex-col gap-4">
                {resourcesLinks.map((link) => (
                  <Link key={link.label} href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener" : undefined}
                    className={`text-sm font-bold transition-colors flex items-center gap-2 ${
                      link.highlight 
                        ? "text-[#00D9C0] hover:text-[#00D9C0]/80" 
                        : "text-white/70 hover:text-white"
                    }`}>
                    {link.label}
                    {link.highlight && (
                      <span className="px-1.5 py-0.5 rounded bg-[#00D9C0] text-black text-[10px] font-black uppercase tracking-wider leading-none shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
                        Hire Us
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="mt-20 pt-8 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-xs font-bold text-white/50 uppercase tracking-widest">
            <div>© {new Date().getFullYear()} Kerala Coders Cafe.</div>
            <div>Built in Kerala for people who build.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerQuotes = [
  "BUILD WITH PASSION",
  "SHIP IT TODAY",
  "DEBUG YOUR DREAMS",
  "CODE IN PUBLIC",
  "LEARN TOGETHER",
  "OPEN SOURCE KERALA",
];

function FooterMarquee() {
  const repeated = [...footerQuotes, ...footerQuotes, ...footerQuotes];
  return (
    <div className="flex items-center overflow-hidden w-full">
      <div className="flex gap-8 items-center whitespace-nowrap animate-marquee-footer">
        {repeated.map((q, i) => (
          <span key={i} className="flex items-center gap-6 text-5xl md:text-7xl font-black tracking-tight text-black uppercase px-2">
            {q}
            <span className="text-4xl font-black">✱</span>
          </span>
        ))}
      </div>
    </div>
  );
}

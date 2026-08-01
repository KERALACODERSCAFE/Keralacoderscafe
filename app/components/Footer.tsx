"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, MessageCircle, Mail, Twitter, Coffee, Copy, Check, X, ExternalLink } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { useLenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Teams", href: "/teams" },
];

const communityLinks = [
  { label: "Contributors", href: "#contributors" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Join", href: "/join" },
];

const resourcesLinks = [
  { label: "GitHub", href: "https://github.com/KERALACODERSCAFE/Keralacoderscafe" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Freelance Enquiries", href: "mailto:keralacoderscafe@gmail.com?subject=Freelance%20Enquiry", highlight: true },
];

export default function Footer() {
  const lenis = useLenis();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [isModalOpen, lenis]);

  const handleQuickLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      lenis?.scrollTo(href, { duration: 1.5 });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("akhilappuyeroor-1@okaxis");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="footer" className="relative w-full overflow-x-clip pt-16 bg-transparent">

      {/* Black Background */}
      <div className="absolute top-[80px] left-0 right-0 bottom-0 bg-black z-0" />

      {/* Slanted shape */}
      <div
        className="absolute top-0 left-0 w-full h-[150px] bg-black z-0"
        style={{ transform: "skewY(-4deg)", transformOrigin: "center" }}
      />

      {/* Cyan Banner */}
      <div
        className="absolute top-[-10px] left-[-5%] w-[110%] bg-[#00D9C0] flex items-center z-10 h-16 md:h-20"
        style={{ transform: "skewY(-4deg)", transformOrigin: "center" }}
      >
        <FooterMarquee />
      </div>

      {/* Footer Content */}
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

              <HoverBorderGradient
                as="button"
                onClick={() => setIsModalOpen(true)}
                containerClassName="mt-6 rounded-lg"
                className="flex items-center gap-3 px-5 py-2.5 bg-zinc-900 text-[#FFE66D] font-black uppercase tracking-wider text-xs cursor-pointer group rounded-lg"
                duration={1.5}
              >
                <Coffee className="w-4 h-4 transition-transform group-hover:rotate-12" />
                <span>Give me coffee</span>
              </HoverBorderGradient>
            </div>

            {/* Column 2: Explore */}
            <div className="lg:ml-auto">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-6">Explore</h3>
              <div className="flex flex-col gap-4">
                {exploreLinks.map((link) => (
                  <Link key={link.label} href={link.href}
                    onClick={(e) => handleQuickLinkClick(e as any, link.href)}
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
                    onClick={(e) => handleQuickLinkClick(e as any, link.href)}
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
                    className={`text-sm font-bold transition-colors flex items-center gap-2 ${(link as any).highlight
                        ? "text-[#00D9C0] hover:text-[#00D9C0]/80"
                        : "text-white/70 hover:text-white"
                      }`}>
                    {link.label}
                    {(link as any).highlight && (
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

      {/* ── COFFEE MODAL ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl">
            <div className="fixed inset-0" onClick={() => setIsModalOpen(false)} />

            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 12 }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              className="relative w-full max-w-[320px] text-white z-10 overflow-hidden rounded-2xl"
              style={{
                background: "linear-gradient(145deg, #0f0f0f 0%, #141414 100%)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 24px 60px -12px rgba(0,0,0,0.9), 0 0 40px -16px rgba(0,217,192,0.18)",
              }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(90deg, transparent, #00D9C0 30%, #FFE66D 70%, transparent)" }}
              />

              {/* Ambient glow */}
              <div className="absolute top-[-40%] left-[-20%] w-[60%] h-[60%] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,217,192,0.07) 0%, transparent 70%)", filter: "blur(30px)" }}
              />

              {/* Close */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-500 hover:text-white rounded-full transition-all cursor-pointer z-30"
                aria-label="Close"
              >
                <X className="w-3 h-3" />
              </button>

              <div className="px-5 pt-5 pb-4">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-3">
                  <h3 className="text-sm font-black uppercase tracking-wide text-white leading-tight mb-0.5">Buy me a coffee ☕</h3>
                  <p className="text-[10px] text-zinc-500 font-medium">Support Kerala Coders Cafe</p>
                </div>

                <p className="text-[11px] font-medium text-zinc-400 mb-4 leading-relaxed text-center px-1">
                  Your contributions help us keep the servers running, maintain the community, and host exciting new sessions for the group!
                </p>

                {/* QR Code */}
                <div className="flex flex-col items-center mb-4">
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-2">Scan to Pay · UPI</p>
                  <div className="p-[2px] rounded-xl"
                    style={{ background: "linear-gradient(135deg, #00D9C0, #FFE66D, #00D9C0)" }}
                  >
                    <div className="bg-[#0f0f0f] rounded-[10px] p-0.5">
                      <div className="relative bg-white rounded-lg overflow-hidden">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                            "upi://pay?pa=akhilappuyeroor-1@okaxis&pn=Kerala Coders Cafe&cu=INR"
                          )}&qzone=1&color=0d1b2a&bgcolor=ffffff&ecc=H`}
                          alt="Scan to pay"
                          className="w-[130px] h-[130px] object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-1 h-1 rounded-full bg-[#00D9C0] animate-pulse" />
                    <span className="text-[8px] font-bold uppercase tracking-widest text-zinc-600">GPay · PhonePe · Any UPI</span>
                    <div className="w-1 h-1 rounded-full bg-[#00D9C0] animate-pulse" />
                  </div>
                </div>

                {/* UPI ID */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-lg px-2.5 py-2 min-w-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00D9C0] shrink-0" />
                    <span className="font-mono text-[11px] font-bold text-zinc-300 truncate select-all">
                      akhilappuyeroor-1@okaxis
                    </span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer"
                    style={{
                      background: copied ? "linear-gradient(135deg, #00D9C0, #00C2AB)" : "#1a1a1a",
                      border: "1px solid " + (copied ? "transparent" : "rgba(255,255,255,0.08)"),
                      boxShadow: copied ? "0 0 14px -4px rgba(0,217,192,0.6)" : "none",
                    }}
                    aria-label="Copy UPI ID"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
                  </button>
                </div>

                {copied && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] font-bold text-[#00D9C0] mt-1.5 text-center"
                  >
                    ✓ Copied!
                  </motion.p>
                )}

                {isMobile && (
                  <a
                    href="upi://pay?pa=akhilappuyeroor-1@okaxis&pn=Kerala%20Coders%20Cafe&cu=INR"
                    className="mt-3 flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg font-black uppercase tracking-wider text-[11px] text-black transition-all hover:brightness-105"
                    style={{
                      background: "linear-gradient(135deg, #FFE66D 0%, #F5A524 100%)",
                      boxShadow: "0 3px 16px -4px rgba(245,165,36,0.45)",
                    }}
                  >
                    <Coffee className="w-3.5 h-3.5" />
                    <span>Open UPI App &amp; Pay</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
  // Use an even number of repeats so that 50% translation is a perfect loop
  const repeated = [...footerQuotes, ...footerQuotes, ...footerQuotes, ...footerQuotes];
  return (
    <div className="flex items-center overflow-hidden w-full">
      <div className="flex items-center whitespace-nowrap animate-marquee-footer w-max">
        {repeated.map((q, i) => (
          <div key={i} className="flex items-center gap-8 md:gap-12 mr-8 md:mr-12">
            <span className="text-2xl md:text-4xl font-black tracking-tight text-black uppercase">
              {q}
            </span>
            <span className="text-xl md:text-3xl font-black text-black">✱</span>
          </div>
        ))}
      </div>
    </div>
  );
}
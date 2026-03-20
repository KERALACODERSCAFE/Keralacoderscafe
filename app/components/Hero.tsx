"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden text-kcc-gold">
        <div className="relative w-full h-full max-w-4xl max-h-[80vh] opacity-100">
          <Image
            src="https://res.cloudinary.com/ddtpurhae/image/upload/v1773985458/ChatGPT_Image_Mar_20_2026_10_41_14_AM_relkov.png"
            alt="Kerala Coders Cafe community illustration"
            fill
            sizes="100vw"
            className="object-contain animate-fade-in"
            priority
          />
        </div>
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="text-xs tracking-[0.5em] text-kcc-gold uppercase mb-6 animate-fade-in-up">
          KERALA'S TECH COMMUNITY
        </div>

        <h1
          className="text-[15vw] md:text-[12vw] lg:text-[10rem] font-black tracking-tighter text-kcc-accent leading-none select-none animate-fade-in-up delay-100"
          style={{ fontFamily: "var(--font-newsreader)" }}
        >
          Kerala Coders<br />Cafe
        </h1>


        <p className="text-base md:text-lg text-kcc-text-dim mt-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-300">
          A vibrant community of developers, designers, and tech enthusiasts from Kerala.
          Building the future, one commit at a time.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up delay-400">
          <Link
            href="https://github.com/KERALACODERSCAFE/Keralacoderscafe"
            target="_blank"
            rel="noopener"
            className="bg-kcc-accent text-kcc-bg px-10 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-kcc-gold transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>code</span>
            View on GitHub
          </Link>
          <Link
            href="https://chat.whatsapp.com/Kd3tVwJfjjh0HRZtoYfxcm"
            target="_blank"
            rel="noopener"
            className="border border-kcc-border text-kcc-accent px-10 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-white/5 hover:border-kcc-gold transition-all duration-300 inline-flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>chat</span>
            Join WhatsApp
          </Link>
        </div>

        <div className="mt-16 animate-fade-in-up delay-500">
          <a href="#about" className="text-kcc-text-dim hover:text-kcc-gold transition-colors inline-block">
            <span className="material-symbols-outlined animate-bounce" style={{ fontSize: "40px" }}>keyboard_arrow_down</span>
          </a>
        </div>
      </div>
    </header>
  );
}

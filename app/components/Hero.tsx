"use client";

import Link from "next/link";
import { ArrowUpRight, Github, MessageCircle } from "lucide-react";
import ColourfulText from "./ColourfulText";
import { useState, useEffect } from "react";

const highlights = [
  "From 1-day beginners to 10+ years experienced developers",
  "Open source, meetups, peer learning, and real collaboration",
];

const fallbackContributors = [
  { name: "Akhil", initial: "AK", color: "bg-kcc-accent", rotation: "rotate-[-2deg]", avatar: "", commits: 0 },
  { name: "Shan", initial: "SH", color: "bg-kcc-green", rotation: "rotate-[1deg]", avatar: "", commits: 0 },
  { name: "Akshay", initial: "AS", color: "bg-kcc-gold", rotation: "rotate-[-1deg]", avatar: "", commits: 0 },
  { name: "Arjun", initial: "AR", color: "bg-[#C8B6FF]", rotation: "rotate-[2deg]", avatar: "", commits: 0 },
];

const defaultColors = ["bg-kcc-accent", "bg-kcc-green", "bg-kcc-gold", "bg-[#C8B6FF]"];
const defaultRotations = ["rotate-[-2deg]", "rotate-[1deg]", "rotate-[-1deg]", "rotate-[2deg]"];

export default function Hero() {
  const [topContributors, setTopContributors] = useState(fallbackContributors);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isBulbOn, setIsBulbOn] = useState(false);
  const fastAvatars = ["👨‍💻", "👩‍💻", "🚀", "💡"];

  useEffect(() => {
    fetch("https://api.github.com/repos/KERALACODERSCAFE/Keralacoderscafe/contributors?per_page=12")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((user, i) => ({
            name: user.login,
            initial: user.login.substring(0, 2).toUpperCase(),
            color: defaultColors[i % defaultColors.length],
            rotation: defaultRotations[i % defaultRotations.length],
            avatar: user.avatar_url,
            commits: user.contributions || 0,
          }));

          setTopContributors(mapped);
        }
      })
      .catch((err) => console.error("Failed to fetch GitHub contributors:", err));

    // Trigger animation for 3 seconds every 10 seconds
    const burstInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 3000);
    }, 10000);

    return () => clearInterval(burstInterval);
  }, []);

  useEffect(() => {
    let animInterval: NodeJS.Timeout;
    if (isAnimating) {
      animInterval = setInterval(() => {
        setAvatarIndex((prev) => (prev + 1) % fastAvatars.length);
      }, 150);
    }
    return () => clearInterval(animInterval);
  }, [isAnimating, fastAvatars.length]);

  return (
    <header className="relative overflow-clip px-6 pb-28 pt-44 md:px-12 lg:pb-36 lg:pt-56 bg-white border-b-4 border-black">
      {/* Geometric Background Elements */}
      <div className="absolute top-20 left-10 h-32 w-32 border-4 border-black bg-kcc-gold -z-10 rotate-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hidden lg:block" />
      <div className="absolute bottom-20 right-20 h-40 w-40 border-4 border-black bg-kcc-green -z-10 -rotate-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hidden lg:block" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-10 -z-10" />

      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-center gap-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
          <div className="max-w-[750px]">
            <div className="mt-10 animate-fade-in-up delay-100">
              <span className="inline-block border-2 border-black bg-kcc-green px-4 py-1.5 text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
                Built in Kerala • Powered by curiosity
              </span>

              <h1 className="mt-2 max-w-[850px] text-[clamp(3.5rem,10vw,7.5rem)] font-black leading-[0.88] tracking-[-0.05em] text-black uppercase">
                <ColourfulText text="Kerala" /> <br className="hidden sm:block" />
                Coders
                <span className="ml-2 bg-kcc-gold px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:ml-4 inline-block -rotate-2">
                  Cafe
                </span>
              </h1>

              <p
                className="mt-16 max-w-[640px] text-[1.2rem] font-bold leading-relaxed text-black sm:text-[1.35rem] border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white"
              >
                A vibrant community of developers, designers, and tech
                enthusiasts from Kerala. Building the future, one commit at a
                time.
              </p>
            </div>

            <div className="mt-20 hidden flex-wrap gap-4 animate-fade-in-up delay-200 md:flex">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-tight shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-22 flex flex-col gap-6 animate-fade-in-up delay-300 sm:flex-row">
              <Link
                href="https://github.com/KERALACODERSCAFE/Keralacoderscafe"
                target="_blank"
                rel="noopener"
                className="inline-flex h-16 items-center justify-center gap-3 border-3 border-black bg-black px-8 text-base font-black uppercase text-white shadow-[6px_6px_0px_0px_rgba(255,107,107,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_10px_rgba(255,107,107,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(255,107,107,1)] transition-all"
              >
                <Github className="h-5 w-5 stroke-[3]" />
                View on GitHub
              </Link>
            </div>

            <div className="mt-22 flex flex-wrap items-center gap-6 text-[0.95rem] font-bold uppercase animate-fade-in-up delay-400">
              <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="h-3 w-3 border-2 border-black bg-kcc-green" />
                700+ ACTIVE DEVS
              </div>
              <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <ArrowUpRight className="h-4 w-4 stroke-[3]" />
                OPEN TO ALL
              </div>
            </div>
          </div>

          {/* ─── NEWSPAPER + STAMP COLLECTION ─── */}
          <div className="relative mx-auto w-full max-w-[520px] animate-fade-in delay-200 flex flex-col gap-6 lg:self-start">








            {/* ── Top Contributors – Stamp Collection ── */}
            <div className="relative border-4 border-black bg-[#F5F0E1] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-1 sm:p-8"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            >
              {/* Header label */}
              <div className="flex items-center justify-between mb-6">
                <div className="border-2 border-black bg-white px-3 py-1 text-[0.6rem] font-black uppercase tracking-[0.3em] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Top Contributors
                </div>
                <div className="text-[0.55rem] font-bold uppercase tracking-[0.2em] text-black/30">
                  Stamp Collection
                </div>
              </div>

              {/* Stamp Grid - Horizontally Scrollable */}
              <div className="grid grid-rows-2 grid-flow-col auto-cols-[calc(50%-10px)] sm:auto-cols-[calc(50%-12px)] gap-5 sm:gap-6 overflow-x-auto pb-4 pt-2 -mx-2 px-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {topContributors.map((person, i) => (
                  <div
                    key={`${person.name}-${i}`}
                    className={`snap-center group relative ${person.rotation} transition-all duration-200 hover:rotate-0 hover:scale-105 shrink-0`}
                  >
                    {/* Stamp outer — perforated edge effect */}
                    <div className="relative border-4 border-black bg-white p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, transparent 40%, #000 41%, #000 44%, transparent 45%)",
                        backgroundSize: "10px 10px",
                        backgroundPosition: "-5px -5px",
                      }}
                    >
                      {/* Inner stamp content */}
                      <div className={`relative border-2 border-black ${person.color} px-3 py-4 text-center`}>
                        {/* Stamp value (commits) */}
                        <div className="absolute top-1 right-2 text-[0.55rem] font-black text-black/40">
                          {person.commits ? `${person.commits} CMTS` : "₹0.00"}
                        </div>

                        {/* Avatar circle */}
                        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center border-3 border-black bg-white font-black text-xl text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] overflow-hidden">
                          {person.avatar ? (
                            <img src={person.avatar} alt={person.name} className="h-full w-full object-cover" />
                          ) : (
                            person.initial
                          )}
                        </div>

                        {/* Name */}
                        <div className="font-black uppercase text-[0.7rem] sm:text-[0.75rem] tracking-tight text-black leading-tight text-center break-words w-full px-1 mx-auto line-clamp-2" style={{ wordBreak: 'break-word' }}>
                          {person.name}
                        </div>

                        {/* Country / Role label */}
                        <div className="mt-1.5 text-[0.5rem] font-bold uppercase tracking-[0.25em] text-black/40">
                          Kerala &bull; Dev
                        </div>

                        {/* Decorative postmark circle (visible on hover) */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <div className="h-16 w-16 rounded-full border-[3px] border-dashed border-kcc-accent/60 flex items-center justify-center rotate-[-20deg]">
                            <div className="text-[0.5rem] font-black uppercase text-kcc-accent/60 leading-none text-center">
                              KCC<br />Approved
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 'YOU?' Stamp Card for New Contributors */}
                <a
                  href="https://github.com/KERALACODERSCAFE/Keralacoderscafe"
                  target="_blank"
                  rel="noopener"
                  className="snap-center group relative rotate-[1deg] transition-all duration-200 hover:rotate-0 hover:scale-105 shrink-0 block"
                >
                  <div className="relative border-4 border-black bg-white p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-full"
                    style={{
                      backgroundImage: "radial-gradient(circle, transparent 40%, #000 41%, #000 44%, transparent 45%)",
                      backgroundSize: "10px 10px",
                      backgroundPosition: "-5px -5px",
                    }}
                  >
                    <div className="relative border-2 border-dashed border-black bg-kcc-paper px-3 py-4 text-center h-full flex flex-col items-center justify-center transition-colors group-hover:bg-kcc-gold">
                      <div className="absolute top-1 right-2 text-[0.55rem] font-black text-black/40">
                        1st PR
                      </div>
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center border-3 border-black bg-white font-black text-2xl text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform">
                        {isAnimating ? fastAvatars[avatarIndex] : "+"}
                      </div>
                      <div className="font-black uppercase text-[0.6rem] tracking-tight text-black leading-tight max-w-[80px] mx-auto text-center">
                        open source builder
                      </div>
                      <div className="mt-1.5 text-[0.45rem] font-bold uppercase tracking-[0.05em] text-black/50 text-center leading-tight">
                        contribute &<br />get featured
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* View All Contributors label */}
              <div className="mt-2 flex items-center justify-center gap-3">
                <div className="h-[2px] flex-1 bg-black/15" />
                <a
                  href="https://github.com/KERALACODERSCAFE/Keralacoderscafe/graphs/contributors"
                  target="_blank"
                  rel="noopener"
                  className="border-3 border-black bg-kcc-gold px-4 py-2 font-black uppercase text-sm text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] actvie:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                >
                  View All Contributors
                </a>
                <div className="h-[2px] flex-1 bg-black/15" />
              </div>

              {/* Vintage postmark decoration */}
              <div className="absolute -top-3 -left-3 h-10 w-10 border-3 border-black bg-kcc-accent flex items-center justify-center rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hidden sm:flex">
                <div className="text-[0.55rem] font-black text-white leading-none text-center">
                  TOP<br />4
                </div>
              </div>
            </div>

            {/* ── Community Dispatch – Open Source Updates ── */}
            <div className={`dispatch-stack ${isBulbOn ? 'bulb-on' : ''}`}>
              <div className="dispatch-card transition-all duration-500">
                {/* Dispatch Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-black text-white px-3 py-0.5 text-[0.6rem] font-black uppercase tracking-widest">
                    Live Dispatch
                  </div>
                  <div className="flex-1 h-[2px] bg-black/10" />
                  <div className="text-[0.55rem] font-bold text-black/30 uppercase tracking-tighter">
                    Ref: KCC-OSS-2024
                  </div>
                </div>

                <div className="space-y-1">
                  {/* Item 1: Live */}
                  <div className="update-item live">
                    <div className="status-dot live"></div>
                    <div className="update-content">
                      <div className="update-title">3D Model Viewer</div>
                      <div className="update-desc">Toddy Shop Finder prototype integrated with interactive lighting.</div>
                    </div>
                  </div>

                  {/* Item 2: Completed / Recent */}
                  <div className="update-item completed">
                    <div className="status-dot completed"></div>
                    <div className="update-content">
                      <div className="update-title">14 Community Ideas</div>
                      <div className="update-desc">Projects from Leo, Sathish, Aswin & others moved to idea stage.</div>
                    </div>
                  </div>

                  {/* Item 3: Completed */}
                  <div className="update-item completed">
                    <div className="status-dot completed"></div>
                    <div className="update-content">
                      <div className="update-title">AR Support Added</div>
                      <div className="update-desc">Google Scene Viewer intent integration completed for Android.</div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6">
                  <Link
                    href="/events"
                    className="group relative inline-flex items-center justify-center w-full bg-black text-white border-2 border-[#6dfe9c] py-3 px-6 font-black uppercase text-xs tracking-widest shadow-[6px_6px_0px_0px_rgba(109,254,156,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(109,254,156,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100"
                  >
                    <span>Explore All Projects</span>
                    <ArrowUpRight className="ml-2 w-4 h-4 stroke-[3] group-hover:rotate-45 transition-transform" />
                  </Link>
                </div>

                {/* Decorative machine-fed edge holes */}
                <div className="dispatch-sprocket-left">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="sprocket-hole" />
                  ))}
                </div>
                <div className="dispatch-sprocket-right">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="sprocket-hole" />
                  ))}
                </div>
              </div>
              {/* ── Gooey Glowing Bulb ── */}
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="absolute w-0 h-0 invisible pointer-events-none">
                <defs>
                  <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feBlend in="SourceGraphic" in2="goo" />
                  </filter>
                </defs>
              </svg>

              <div className="lamp-container hidden sm:flex flex-col items-center scale-[0.85] sm:scale-100 origin-top transition-transform">
                <div className="gooey-lamp" onClick={() => setIsBulbOn(!isBulbOn)}>
                  <div className="lamp-cable"></div>
                  <div className="lamp-bulb">
                    <div className="bulb_cover"></div>
                    <div className="bulb_light">
                      <div className="light_particles">
                        {[1, 2, 3, 6, 7, 8, 9].map((i) => (
                          <div key={i} className={`particle particle-${i}`} />
                        ))}
                      </div>
                    </div>

                    {/* Pre-interaction Ripple Effect */}
                    {!isBulbOn && (
                      <div className="absolute top-[80px] left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-50">
                        {/* Wave Circles */}
                        <div className="absolute w-[90px] h-[90px] rounded-full border-[3px] border-[#FFE66D] animate-ping opacity-75"></div>
                        <div className="absolute w-[120px] h-[120px] rounded-full border border-white animate-ping opacity-50" style={{ animationDelay: '500ms' }}></div>
                        
                        {/* Click Me Badge */}
                        <div className="absolute top-[55px] bg-[#1a1a1a] text-white px-2.5 py-1 border-2 border-[#FFE66D] text-[0.55rem] font-black uppercase tracking-widest shadow-[3px_3px_0_0_#FFE66D] whitespace-nowrap rotate-[-5deg] animate-pulse">
                          Click Me 💡
                        </div>
                      </div>
                    )}
                  </div>

                  {isBulbOn && (
                    <>
                      {/* Left Quote */}
                      <div className="absolute top-[30px] right-[110px] w-max z-50 animate-in fade-in slide-in-from-right-4 duration-500 pointer-events-none">
                        <div className="relative bg-[#1a1a1a] text-[#FFE66D] px-4 py-2 border-2 border-[#FFE66D] font-black text-[0.6rem] uppercase tracking-widest shadow-[-4px_4px_0_0_#FFE66D] text-right leading-tight">
                          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-[#1a1a1a] border-t-2 border-r-2 border-[#FFE66D] rotate-45 transform origin-center"></div>
                          "Competition alla….<br />collaboration aanu power"
                        </div>
                      </div>

                      {/* Right Quote */}
                      <div className="absolute top-[80px] left-[110px] w-max z-50 animate-in fade-in slide-in-from-left-4 duration-500 pointer-events-none hidden sm:block">
                        <div className="relative bg-[#1a1a1a] text-[#FFE66D] px-4 py-2 border-2 border-[#FFE66D] font-black text-[0.6rem] uppercase tracking-widest shadow-[4px_4px_0_0_#FFE66D] text-left leading-tight">
                          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-[#1a1a1a] border-b-2 border-l-2 border-[#FFE66D] rotate-45 transform origin-center"></div>
                          "Copy paste alla…<br />understand & build.”
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

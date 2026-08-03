"use client";

import Link from "next/link";
import { ArrowUpRight, Github, MessageCircle } from "lucide-react";
import ColourfulText from "./ColourfulText";
import { heroMalayalam } from "../../lib/fonts";
import FlowerGenerator from "./FlowerGenerator";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Script from "next/script";

const highlights = [
  "3000+ developers from Kerala & beyond",
  "Gen AI, Web3, DevOps & full-stack topics",
  "Careers, jobs & internship opportunities",
  "Open contribution — anyone can join & build",
];

const fallbackContributors = [
  { name: "Akhil", initial: "AK", color: "bg-kcc-accent", rotation: "sm:rotate-[-2deg]", avatar: "", commits: 0 },
  { name: "Shan", initial: "SH", color: "bg-kcc-green", rotation: "sm:rotate-[1deg]", avatar: "", commits: 0 },
  { name: "Akshay", initial: "AS", color: "bg-kcc-gold", rotation: "sm:rotate-[-1deg]", avatar: "", commits: 0 },
  { name: "Arjun", initial: "AR", color: "bg-[#C8B6FF]", rotation: "sm:rotate-[2deg]", avatar: "", commits: 0 },
];

const defaultColors = ["bg-kcc-accent", "bg-kcc-green", "bg-kcc-gold", "bg-[#C8B6FF]"];
const defaultRotations = ["sm:rotate-[-2deg]", "sm:rotate-[1deg]", "sm:rotate-[-1deg]", "sm:rotate-[2deg]"];

export default function Hero() {
  const [topContributors, setTopContributors] = useState(fallbackContributors);
  const [isBulbOn, setIsBulbOn] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const REPOS_TO_FETCH = [
      "https://api.github.com/repos/KERALACODERSCAFE/Keralacoderscafe/contributors?per_page=50",
      "https://api.github.com/repos/KERALACODERSCAFE/Kerala-toddy-finder/contributors?per_page=50",
    ];

    Promise.allSettled(
      REPOS_TO_FETCH.map((url) =>
        fetch(url).then((r) => (r.ok ? r.json() : Promise.resolve([])))
      )
    )
      .then((results) => {
        const merged = new Map<number, { login: string; avatar_url: string; contributions: number }>();
        for (const result of results) {
          if (result.status !== "fulfilled") continue;
          const list = Array.isArray(result.value) ? result.value : [];
          for (const c of list) {
            if (merged.has(c.id)) {
              merged.get(c.id)!.contributions += c.contributions;
            } else {
              merged.set(c.id, { login: c.login, avatar_url: c.avatar_url, contributions: c.contributions });
            }
          }
        }

        const sorted = Array.from(merged.values()).sort(
          (a, b) => b.contributions - a.contributions
        );

        if (sorted.length > 0) {
          const mapped = sorted.map((user, i) => ({
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
  }, []);

  const memoizedFlower = useMemo(() => <FlowerGenerator />, []);
  const memoizedDoodle = useMemo(() => React.createElement("css-doodle", {
    dangerouslySetInnerHTML: {
      __html: `
        :doodle {
          @grid: 12 / 100% 100%;
          background: transparent;
        }
        --c: @p(#e8aa3e, #d7e2eb, #dcc6f5, #ffebd2); 
        @place-cell: center;
        @random(0.7) {
          z-index: 1;
          :after {
            content: "";
            transform: translate(@m2(@r(±15vmin))) rotate(@r(360deg));
            @size: 3vmin;
            background: @doodle(
              @grid: 3x4 / 100% 100%;
              @size: 20%;
              @place-cell: center;
              border-radius: 0 100% 0 100%;
              background: var(--c);
              opacity: @r(0.7, 1);
              transform: rotate(@r(360deg));
              transform-origin: 0 0;
              @match(i > 11) {
                :after {
                  content: "";
                  z-index: 1;
                  position: absolute;
                  top: -25%;
                  left: -25%;
                  @size: 50%;
                  background: #d4603c;
                  border: 0.5px solid rgba(0, 0, 0, 0.2);
                  border-radius: 100%;
                }
              }
            );
          }
        }
        :before {
          content: "";
          @size: @r(0.5, 1)vmin;
          border-radius: 100% 0 100% 0;
          background: @p(#aec58d, #7c9852);
          transform: translate(@m2(@r(±12vmin))) rotate(@r(360deg));
          opacity: @r(0.6, 1);
        }
      `
    }
  }), []);

  return (
    <>
      {!isMobile && (
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/css-doodle/0.38.4/css-doodle.min.js" strategy="afterInteractive" />
      )}
      <style>{`
        css-doodle:not(:defined) {
          display: none !important;
        }
      `}</style>
      <header className="relative overflow-clip px-6 pb-28 pt-12 md:px-12 lg:pb-36 lg:pt-20 bg-white border-b-4 border-black">
      {/* Geometric Background Elements */}
      <div className="absolute top-20 left-10 h-32 w-32 border-4 border-black bg-kcc-gold -z-10 rotate-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hidden lg:block" />
      <div className="absolute bottom-20 right-20 h-40 w-40 border-4 border-black bg-kcc-green -z-10 -rotate-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hidden lg:block" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-10 -z-10" />

      <div className="mx-auto max-w-[1280px] relative z-10">
        <div className="grid items-center gap-24 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
          <div className="max-w-[750px]">
            <div className="mt-10 animate-fade-in-up delay-100">
              {/* Onam Greeting Console Container */}
              <div className="mb-6 inline-block bg-[#1a1a1a] text-[#FFE66D] border-4 border-black px-6 py-3 font-mono text-sm sm:text-base shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-full">
                <div className="flex items-center gap-2">
                  <span className="text-kcc-green font-bold">&gt;</span>
                  <span className="font-extrabold tracking-wide">എല്ലാവർക്കും ഹൃദയം നിറഞ്ഞ ഓണാശംസകൾ! 🌸</span>
                  <span className="inline-block w-2.5 h-5 bg-[#FFE66D] animate-[pulse_1s_infinite]"></span>
                </div>
              </div>

              <span className="inline-block border-2 border-black bg-kcc-green px-4 py-1.5 text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
                Built in Kerala • Powered by curiosity
              </span>

              <h1 className="mt-2 max-w-[850px] text-[clamp(3.5rem,10vw,7.5rem)] font-black leading-[0.88] tracking-[-0.05em] text-black uppercase">
                <ColourfulText
                  text="കേരള"
                  lang="ml"
                  className={`${heroMalayalam.className} inline-block text-[0.98em] font-extrabold tracking-[-0.045em]`}
                />{" "}
                <br className="hidden sm:block" />
                <span className="relative inline-block">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] sm:w-[350px] sm:h-[350px] -z-10 opacity-70 pointer-events-auto hidden sm:block">
                    {!isMobile && memoizedFlower}
                  </div>
                  <span className="relative z-10">Coders</span>
                </span>
                <span className="ml-2 bg-kcc-gold px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:ml-4 inline-block -rotate-2 transition-transform duration-200 hover:rotate-2 hover:scale-105 cursor-default">
                  Cafe
                </span>
              </h1>

              <div className="relative mt-16 max-w-[640px] border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-[#475d50] overflow-hidden rounded-md">
                {/* CSS Doodle background inside description box */}
                {!isMobile && (
                  <div className="absolute inset-0 opacity-45 pointer-events-none z-0 flex items-center justify-center scale-150">
                    {memoizedDoodle}
                  </div>
                )}
                <p
                  className="relative z-10 text-[1.2rem] font-black leading-relaxed text-white sm:text-[1.35rem]"
                >
                  A vibrant community of developers, designers, and tech
                  enthusiasts from Kerala. Building the future, one commit at a
                  time.
                </p>
              </div>
            </div>

            <div className="mt-20 hidden flex-wrap gap-4 animate-fade-in-up delay-200 md:flex">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-tight shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-kcc-paper"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-22 flex flex-col gap-4 animate-fade-in-up delay-300 sm:flex-row">
              <Link
                href="https://github.com/KERALACODERSCAFE/Keralacoderscafe"
                target="_blank"
                rel="noopener"
                className="inline-flex h-16 items-center justify-center gap-3 border-3 border-black bg-black px-8 text-base font-black uppercase text-white shadow-[6px_6px_0px_0px_rgba(255,107,107,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_10px_rgba(255,107,107,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(255,107,107,1)] transition-all"
              >
                <Github className="h-5 w-5 stroke-[3]" />
                View on GitHub
              </Link>

              {/* WhatsApp Channel CTA */}
              <Link
                href="https://whatsapp.com/channel/0029Vb7rrWPA2pLKAUOz4F29"
                target="_blank"
                rel="noopener"
                className="inline-flex h-16 items-center justify-center gap-3 border-3 border-black bg-[#25D366] px-8 text-base font-black uppercase text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {/* WhatsApp icon */}
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Join Channel
              </Link>
            </div>

            <div className="mt-22 flex flex-wrap items-center gap-3 text-[0.85rem] font-bold uppercase animate-fade-in-up delay-400">
              <div className="inline-flex items-center gap-2 border-2 border-black bg-kcc-green px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="h-2.5 w-2.5 rounded-full bg-black" />
                3000+ DEVELOPERS
              </div>
              <div className="inline-flex items-center gap-2 border-2 border-black bg-kcc-gold px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-base leading-none">🤖</span>
                GEN AI
              </div>
              <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-base leading-none">💼</span>
                CAREERS
              </div>
              <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <ArrowUpRight className="h-4 w-4 stroke-[3]" />
                OPEN CONTRIBUTION
              </div>
            </div>
          </div>

          {/* ─── NEWSPAPER + STAMP COLLECTION ─── */}
          <div className="relative mx-auto w-full max-w-[520px] animate-fade-in delay-200 flex flex-col gap-6 lg:self-start overflow-hidden sm:overflow-visible">








            {/* ── Top Contributors – Stamp Collection ── */}
            {/* ── Top Contributors – Stamp Collection ── */}
            <div className="relative w-full border-4 border-black bg-[#F5F0E1] p-3 sm:p-8 sm:-rotate-1 overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            >
              {/* Header label */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="border-2 border-black bg-white px-2 sm:px-3 py-1 text-[0.55rem] sm:text-[0.6rem] font-black uppercase tracking-[0.3em] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Top Contributors
                </div>
                <div className="text-[0.5rem] sm:text-[0.55rem] font-bold uppercase tracking-[0.2em] text-black/30">
                  Stamp Collection
                </div>
              </div>

              {/* Stamp Grid - Top 4 List */}
              <div className="grid w-full grid-cols-1 gap-3 sm:gap-4 pb-2 pt-2">
                {topContributors.slice(0, 4).map((person, i) => (
                  <div
                    key={`${person.name}-${i}`}
                    className={`group relative z-10 ${person.rotation} transition-all duration-200 hover:rotate-0 hover:scale-105 min-w-0`}
                  >
                    {/* Stamp outer — perforated edge effect */}
                    <div className="relative border-4 border-black bg-white p-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] w-full max-w-full"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, transparent 40%, #000 41%, #000 44%, transparent 45%)",
                        backgroundSize: "8px 8px",
                        backgroundPosition: "-4px -4px",
                      }}
                    >
                      {/* Inner stamp content */}
                      <div className={`relative border-2 border-black ${person.color} px-3 sm:px-4 py-3 text-center min-w-0 flex items-center gap-4`}>
                        {/* Avatar circle */}
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center border-2 border-black bg-white font-black text-sm text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] overflow-hidden">
                          {person.avatar ? (
                            <img src={person.avatar} alt={person.name} className="h-full w-full object-cover" />
                          ) : (
                            person.initial
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 text-left">
                          <div className="font-black uppercase text-[0.75rem] sm:text-[0.9rem] tracking-tight text-black truncate max-w-[120px] sm:max-w-full">
                            {person.name}
                          </div>
                          <div className="text-[0.55rem] sm:text-[0.6rem] font-bold uppercase tracking-[0.1em] text-black/60">
                            {person.commits ? `${person.commits} CONTRIBUTIONS` : "0 CONTRIBUTIONS"}
                          </div>
                        </div>

                        {/* Rank */}
                        <div className="text-xl font-black italic text-black/20 shrink-0">
                          #0{i + 1}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 'YOU?' Stamp Card */}
                <a
                  href="https://github.com/KERALACODERSCAFE/Keralacoderscafe"
                  target="_blank"
                  rel="noopener"
                  className="group relative z-10 sm:rotate-[1deg] transition-all duration-200 hover:rotate-0 hover:scale-105 block min-w-0"
                >
                  <div className="relative border-4 border-black bg-white p-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] w-full max-w-full"
                    style={{
                      backgroundImage: "radial-gradient(circle, transparent 40%, #000 41%, #000 44%, transparent 45%)",
                      backgroundSize: "8px 8px",
                      backgroundPosition: "-4px -4px",
                    }}
                  >
                    <div className="relative border-2 border-dashed border-black bg-kcc-paper px-3 sm:px-4 py-3 flex items-center gap-4 transition-colors group-hover:bg-kcc-gold">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center border-2 border-black bg-white font-black text-xl text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform">
                        +
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="font-black uppercase text-[0.75rem] sm:text-[0.9rem] tracking-tight text-black truncate max-w-[120px] sm:max-w-full">
                          Join the collection
                        </div>
                        <div className="text-[0.55rem] sm:text-[0.6rem] font-bold uppercase tracking-[0.1em] text-black/60">
                          CONTRIBUTE & GET FEATURED
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
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
                    Ref: KCC-OSS-2025
                  </div>
                </div>

                <div className="space-y-1">
                  {/* Item 1: Live */}
                  <div className="update-item live">
                    <div className="status-dot live"></div>
                    <div className="update-content">
                      <div className="update-title">3000+ Developers</div>
                      <div className="update-desc">Kerala&apos;s largest dev community — growing every day with builders across all stacks.</div>
                    </div>
                  </div>

                  {/* Item 2: Gen AI */}
                  <div className="update-item completed">
                    <div className="status-dot completed"></div>
                    <div className="update-content">
                      <div className="update-title">Gen AI & LLM Discussions</div>
                      <div className="update-desc">Active channels on Gemini, GPT, local models, agents & prompt engineering.</div>
                    </div>
                  </div>

                  {/* Item 3: Careers */}
                  <div className="update-item completed">
                    <div className="status-dot completed"></div>
                    <div className="update-content">
                      <div className="update-title">Careers & Job Board</div>
                      <div className="update-desc">Referrals, internships & openings shared daily by Kerala-based companies.</div>
                    </div>
                  </div>

                  {/* Item 4: Open Contribution */}
                  <div className="update-item live">
                    <div className="status-dot live"></div>
                    <div className="update-content">
                      <div className="update-title">Open Contribution</div>
                      <div className="update-desc">Contribute to open-source projects, get featured on the site &amp; build your portfolio.</div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6">
                  <Link
                    href="/contributors"
                    className="group relative inline-flex items-center justify-center w-full bg-black text-white border-2 border-[#6dfe9c] py-3 px-6 font-black uppercase text-xs tracking-widest shadow-[6px_6px_0px_0px_rgba(109,254,156,0.3)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(109,254,156,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100"
                  >
                    <span>Start Contributing</span>
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
                      <div className={`absolute top-[30px] right-[110px] w-max z-50 animate-in fade-in slide-in-from-right-4 duration-500 pointer-events-none ${heroMalayalam.className}`}>
                        <div className="relative bg-[#1a1a1a] text-[#FFE66D] px-4 py-2 border-2 border-[#FFE66D] font-black text-[0.7rem] sm:text-[0.85rem] tracking-wider shadow-[-4px_4px_0_0_#FFE66D] text-right leading-relaxed">
                          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-[#1a1a1a] border-t-2 border-r-2 border-[#FFE66D] rotate-45 transform origin-center"></div>
                          മത്സരമല്ല...<br />സഹകരണമാണ് പവർ
                        </div>
                      </div>

                      {/* Right Quote */}
                      <div className={`absolute top-[80px] left-[110px] w-max z-50 animate-in fade-in slide-in-from-left-4 duration-500 pointer-events-none hidden sm:block ${heroMalayalam.className}`}>
                        <div className="relative bg-[#1a1a1a] text-[#FFE66D] px-4 py-2 border-2 border-[#FFE66D] font-black text-[0.7rem] sm:text-[0.85rem] tracking-wider shadow-[4px_4px_0_0_#FFE66D] text-left leading-relaxed">
                          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-[#1a1a1a] border-b-2 border-l-2 border-[#FFE66D] rotate-45 transform origin-center"></div>
                          കോപ്പി പേസ്റ്റ് അല്ല...<br />പഠിച്ച് നിർമ്മിക്കുക
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
    </>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { REPOS } from "@/lib/projects";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}


function GitHubIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="w-4 h-4 text-black/40 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
      <path d="M1.75 1A1.75 1.75 0 0 0 0 2.75v10.5C0 14.216.784 15 1.75 15h12.5A1.75 1.75 0 0 0 16 13.25v-8.5A1.75 1.75 0 0 0 14.25 3H7.5a.25.25 0 0 1-.2-.1l-.9-1.2C6.07 1.26 5.55 1 5 1H1.75Z" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
      <path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z" />
    </svg>
  );
}

export default function ProjectsPage() {
  const header = useInView(0.1);
  const activeFocus = useInView(0.1);
  const upcoming = useInView(0.1);
  const ideas = useInView(0.1);
  const cta = useInView(0.1);

  return (
    <div className="min-h-screen bg-[#fef9ea] font-sans text-black neo-brutalist-grid selection:bg-[#FFE66D] selection:text-black">
      <main className="max-w-6xl mx-auto px-6 py-24 pb-32">

        {/* Header Section */}
        <section 
          ref={header.ref}
          className="mt-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            opacity: header.visible ? 1 : 0,
            transform: header.visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s cubic-bezier(.22,1,.36,1), transform 0.8s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div className="relative inline-block transform -rotate-2 bg-yellow-400 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black leading-none">
              COMMUNITY<br />PROJECT
            </h1>
            <p className="text-xl md:text-2xl font-black uppercase tracking-tight text-black/70 mt-1">
              Active Focus
            </p>
            <div className="absolute -top-4 -right-4 bg-[#6dfe9c] border-2 border-black px-4 py-1 font-black text-sm rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase">
              Featured Idea
            </div>
          </div>

          <div className="max-w-md text-right md:text-left">
            <p className="text-xl font-bold uppercase leading-tight border-l-4 border-black pl-4">
              Real ideas from the KCC community. Submitted, reviewed, and now in progress.
            </p>
            <div className="mt-4 flex gap-2 justify-end md:justify-start flex-wrap">
              <span className="bg-black text-white px-3 py-1 text-xs font-black uppercase">Open Source</span>
              <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 border-2 border-amber-800 px-3 py-1 text-xs font-black uppercase">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse inline-block" />
                In Progress
              </span>
            </div>
          </div>
        </section>

        {/* Tier 1: Active Focus Project */}
        <section 
          ref={activeFocus.ref}
          className="relative mt-20"
          style={{
            opacity: activeFocus.visible ? 1 : 0,
            transform: activeFocus.visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s cubic-bezier(.22,1,.36,1) 0.1s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.1s",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {REPOS.filter(repo => repo.id === 4).map((repo, i) => (
              <Link
                key={repo.id}
                href={`/${repo.slug}`}
                className="col-span-1 lg:col-span-2 bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-8 hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer no-underline text-inherit group"
              >
                <div className="w-full md:w-1/2 lg:w-1/3 border-4 border-black relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-black rotate-45 z-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/community-focus.jpg" alt="Community Spotlight" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute bottom-4 left-0 w-full text-center z-10">
                    <span className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-yellow-400">Featured Focus</span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <FolderIcon />
                      <span className="text-xs font-black text-black/40 uppercase">kcc / community spotlight</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-green-100 border-2 border-green-400 text-green-800 px-3 py-1 text-xs font-black uppercase flex-shrink-0">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                      Active Building
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black leading-none mb-6 group-hover:text-yellow-500 transition-colors">
                    {repo.name}
                  </h3>

                  <p className="text-lg md:text-xl text-black/70 font-bold leading-tight flex-1 mb-8">
                    {repo.description}
                  </p>

                  <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-t-4 border-black/10 pt-6">
                    <div className="flex flex-wrap gap-2">
                      {repo.topics.map((t) => (
                        <span key={t} className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-wider">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-xs font-black text-black/40 uppercase">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-4 h-4 rounded-full border-2 border-black inline-block flex-shrink-0"
                          style={{ backgroundColor: repo.languageColor }}
                        />
                        {repo.language}
                      </div>
                      <div className="flex items-center gap-2">
                        <PersonIcon />
                        {repo.submittedBy}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Tier 2: Upcoming Projects Spotlight */}
        <section 
          ref={upcoming.ref}
          className="relative mt-32"
          style={{
            opacity: upcoming.visible ? 1 : 0,
            transform: upcoming.visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s cubic-bezier(.22,1,.36,1) 0.1s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.1s",
          }}
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter bg-[#0070f3] text-white px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Upcoming Project
            </h2>
            <div className="h-[4px] flex-1 bg-black/10" />
          </div>

          <div className="grid grid-cols-1 gap-8">
            {REPOS.filter(repo => repo.id === 3).map((repo) => (
              <div
                key={repo.id}
                className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-8 hover:-translate-y-1 transition-all border-dashed"
              >
                <div className="w-full md:w-48 h-48 bg-blue-50 border-4 border-black flex items-center justify-center relative overflow-hidden group">
                  <span className="material-symbols-outlined text-6xl text-blue-500">medical_services</span>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rotate-45" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-600 text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-widest">Next in Line</span>
                    <span className="text-xs font-black text-black/40 uppercase tracking-widest">Priority Submission</span>
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-black mb-4">
                    {repo.name}
                  </h3>
                  <p className="text-lg text-black/70 font-bold leading-tight mb-6">
                    {repo.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {repo.topics.map(t => (
                      <span key={t} className="border-2 border-black/10 px-3 py-1 text-[10px] font-black uppercase text-black/60">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-4 p-6 bg-blue-50 border-l-4 border-black">
                  <p className="text-[10px] font-black uppercase text-blue-800 text-center">Development <br />Starting Soon</p>
                  <button className="bg-black text-white px-6 py-2 text-xs font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,112,243,1)] opacity-50 cursor-not-allowed">
                    Pre-Alpha
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tier 3: Community Ideas Grid */}
        <section 
          ref={ideas.ref}
          className="relative mt-32 p-8 md:p-16"
          style={{
            opacity: ideas.visible ? 1 : 0,
            transform: ideas.visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s cubic-bezier(.22,1,.36,1) 0.1s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.1s",
          }}
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter bg-black text-white px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(109,254,156,1)]">
              Community Ideas
            </h2>
            <div className="h-[4px] flex-1 bg-black/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REPOS.filter(repo => repo.id !== 4 && repo.id !== 3).map((repo, i) => (
              <div
                key={repo.id}
                className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4 hover:-translate-y-1 transition-all border-dashed"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 opacity-40">
                    <FolderIcon />
                    <span className="text-[10px] font-black uppercase">Archive / kcc</span>
                  </div>
                  <span className="bg-black/10 text-black/40 px-2 py-0.5 text-[8px] font-black uppercase tracking-widest">
                    Idea Stage
                  </span>
                </div>

                <h3 className="text-xl font-black uppercase tracking-tight text-black leading-none">
                  {repo.name}
                </h3>

                <p className="text-xs text-black/60 font-bold leading-snug flex-1">
                  {repo.description}
                </p>

                <div className="border-t-2 border-black/10 pt-4 mt-2 flex items-center justify-between">
                  <div className="flex gap-1">
                    {repo.topics.slice(0, 2).map(t => (
                      <span key={t} className="bg-black/5 text-black/40 px-1.5 py-0.5 text-[8px] font-black uppercase whitespace-nowrap">{t}</span>
                    ))}
                  </div>
                  <span className="text-[8px] font-black text-black/40 uppercase tracking-tighter border-b border-black/10 pb-0.5">
                    Submitted by: {repo.submittedBy}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Submit idea CTA */}
        <section 
          ref={cta.ref}
          className="mt-24 bg-black p-8 md:p-12 relative overflow-hidden border-4 border-black"
          style={{
            opacity: cta.visible ? 1 : 0,
            transform: cta.visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s cubic-bezier(.22,1,.36,1) 0.1s, transform 0.8s cubic-bezier(.22,1,.36,1) 0.1s",
          }}
        >
          <div className="halftone-texture absolute inset-0 text-white/5 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-4">
                GOT AN IDEA? <br />
                <span className="text-[#6dfe9c] underline">SUBMIT IT.</span>
              </h2>
              <p className="text-white/60 font-bold uppercase text-sm tracking-widest">
                The best Kerala OSS projects start with a problem worth solving. We build it together.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://forms.gle/DFamPbrzcouDGWkX6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border-4 border-black gap-2 bg-[#6dfe9c] text-black px-8 py-4 font-black uppercase shadow-[4px_4px_0px_0px_rgba(109,254,156,0.4)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                Submit Idea
              </a>
            </div>
          </div>

          {/* News Ticker */}
          <div className="absolute -bottom-1 left-0 w-full bg-[#6dfe9c] border-t-4 border-black overflow-hidden py-1 whitespace-nowrap">
            <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest">
              <span>* KERALA CODERS CAFE *</span>
              <span>* 7 IDEAS SUBMITTED *</span>
              <span>* OPEN SOURCE *</span>
              <span>* FORK &amp; CONTRIBUTE *</span>
              <span>* KERALA CODERS CAFE *</span>
              <span>* 7 IDEAS SUBMITTED *</span>
              <span>* OPEN SOURCE *</span>
              <span>* FORK &amp; CONTRIBUTE *</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
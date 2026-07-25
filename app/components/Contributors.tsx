"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const accentClasses = [
  "bg-white",
  "bg-kcc-accent-yellow-soft/55",
  "bg-kcc-accent-green-soft/60",
  "bg-white",
  "bg-kcc-accent-green-soft/45",
  "bg-kcc-accent-yellow-soft/45",
];

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const REPOS_TO_FETCH = [
          "/api/github?endpoint=repos/KERALACODERSCAFE/Keralacoderscafe/contributors?per_page=50",
          "/api/github?endpoint=repos/KERALACODERSCAFE/Kerala-toddy-finder/contributors?per_page=50",
        ];

        const results = await Promise.allSettled(
          REPOS_TO_FETCH.map((url) =>
            fetch(url).then((r) => (r.ok ? r.json() : Promise.resolve([])))
          )
        );

        const merged = new Map<number, Contributor>();
        for (const result of results) {
          if (result.status !== "fulfilled") continue;
          const list: Contributor[] = Array.isArray(result.value)
            ? result.value
            : [];
          for (const c of list) {
            if (merged.has(c.id)) {
              merged.get(c.id)!.contributions += c.contributions;
            } else {
              merged.set(c.id, { ...c });
            }
          }
        }

        const sorted = Array.from(merged.values()).sort(
          (a, b) => b.contributions - a.contributions
        );
        setContributors(sorted);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContributors();
  }, []);

  return (
    <section id="contributors" className="scroll-mt-24 px-6 py-28 md:px-12 border-t-4 border-black bg-[#FAF9F5]">
      <style>{`
      .scrollbar-none::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-none {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      `}
      </style>
       <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[750px]">
            <span className="inline-block border-2 border-black bg-kcc-green px-3 py-1 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6">
              Contributors
            </span>
            <h2 className="mt-5 text-[clamp(2.8rem,6vw,5rem)] font-black leading-[0.92] tracking-[-0.05em] text-black uppercase">
              The people keeping the
              <span className="ml-3 bg-kcc-gold border-3 border-black px-3 py-1 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] inline-block rotate-1">
                repo alive.
              </span>
            </h2>
            <p className="mt-10 max-w-[620px] text-xl font-bold leading-relaxed text-black/80 border-l-8 border-black pl-8">
              This section stays connected to GitHub, so the faces here reflect
              the people actually contributing to Kerala Coders Cafe in public.
            </p>
          </div>

          <div className="flex flex-col items-start gap-2 self-start">
            <div className="inline-flex items-center gap-3 border-3 border-black bg-white px-5 py-2 text-xs font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="h-3 w-3 border-2 border-black bg-emerald-500" />
              LIVE FROM GITHUB
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="border-2 border-black bg-kcc-accent-yellow-soft/60 px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Keralacoderscafe
              </span>
              <span className="border-2 border-black bg-kcc-gold/60 px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                Kerala-toddy-finder
              </span>
            </div>
          </div>
        </div>

        <div className="relative mt-16">
          {/* Subtle fade effect on edges for horizontal scroll indicator */}
          <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#FAF9F5] via-[#FAF9F5]/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#FAF9F5] via-[#FAF9F5]/30 to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 overflow-x-auto pb-12 pt-4 px-2 sm:px-6 scrollbar-none snap-x snap-mandatory scroll-smooth">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-[240px] sm:w-[260px] h-[280px] sm:h-[310px] shrink-0 rounded-[20px] bg-neutral-200/60 animate-pulse relative flex flex-col justify-end snap-start overflow-hidden"
                  >
                    <div className="mx-3 mb-3 bg-white rounded-[14px] p-4 space-y-2">
                      <div className="h-4 bg-neutral-200 rounded w-2/3" />
                      <div className="h-3 bg-neutral-100 rounded w-1/2" />
                    </div>
                  </div>
                ))
              : contributors.slice(0, 15).map((contributor, index) => {
                  const role = index === 0 
                    ? "Lead Maintainer" 
                    : contributor.contributions >= 15 
                      ? "Core Contributor" 
                      : contributor.contributions >= 5 
                        ? "Top Contributor" 
                        : "Contributor";

                  return (
                    <Link
                      key={contributor.id}
                      href={contributor.html_url}
                      target="_blank"
                      rel="noopener"
                      className="group relative w-[240px] sm:w-[260px] h-[280px] sm:h-[310px] shrink-0 rounded-[20px] bg-[#EBEBEB] shadow-[0_8px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.16)] transition-all duration-500 hover:-translate-y-2 overflow-hidden snap-start flex flex-col justify-end cursor-pointer"
                    >
                      {/* Full-bleed avatar */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${contributor.avatar_url}&s=500`}
                        alt={contributor.login}
                        className="absolute inset-0 w-full h-full object-cover object-top grayscale brightness-[0.97] group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                      />

                      {/* Bottom label – white pill with tan/amber border on hover */}
                      <div className="relative z-10 mx-3 mb-3 bg-white rounded-[14px] px-4 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-transparent group-hover:border-[#C8A882] transition-colors duration-300">
                        <h3 className="font-semibold text-black text-[0.95rem] leading-snug truncate">
                          {contributor.login}
                        </h3>
                        <p className="text-gray-400 font-medium text-[0.78rem] mt-0.5 truncate">
                          {role}
                        </p>
                      </div>
                    </Link>
                  );
                })}
          </div>
        </div>

        {!loading && contributors.length === 0 ? (
          <div className="mt-12 border-4 border-dashed border-black bg-white p-12 text-center text-lg font-black uppercase">
            CONTRIBUTOR DATA UNAVAILABLE
          </div>
        ) : null}

        <div className="mt-14">
          <Link
            href="/contributors"
            className="inline-flex h-14 items-center gap-3 border-3 border-black bg-kcc-gold px-8 text-sm font-black uppercase text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            View all contributors
            <ArrowUpRight className="h-5 w-5 stroke-[3]" />
          </Link>
        </div>
      </div>
    </section>
  );
}

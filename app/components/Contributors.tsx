"use client";

import Image from "next/image";
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
    <section id="contributors" className="scroll-mt-24 px-6 py-28 md:px-12 border-t-4 border-black">
      <style>{`
      .group:hover .rank-badge {
        background-color: #a5ffd6 !important;
        background-image: none !important;
      }`}
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

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="h-16 w-16 animate-pulse border-2 border-black bg-black/10" />
                  <div className="mt-6 h-8 w-2/3 animate-pulse border-2 border-black bg-black/5" />
                  <div className="mt-3 h-5 w-1/2 animate-pulse border-2 border-black bg-black/5" />
                </div>
              ))
            : contributors.slice(0, 3).map((contributor, index) => (
                  <Link
                  key={contributor.id}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener"
                  className="group relative bg-white p-5 rounded-sm shadow-[10px_10px_20px_rgba(0,0,0,0.5)] border-2 border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_25px_rgba(0,0,0,0.6)] flex flex-col h-full overflow-hidden"
                >
                  {/* Rivets on outer concrete shell */}
                  <div className="rivet top-2 left-2"></div>
                  <div className="rivet top-2 right-2"></div>
                  <div className="rivet bottom-2 left-2"></div>
                  <div className="rivet bottom-2 right-2"></div>

                  <div className="flex items-start justify-between gap-3 mb-4">
                    {/* Metal Frame for Avatar */}
                    <div className="relative bg-metal shadow-metal p-1 rounded-sm border border-black/30">
                      <div className="rivet -top-1 -left-1 scale-[0.6]"></div>
                      <div className="rivet -top-1 -right-1 scale-[0.6]"></div>
                      <div className="rivet -bottom-1 -left-1 scale-[0.6]"></div>
                      <div className="rivet -bottom-1 -right-1 scale-[0.6]"></div>
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden shadow-[inset_0px_2px_5px_rgba(0,0,0,0.9)] bg-black/80">
                        <Image
                          src={contributor.avatar_url}
                          alt={contributor.login}
                          fill
                          className="object-cover opacity-90 mix-blend-luminosity group-hover:mix-blend-normal transition duration-300"
                          sizes="64px"
                        />
                      </div>
                    </div>

                    <div className="shrink-0 bg-metal border border-black/30 shadow-metal px-3 py-1 text-xs font-black uppercase tracking-widest text-stamped text-black/80 rounded-sm rank-badge">
                    #{String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="mt-2 min-w-0 flex-grow">
                    <h3 className="text-[1.2rem] sm:text-[1.4rem] font-black uppercase tracking-[-0.04em] text-black/80 text-stamped truncate">
                      {contributor.login}
                    </h3>
                  </div>

                  {/* Metal Bar for Stats */}
                  <div className="relative bg-metal shadow-metal w-full rounded-sm border border-black/30 flex flex-col gap-0 mt-4 overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 border-b border-black/20 bg-white/10">
                      <span className="text-[10px] font-black uppercase text-black/50 text-stamped tracking-widest">Commits</span>
                      <span className="text-sm font-black text-black/80 text-stamped">{contributor.contributions}</span>
                    </div>
                    <div className="flex items-center justify-between px-3 py-2 bg-black/5">
                      <span className="text-[10px] font-black uppercase text-black/50 text-stamped tracking-widest">Impact</span>
                      <span className="text-sm font-black text-[#931515] text-stamped">{contributor.contributions * 15}</span>
                    </div>
                  </div>
                </Link>
              ))}
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

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
        const res = await fetch(
          "https://api.github.com/repos/KERALACODERSCAFE/Keralacoderscafe/contributors?per_page=12"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch contributors");
        }

        const data = await res.json();
        setContributors(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchContributors();
  }, []);

  return (
    <section id="contributors" className="px-6 py-28 md:px-12 bg-white border-t-4 border-black">
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

          <div className="inline-flex items-center gap-3 self-start border-3 border-black bg-white px-5 py-2 text-xs font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <span className="h-3 w-3 border-2 border-black bg-emerald-500" />
            LIVE FROM GITHUB
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="h-16 w-16 animate-pulse border-2 border-black bg-black/10" />
                  <div className="mt-6 h-8 w-2/3 animate-pulse border-2 border-black bg-black/5" />
                  <div className="mt-3 h-5 w-1/2 animate-pulse border-2 border-black bg-black/5" />
                </div>
              ))
            : contributors.slice(0, 6).map((contributor, index) => (
                <Link
                  key={contributor.id}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener"
                  className={`group border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden ${
                    accentClasses[index % accentClasses.length]
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <Image
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-110"
                        sizes="64px"
                      />
                    </div>

                    <div className="shrink-0 border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      #{String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="mt-5 min-w-0">
                    <h3 className="text-[1.2rem] sm:text-[1.4rem] font-black uppercase tracking-[-0.04em] text-black truncate">
                      {contributor.login}
                    </h3>
                    <p className="mt-2 text-xs font-bold leading-relaxed text-black/70 uppercase">
                      {contributor.contributions} CONTRIBS
                    </p>
                  </div>

                  <div className="mt-5 inline-flex items-center gap-2 border-b-2 border-black text-xs font-black uppercase text-black">
                    GITHUB PROFILE
                    <ArrowUpRight className="h-4 w-4 stroke-[3]" />
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
            href="https://github.com/KERALACODERSCAFE/Keralacoderscafe/graphs/contributors"
            target="_blank"
            rel="noopener"
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

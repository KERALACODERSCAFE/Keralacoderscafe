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
    <section id="contributors" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[720px]">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-black/44">
              Contributors
            </p>
            <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-black">
              The people keeping the
              <span className="ml-3 font-[family-name:var(--font-editorial)] italic">
                repo alive.
              </span>
            </h2>
            <p className="mt-6 max-w-[620px] text-lg leading-8 text-black/68">
              This section stays connected to GitHub, so the faces here reflect
              the people actually contributing to Kerala Coders Cafe in public.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-black/58">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Live from GitHub
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-[2rem] border border-black/10 bg-white/60 p-5"
                >
                  <div className="h-16 w-16 animate-pulse rounded-full bg-black/8" />
                  <div className="mt-6 h-6 w-2/3 animate-pulse rounded-full bg-black/8" />
                  <div className="mt-3 h-4 w-1/2 animate-pulse rounded-full bg-black/8" />
                </div>
              ))
            : contributors.slice(0, 6).map((contributor, index) => (
                <Link
                  key={contributor.id}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener"
                  className={`group rounded-[2rem] border border-black/10 p-5 shadow-[0_16px_40px_rgba(17,17,17,0.04)] transition-transform duration-300 hover:-translate-y-1 ${
                    accentClasses[index % accentClasses.length]
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border border-black/10">
                      <Image
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="64px"
                      />
                    </div>

                    <div className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-black/42">
                      #{String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-[1.45rem] font-semibold tracking-[-0.04em] text-black">
                      {contributor.login}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-black/60">
                      {contributor.contributions} public contributions to the
                      website repository.
                    </p>
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-black/62 transition-colors group-hover:text-black">
                    View GitHub profile
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
        </div>

        {!loading && contributors.length === 0 ? (
          <div className="mt-8 rounded-[2rem] border border-dashed border-black/14 bg-white/60 p-8 text-center text-black/58">
            Contributor data is unavailable right now.
          </div>
        ) : null}

        <div className="mt-10">
          <Link
            href="https://github.com/KERALACODERSCAFE/Keralacoderscafe/graphs/contributors"
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-black/10 bg-white/72 px-5 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
          >
            View all contributors
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

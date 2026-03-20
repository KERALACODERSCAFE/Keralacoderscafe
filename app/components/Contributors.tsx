"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import SectionReveal from "./SectionReveal";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

const noteRotations = [
  "-rotate-[1.2deg]",
  "rotate-[1deg]",
  "-rotate-[0.8deg]",
  "rotate-[1.35deg]",
  "-rotate-[1deg]",
  "rotate-[0.75deg]",
];

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const topContributors = contributors.slice(0, 6);

  useEffect(() => {
    let ignore = false;

    async function fetchContributors() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/KERALACODERSCAFE/Keralacoderscafe/contributors?per_page=12"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch contributors");
        }

        const data = await response.json();

        if (!ignore && Array.isArray(data)) {
          setContributors(data);
        }
      } catch (error) {
        console.error("Error fetching contributors:", error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchContributors();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section
      id="contributors"
      className="border-t border-[color:var(--ui-border-soft)] px-6 py-28 md:px-12"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="md:hidden">
          <SectionReveal>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--ui-page-text-soft)]">
              Contributors
            </p>
            <h2 className="mt-4 max-w-[10ch] text-[clamp(2.5rem,12vw,4rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-[color:var(--ui-page-text)]">
              The people keeping the
              <span className="ml-3 inline-block font-[family-name:var(--font-editorial)] italic tracking-[-0.03em] text-[color:var(--ui-page-text)]">
                repo alive.
              </span>
            </h2>
          </SectionReveal>
        </div>

        <div className="hidden flex-col gap-8 lg:flex lg:flex-row lg:items-end lg:justify-between md:flex">
          <SectionReveal className="max-w-[760px]">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--ui-page-text-soft)]">
              Contributors
            </p>
            <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.9rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-[color:var(--ui-page-text)]">
              The people keeping the
              <span className="ml-4 inline-block font-[family-name:var(--font-editorial)] italic tracking-[-0.035em] text-[color:var(--ui-page-text)] [text-shadow:0_2px_12px_var(--ui-heading-shadow)]">
                repo alive.
              </span>
            </h2>
            <p className="mt-6 max-w-[620px] text-lg leading-8 text-[color:var(--ui-page-text-muted)]">
              This section stays connected to GitHub, so the faces here reflect
              the people actually contributing to Kerala Coders Cafe in public.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] px-4 py-2 text-sm text-[color:var(--ui-page-text-muted)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--ui-page-text)]" />
              Live from GitHub
            </div>
          </SectionReveal>
        </div>

        <div className="mt-8 grid gap-4 pl-1 pr-3 md:hidden">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="note-pinned relative overflow-hidden rounded-[1rem] border border-black/12 bg-[linear-gradient(180deg,#fafaf7_0%,#f2f1ea_100%)] px-4 pb-4 pt-5 text-black shadow-[0_20px_44px_rgba(0,0,0,0.18)]"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-[1rem] bg-[linear-gradient(transparent_0,transparent_30px,rgba(0,0,0,0.04)_30px,rgba(0,0,0,0.04)_31px)] bg-[length:100%_31px]" />
                  <div className="pointer-events-none absolute inset-y-0 left-4 w-px bg-rose-300/40" />

                  <div className="relative px-3">
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-16 shrink-0 skeleton overflow-hidden rounded-[0.9rem] border border-black/10" />
                      <div className="min-w-0 flex-1">
                        <div className="h-6 w-2/3 max-w-[12rem] skeleton rounded-full" />
                        <div className="mt-2 h-4 w-24 skeleton rounded-full" />
                      </div>
                    </div>
                    <div className="mt-5 border-t border-black/10 pt-4">
                      <div className="h-3.5 w-24 skeleton rounded-full" />
                      <div className="mt-3 h-8 w-16 skeleton rounded-[0.8rem]" />
                      <div className="mt-4 h-10 w-full skeleton rounded-full" />
                    </div>

                    <div className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-black/42">
                      #{String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="h-7 w-2/3 skeleton rounded-full" />
                    <div className="mt-3 h-4 w-3/4 skeleton rounded-full" />
                    <div className="mt-2 h-4 w-2/3 skeleton rounded-full" />
                  </div>

                  <div className="mt-6 flex items-end justify-between gap-4 border-t border-black/10 pt-4">
                    <div className="h-10 w-20 skeleton rounded-[0.8rem]" />
                    <div className="h-4 w-24 skeleton rounded-full" />
                  </div>
                </div>
              ))
            : topContributors.map((contributor, index) => (
                <SectionReveal
                  key={contributor.id}
                  delay={0.06 + index * 0.04}
                  y={18}
                >
                  <Link
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener"
                    className="cursor-pencil note-pinned group relative block overflow-hidden rounded-[1rem] border border-black/12 bg-[linear-gradient(180deg,#fafaf7_0%,#f2f1ea_100%)] px-4 pb-4 pt-5 text-black shadow-[0_20px_44px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-[1rem] bg-[linear-gradient(transparent_0,transparent_30px,rgba(0,0,0,0.04)_30px,rgba(0,0,0,0.04)_31px)] bg-[length:100%_31px]" />
                    <div className="pointer-events-none absolute inset-y-0 left-4 w-px bg-rose-300/40" />

                    <div className="relative px-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[0.9rem] border border-black/10 bg-black/5 shadow-[0_8px_18px_rgba(0,0,0,0.08)]">
                          <Image
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-[1.12rem] font-semibold tracking-[-0.04em] text-black">
                            {contributor.login}
                          </h3>
                          <p className="mt-1 text-[0.8rem] text-black/50">
                            Contributor #{String(index + 1).padStart(2, "0")}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 border-t border-black/10 pt-4">
                        <div className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-black/34">
                          contribution count
                        </div>
                        <div className="mt-3 flex flex-col items-start gap-4">
                          <div className="font-[family-name:var(--font-hand)] text-[1.7rem] leading-none text-black/78">
                            {contributor.contributions}
                          </div>
                          <div className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-2 text-sm font-medium text-black/60 transition-colors group-hover:text-black">
                            View profile
                            <ArrowUpRight className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
        </div>

        <div className="mt-14 hidden gap-5 sm:grid-cols-2 xl:grid-cols-3 md:grid">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className={`note-pinned relative overflow-hidden rounded-[1rem] border border-black/12 bg-[linear-gradient(180deg,#fafaf7_0%,#f2f1ea_100%)] px-6 pb-6 pt-10 text-black shadow-[0_26px_60px_rgba(0,0,0,0.24)] ${noteRotations[index % noteRotations.length]}`}
                >
                  <div className="note-nail" />
                  <div className="note-hole" />
                  <div className="pointer-events-none absolute inset-0 rounded-[1rem] bg-[linear-gradient(transparent_0,transparent_34px,rgba(0,0,0,0.045)_34px,rgba(0,0,0,0.045)_35px)] bg-[length:100%_35px]" />
                  <div className="pointer-events-none absolute inset-y-0 left-7 w-px bg-rose-300/45" />

                  <div className="relative pl-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-[0.8rem] border border-black/10 bg-black/5 shadow-[0_10px_20px_rgba(0,0,0,0.08)]">
                        <div className="h-full w-full skeleton rounded-[0.8rem]" />
                      </div>
                      <div className="mt-1 h-7 w-12 skeleton rounded-full" />
                    </div>

                    <div className="mt-6 h-7 w-2/3 skeleton rounded-full" />
                    <div className="mt-3 h-4 w-3/4 skeleton rounded-full" />
                    <div className="mt-2 h-4 w-2/3 skeleton rounded-full" />

                    <div className="mt-8 flex items-end justify-between gap-4 border-t border-black/10 pt-4">
                      <div className="h-10 w-20 skeleton rounded-[0.8rem]" />
                      <div className="h-4 w-24 skeleton rounded-full" />
                    </div>
                  </div>
                </div>
              ))
            : topContributors.map((contributor, index) => (
                <SectionReveal
                  key={contributor.id}
                  delay={0.08 + index * 0.05}
                  y={26}
                >
                  <Link
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener"
                    className={`cursor-pencil note-pinned group relative block overflow-hidden rounded-[1rem] border border-black/12 bg-[linear-gradient(180deg,#fafaf7_0%,#f2f1ea_100%)] px-6 pb-6 pt-10 text-black shadow-[0_26px_60px_rgba(0,0,0,0.24)] transition-all duration-300 hover:rotate-0 hover:shadow-[0_32px_72px_rgba(0,0,0,0.28)] ${noteRotations[index % noteRotations.length]}`}
                  >
                    <div className="note-nail" />
                    <div className="note-hole" />
                    <div className="pointer-events-none absolute inset-0 rounded-[1rem] bg-[linear-gradient(transparent_0,transparent_34px,rgba(0,0,0,0.045)_34px,rgba(0,0,0,0.045)_35px)] bg-[length:100%_35px]" />
                    <div className="pointer-events-none absolute inset-y-0 left-7 w-px bg-rose-300/45" />
                    <div className="pointer-events-none absolute right-4 top-6 h-12 w-12 rounded-full bg-black/[0.035] blur-xl transition-opacity duration-300 group-hover:opacity-70" />

                    <div className="relative pl-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-[0.8rem] border border-black/10 bg-black/5 shadow-[0_10px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 group-hover:rotate-[1.5deg]">
                          <Image
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-105"
                            sizes="80px"
                          />
                        </div>

                        <div className="text-right">
                          <div className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-black/34">
                            contributor
                          </div>
                          <div className="mt-2 inline-flex rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-[0.68rem] uppercase tracking-[0.24em] text-black/40">
                            #{String(index + 1).padStart(2, "0")}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-[1.55rem] font-semibold tracking-[-0.045em] text-black">
                          {contributor.login}
                        </h3>
                        <p className="mt-2 max-w-[30ch] text-sm leading-6 text-black/58">
                          {contributor.contributions} public contributions to
                          the website repository.
                        </p>
                      </div>

                      <div className="mt-8 flex items-end justify-between gap-4 border-t border-black/10 pt-4">
                        <div>
                          <div className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-black/34">
                            contribution count
                          </div>
                          <div className="mt-2 font-[family-name:var(--font-hand)] text-[1.85rem] leading-none text-black/72">
                            {contributor.contributions}
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-2 text-sm font-medium text-black/56 transition-colors group-hover:text-black">
                          View profile
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </SectionReveal>
              ))}
        </div>

        {!loading && contributors.length === 0 ? (
          <div className="note-pinned relative mt-8 overflow-hidden border border-black/12 bg-[linear-gradient(180deg,#fafaf7_0%,#f2f1ea_100%)] p-8 text-center text-black shadow-[0_24px_52px_rgba(0,0,0,0.22)]">
            <div className="note-nail" />
            <div className="note-hole" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_0,transparent_34px,rgba(0,0,0,0.045)_34px,rgba(0,0,0,0.045)_35px)] bg-[length:100%_35px]" />
            <div className="pointer-events-none absolute inset-y-0 left-7 w-px bg-rose-300/45" />
            <div className="relative pl-4 text-black/58">
              Contributor data is unavailable right now.
            </div>
          </div>
        ) : null}

        <SectionReveal delay={0.18} className="mt-10">
          <Link
            href="https://github.com/KERALACODERSCAFE/Keralacoderscafe/graphs/contributors"
            target="_blank"
            rel="noopener"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-button-secondary-bg)] px-5 text-sm font-semibold text-[color:var(--ui-button-secondary-text)] transition-transform duration-300 hover:-translate-y-1 hover:bg-[color:var(--ui-button-secondary-hover)]"
          >
            View all contributors
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus, Pin } from "lucide-react";
import { useEffect, useState } from "react";
import SectionReveal from "./SectionReveal";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface FeaturedConfig {
  username: string;
  role?: string;
  position: number;
}

interface ContributorsConfig {
  featured: FeaturedConfig[];
}

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [config, setConfig] = useState<ContributorsConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        // Fetch both GitHub contributors and config in parallel
        const [contributorsRes, configRes] = await Promise.all([
          fetch(
            "https://api.github.com/repos/KERALACODERSCAFE/Keralacoderscafe/contributors?per_page=20"
          ),
          fetch("/contributors-config.json"),
        ]);

        if (!contributorsRes.ok) {
          throw new Error("Failed to fetch contributors");
        }

        const contributorsData = await contributorsRes.json();
        const configData = configRes.ok ? await configRes.json() : { featured: [] };

        if (!ignore && Array.isArray(contributorsData)) {
          setConfig(configData);

          // Sort based on config
          const sortedData = contributorsData.sort(
            (a: Contributor, b: Contributor) => {
              const aFeatured = configData.featured.find(
                (f: FeaturedConfig) =>
                  f.username.toLowerCase() === a.login.toLowerCase()
              );
              const bFeatured = configData.featured.find(
                (f: FeaturedConfig) =>
                  f.username.toLowerCase() === b.login.toLowerCase()
              );

              // If both are featured, sort by position
              if (aFeatured && bFeatured) {
                return aFeatured.position - bFeatured.position;
              }

              // Featured contributors come first
              if (aFeatured && !bFeatured) return -1;
              if (!aFeatured && bFeatured) return 1;

              // Keep original GitHub order for non-featured
              return 0;
            }
          );

          setContributors(sortedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  // Helper to get featured info
  const getFeatured = (username: string) => {
    return config?.featured.find(
      (f) => f.username.toLowerCase() === username.toLowerCase()
    );
  };

  return (
    <section
      id="contributors"
      className="border-t border-[color:var(--ui-border-soft)] px-6 py-28 md:px-12"
    >
      <div className="mx-auto max-w-[1320px]">
        {/* Header section */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
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

        {/* Compact Contributors Grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {loading
            ? Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center gap-3 rounded-2xl border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] p-4 transition-all"
              >
                <div className="absolute right-3 top-3 text-[0.65rem] font-medium text-[color:var(--ui-page-text-soft)]">
                  #{String(index + 1).padStart(2, "0")}
                </div>

                <div className="h-16 w-16 skeleton overflow-hidden rounded-full border-2 border-[color:var(--ui-border-soft)]" />

                <div className="w-full text-center">
                  <div className="mx-auto h-4 w-20 skeleton rounded-full" />
                  <div className="mx-auto mt-2 h-3 w-12 skeleton rounded-full" />
                </div>
              </div>
            ))
            : contributors.map((contributor, index) => {
              const featured = getFeatured(contributor.login);

              return (
                <SectionReveal
                  key={contributor.id}
                  delay={0.02 + index * 0.02}
                  y={12}
                  className="h-full"
                >
                  <Link
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener"
                    className={`group relative flex h-full flex-col items-center gap-3 rounded-2xl border p-4 transition-all hover:shadow-lg hover:-translate-y-1 ${featured
                      ? "border-[color:var(--ui-accent)]/40 bg-gradient-to-br from-[color:var(--ui-surface)] to-[color:var(--ui-surface-secondary)] ring-1 ring-[color:var(--ui-accent)]/20"
                      : "border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] hover:border-[color:var(--ui-border)]"
                      }`}
                  >
                    {/* Pin icon for featured */}
                    {featured && (
                      <div className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--ui-accent)]/10">
                        <Pin className="h-3.5 w-3.5 rotate-45 text-[color:var(--ui-accent)]" />
                      </div>
                    )}

                    {/* Rank badge */}
                    <div className="absolute right-3 top-3 rounded-full bg-[color:var(--ui-surface-secondary)] px-2 py-0.5 text-[0.65rem] font-medium text-[color:var(--ui-page-text-soft)]">
                      #{String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Avatar */}
                    <div
                      className={`relative h-16 w-16 overflow-hidden rounded-full border-2 transition-transform group-hover:scale-105 ${featured
                        ? "border-[color:var(--ui-accent)]/40"
                        : "border-[color:var(--ui-border-soft)]"
                        }`}
                    >
                      <Image
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Info */}
                    <div className="w-full text-center">
                      <h3 className="truncate text-sm font-semibold text-[color:var(--ui-page-text)]">
                        {contributor.login}
                      </h3>

                      {/* Show role if featured */}
                      {featured?.role ? (
                        <div className="mt-1.5 flex flex-col gap-1">
                          <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-[color:var(--ui-accent)]">
                            {featured.role}
                          </p>
                          <p className="text-xs text-[color:var(--ui-page-text-soft)]">
                            {contributor.contributions} commits
                          </p>
                        </div>
                      ) : (
                        <p className="mt-1 text-xs text-[color:var(--ui-page-text-soft)]">
                          {contributor.contributions} commits
                        </p>
                      )}
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-[color:var(--ui-accent)] opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </SectionReveal>
              );
            })}

          {/* "You Next" Call to Action Card */}
          {!loading && (
            <SectionReveal
              key="you-next"
              delay={0.02 + contributors.length * 0.02}
              y={12}
              className="h-full"
            >
              <Link
                href="https://github.com/KERALACODERSCAFE/Keralacoderscafe"
                target="_blank"
                rel="noopener"
                className="group relative flex h-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] p-4 transition-all hover:border-[color:var(--ui-border)] hover:bg-[color:var(--ui-surface-hover)] hover:shadow-lg hover:-translate-y-1"
              >
                <div className="absolute right-3 top-3 rounded-full bg-[color:var(--ui-surface-secondary)] px-2 py-0.5 text-[0.65rem] font-medium text-[color:var(--ui-page-text-soft)]">
                  YOU
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface-hover)] transition-transform group-hover:scale-105 group-hover:border-[color:var(--ui-border)]">
                  <Plus className="h-8 w-8 text-[color:var(--ui-page-text-soft)] group-hover:text-[color:var(--ui-page-text)]" />
                </div>

                <div className="w-full text-center">
                  <h3 className="text-sm font-semibold text-[color:var(--ui-page-text)]">
                    You Next
                  </h3>
                  <p className="mt-1 text-xs text-[color:var(--ui-page-text-soft)]">
                    Contribute now
                  </p>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-[color:var(--ui-accent)] opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            </SectionReveal>
          )}
        </div>

        {!loading && contributors.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-[color:var(--ui-border-soft)] bg-[color:var(--ui-surface)] p-8 text-center">
            <p className="text-[color:var(--ui-page-text-muted)]">
              Contributor data is unavailable right now.
            </p>
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
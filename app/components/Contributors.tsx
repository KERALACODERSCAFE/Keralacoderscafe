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
        const [contributorsRes, configRes] = await Promise.all([
          fetch(
            "https://api.github.com/repos/KERALACODERSCAFE/Keralacoderscafe/contributors?per_page=20"
          ),
          fetch("/contributors-config.json"),
        ]);

        const contributorsData = await contributorsRes.json();
        const configData = configRes.ok ? await configRes.json() : { featured: [] };

        if (!ignore && Array.isArray(contributorsData)) {
          setConfig(configData);

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

              if (aFeatured && bFeatured) {
                return aFeatured.position - bFeatured.position;
              }

              if (aFeatured && !bFeatured) return -1;
              if (!aFeatured && bFeatured) return 1;

              return b.contributions - a.contributions;
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

  const getFeatured = (username: string) => {
    return config?.featured.find(
      (f) => f.username.toLowerCase() === username.toLowerCase()
    );
  };

  return (
    <section
      id="contributors"
      className="border border-[color:var(--ui-border-soft)]/10 px-6 py-24 md:px-12"
    >
      <div className="mx-auto max-w-[1320px]">

        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[760px]">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--ui-page-text-soft)]">
              Contributors
            </p>
            <h2 className="mt-4 text-4xl font-semibold text-[color:var(--ui-page-text)]">
              The people keeping the repo alive.
            </h2>
            <p className="mt-4 text-[color:var(--ui-page-text-muted)]">
              This section stays connected to GitHub, so the faces here reflect
              the people actually contributing in public.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ui-border-soft)]/30 bg-[color:var(--ui-surface)]/60 backdrop-blur-xl px-4 py-2 text-sm text-[color:var(--ui-page-text-muted)]">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Live from GitHub
          </div>
        </div>

        {/* Contributors Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {contributors.map((contributor, index) => {
            const featured = getFeatured(contributor.login);

            return (
              <Link
                key={contributor.id}
                href={contributor.html_url}
                target="_blank"
                className={`group relative flex flex-col items-center gap-3 rounded-2xl p-4 transition-all 
                bg-white/[0.02] backdrop-blur-md ring-1
                hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                ${featured
                    ? "ring-[color:var(--ui-accent)]/10 bg-gradient-to-br from-grey-500/[0.01] to-transparent"
                    : "ring-white/[0.05] hover:ring-white/[0.12]"
                  }`}
              >
                {/* Rank */}
                <div className="absolute right-3 top-3 text-xs text-[color:var(--ui-page-text-soft)]">
                  #{String(index + 1).padStart(2, "0")}
                </div>

                {/* Featured Pin */}
                {featured && (
                  <div className="absolute left-3 top-3">
                    <Pin className="h-4 w-4 text-[color:var(--ui-accent)]" />
                  </div>
                )}

                {/* Avatar */}
                <div
                  className={`relative h-16 w-16 overflow-hidden rounded-full border 
                  ${featured
                      ? "border-[color:var(--ui-accent)]/30"
                      : "border-white/[0.08]"
                    }`}
                >
                  <Image
                    src={contributor.avatar_url}
                    alt={contributor.login}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="truncate text-sm font-semibold">
                    {contributor.login}
                  </h3>

                  {featured?.role ? (
                    <>
                      <p className="text-[10px] uppercase tracking-wider text-[color:var(--ui-accent)]">
                        {featured.role}
                      </p>
                      <p className="text-xs text-[color:var(--ui-page-text-soft)]">
                        {contributor.contributions} commits
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-[color:var(--ui-page-text-soft)]">
                      {contributor.contributions} commits
                    </p>
                  )}
                </div>

                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 rounded-2xl bg-[color:var(--ui-accent)]/0 transition-colors group-hover:bg-[color:var(--ui-accent)]/[0.02]" />
              </Link>
            );
          })}

          {/* YOU NEXT CARD */}
          <Link
            href="https://github.com/KERALACODERSCAFE/Keralacoderscafe"
            target="_blank"
            className="group relative flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/[0.15] bg-white/[0.03] backdrop-blur-md p-4 transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:border-white/[0.3] hover:bg-white/[0.06]"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-white/[0.15] transition-colors group-hover:border-white/[0.3]">
              <Plus className="h-8 w-8 text-white/[0.4] transition-colors group-hover:text-white/[0.6]" />
            </div>

            <div className="text-center">
              <h3 className="text-sm font-semibold text-white/90 transition-colors group-hover:text-white">You Next</h3>
              <p className="text-[10px] uppercase tracking-wider text-white/[0.4] transition-colors group-hover:text-white/[0.6]">
                Contribute & get featured
              </p>
            </div>
          </Link>
        </div>

        {/* View All Button */}
        <div className="mt-10">
          <Link
            href="https://github.com/KERALACODERSCAFE/Keralacoderscafe/graphs/contributors"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ui-border-soft)]/30 px-5 py-3 text-sm hover:bg-[color:var(--ui-surface)]/60"
          >
            View all contributors
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
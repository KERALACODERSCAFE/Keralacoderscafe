"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Pin,
  Plus,
  Sparkles,
} from "lucide-react";
import {
  CONTRIBUTORS_DIRECTORY_PATH,
  TOP_CONTRIBUTORS_LIMIT,
  getFeaturedContributor,
} from "../lib/contributors";
import { useContributorsData } from "../lib/use-contributors-data";
import { GITHUB_REPO_URL } from "../lib/site-links";

const numberFormatter = new Intl.NumberFormat("en-IN");
const CONTRIBUTOR_HOVER_GIFS = ["/Gif/catwithplate.gif", "/Gif/dance.gif"];
const YOU_NEXT_HOVER_GIF = "/Gif/welcome.gif";

function getUsernameClasses(username: string) {
  if (username.length > 20) {
    return "text-[0.86rem] leading-[1.05] break-words";
  }

  if (username.length > 16) {
    return "text-[0.96rem] leading-[1.05] break-words";
  }

  return "text-[1.08rem] leading-[1.02]";
}

function getContributorHoverGif(index: number) {
  return CONTRIBUTOR_HOVER_GIFS[index % CONTRIBUTOR_HOVER_GIFS.length];
}

function ContributorHoverBack({
  accentTone,
  index,
}: {
  accentTone: string;
  index: number;
}) {
  return (
    <div className="contributors-flip-face contributors-flip-back overflow-hidden rounded-[0.95rem] border-2 border-[color:var(--color-kcc-ink)] bg-[color:var(--color-kcc-paper)] shadow-[var(--contributors-card-shadow)] group-hover:shadow-[var(--contributors-card-shadow-hover)]">
      <div className={`absolute inset-x-0 top-0 h-2 ${accentTone}`} />

      <Image
        src={getContributorHoverGif(index)}
        alt=""
        aria-hidden="true"
        fill
        unoptimized
        sizes="(min-width: 1536px) 220px, (min-width: 1280px) 240px, (min-width: 768px) 220px, 100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,16,16,0.02)_0%,rgba(16,16,16,0.14)_45%,rgba(16,16,16,0.5)_100%)]" />

      <div className="relative flex h-full items-start justify-start p-4">
        <div className="inline-flex items-center rounded-[0.55rem] border-2 border-[color:var(--color-kcc-ink)] bg-[#ffd84d] px-3 py-1 text-[0.68rem] font-black tracking-[0.18em] text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-accent-shadow)]">
          LOL
        </div>
      </div>
    </div>
  );
}

function YouNextHoverBack() {
  return (
    <div className="contributors-flip-face contributors-flip-back overflow-hidden rounded-[0.95rem] border-2 border-dashed border-[color:var(--color-kcc-ink)] bg-[color:var(--color-kcc-paper)] shadow-[var(--contributors-card-shadow)] group-hover:shadow-[var(--contributors-card-shadow-hover)]">
      <div className="absolute inset-x-0 top-0 h-2 bg-[#e9e3d8]" />

      <Image
        src={YOU_NEXT_HOVER_GIF}
        alt=""
        aria-hidden="true"
        fill
        unoptimized
        sizes="(min-width: 1536px) 220px, (min-width: 1280px) 240px, (min-width: 768px) 220px, 100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,16,16,0.02)_0%,rgba(16,16,16,0.14)_45%,rgba(16,16,16,0.5)_100%)]" />

      <div className="relative flex h-full items-start justify-start p-4">
        <div className="inline-flex items-center rounded-[0.55rem] border-2 border-[color:var(--color-kcc-ink)] bg-[#ffd84d] px-3 py-1 text-[0.68rem] font-black tracking-[0.18em] text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-accent-shadow)]">
          LOL
        </div>
      </div>
    </div>
  );
}

function ContributorsSkeleton() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-4 min-[460px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {Array.from({ length: TOP_CONTRIBUTORS_LIMIT + 1 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[0.95rem] border-2 border-[color:var(--color-kcc-ink)] bg-[color:var(--color-kcc-paper)] p-4 text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-card-shadow)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="skeleton h-7 w-14 rounded-[0.55rem]" />
            <div className="skeleton h-8 w-14 rounded-[0.55rem]" />
          </div>
          <div className="mx-auto mt-4 skeleton h-16 w-16 rounded-[0.85rem]" />
          <div className="mt-4 space-y-2 text-center">
            <div className="mx-auto skeleton h-5 w-24 rounded-[0.45rem]" />
            <div className="mx-auto skeleton h-4 w-28 rounded-[0.45rem]" />
            <div className="mx-auto skeleton h-4 w-20 rounded-[0.45rem]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Contributors() {
  const { contributors, config, loading, error } = useContributorsData();
  const topContributors = contributors.slice(0, TOP_CONTRIBUTORS_LIMIT);

  return (
    <section id="contributors" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1320px]">
        <div className="relative overflow-hidden rounded-[1rem] border-2 border-[color:var(--color-kcc-ink)] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_34%),var(--color-kcc-surface-elevated)] p-6 shadow-[var(--contributors-panel-shadow)] md:p-10">
          <div className="noise-overlay opacity-30" />

          <div className="relative">
            <div className="flex flex-col gap-6">
              <div className="max-w-[920px]">
                <div className="flex flex-wrap items-start gap-3">
                  <div className="inline-flex items-center gap-2 rounded-[0.7rem] border-2 border-[color:var(--color-kcc-ink)] bg-[#ffd84d] px-4 py-2 text-[0.72rem] font-black uppercase tracking-[0.22em] text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-accent-shadow)]">
                    <Sparkles className="h-4 w-4" />
                    Top 10 Contributors
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-[0.7rem] border-2 border-[color:var(--color-kcc-ink)] bg-[color:var(--color-kcc-paper)] px-4 py-2 text-sm font-semibold text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-accent-shadow)]">
                    <span className="h-2.5 w-2.5 rounded-[0.2rem] bg-green-400" />
                    Live from GitHub
                  </div>
                </div>

                <h2 className="mt-6 font-semibold leading-[0.94] tracking-[-0.065em] text-[color:var(--ui-page-text)]">
                  <span className="block text-[2.6rem] md:whitespace-nowrap md:text-[2.8rem] lg:text-[3rem] xl:text-[3.15rem]">
                    The devs keeping Kerala Coders Cafe
                  </span>
                  <span className="block text-[2.6rem] md:text-[2.8rem] lg:text-[3rem] xl:text-[3.15rem]">
                    alive in public.
                  </span>
                </h2>

                <p className="mt-4 max-w-[680px] text-base leading-8 text-[color:var(--ui-page-text-muted)]">
                  The homepage stays focused and only shows the top 10 people.
                  The full contributor wall lives on its own page with the whole
                  crew.
                </p>
              </div>
            </div>

            {error ? (
              <div className="mt-12 rounded-[0.95rem] border-2 border-[color:var(--color-kcc-ink)] bg-[color:var(--color-kcc-paper)] p-6 text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-card-shadow)]">
                <h3 className="text-xl font-black tracking-[-0.04em]">
                  Contributors wall is taking a short break.
                </h3>
                <p className="mt-3 max-w-[620px] text-sm leading-7 text-black/70">
                  {error}
                </p>
                <Link
                  href={`${GITHUB_REPO_URL}/graphs/contributors`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-[0.75rem] border-2 border-[color:var(--color-kcc-ink)] bg-[#ffd84d] px-5 py-3 text-sm font-bold text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-accent-shadow)] transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
                >
                  Open GitHub contributors
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ) : loading ? (
              <ContributorsSkeleton />
            ) : (
              <div className="mt-12 grid grid-cols-1 gap-4 min-[460px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {topContributors.map((contributor, index) => {
                  const featuredContributor = getFeaturedContributor(
                    config,
                    contributor.login,
                  );

                  const accentTone =
                    index === 0
                      ? "bg-[#ffd84d]"
                      : index === 1
                        ? "bg-[#9be7ff]"
                        : index === 2
                          ? "bg-[#ffb7d8]"
                          : "bg-[#e9e3d8]";

                  return (
                    <Link
                      key={contributor.id}
                      href={contributor.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="contributors-flip-scene group relative block h-[15.6rem] transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1"
                    >
                      <div className="contributors-flip-inner h-[15.6rem]">
                        <div className="contributors-flip-face contributors-flip-front flex h-full flex-col overflow-hidden rounded-[0.95rem] border-2 border-[color:var(--color-kcc-ink)] bg-[color:var(--color-kcc-paper)] px-4 pb-4 pt-5 text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-card-shadow)] group-hover:shadow-[var(--contributors-card-shadow-hover)]">
                          <div className={`absolute inset-x-0 top-0 h-2 ${accentTone}`} />

                          <div className="flex items-start justify-between gap-3 pt-1">
                            <div className="inline-flex h-7 w-7 items-center justify-center rounded-[0.45rem] border-2 border-[color:var(--color-kcc-ink)] bg-white/80">
                              <Pin className="h-3.5 w-3.5" />
                            </div>

                            <div className={`inline-flex h-8 min-w-14 items-center justify-center rounded-[0.55rem] border-2 border-[color:var(--color-kcc-ink)] px-3 text-[0.68rem] font-black tracking-[0.18em] ${accentTone}`}>
                              #{String(index + 1).padStart(2, "0")}
                            </div>
                          </div>

                          <div className={`mx-auto mt-4 flex h-[4.6rem] w-[4.6rem] items-center justify-center rounded-[0.9rem] border-2 border-[color:var(--color-kcc-ink)] ${accentTone}`}>
                            <div className="relative h-[4.15rem] w-[4.15rem] overflow-hidden rounded-[0.7rem] border-2 border-[color:var(--color-kcc-ink)] bg-white/80">
                              <Image
                                src={contributor.avatar_url}
                                alt={contributor.login}
                                fill
                                sizes="66px"
                                className="object-cover"
                              />
                            </div>
                          </div>

                          <div className="mt-4 flex min-h-[5.2rem] flex-col items-center justify-start text-center">
                            <h3
                              className={`max-w-full font-black tracking-[-0.05em] text-[color:var(--color-kcc-ink)] ${getUsernameClasses(contributor.login)}`}
                            >
                              {contributor.login}
                            </h3>

                            <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-black/78">
                              {featuredContributor?.role ?? "Community Contributor"}
                            </p>

                            <p className="mt-1 text-sm font-medium text-black/72">
                              {numberFormatter.format(contributor.contributions)} commits
                            </p>
                          </div>
                        </div>
                        <ContributorHoverBack
                          accentTone={accentTone}
                          index={index}
                        />
                      </div>
                    </Link>
                  );
                })}

                <Link
                  href={GITHUB_REPO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="contributors-flip-scene group relative block h-[15.6rem] transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1"
                >
                  <div className="contributors-flip-inner h-[15.6rem]">
                    <div className="contributors-flip-face contributors-flip-front flex h-full flex-col overflow-hidden rounded-[0.95rem] border-2 border-dashed border-[color:var(--color-kcc-ink)] bg-[color:var(--color-kcc-paper)] px-4 pb-4 pt-5 text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-card-shadow)] group-hover:shadow-[var(--contributors-card-shadow-hover)]">
                      <div className="absolute inset-x-0 top-0 h-2 bg-[#e9e3d8]" />

                      <div className="flex items-start justify-between gap-3 pt-1">
                        <div className="inline-flex h-7 w-7 items-center justify-center rounded-[0.45rem] border-2 border-[color:var(--color-kcc-ink)] bg-white/80">
                          <Pin className="h-3.5 w-3.5" />
                        </div>

                        <div className="inline-flex h-8 min-w-14 items-center justify-center rounded-[0.55rem] border-2 border-[color:var(--color-kcc-ink)] bg-white/80 px-3 text-[0.68rem] font-black tracking-[0.18em]">
                          NEXT
                        </div>
                      </div>

                      <div className="mx-auto mt-4 flex h-[4.6rem] w-[4.6rem] items-center justify-center rounded-[0.9rem] border-2 border-dashed border-[color:var(--color-kcc-ink)] bg-white/75">
                        <Plus className="h-7 w-7 text-black/60 transition-transform duration-200 group-hover:scale-105" />
                      </div>

                      <div className="mt-4 flex flex-1 flex-col items-center justify-start text-center">
                        <h3 className="max-w-full text-[1.08rem] font-black tracking-[-0.05em] text-[color:var(--color-kcc-ink)]">
                          You Next
                        </h3>

                        <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-black/78">
                          Open Source Builder
                        </p>

                        <p className="mt-1 text-sm font-medium text-black/72">
                          Contribute & get featured
                        </p>
                      </div>
                    </div>
                    <YouNextHoverBack />
                  </div>
                </Link>
              </div>
            )}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={CONTRIBUTORS_DIRECTORY_PATH}
                className="inline-flex items-center justify-center gap-2 rounded-[0.75rem] border-2 border-[color:var(--color-kcc-ink)] bg-[#ffd84d] px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-accent-shadow)] transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                {contributors.length > 0
                  ? `View all ${numberFormatter.format(contributors.length)} contributors`
                  : "View all contributors"}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[0.75rem] border-2 border-[color:var(--color-kcc-ink)] bg-[color:var(--color-kcc-paper)] px-6 py-3 text-sm font-semibold text-[color:var(--color-kcc-ink)] shadow-[var(--contributors-accent-shadow)] transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5"
              >
                Contribute on GitHub
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

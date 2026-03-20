"use client";

import Link from "next/link";
import { type MouseEvent, useRef } from "react";
import { ArrowUpRight, Github, MessageCircle } from "lucide-react";

const highlights = [
  "From 1-day beginners to 10+ years experienced developers",
  "Open source, meetups, peer learning, and real collaboration",
];

const noteLines = [
  "learn out loud",
  "build with others",
  "share what you know",
];

export default function Hero() {
  const noteRef = useRef<HTMLDivElement | null>(null);

  function handleNoteMove(event: MouseEvent<HTMLDivElement>) {
    const element = noteRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.transform =
      `perspective(1200px) rotateX(${(-offsetY * 9).toFixed(2)}deg) ` +
      `rotateY(${(offsetX * 11).toFixed(2)}deg) translateY(-6px)`;
  }

  function resetNote() {
    const element = noteRef.current;
    if (!element) return;

    element.style.transform =
      "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  }

  return (
    <header className="relative overflow-hidden px-6 pb-20 pt-32 md:px-12 lg:pb-28 lg:pt-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(241,223,138,0.42),transparent_28%),radial-gradient(circle_at_78%_12%,rgba(223,234,204,0.8),transparent_20%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.7),transparent_24%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[620px] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(246,241,231,0))]" />
      <div className="absolute left-[7%] top-[22%] -z-10 h-24 w-24 rounded-full border border-black/8 bg-white/30 blur-sm" />
      <div className="absolute bottom-[18%] right-[10%] -z-10 h-28 w-28 rounded-full bg-kcc-accent-green-soft/80 blur-2xl" />

      <div className="mx-auto max-w-[1280px]">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
          <div className="max-w-[700px]">
            

            <div className="mt-7 animate-fade-in-up delay-100">
              <p className="font-[family-name:var(--font-hand)] text-2xl text-black/60 sm:text-[2rem]">
                built in Kerala, powered by curious people
              </p>

              <h1 className="mt-2 max-w-[780px] text-[clamp(3.4rem,9vw,7rem)] font-semibold leading-[0.92] tracking-[-0.07em] text-black">
                Kerala Coders
                <span className="ml-2 font-[family-name:var(--font-editorial)] italic sm:ml-4">
                  Cafe
                </span>
              </h1>

              <p className="mt-6 max-w-[640px] text-[1.05rem] leading-8 text-black/68 sm:text-[1.12rem]">
                A vibrant community of developers, designers, and tech
                enthusiasts from Kerala. Building the future, one commit at a
                time.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 animate-fade-in-up delay-200">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-black/10 bg-white/66 px-4 py-2 text-sm text-black/64 shadow-[0_8px_24px_rgba(17,17,17,0.04)]"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 animate-fade-in-up delay-300 sm:flex-row">
              <Link
                href="https://github.com/KERALACODERSCAFE/Keralacoderscafe"
                target="_blank"
                rel="noopener"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-semibold text-kcc-paper transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </Link>

              <Link
                href="https://chat.whatsapp.com/Kd3tVwJfjjh0HRZtoYfxcm"
                target="_blank"
                rel="noopener"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-black/10 bg-white/72 px-6 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" />
                Join WhatsApp
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-black/52 animate-fade-in-up delay-400">
              <div className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-black" />
                700+ active developers already inside the community
              </div>
              <div className="inline-flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4" />
                Open to learners, contributors, and working engineers
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[500px] animate-fade-in delay-200">
            <div className="absolute left-10 top-6 h-24 w-24 rounded-full bg-kcc-accent-yellow-soft/80 blur-2xl" />
            <div className="absolute bottom-10 right-10 h-28 w-28 rounded-full bg-kcc-accent-green-soft blur-2xl" />

            <div className="relative pt-8">
              <div className="absolute left-1/2 top-2 z-20 h-8 w-28 -translate-x-1/2 rotate-[-4deg] rounded-[0.6rem] border border-black/6 bg-white/75 shadow-[0_8px_24px_rgba(17,17,17,0.08)] backdrop-blur-sm" />

              <div className="animate-float-gentle">
                <div
                  ref={noteRef}
                  onMouseMove={handleNoteMove}
                  onMouseLeave={resetNote}
                  className="relative rounded-[2rem] border border-black/10 bg-[linear-gradient(180deg,#fffdf7_0%,#fff7dd_100%)] p-7 shadow-[0_28px_90px_rgba(17,17,17,0.12)] transition-transform duration-300 ease-out will-change-transform sm:p-8"
                  style={{
                    transform:
                      "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)",
                  }}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(transparent_0,transparent_35px,rgba(17,17,17,0.05)_35px,rgba(17,17,17,0.05)_36px)] bg-[length:100%_36px]" />

                  <div className="relative">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-black/38">
                      a note from kcc
                    </p>

                    <div className="mt-5 font-[family-name:var(--font-hand)] text-[2.25rem] leading-[1.05] text-black/80 sm:text-[2.7rem]">
                      <div>Hey builder,</div>
                      <div className="mt-3">come hang out</div>
                      <div>with people who</div>
                      <div>actually share.</div>
                    </div>

                    <div className="mt-8 space-y-3 font-[family-name:var(--font-hand)] text-[1.45rem] text-black/70 sm:text-[1.6rem]">
                      {noteLines.map((line) => (
                        <div key={line} className="flex items-center gap-3">
                          <span className="text-xl text-black/55">-</span>
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex items-center justify-between gap-4 border-t border-black/10 pt-5">
                      <div className="font-[family-name:var(--font-hand)] text-[1.55rem] text-black/64">
                        see you in the next commit
                      </div>
                      <div className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm text-black/58">
                        700+ devs · 30+ contributors
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="animate-float-slow absolute -bottom-4 right-4 rounded-[1.4rem] border border-black/10 bg-white px-4 py-3 shadow-[0_14px_40px_rgba(17,17,17,0.08)]">
                <div className="font-[family-name:var(--font-hand)] text-[1.4rem] leading-none text-black/68">
                  built with
                </div>
                <div className="mt-2 text-sm font-medium text-black/56">
                  care, code, and community
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

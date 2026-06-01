"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Code, Mail, Linkedin, User } from "lucide-react";
import { GridPattern } from "./GridPattern";
import { cn } from "@/lib/utils";

export default function Teams() {
  return (
    <section
      id="teams"
      className="scroll-mt-24 px-6 py-28 md:px-12 bg-[#F9F6F0] border-t-4 border-black relative overflow-hidden"
    >
      {/* Brutalist Background Grid Pattern & Shapes */}
      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
          "opacity-70 stroke-black/35 fill-transparent"
        )}
      />
      <div className="absolute top-12 right-12 h-24 w-24 border-4 border-black bg-kcc-green -z-10 rotate-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hidden lg:block" />
      <div className="absolute bottom-16 left-8 h-20 w-20 border-4 border-black bg-kcc-gold -z-10 -rotate-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hidden lg:block" />

      <div className="mx-auto max-w-[1280px] flex flex-col gap-20">
        
        {/* Teams Section (Existing Founder section) */}
        <div className="grid gap-16 lg:grid-cols-[minmax(320px,0.85fr)_minmax(0,1.15fr)] lg:items-center">
          {/* Left Column: Image Card */}
          <div className="relative max-w-[420px] mx-auto lg:mx-0 w-full">
            <div className="absolute inset-0 border-4 border-black bg-kcc-gold rotate-[3deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />
            <div className="relative border-4 border-black bg-white p-4 transition-all duration-300 hover:rotate-0 rotate-[-1deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group">
              <div className="relative aspect-square overflow-hidden border-3 border-black bg-neutral-100">
                <div className="flex h-full w-full items-center justify-center bg-[#A2D2FF] transition-transform duration-500 group-hover:scale-105">
                  <User className="h-40 w-40 stroke-[1.5] text-black" />
                </div>
                <div className="absolute top-4 left-4 -rotate-6 border-2 border-black bg-kcc-accent text-white font-black uppercase text-[10px] tracking-wider px-3 py-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  FOUNDER 🚀
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 border-t-2 border-black pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-lg uppercase tracking-tight text-black">
                      Akhil
                    </h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/50 mt-0.5">
                      @atomrobic
                    </p>
                  </div>
                  <div className="border-2 border-black bg-kcc-green px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    Active
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-black/10 pt-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-black/60">
                    Connect:
                  </span>
                  <Link
                    href="https://t.me/kerala_coders_cafe_akhil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border-2 border-black bg-[#22A7F0] text-white px-2.5 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    Telegram: @kerala_coders_cafe_akhil
                    <ArrowUpRight className="h-3 w-3 stroke-[3]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="flex flex-col items-start">
            <span className="inline-block border-2 border-black bg-kcc-green px-3 py-1 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6">
              Behind the Cafe
            </span>

            <h2 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.92] tracking-[-0.05em] text-black uppercase">
              Meet the
              <span className="ml-3 bg-kcc-accent text-white border-3 border-black px-4 py-1.5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] inline-block rotate-1">
                Team
              </span>
            </h2>

            <blockquote className="font-hand text-3xl md:text-4xl text-black font-semibold leading-relaxed border-l-8 border-kcc-accent pl-6 my-8 italic">
              &quot;Build in public. Learn from peers. Ship real products.&quot;
            </blockquote>

            <div className="relative w-full max-w-[680px] mt-6 border-3 border-black bg-[#FDFBF7] p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[-0.5deg] hover:rotate-0 transition-transform duration-300 overflow-hidden">
              <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[2px] bg-red-200" />
              <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-around py-4 pointer-events-none opacity-40">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5] border border-black/20 shadow-inner" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5] border border-black/20 shadow-inner" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5] border border-black/20 shadow-inner" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#E5E5E5] border border-black/20 shadow-inner" />
              </div>

              <div
                className="pl-8 md:pl-10"
                style={{
                  backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(59, 130, 246, 0.12) 31px, rgba(59, 130, 246, 0.12) 32px)",
                  backgroundSize: "100% 32px",
                  lineHeight: "32px"
                }}
              >
                <h3 className="font-hand text-3xl md:text-4xl text-[#1B365D] font-black tracking-wide mb-6 pt-2">
                  The Real Story
                </h3>
                <div className="font-hand text-xl md:text-2xl text-[#1D3557] font-semibold space-y-8 pb-4">
                  <p className="pt-2">
                    “I was once in the same position — struggling through tutorials without much direction. I wasn’t active on Telegram either. But when I decided to seriously learn, I slowly started connecting with different Telegram communities.
                  </p>
                  <p>
                    The help, support, and real-world insights I received through those connections played a huge role in my growth. The support I once received is exactly what I wanted to give back to others.
                  </p>
                  <p className="pb-4">
                    That’s how KCC started — built through the connections and experiences from that journey. Today, it’s no longer just a group; it has become an active learning hub for developers across Kerala.”
                  </p>
                  <div className="text-right font-hand text-2xl md:text-3xl text-[#1D3557] font-bold mt-6 tracking-wide italic pr-4">
                    — Akhil, Founder, KCC
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <Link
                href="https://github.com/atomrobic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center gap-3 border-3 border-black bg-kcc-gold px-8 text-sm font-black uppercase text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <Github className="h-5 w-5 stroke-[3]" />
                Follow on GitHub
                <ArrowUpRight className="h-4 w-4 stroke-[3]" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/akhil-a-7186052b5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center gap-3 border-3 border-black bg-[#A2D2FF] px-8 text-sm font-black uppercase text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                <Linkedin className="h-5 w-5 stroke-[3]" />
                LinkedIn
                <ArrowUpRight className="h-4 w-4 stroke-[3]" />
              </Link>
              <Link
                href="mailto:keralacoderscafe@gmail.com"
                className="inline-flex h-14 items-center gap-3 border-3 border-black bg-kcc-green px-6 text-sm font-black text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all lowercase"
              >
                <Mail className="h-5 w-5 stroke-[3]" />
                keralacoderscafe@gmail.com
                <ArrowUpRight className="h-4 w-4 stroke-[3] shrink-0" />
              </Link>
              <div className="inline-flex h-14 items-center gap-2 border-3 border-black bg-white px-5 text-xs font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Code className="h-4 w-4 stroke-[3] text-kcc-accent" />
                BUILDING KCC IN PUBLIC
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

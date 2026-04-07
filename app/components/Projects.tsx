"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { REPOS, Project } from "@/lib/projects";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function Projects() {
  const heading = useInView(0.2);
  const cards = useInView(0.1);

  return (
    <section id="projects" className="scroll-mt-24 px-6 py-28 md:px-12 bg-white border-t-4 border-black">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div
            ref={heading.ref}
            className="lg:sticky lg:top-32 lg:self-start"
            style={{
              opacity: heading.visible ? 1 : 0,
              transform: heading.visible ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.7s cubic-bezier(.22,1,.36,1), transform 0.7s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <span className="inline-block border-2 border-black bg-kcc-gold px-3 py-1 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6">
              Projects
            </span>
            <h2 className="mt-5 text-[clamp(2.8rem,6vw,5.5rem)] font-black leading-[0.92] tracking-[-0.05em] text-black uppercase">
              Community ideas
              <span className="ml-3 bg-kcc-accent border-3 border-black px-3 py-1 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] inline-block -rotate-1 text-white">
                becoming real.
              </span>
            </h2>
            <p className="mt-10 max-w-[520px] text-xl font-bold leading-relaxed text-black border-l-8 border-black pl-8">
              Inspired by a builder mindset, these are the kinds of tools and
              systems we want Kerala Coders Cafe to keep shipping over time.
            </p>

            <div className="mt-12 border-4 border-black bg-kcc-accent-yellow-soft p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-black/50 mb-4 inline-block border-b-2 border-black">
                How we work
              </div>
              <p className="mt-4 text-lg font-bold leading-relaxed text-black">
                Start small, build openly, invite contributors early, and make
                useful things easier to maintain.
              </p>
            </div>
          </div>

          <div ref={cards.ref} className="flex md:grid overflow-x-auto md:overflow-visible gap-6 snap-x snap-mandatory scrollbar-hide pb-12 md:pb-0 px-2 md:px-0">
            {/* 01: Featured Dynamic Toddy Shop Project */}
            {(() => {
              const toddy = REPOS.find(r => r.id === 4);
              if (!toddy) return null;
              return (
                <Link href={`/${toddy.slug}`} className="no-underline group shrink-0 w-[88vw] md:w-full snap-center">
                  <article
                    className="border-8 border-kcc-gold bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[16px_16px_0px_0px_rgba(255,230,109,1)] h-full relative overflow-hidden"
                    style={{
                      opacity: cards.visible ? 1 : 0,
                      transform: cards.visible ? "translateY(0) rotate(-1deg)" : "translateY(60px) rotate(2deg)",
                      transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) 0.1s, transform 0.6s cubic-bezier(.22,1,.36,1) 0.1s`,
                    }}
                  >
                    <div className="absolute top-0 right-0 bg-kcc-gold text-black px-4 py-1 text-[10px] font-black uppercase tracking-widest border-b-2 border-l-2 border-black rotate-0">
                      Featured Prototype
                    </div>
                    
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-6">
                        <div className="grid h-16 w-16 shrink-0 place-items-center border-4 border-black bg-black text-xl font-black tracking-[-0.04em] text-kcc-gold shadow-[4px_4px_0px_0px_rgba(255,230,109,1)]">
                          01
                        </div>
                        <div>
                          <h3 className="text-[1.5rem] md:text-[2rem] font-black uppercase leading-tight tracking-[-0.04em] text-black group-hover:text-amber-600 transition-colors">
                            {toddy.name}
                          </h3>
                          <p className="mt-4 max-w-[560px] text-[1rem] md:text-[1.1rem] font-bold leading-relaxed text-black/70">
                            {toddy.description}
                          </p>
                        </div>
                      </div>

                      <div className="self-start border-2 border-black bg-[#6dfe9c] px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
                        LIVE DEMO
                      </div>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-3">
                      {toddy.topics.map((tag: string) => (
                        <div
                          key={tag}
                          className="border-2 border-black bg-white px-3 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </article>
                </Link>
              );
            })()}

            {/* Static Community Ideas */}
            {[
              {
                title: "Kerala Dev Directory",
                description: "A home for member profiles, skills, and discovery so people can find collaborators across the community.",
                tags: ["community", "profiles", "network"]
              },
              {
                title: "Tech Events Calendar",
                description: "A clearer way to track meetups, workshops, and community happenings across Kerala.",
                tags: ["events", "discover", "updates"]
              },
              {
                title: "Open Source Tracker",
                description: "A simple stream of community contributions, issues, and work worth noticing.",
                tags: ["open source", "visibility", "shipping"]
              }
            ].map((project, index) => (
              <article
                key={project.title}
                className="shrink-0 w-[88vw] md:w-full snap-center border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] opacity-60 grayscale-[0.5]"
                style={{
                  opacity: cards.visible ? 0.6 : 0,
                  transform: cards.visible ? "translateY(0)" : "translateY(60px)",
                  transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${(index + 1) * 0.15}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${(index + 1) * 0.15}s`,
                }}
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-6">
                    <div className="grid h-16 w-16 shrink-0 place-items-center border-3 border-black bg-slate-100 text-xl font-black tracking-[-0.04em] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      {String(index + 2).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="text-[1.5rem] md:text-[2rem] font-black uppercase leading-tight tracking-[-0.04em] text-black">
                        {project.title}
                      </h3>
                      <p className="mt-4 max-w-[560px] text-[1rem] md:text-[1.1rem] font-bold leading-relaxed text-black/40">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="self-start border-2 border-black bg-slate-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-black/30 whitespace-nowrap">
                    CONCEPT
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <div
                      key={tag}
                      className="border-2 border-black bg-white px-3 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black/30"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

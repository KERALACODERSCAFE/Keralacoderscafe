"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Kerala Dev Directory",
    description:
      "A home for member profiles, skills, and discovery so people can find collaborators across the community.",
    tags: ["community", "profiles", "network"],
  },
  {
    title: "Tech Events Calendar",
    description:
      "A clearer way to track meetups, workshops, and community happenings across Kerala.",
    tags: ["events", "discover", "updates"],
  },
  {
    title: "Open Source Tracker",
    description:
      "A simple stream of community contributions, issues, and work worth noticing.",
    tags: ["open source", "visibility", "shipping"],
  },
  {
    title: "Learning Hub",
    description:
      "Curated guides and practical resources for the next wave of developers growing through the community.",
    tags: ["learning", "guides", "resources"],
  },
];

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
    <section id="projects" className="px-6 py-28 md:px-12 bg-white border-t-4 border-black">
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

          <div ref={cards.ref} className="grid gap-6">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
                style={{
                  opacity: cards.visible ? 1 : 0,
                  transform: cards.visible ? "translateY(0) rotate(0deg)" : "translateY(60px) rotate(2deg)",
                  transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${index * 0.15}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${index * 0.15}s`,
                }}
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-6">
                    <div className="grid h-16 w-16 shrink-0 place-items-center border-3 border-black bg-kcc-green text-xl font-black tracking-[-0.04em] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="text-[2rem] font-black uppercase leading-tight tracking-[-0.04em] text-black">
                        {project.title}
                      </h3>
                      <p className="mt-4 max-w-[560px] text-[1.1rem] font-bold leading-relaxed text-black/70">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="self-start border-2 border-black bg-kcc-gold px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    IN PROGRESS
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <div
                      key={tag}
                      className="border-2 border-black bg-white px-3 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
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

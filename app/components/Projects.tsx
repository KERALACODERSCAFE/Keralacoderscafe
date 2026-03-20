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

export default function Projects() {
  return (
    <section id="projects" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-black/44">
              Projects
            </p>
            <h2 className="mt-5 text-[clamp(2.6rem,5vw,5rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-black">
              Community ideas
              <span className="ml-3 font-[family-name:var(--font-editorial)] italic">
                becoming real.
              </span>
            </h2>
            <p className="mt-6 max-w-[520px] text-lg leading-8 text-black/68">
              Inspired by a builder mindset, these are the kinds of tools and
              systems we want Kerala Coders Cafe to keep shipping over time.
            </p>

            <div className="mt-8 rounded-[2rem] border border-black/10 bg-kcc-accent-yellow-soft/45 p-6">
              <div className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-black/42">
                How we work
              </div>
              <p className="mt-4 text-base leading-7 text-black/66">
                Start small, build openly, invite contributors early, and make
                useful things easier to maintain.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-[0_16px_40px_rgba(17,17,17,0.05)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-black/10 bg-kcc-accent-green-soft/65 text-lg font-semibold tracking-[-0.04em] text-black">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="text-[1.65rem] font-semibold leading-tight tracking-[-0.04em] text-black">
                        {project.title}
                      </h3>
                      <p className="mt-3 max-w-[560px] text-base leading-7 text-black/66">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm text-black/56">
                    in progress
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.tags.map((tag) => (
                    <div
                      key={tag}
                      className="rounded-full border border-black/10 bg-kcc-paper px-3 py-1.5 text-sm text-black/58"
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

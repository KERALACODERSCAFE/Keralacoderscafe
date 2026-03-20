import SectionReveal from "./SectionReveal";

const pillars = [
  {
    title: "Learn together",
    description:
      "Ask questions, share resources, and grow faster with other people in the community.",
    style: "-rotate-[1.6deg]",
  },
  {
    title: "Build in public",
    description:
      "Show your work, get feedback, and improve by building with others.",
    style: "rotate-[1.1deg]",
  },
  {
    title: "Grow with Kerala",
    description:
      "Support local builders and help make Kerala's tech community stronger.",
    style: "-rotate-[0.8deg]",
  },
];

export default function Mission() {
  return (
    <section id="about" className="border-t border-[color:var(--ui-border-soft)] px-6 py-28 md:px-12">
      <div className="mx-auto max-w-[1320px]">
        <div className="md:hidden">
          <SectionReveal className="max-w-[34rem]">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--ui-page-text-soft)]">
              About KCC
            </p>
            <h2 className="mt-4 max-w-full text-[clamp(2.2rem,10vw,3.4rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[color:var(--ui-page-text)]">
              A simple community for people who love building with code.
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.12} className="mt-8">
            <div className="grid gap-4">
              {pillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  className="note-pinned relative overflow-hidden border border-black/12 bg-[linear-gradient(180deg,#ffffff_0%,#f3f3ef_100%)] px-5 pb-5 pt-8 text-black shadow-[0_18px_38px_rgba(0,0,0,0.16)]"
                >
                  <div className="note-nail" />
                  <div className="note-hole" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_0,transparent_30px,rgba(0,0,0,0.045)_30px,rgba(0,0,0,0.045)_31px)] bg-[length:100%_31px]" />
                  <div className="pointer-events-none absolute inset-y-0 left-5 w-px bg-rose-300/40" />

                  <div className="relative pl-4">
                    <div className="inline-flex border border-black/10 bg-black/[0.03] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-black/40">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <h3 className="mt-5 text-[1.28rem] font-semibold leading-tight tracking-[-0.04em] text-black">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-[0.98rem] leading-7 text-black/64">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </SectionReveal>
        </div>

        <SectionReveal className="hidden max-w-[680px] md:block">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--ui-page-text-soft)]">
            About KCC
          </p>
          <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-[color:var(--ui-page-text)]">
            A simple community for people who love building with code.
          </h2>
        </SectionReveal>

        <div className="mt-12 hidden gap-5 lg:grid-cols-3 md:grid">
          {pillars.map((pillar, index) => (
              <SectionReveal
                key={pillar.title}
                delay={0.08 + index * 0.06}
                y={20}
              >
              <article
                  className={`cursor-pencil note-pinned group relative h-full rounded-[0.8rem] border border-black/12 bg-[linear-gradient(180deg,#ffffff_0%,#f3f3ef_100%)] p-6 text-black shadow-[0_22px_50px_rgba(0,0,0,0.2)] transition-all duration-300 hover:rotate-0 hover:shadow-[0_28px_54px_rgba(0,0,0,0.24)] ${pillar.style}`}
                >
                <div className="note-nail" />
                <div className="note-hole" />
                <div className="pointer-events-none absolute inset-0 rounded-[0.8rem] bg-[linear-gradient(transparent_0,transparent_34px,rgba(0,0,0,0.05)_34px,rgba(0,0,0,0.05)_35px)] bg-[length:100%_35px]" />
                <div className="pointer-events-none absolute inset-y-0 left-7 w-px bg-rose-300/45" />

                <div className="relative pl-4 pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-black/38">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="h-px flex-1 bg-black/8 transition-colors duration-300 group-hover:bg-black/14" />
                  </div>

                  <h3 className="mt-6 text-[1.45rem] font-semibold leading-tight tracking-[-0.04em] text-black">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 max-w-[28ch] text-base leading-7 text-black/64">
                    {pillar.description}
                  </p>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

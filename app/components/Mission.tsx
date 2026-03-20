const pillars = [
  {
    title: "Learn together",
    description:
      "Questions, discussions, code reviews, and shared resources that make learning feel active instead of isolated.",
    tone: "bg-white",
  },
  {
    title: "Build in public",
    description:
      "Projects move faster when people can show progress, ask for help, and invite others into the work early.",
    tone: "bg-kcc-accent-yellow-soft/55",
  },
  {
    title: "Grow with Kerala",
    description:
      "We want more local builders, stronger collaboration, and a healthier developer ecosystem across the state.",
    tone: "bg-kcc-accent-green-soft/60",
  },
];

export default function Mission() {
  return (
    <section id="about" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.95fr)]">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-black/44">
              About KCC
            </p>
            <h2 className="mt-5 max-w-[820px] text-[clamp(2.6rem,6vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-black">
              A community that feels
              <span className="ml-3 font-[family-name:var(--font-editorial)] italic">
                generous,
              </span>
              <br />
              practical, and full of momentum.
            </h2>
            <p className="mt-6 max-w-[640px] text-lg leading-8 text-black/68">
              Kerala Coders Cafe is for people who want to learn faster, build
              better, and stay close to others who care about craft. We are
              creating a space where beginners feel supported, experienced
              developers feel energized, and useful things keep happening.
            </p>

            <div className="mt-8 rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-[0_16px_40px_rgba(17,17,17,0.05)]">
              <div className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-black/42">
                Why people stay
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <div>
                  <div className="text-3xl font-semibold tracking-[-0.06em] text-black">
                    700+
                  </div>
                  <div className="mt-2 text-sm leading-6 text-black/60">
                    active developers, learners, and curious builders
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-semibold tracking-[-0.06em] text-black">
                    30+
                  </div>
                  <div className="mt-2 text-sm leading-6 text-black/60">
                    contributors helping the website and community grow
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-semibold tracking-[-0.06em] text-black">
                    1 day
                  </div>
                  <div className="mt-2 text-sm leading-6 text-black/60">
                    to 10+ years of experience in one shared space
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className={`rounded-[2rem] border border-black/10 p-6 shadow-[0_16px_36px_rgba(17,17,17,0.04)] ${pillar.tone}`}
              >
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-black/42">
                  Pillar
                </div>
                <h3 className="mt-4 text-[1.85rem] font-semibold leading-tight tracking-[-0.04em] text-black">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-black/66">
                  {pillar.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

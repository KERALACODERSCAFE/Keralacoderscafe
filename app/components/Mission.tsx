const pillars = [
  {
    title: "Learn together",
    description:
      "Questions, discussions, code reviews, and shared resources that make learning feel active instead of isolated.",
    tone: "bg-kcc-accent-yellow-soft",
  },
  {
    title: "Build in public",
    description:
      "Projects move faster when people can show progress, ask for help, and invite others into the work early.",
    tone: "bg-kcc-accent-green-soft",
  },
  {
    title: "Grow with Kerala",
    description:
      "We want more local builders, stronger collaboration, and a healthier developer ecosystem across the state.",
    tone: "bg-kcc-accent",
  },
];

export default function Mission() {
  return (
    <section id="about" className="px-6 py-28 md:px-12 bg-white border-b-4 border-black">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-20 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.95fr)]">
          <div>
            <span className="inline-block border-2 border-black bg-kcc-gold px-3 py-1 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6">
              About the community
            </span>
            <h2 className="mt-5 max-w-[820px] text-[clamp(2.8rem,7vw,5.8rem)] font-black leading-[0.92] tracking-[-0.05em] text-black uppercase">
              A community that feels
              <span
                className="ml-3 border-3 border-black px-3 py-1 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] inline-block -rotate-1 animate-[gradientShift_4s_ease_infinite] bg-[length:200%_100%]"
                style={{ backgroundImage: "linear-gradient(90deg, #FFE66D, #A8E6CF, #FFE66D)" }}
              >
                generous,
              </span>
              <br />
              practical, and full of momentum.
            </h2>
            <p className="mt-10 max-w-[640px] text-xl font-bold leading-relaxed text-black/80 border-l-8 border-black pl-8">
              Kerala Coders Cafe is for people who want to learn faster, build
              better, and stay close to others who care about craft. We are
              creating a space where beginners feel supported, experienced
              developers feel energized, and useful things keep happening.
            </p>

            <div className="mt-12 border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-xs font-black uppercase tracking-[0.2em] text-black/50 mb-8 border-b-2 border-black pb-2 inline-block">
                Why people stay
              </div>
              <div className="grid gap-8 sm:grid-cols-3">
                <div className="border-2 border-black p-4 bg-kcc-gold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-4xl font-black tracking-[-0.05em] text-black">
                    700+
                  </div>
                  <div className="mt-2 text-xs font-black uppercase leading-tight text-black/70">
                    active developers, learners, and builders
                  </div>
                </div>
                <div className="border-2 border-black p-4 bg-kcc-green shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-4xl font-black tracking-[-0.05em] text-black">
                    30+
                  </div>
                  <div className="mt-2 text-xs font-black uppercase leading-tight text-black/70">
                    contributors growing the community
                  </div>
                </div>
                <div className="border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-4xl font-black tracking-[-0.05em] text-black">
                    1 day
                  </div>
                  <div className="mt-2 text-xs font-black uppercase leading-tight text-black/70">
                    to 10+ years of total shared experience
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {pillars.map((pillar) => (
              <article
                key={pillar.title}
                className={`border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[11px_11px_0px_0px_rgba(0,0,0,1)] transition-all ${pillar.tone}`}
              >
                <div className="text-xs font-black uppercase tracking-[0.2em] text-black/50 underline decoration-2 decoration-black">
                  Our Pillar
                </div>
                <h3 className="mt-6 text-[2.2rem] font-black leading-tight tracking-[-0.05em] text-black uppercase">
                  {pillar.title}
                </h3>
                <p className="mt-6 text-[1.05rem] font-bold leading-relaxed text-black/80">
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

import SectionReveal from "./SectionReveal";

const guidelines = [
  {
    title: "Be kind, be clear",
    description:
      "A welcoming space works best when people communicate with patience, clarity, and respect.",
  },
  {
    title: "Share what you know",
    description:
      "Good communities get stronger when people document what worked, explain what they learned, and help others move forward.",
  },
  {
    title: "Contribute in the open",
    description:
      "Questions, code, feedback, and ideas have more value when they are visible enough for others to build on.",
  },
  {
    title: "Keep curiosity alive",
    description:
      "The goal is not perfection. It is steady growth, better questions, and more people feeling confident enough to try.",
  },
];

export default function Guidelines() {
  return (
    <section id="guidelines" className="border-t border-white/8 px-6 py-28 md:px-12">
      <div className="mx-auto max-w-[1320px]">
        <SectionReveal className="max-w-[820px]">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/42">
            Community code
          </p>
          <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.9rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-white">
            A few simple standards that keep the
            <span className="ml-3 font-[family-name:var(--font-editorial)] italic text-white/76">
              space healthy.
            </span>
          </h2>
        </SectionReveal>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {guidelines.map((item, index) => (
            <SectionReveal
              key={item.title}
              delay={0.08 + index * 0.05}
              y={26}
            >
              <article className="h-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-white/18 hover:bg-white/[0.05]">
                <div className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/34">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-5 text-[1.5rem] font-semibold leading-tight tracking-[-0.04em] text-white">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-white/56">
                  {item.description}
                </p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

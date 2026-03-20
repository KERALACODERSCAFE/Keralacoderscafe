const guidelines = [
  {
    title: "Be kind, be clear",
    description:
      "A welcoming space works best when people communicate with patience, clarity, and respect.",
    tone: "bg-white",
  },
  {
    title: "Share what you know",
    description:
      "Good communities get stronger when people document what worked, explain what they learned, and help others move forward.",
    tone: "bg-kcc-accent-yellow-soft/55",
  },
  {
    title: "Contribute in the open",
    description:
      "Questions, code, feedback, and ideas have more value when they are visible enough for others to build on.",
    tone: "bg-kcc-accent-green-soft/60",
  },
  {
    title: "Keep curiosity alive",
    description:
      "The goal is not perfection. It is steady growth, better questions, and more people feeling confident enough to try.",
    tone: "bg-white",
  },
];

export default function Guidelines() {
  return (
    <section id="guidelines" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-[760px]">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-black/44">
            Community code
          </p>
          <h2 className="mt-5 text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-black">
            A few simple standards that keep the
            <span className="ml-3 font-[family-name:var(--font-editorial)] italic">
              space healthy.
            </span>
          </h2>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {guidelines.map((item, index) => (
            <article
              key={item.title}
              className={`rounded-[2rem] border border-black/10 p-6 shadow-[0_16px_38px_rgba(17,17,17,0.04)] ${item.tone}`}
            >
              <div className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-black/36">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-5 text-[1.45rem] font-semibold leading-tight tracking-[-0.04em] text-black">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-black/66">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

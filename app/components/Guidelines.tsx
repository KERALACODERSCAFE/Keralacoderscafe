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
    <section id="guidelines" className="px-6 py-28 md:px-12 bg-white">
      <div className="mx-auto max-w-[1280px]">
        <div className="max-w-[800px]">
          <span className="inline-block border-2 border-black bg-kcc-green px-3 py-1 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6">
            Community code
          </span>
          <h2 className="mt-5 text-[clamp(2.8rem,6vw,5rem)] font-black leading-[0.92] tracking-[-0.05em] text-black uppercase">
            A few simple standards that keep the
            <span className="ml-3 bg-kcc-gold border-3 border-black px-3 py-1 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] inline-block rotate-1">
              space healthy.
            </span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {guidelines.map((item, index) => (
            <article
              key={item.title}
              className={`border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[11px_11px_0px_0px_rgba(0,0,0,1)] transition-all ${item.tone}`}
            >
              <div className="text-xs font-black uppercase tracking-[0.2em] text-black/40 border-b-2 border-black inline-block mb-6">
                RULE {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-2 text-[1.8rem] font-black leading-tight tracking-[-0.04em] text-black uppercase">
                {item.title}
              </h3>
              <p className="mt-6 text-[1.05rem] font-bold leading-relaxed text-black/70">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

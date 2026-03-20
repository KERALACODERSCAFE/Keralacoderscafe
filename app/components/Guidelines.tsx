const guidelines = [
  {
    title: "Be Respectful",
    description: "Treat everyone with kindness and professionalism. We're all here to learn and grow together.",
  },
  {
    title: "Share Knowledge",
    description: "Don't hesitate to ask questions or share your expertise. Every interaction makes us stronger.",
  },
  {
    title: "Contribute Openly",
    description: "Share your projects, contribute to others, and help build something amazing together.",
  },
  {
    title: "Stay Curious",
    description: "Technology evolves rapidly. Keep learning, experimenting, and pushing boundaries.",
  },
];

export default function Guidelines() {
  return (
    <section className="relative py-32 px-6 md:px-12 bg-kcc-bg">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-4xl md:text-5xl text-kcc-accent mb-12 text-center italic"
          style={{ fontFamily: "var(--font-newsreader)" }}
        >
          Community Guidelines
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guidelines.map((item) => (
            <div key={item.title} className="bg-kcc-surface-elevated p-8 border-l-2 border-kcc-gold">
              <h3
                className="text-xl text-kcc-accent mb-3"
                style={{ fontFamily: "var(--font-newsreader)" }}
              >
                {item.title}
              </h3>
              <p className="text-sm text-kcc-text-dim leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

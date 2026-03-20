export default function Mission() {
  const stats = [
    { value: "500+", label: "Active Members" },
    { value: "24/7", label: "Community Support" },
  ];

  return (
    <section id="about" className="relative py-32 px-6 md:px-12 bg-kcc-surface">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-xs tracking-[0.4em] text-kcc-gold uppercase">Our Mission</span>
            <h2
              className="text-5xl md:text-7xl italic text-kcc-accent leading-tight"
              style={{ fontFamily: "var(--font-newsreader)" }}
            >
              Code.<br />Collaborate.<br />Create.
            </h2>
            <p className="text-kcc-text-dim leading-relaxed">
              Kerala Coders Cafe is more than just a community—it's a movement. We're building a space
              where developers from across Kerala can connect, share knowledge, and push the boundaries
              of what's possible with technology.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-kcc-surface-elevated p-8 hover-lift">
                <div
                  className="text-4xl font-bold text-kcc-gold mb-2"
                  style={{ fontFamily: "var(--font-newsreader)" }}
                >
                  {stat.value}
                </div>
                <div className="text-xs tracking-wider text-kcc-text-dim uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

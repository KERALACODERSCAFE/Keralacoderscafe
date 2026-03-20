import Link from "next/link";

export default function JoinCTA() {
  return (
    <section
      id="join"
      className="relative py-40 px-6 bg-kcc-surface flex flex-col items-center justify-center text-center"
    >
      <span className="text-xs tracking-[0.4em] text-kcc-gold uppercase mb-6">Join the Movement</span>
      <h2
        className="text-4xl md:text-6xl text-kcc-accent mb-8 max-w-3xl leading-tight italic"
        style={{ fontFamily: "var(--font-newsreader)" }}
      >
        Ready to be part of something bigger?
      </h2>
      <p className="text-kcc-text-dim mb-12 max-w-xl">
        Whether you're a seasoned developer or just starting out, there's a place for you in Kerala Coders Cafe.
        Let's build the future together.
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link
          href="https://github.com/atomrobic/keralacoderscafe-saas"
          target="_blank"
          rel="noopener"
          className="bg-kcc-accent text-kcc-bg px-12 py-5 text-xs tracking-widest uppercase font-semibold hover:bg-kcc-gold transition-all duration-300 inline-flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>fork_right</span>
          Fork on GitHub
        </Link>
        <Link
          href="https://chat.whatsapp.com/Kd3tVwJfjjh0HRZtoYfxcm"
          target="_blank"
          rel="noopener"
          className="border-2 border-kcc-gold text-kcc-gold px-12 py-5 text-xs tracking-widest uppercase font-semibold hover:bg-kcc-gold hover:text-kcc-bg transition-all duration-300 inline-flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>group_add</span>
          Join Community
        </Link>
      </div>
    </section>
  );
}

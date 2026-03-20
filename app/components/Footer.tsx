import Link from "next/link";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Contributors", href: "#contributors" },
  { label: "Projects", href: "#projects" },
  { label: "Guidelines", href: "#guidelines" },
];

const resources = [
  { label: "GitHub", href: "https://github.com/KERALACODERSCAFE/Keralacoderscafe" },
  { label: "WhatsApp", href: "https://chat.whatsapp.com/Kd3tVwJfjjh0HRZtoYfxcm" },
];

export default function Footer() {
  return (
    <footer className="px-6 pb-12 pt-10 md:px-12">
      <div className="mx-auto max-w-[1280px] rounded-[2.5rem] border border-black/10 bg-white/70 px-6 py-10 shadow-[0_16px_40px_rgba(17,17,17,0.05)] md:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(180px,0.8fr)_minmax(180px,0.8fr)]">
          <div>
            <div className="text-[clamp(2.4rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-black">
              Kerala Coders
              <span className="ml-3 font-[family-name:var(--font-editorial)] italic">
                Cafe
              </span>
            </div>
            <p className="mt-4 max-w-[520px] text-base leading-7 text-black/62">
              A Kerala-first community for developers, designers, contributors,
              and curious people who want to learn in public and build with
              others.
            </p>
            <p className="mt-5 font-[family-name:var(--font-hand)] text-2xl text-black/54">
              built slowly, shared openly
            </p>
          </div>

          <div>
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-black/42">
              Explore
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-black/66 transition-colors hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-black/42">
              Connect
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {resources.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className="text-sm text-black/66 transition-colors hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-black/8 pt-6 text-sm text-black/46">
          © {new Date().getFullYear()} Kerala Coders Cafe. Built in Kerala for
          people who build.
        </div>
      </div>
    </footer>
  );
}

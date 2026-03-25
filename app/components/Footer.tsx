import Link from "next/link";
import { Github, MessageCircle } from "lucide-react";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Contributors", href: "#contributors" },
  { label: "Projects", href: "#projects" },
  { label: "Guidelines", href: "#guidelines" },
];

const resources = [
  {
    label: "GitHub",
    href: "https://github.com/KERALACODERSCAFE/Keralacoderscafe",
    icon: <Github className="h-4 w-4" />,
  },
  {
    label: "WhatsApp",
    href: "https://chat.whatsapp.com/GisLp4Xp2Y8BkK8XlP2Xp2",
    icon: <MessageCircle className="h-4 w-4" />,
  },
];

export default function Footer() {
  return (
    <footer className="px-6 pb-20 pt-10 md:px-12 bg-white">
      <div className="mx-auto max-w-[1280px] border-4 border-black bg-white px-8 py-16 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:px-16">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.5fr)_minmax(180px,0.7fr)_minmax(180px,0.7fr)]">
          <div>
            <div className="text-[clamp(2.6rem,6vw,5rem)] font-black leading-[0.92] tracking-[-0.05em] text-black uppercase">
              Kerala <br />
              Coders
              <span className="ml-3 bg-kcc-gold border-3 border-black px-4 py-1 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] inline-block -rotate-2">
                Cafe
              </span>
            </div>
            <p className="mt-8 max-w-[520px] text-lg font-bold leading-relaxed text-black/70">
              A Kerala-first community for developers, designers, contributors,
              and curious people who want to learn in public and build with
              others.
            </p>
            <p className="mt-8 font-black uppercase text-2xl text-black">
              BUILT SLOWLY • SHARED OPENLY
            </p>
          </div>

          <div>
            <div className="text-xs font-black uppercase tracking-[0.25em] text-black/40 border-b-2 border-black pb-2 mb-6 inline-block">
              EXPLORE
            </div>
            <div className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[1.1rem] font-black uppercase text-black hover:text-kcc-accent transition-all hover:translate-x-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-black uppercase tracking-[0.25em] text-black/40 border-b-2 border-black pb-2 mb-6 inline-block">
              CONNECT
            </div>
            <div className="flex flex-col gap-4">
              {resources.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-3 text-[1.1rem] font-black uppercase text-black hover:text-kcc-accent transition-all hover:translate-x-2"
                >
                  <span className="p-2 border-2 border-black bg-white group-hover:bg-kcc-gold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    {link.icon}
                  </span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 border-t-4 border-black pt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-sm font-black uppercase">
          <div>
            © {new Date().getFullYear()} Kerala Coders Cafe.
          </div>
          <div className="bg-kcc-green border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Built in Kerala for people who build.
          </div>
        </div>
      </div>
    </footer>
  );
}

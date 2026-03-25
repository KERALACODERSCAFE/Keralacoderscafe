import Link from "next/link";
import { ArrowUpRight, Github, MessageCircle } from "lucide-react";

const cards = [
  {
    title: "Join the chat",
    description:
      "Meet other developers, ask questions, and stay close to what the community is building.",
    href: "/join",
    label: "Open WhatsApp",
    icon: MessageCircle,
    isExternal: false,
  },
  {
    title: "Contribute on GitHub",
    description:
      "Help shape the website, improve the repo, and build useful things with the community.",
    href: "https://github.com/KERALACODERSCAFE/Keralacoderscafe",
    label: "View repository",
    icon: Github,
    isExternal: true,
  },
];

export default function JoinCTA() {
  return (
    <section id="join" className="px-6 py-28 md:px-12 bg-white">
      <div className="mx-auto max-w-[1280px]">
        <div className="overflow-hidden border-4 border-black bg-black px-8 py-16 text-white shadow-[12px_12px_0px_0px_rgba(255,107,107,1)] md:px-16 md:py-20 lg:rotate-1">
          <div className="grid gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div>
              <span className="inline-block border-2 border-white bg-kcc-accent-yellow-soft px-3 py-1 text-xs font-black uppercase tracking-widest text-black shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] mb-8">
                Get involved
              </span>
              <h2 className="mt-5 max-w-[550px] text-[clamp(2.8rem,6vw,5.5rem)] font-black leading-[0.92] tracking-[-0.05em] text-white uppercase">
                Make Kerala Coders Cafe
                <span className="ml-3 border-3 border-white bg-kcc-gold px-3 py-1 shadow-[5px_5px_0px_0px_rgba(255,107,107,1)] inline-block -rotate-2 text-black">
                  more alive.
                </span>
              </h2>
              <p className="mt-10 max-w-[520px] text-xl font-bold leading-relaxed text-white/80 border-l-8 border-kcc-gold pl-8">
                Whether you are new to tech or already deep in the work, there
                is room here to learn, contribute, and help build something
                useful with other people from Kerala.
              </p>

              <div className="mt-12 border-3 border-white bg-white/10 p-8 text-lg font-bold leading-relaxed text-white/70 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]">
                From first commits to long-term craft, the community works best
                when more people show up, participate, and share what they are
                learning.
              </div>
            </div>

            <div className="grid gap-6">
              {cards.map((card) => {
                const Icon = card.icon;

                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    target={card.isExternal ? "_blank" : undefined}
                    rel={card.isExternal ? "noopener" : undefined}
                    className={`group border-4 border-white bg-white/5 p-8 transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:bg-white/10 hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] ${card.title === "Contribute on GitHub" ? "hidden md:block" : "block"
                      }`}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="grid h-16 w-16 place-items-center border-3 border-white bg-kcc-accent shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                        <Icon className="h-6 w-6 text-white stroke-[3]" />
                      </div>
                      <ArrowUpRight className="h-6 w-6 text-white stroke-[3] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>

                    <h3 className="mt-8 text-[2.2rem] font-black uppercase leading-tight tracking-[-0.04em] text-white">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-[1.1rem] font-bold leading-relaxed text-white/60">
                      {card.description}
                    </p>

                    <div className="mt-8 inline-block border-b-3 border-kcc-gold text-lg font-black uppercase text-kcc-gold transition-all group-hover:border-white group-hover:text-white">
                      {card.label}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowUpRight, Github, MessageCircle } from "lucide-react";

const cards = [
  {
    title: "Join the chat",
    description:
      "Meet other developers, ask questions, and stay close to what the community is building.",
    href: "https://chat.whatsapp.com/Kd3tVwJfjjh0HRZtoYfxcm",
    label: "Open WhatsApp",
    icon: MessageCircle,
  },
  {
    title: "Contribute on GitHub",
    description:
      "Help shape the website, improve the repo, and build useful things with the community.",
    href: "https://github.com/KERALACODERSCAFE/Keralacoderscafe",
    label: "View repository",
    icon: Github,
  },
];

export default function JoinCTA() {
  return (
    <section id="join" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="overflow-hidden rounded-[2.5rem] border border-black/10 bg-black px-6 py-12 text-kcc-paper shadow-[0_28px_80px_rgba(17,17,17,0.18)] md:px-10 md:py-14">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/48">
                Get involved
              </p>
              <h2 className="mt-5 max-w-[520px] text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white">
                Make Kerala Coders Cafe
                <span className="ml-3 font-[family-name:var(--font-editorial)] italic text-kcc-accent-yellow-soft">
                  more alive.
                </span>
              </h2>
              <p className="mt-6 max-w-[520px] text-lg leading-8 text-white/66">
                Whether you are new to tech or already deep in the work, there
                is room here to learn, contribute, and help build something
                useful with other people from Kerala.
              </p>

              <div className="mt-8 rounded-[1.75rem] border border-white/12 bg-white/6 p-5 text-sm leading-7 text-white/62">
                From first commits to long-term craft, the community works best
                when more people show up, participate, and share what they are
                learning.
              </div>
            </div>

            <div className="grid gap-4">
              {cards.map((card) => {
                const Icon = card.icon;

                return (
                  <Link
                    key={card.title}
                    href={card.href}
                    target="_blank"
                    rel="noopener"
                    className="group rounded-[2rem] border border-white/12 bg-white/6 p-6 transition-transform duration-300 hover:-translate-y-1 hover:bg-white/8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-full border border-white/12 bg-white/8">
                        <Icon className="h-5 w-5 text-kcc-accent-yellow-soft" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-white/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    <h3 className="mt-6 text-[1.55rem] font-semibold leading-tight tracking-[-0.04em] text-white">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-white/64">
                      {card.description}
                    </p>

                    <div className="mt-6 text-sm font-medium text-kcc-accent-yellow-soft">
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

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/KERALACODERSCAFE/Keralacoderscafe/contributors?per_page=12"
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContributors(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching contributors:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchContributors();
  }, []);

  return (
    <section id="contributors" className="relative py-32 px-6 md:px-12 bg-kcc-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.4em] text-kcc-gold uppercase">Our Community</span>
          <h2
            className="text-5xl md:text-7xl italic text-kcc-accent mt-4"
            style={{ fontFamily: "var(--font-newsreader)" }}
          >
            Top Contributors
          </h2>
          <p className="text-kcc-text-dim mt-4 max-w-2xl mx-auto">
            Meet the amazing developers who make Kerala Coders Cafe possible.
            Every commit, every PR, every discussion matters.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton aspect-square rounded-lg" />
              ))
            : contributors.map((contributor, index) => (
                <Link
                  key={contributor.id}
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener"
                  className="group bg-kcc-surface-elevated hover-lift overflow-hidden relative block animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-kcc-bg via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="text-sm font-semibold text-kcc-accent mb-1">{contributor.login}</div>
                      <div className="text-xs text-kcc-gold">{contributor.contributions} contributions</div>
                    </div>
                  </div>
                </Link>
              ))}
          {!loading && contributors.length === 0 && (
            <p className="text-kcc-text-dim col-span-full text-center py-10">
              Be the first to contribute!
            </p>
          )}
        </div>

        <div className="text-center mt-12">
          <Link
            href="https://github.com/KERALACODERSCAFE/Keralacoderscafe/graphs/contributors"
            target="_blank"
            rel="noopener"
            className="text-kcc-gold text-xs tracking-widest uppercase border-b border-kcc-gold/30 pb-2 hover:border-kcc-gold transition-all inline-block"
          >
            View All Contributors
          </Link>
        </div>
      </div>
    </section>
  );
}

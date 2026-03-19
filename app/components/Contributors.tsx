"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";

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
          "https://api.github.com/repos/atomrobic/Keralacoderscafe/contributors"
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContributors(data.slice(0, 12)); // Limit to top 12
      } catch (err) {
        console.error("Error fetching contributors:", err);
        // Fallback or empty state
      } finally {
        setLoading(false);
      }
    }
    fetchContributors();
  }, []);

  return (
    <section className="py-20 px-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-center gap-3 mb-10">
        <Users className="w-6 h-6 text-blue-400" />
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Our Contributors
        </h2>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 md:gap-8">
        <AnimatePresence>
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 animate-pulse" />
                  <div className="w-12 h-3 bg-white/5 rounded animate-pulse" />
                </div>
              ))
            : contributors.map((contributor, i) => (
                <motion.div
                  key={contributor.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group flex flex-col items-center gap-3"
                >
                  <Link
                    href={contributor.html_url}
                    target="_blank"
                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-transparent transition-all duration-300 group-hover:border-blue-400 group-hover:scale-110"
                  >
                    <Image
                      src={contributor.avatar_url}
                      alt={contributor.login}
                      fill
                      className="object-cover"
                    />
                  </Link>
                  <span className="text-sm font-medium text-slate-400 truncate w-full text-center">
                    {contributor.login}
                  </span>
                </motion.div>
              ))}
        </AnimatePresence>
      </div>

      {!loading && contributors.length === 0 && (
        <div className="text-center text-slate-500 py-10">
          Be the first one to contribute!
        </div>
      )}
    </section>
  );
}

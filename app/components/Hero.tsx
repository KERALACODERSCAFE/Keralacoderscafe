"use client";

import { motion } from "framer-motion";
import { Github, MessageSquareCode } from "lucide-react";
import Link from "next/link";
import { cn } from "../utils/cn";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center pt-20 pb-12 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
      >
        <div className="px-4 py-1 text-xs font-semibold tracking-wider text-blue-400 uppercase">
          Coming Soon
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6"
      >
        We are a Tech <br />
        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Coding Community
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10 px-4"
      >
        Learn, Build, and Grow Together. A thriving ecosystem where developers 
        collaborate, students learn, and innovators build the future of Kerala's tech scene.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 px-4 w-full sm:w-auto"
      >
        <Link
          href="https://github.com/atomrobic/Keralacoderscafe"
          target="_blank"
          className={cn(
            "flex items-center justify-center gap-2 px-8 py-4 rounded-full",
            "bg-white text-slate-950 font-bold text-lg",
            "transition-all duration-300 hover:scale-105 active:scale-95",
            "hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          )}
        >
          <Github className="w-5 h-5" />
          GitHub Repo
        </Link>
        <Link
          href="https://chat.whatsapp.com/GisLp4Xp2Y8BkK8XlP2Xp2" // Placeholder or actual link if provided
          target="_blank"
          className={cn(
            "flex items-center justify-center gap-2 px-8 py-4 rounded-full",
            "bg-white/5 border border-white/10 text-white font-bold text-lg backdrop-blur-sm",
            "transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95"
          )}
        >
          <MessageSquareCode className="w-5 h-5" />
          WhatsApp Group
        </Link>
      </motion.div>
    </section>
  );
}

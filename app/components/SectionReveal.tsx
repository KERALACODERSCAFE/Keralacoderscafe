"use client";

import { clsx } from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  amount?: number;
};

export default function SectionReveal({
  children,
  className,
  delay = 0,
  y = 32,
  scale = 0.98,
  amount = 0.22,
}: SectionRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={clsx(className)}
      initial={
        reduceMotion
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y, scale }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{
        duration: reduceMotion ? 0 : 0.75,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

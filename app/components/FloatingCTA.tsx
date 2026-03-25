"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't show on the join page
  if (pathname === "/join") return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 w-[calc(100%-48px)] max-w-[400px] -translate-x-1/2 transition-all duration-500 md:hidden ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <Link
        href="/join"
        className="flex h-16 items-center justify-between border-3 border-black bg-kcc-gold px-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-white">
            <MessageCircle className="h-4 w-4" />
          </div>
          <span className="font-black uppercase tracking-tight text-black">
            Join the community
          </span>
        </div>
        <ArrowRight className="h-5 w-5 stroke-[3]" />
      </Link>
    </div>
  );
}

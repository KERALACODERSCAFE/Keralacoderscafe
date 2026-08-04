"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";

export default function FloatingCTA() {
  const { data: session } = useSession();
  const [isVisible, setIsVisible] = useState(false);
  const [showPing, setShowPing] = useState(false);
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

  useEffect(() => {
    // Show ping message initially after 3 seconds
    const initialTimeout = setTimeout(() => setShowPing(true), 3000);

    // Toggle ping every 15 seconds, show for 5 seconds
    const interval = setInterval(() => {
      setShowPing(true);
      setTimeout(() => setShowPing(false), 5000);
    }, 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Don't show if user is logged in, or on specific pages
  if (session || pathname === "/join" || pathname.startsWith("/careers") || pathname.startsWith("/blog")) return null;

  return (
    <div
      className={`fixed bottom-3 right-3 md:bottom-6 md:right-6 z-[100] transition-all duration-500 flex flex-col items-end ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-50"
      }`}
    >
      {/* Tooltip Ping */}
      <div
        className={`mb-3 bg-white border-2 border-black rounded-xl px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 origin-bottom-right pointer-events-auto relative ${
          showPing
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <p className="font-bold text-sm text-black">Join our WhatsApp group now!</p>
        </div>
        {/* Triangle pointer */}
        <div className="absolute -bottom-2 right-6 w-0 h-0 border-l-[8px] border-l-transparent border-t-[10px] border-t-black border-r-[8px] border-r-transparent"></div>
        <div className="absolute -bottom-[5px] right-[25px] w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-white border-r-[6px] border-r-transparent z-10"></div>
      </div>

      <Link
        href="/join"
        className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-black bg-kcc-gold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all group"
        title="Join the community"
      >
        <MessageCircle className="h-7 w-7 text-black group-hover:animate-icon-wiggle" strokeWidth={2.5} />
      </Link>
    </div>
  );
}

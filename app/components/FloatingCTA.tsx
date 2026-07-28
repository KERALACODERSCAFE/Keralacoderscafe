"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { useSession } from "next-auth/react";

export default function FloatingCTA() {
  const { data: session } = useSession();
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

  // Don't show if user is logged in, or on specific pages
  if (session || pathname === "/join" || pathname.startsWith("/careers") || pathname.startsWith("/blog")) return null;

  return (
    <div
      className={`fixed bottom-3 right-3 md:bottom-6 md:right-6 z-[100] transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-50"
      }`}
    >
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

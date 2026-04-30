"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, ExternalLink } from "lucide-react";

const ANIMATION_DURATION = 500;
const CACHE_KEY = "kcc_announcement_seen";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export default function AnnouncementPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const lastSeen = localStorage.getItem(CACHE_KEY);
    const loaderSeen = localStorage.getItem("kcc_loader_seen");
    const now = Date.now();

    const startPopup = () => {
      setShouldRender(true);
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return timer;
    };

    if (!lastSeen || now - parseInt(lastSeen) > CACHE_DURATION) {
      // If loader hasn't been seen yet, it's active on the entrance page
      // We should wait for it to finish before showing the announcement
      if (!loaderSeen) {
        const handleLoaderFinished = () => {
          startPopup();
          window.removeEventListener("kcc_loader_finished", handleLoaderFinished);
        };
        window.addEventListener("kcc_loader_finished", handleLoaderFinished);
        return () => window.removeEventListener("kcc_loader_finished", handleLoaderFinished);
      } else {
        const timer = startPopup();
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem(CACHE_KEY, Date.now().toString());
    setTimeout(() => setShouldRender(false), ANIMATION_DURATION);
  };

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 transition-opacity duration-300 ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-md bg-[#6dfe9c] border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 transform ${isVisible ? "scale-100 translate-y-0" : "scale-90 translate-y-12"}`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-4 -right-4 bg-white border-2 border-black p-1 hover:bg-red-400 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="inline-block self-start bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-[#6dfe9c]">
              New Open Source Project
            </span>
            <h2 className="text-4xl font-black uppercase tracking-tight leading-[0.85] text-black">
              TODDY SHOP <span className="underline">FINDER</span> <br />
              IS STARTED! 🧉
            </h2>
          </div>

          <p className="text-lg font-bold leading-tight text-black/80">
            Our latest community-driven project is officially live. Help us map Kerala's authentic toddy shops, share quality ratings, and preserve our culinary heritage.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/toddy-shop-finder-opensource-project"
              onClick={handleClose}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-4 font-black uppercase text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(109,254,156,0.6)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              View Progress
              <ExternalLink className="w-4 h-4" />
            </Link>
            <button
              onClick={handleClose}
              className="flex-1 inline-flex items-center justify-center px-6 py-4 font-black uppercase text-sm border-2 border-black bg-white hover:bg-gray-100 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>

        <div className="absolute -bottom-1 -left-1 w-full bg-black h-1" />
        <div className="absolute -right-1 top-0 h-full w-1 bg-black" />
      </div>
    </div>
  );
}

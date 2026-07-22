"use client";

import { useEffect } from "react";

export default function CareerDisplayAd() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden my-6 flex flex-col items-center bg-white border border-slate-100 rounded-3xl p-4 md:p-6 shadow-sm select-none">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
        Sponsored Advertisement
      </span>
      <div className="w-full flex justify-center min-h-[90px]">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", minHeight: "90px" }}
          data-ad-client="ca-pub-1003191780588952"
          data-ad-slot="9213644602"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

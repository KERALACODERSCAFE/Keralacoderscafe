"use client";

import React, { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { communityQuotes } from "./data";
import { twMerge } from "tailwind-merge";

type MarqueeProps = {
  quotes?: string[];
  className?: string;
  theme?: "dark" | "cyan";
  /** Top margin override, e.g. "96px", "0", "20px" */
  mt?: string;
  /** Bottom margin override, e.g. "0", "24px" */
  mb?: string;
  /** Slanted diagonal banner style */
  variant?: "default" | "slanted";
  /** Height for slanted variant (default: "200px") */
  slantedHeight?: string;
  /** Custom clip-path polygon for slanted variant */
  clipPath?: string;
  /** Icon component (defaults to Star) */
  Icon?: React.ComponentType<{ className?: string }>;
  /** Text size classes */
  textSize?: string;
  /** Icon size classes */
  iconSize?: string;
  /** CSS rotate transform, e.g. "-2deg", "3deg" */
  rotate?: string;
};

const Marquee: React.FC<MarqueeProps> = ({
  quotes = communityQuotes,
  className,
  theme = "dark",
  mt = "mt-[100px] lg:mt-[72px]",
  mb = "mb-[100px]",
  Icon = Star,
  textSize = "text-2xl md:text-4xl",
  iconSize = "w-8 h-8 md:w-6 md:h-12",
}) => {
  const skillsElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skillsElementRef.current) {
      const element = skillsElementRef.current;
      const scrollWidth = element.scrollWidth;
      const animationDuration = scrollWidth / 50;

      element.animate(
        [
          { transform: "translateX(0)" },
          { transform: `translateX(-${scrollWidth / 2}px)` },
        ],
        {
          duration: animationDuration * 1000,
          easing: "linear",
          iterations: Infinity,
        }
      );
    }
  }, [quotes]);

  const isCyan = theme === "cyan";
  const bgClass = isCyan ? "bg-[#00D9C0]" : "bg-black";
  const textClass = isCyan ? "text-black" : "text-kcc-green";
  const iconClass = isCyan ? "fill-black text-black" : "fill-kcc-green text-kcc-green";

  return (
    <div
      className={twMerge(`relative w-full overflow-hidden ${mt} ${mb}`)}
    >
      <div
        className={twMerge(`relative z-20 ${bgClass} py-2 md:py-3 flex items-center`, className)}
      >
        <div
          id="quotes"
          className="w-max whitespace-nowrap flex will-change-transform"
          ref={skillsElementRef}
        >
          {[1, 2, 3].map((set) => (
            <div key={set} className="flex gap-4 md:gap-12 items-center">
              {quotes.map((quote, index) => (
                <span
                  key={`${set}-${index}`}
                  className={twMerge(
                    "flex items-center gap-4 md:gap-8 font-black tracking-tight uppercase px-2 md:px-4",
                    textSize,
                    textClass
                  )}
                >
                  {quote}
                  <Icon className={twMerge(iconSize, iconClass)} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;

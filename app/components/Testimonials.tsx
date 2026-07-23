"use client";

import React, { useEffect, useState } from "react";
import { database } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import { cn } from "@/lib/utils";
import { HexagonPattern } from "@/components/ui/hexagon-pattern";

interface TestimonialItem {
  id: string;
  name: string;
  designation: string;
  quote: string;
  src: string;
  company?: string;
}

const fallbackTestimonials: TestimonialItem[] = [
  {
    id: "fb-1",
    name: "Abhishek ub",
    designation: "Community Member",
    company: "KCC",
    quote: "Fast reply, always active.",
    src: "https://ui-avatars.com/api/?name=Abhishek+ub&background=F4A261&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-2",
    name: "Aljas",
    designation: "Community Member",
    company: "KCC",
    quote: "Beginner friendly.",
    src: "https://ui-avatars.com/api/?name=Aljas&background=E76F51&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-3",
    name: "Sameer Kongath",
    designation: "Community Member",
    company: "KCC",
    quote: "Always up to date with new tech stacks and updates.",
    src: "https://ui-avatars.com/api/?name=Sameer+Kongath&background=2A9D8F&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-4",
    name: "Jomon Thomas Lobo",
    designation: "Community Member",
    company: "KCC",
    quote: "The community-led projects are amazing to collaborate on.",
    src: "https://ui-avatars.com/api/?name=Jomon+Thomas+Lobo&background=E9C46A&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-5",
    name: "Anto Josu",
    designation: "Community Member",
    company: "KCC",
    quote: "The online meet is my favourite, got a chance to listen to advice from experienced people.",
    src: "https://ui-avatars.com/api/?name=Anto+Josu&background=FFB5A7&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-6",
    name: "Jaykrishna T J",
    designation: "Community Member",
    company: "KCC",
    quote: "Helping mentality of all the members in the group is top-notch.",
    src: "https://ui-avatars.com/api/?name=Jaykrishna+T+J&background=A5FFD6&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-7",
    name: "Hashmil Muhammed",
    designation: "Community Member",
    company: "KCC",
    quote: "The job opportunities provided here are exactly what I liked the most. I look forward to more such opportunities.",
    src: "https://ui-avatars.com/api/?name=Hashmil+Muhammed&background=F8AD9D&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-8",
    name: "Aksa Susan Abraham",
    designation: "Community Member",
    company: "KCC",
    quote: "I get exposed to tech stacks used by great developers here. Though I'm a newbie, I at least get to be familiar with new stacks from those dev conversations.",
    src: "https://ui-avatars.com/api/?name=Aksa+Susan+Abraham&background=A2D2FF&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-9",
    name: "Vijay",
    designation: "Community Member",
    company: "KCC",
    quote: "Lots of new informative and learning stuff is shared, and there are so many active and supportive members.",
    src: "https://ui-avatars.com/api/?name=Vijay&background=BDE0FE&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-10",
    name: "Rasheeque Ahammed Rahim",
    designation: "Community Member",
    company: "KCC",
    quote: "Doubt clearing and getting to learn more interesting topics.",
    src: "https://ui-avatars.com/api/?name=Rasheeque+Ahammed+Rahim&background=C8B6FF&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-11",
    name: "Muhammed Roshan",
    designation: "Community Member",
    company: "KCC",
    quote: "Surrounded by creative mindset people.",
    src: "https://ui-avatars.com/api/?name=Muhammed+Roshan&background=FFC6FF&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-12",
    name: "Affan",
    designation: "Community Member",
    company: "KCC",
    quote: "Fun, friendly, and highly supportive.",
    src: "https://ui-avatars.com/api/?name=Affan&background=E8F0FE&color=000&size=150&font-size=0.4&bold=true"
  },
  {
    id: "fb-13",
    name: "Rayhaan",
    designation: "Community Member",
    company: "KCC",
    quote: "I'm learning new stuff when people clear doubts of other people in the chat.",
    src: "https://ui-avatars.com/api/?name=Rayhaan&background=CAFFBF&color=000&size=150&font-size=0.4&bold=true"
  }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!database) {
      setLoading(false);
      return;
    }
    const testimonialsRef = ref(database, '1');
    const unsubscribe = onValue(testimonialsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const testimonialsList = Object.entries(data).map(([id, value]: [string, any], index) => {
          const avatarColors = ["F4A261", "E76F51", "2A9D8F", "E9C46A", "FFB5A7", "A5FFD6"];
          const bgColor = avatarColors[index % avatarColors.length];
          const name = value.name || "Anonymous";

          return {
            id,
            name: name,
            designation: value.designation || "Community Member",
            company: value.company || "Brand Partner",
            quote: value.testimonial || "No comment.",
            src: value.src || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bgColor}&color=000&size=500&font-size=0.4&bold=true`,
          };
        });

        testimonialsList.sort((a, b) => a.name.localeCompare(b.name));
        setTestimonials(testimonialsList);
      } else {
        setTestimonials([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase fetch error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;
  
  // Split into two rows
  const midIndex = Math.ceil(displayTestimonials.length / 2);
  const row1Items = displayTestimonials.slice(0, midIndex);
  const row2Items = displayTestimonials.slice(midIndex);

  // Duplicate each row content for infinite horizontal scrolling
  const marqueeRow1 = [...row1Items, ...row1Items, ...row1Items, ...row1Items];
  const marqueeRow2 = [...row2Items, ...row2Items, ...row2Items, ...row2Items];

  const getCardBgColor = (idx: number) => {
    const colors = [
      "bg-white",
      "bg-[#FFFBEB]", // amber
      "bg-[#E6F9F6]", // teal
      "bg-[#F5F3FF]", // violet
      "bg-[#FFF0F5]", // lavenderblush
    ];
    return colors[idx % colors.length];
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-left-anim {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right-anim {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .marquee-row-left {
          display: flex;
          gap: 1.75rem;
          width: max-content;
          animation: marquee-left-anim 45s linear infinite;
        }

        .marquee-row-right {
          display: flex;
          gap: 1.75rem;
          width: max-content;
          animation: marquee-right-anim 45s linear infinite;
        }

        .marquee-row-left:hover,
        .marquee-row-right:hover {
          animation-play-state: paused;
        }
      `}} />

      <section className="relative overflow-hidden bg-white border-t-4 border-black py-24 px-6 md:px-12" id="testimonials">
        <HexagonPattern
          radius={40}
          x={-1}
          y={-1}
          interactive
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
          )}
        />
        
        <div className="mx-auto max-w-[1280px] relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block border-[3px] border-black bg-[#FFE66D] px-4 py-1.5 text-xs font-black uppercase tracking-widest text-black shadow-[3px_3px_0px_rgba(0,0,0,1)] mb-4 -rotate-1">
              Feedback
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black leading-tight">
              Loved by the <span className="underline decoration-4 decoration-[#69faab] underline-offset-4">Community</span>
            </h2>
            <p className="mt-4 text-black/70 font-bold text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Kerala Coders Cafe is built on collaborations, shared knowledge, and opportunities. Here is what our members say about their experience in the hub.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="flex flex-col gap-8 w-full">
              
              {/* Row 1: Scrolling Left */}
              <div className="w-full overflow-hidden py-4 relative">
                {/* Horizontal Fade Gradients */}
                <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="marquee-row-left">
                  {marqueeRow1.map((item, idx) => {
                    const bgColor = getCardBgColor(idx);
                    return (
                      <div 
                        key={`${item.id}-nb-r1-${idx}`}
                        className={`${bgColor} border-[3px] border-black p-6 sm:p-7 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] transition-all duration-200 w-[300px] sm:w-[350px] shrink-0 flex flex-col justify-between cursor-default`}
                      >
                        <div className="mb-6">
                          {/* Bold Quote SVG */}
                          <svg className="w-8 h-8 text-black opacity-15 mb-3" fill="currentColor" viewBox="0 0 32 32">
                            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.2 1.8-4 4-4V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-2.2 1.8-4 4-4V8z"/>
                          </svg>
                          <p className="text-black font-extrabold text-xs sm:text-sm leading-relaxed line-clamp-4">
                            "{item.quote}"
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3 border-t-[2px] border-black/10 pt-4">
                          <img 
                            src={item.src} 
                            alt={item.name} 
                            className="w-10 h-10 rounded-full object-cover border-[2px] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-black text-black truncate capitalize">
                              {item.name}
                            </h4>
                            <p className="text-[10px] font-black text-black/60 truncate mt-0.5 uppercase tracking-wider">
                              {item.designation || item.company ? [item.company, item.designation].filter(Boolean).join(" / ") : "Community Member"}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Row 2: Scrolling Right */}
              <div className="w-full overflow-hidden py-4 relative">
                {/* Horizontal Fade Gradients */}
                <div className="absolute top-0 bottom-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="marquee-row-right">
                  {marqueeRow2.map((item, idx) => {
                    const bgColor = getCardBgColor(idx + 3); // shift color indexing
                    return (
                      <div 
                        key={`${item.id}-nb-r2-${idx}`}
                        className={`${bgColor} border-[3px] border-black p-6 sm:p-7 shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-x-1.5 hover:-translate-y-1.5 hover:shadow-[10px_10px_0px_rgba(0,0,0,1)] transition-all duration-200 w-[300px] sm:w-[350px] shrink-0 flex flex-col justify-between cursor-default`}
                      >
                        <div className="mb-6">
                          {/* Bold Quote SVG */}
                          <svg className="w-8 h-8 text-black opacity-15 mb-3" fill="currentColor" viewBox="0 0 32 32">
                            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H6c0-2.2 1.8-4 4-4V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-8c0-2.2 1.8-4 4-4V8z"/>
                          </svg>
                          <p className="text-black font-extrabold text-xs sm:text-sm leading-relaxed line-clamp-4">
                            "{item.quote}"
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-3 border-t-[2px] border-black/10 pt-4">
                          <img 
                            src={item.src} 
                            alt={item.name} 
                            className="w-10 h-10 rounded-full object-cover border-[2px] border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-black text-black truncate capitalize">
                              {item.name}
                            </h4>
                            <p className="text-[10px] font-black text-black/60 truncate mt-0.5 uppercase tracking-wider">
                              {item.designation || item.company ? [item.company, item.designation].filter(Boolean).join(" / ") : "Community Member"}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>
      </section>
    </>
  );
}

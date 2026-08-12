"use client";

import { Mic, Share2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface EventsProps {
  isDetailsPage?: boolean;
}

export default function Events({ isDetailsPage = false }: EventsProps) {
  const [copied, setCopied] = useState(false);


  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/events/sunday-meetup`;
      if (navigator.share) {
        await navigator.share({
          title: "KCC Sunday Online Meetup",
          text: "Join the KCC Sunday Online Meetup! Introduce your projects, network, and improve presentation skills.",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <section className="relative w-full wave-bg text-white py-16 px-4 md:px-12 overflow-x-hidden flex justify-center font-sans z-10">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&family=Archivo:wght@800;900&display=swap');
        .pixel-font { font-family: 'VT323', monospace; }
        .archivo-font { font-family: 'Archivo', sans-serif; }
        
        .wave-bg {
          background-color: #101012;
          background-image: 
            radial-gradient(120% 150% at 50% 10%, transparent 40%, rgba(153, 122, 222, 0.03) 50%, transparent 60%),
            radial-gradient(120% 150% at 50% 90%, transparent 40%, rgba(153, 122, 222, 0.03) 50%, transparent 60%);
          background-size: 100% 200px;
        }
        
        .starburst {
          background: #3b429e;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }
      `}</style>

      <div className="relative z-10 w-full max-w-[1000px] flex flex-col gap-12 md:gap-16">

        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative w-full">

          {/* Pixel decoration left */}
          <div className="absolute left-0 md:left-10 top-10 flex-col gap-1 hidden sm:flex">
            <div className="w-5 h-5 bg-white"></div>
            <div className="flex gap-1">
              <div className="w-5 h-5 bg-white"></div>
              <div className="w-5 h-5 bg-white"></div>
            </div>
          </div>

          <div className="flex flex-col items-center z-10 relative">
            <h2 className="text-[#9f84db] archivo-font font-black text-7xl md:text-[160px] lg:text-[200px] leading-none tracking-tighter uppercase">
              SUNDAY
            </h2>
            {/* Date Badge */}
            <div className="bg-[#101012] text-white border-[3px] border-white px-6 py-2 rounded-full font-sans font-black uppercase tracking-[0.2em] text-sm md:text-lg -mt-2 md:-mt-6 shadow-[6px_6px_0_0_#9f84db] rotate-[-2deg] z-20">
              AUGUST 16, 2026
            </div>
          </div>

          <div className="flex items-center justify-center w-32 h-20 md:w-40 md:h-24 rounded-[100%] border-[2px] border-white text-white rotate-[-10deg] backface-hidden transform-gpu absolute right-0 md:relative md:right-auto -top-4 md:top-auto md:-ml-8 z-20">
            <span className="text-center text-xs md:text-sm font-bold uppercase tracking-[0.2em] leading-tight">
              FREE<br />RSVP
            </span>
          </div>

          {/* Pixel decoration right */}
          <div className="absolute right-0 md:right-10 bottom-0 flex-col items-end gap-1 hidden sm:flex">
            <div className="flex gap-1">
              <div className="w-5 h-5 bg-white"></div>
              <div className="w-5 h-5 bg-white"></div>
            </div>
            <div className="w-5 h-5 bg-white mr-6"></div>
          </div>
        </div>

        {/* Meetup Title Badge */}
        <div className="w-full max-w-[1000px] mx-auto z-10 mt-8 text-center">
          <h3 className="archivo-font font-black text-2xl md:text-4xl uppercase tracking-widest text-white inline-block border-[3px] border-white px-6 py-3 shadow-[8px_8px_0_0_#9f84db] rotate-[-2deg] backface-hidden transform-gpu bg-[#101012]">
            🚀 OUR ONLINE MEETUP!
          </h3>
        </div>

        {/* Mobile View More Button */}
        {!isDetailsPage && (
          <div className="md:hidden flex justify-center pb-4 w-full relative z-20">
            <Link
              href="/events/sunday-meetup"
              className="bg-[#9f84db] text-white font-black uppercase tracking-widest px-8 py-4 rounded-full border-[3px] border-white shadow-[6px_6px_0_0_#fff] hover:translate-y-1 hover:shadow-none transition-all active:scale-95"
            >
              View More Details
            </Link>
          </div>
        )}

        {/* Middle Content (Hidden on mobile if not details page) */}
        <div className={`${!isDetailsPage ? "hidden md:flex" : "flex"} flex-col gap-12 md:gap-16 w-full max-w-[1000px] mx-auto z-10`}>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">

            {/* Card 1 */}
            <div className="bg-[#9f84db] text-black rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_0_#fff] border-[3px] border-white rotate-[-2deg] backface-hidden transform-gpu hover:rotate-0 hover:translate-y-[-5px] transition-all flex flex-col">
              <div className="pixel-font text-6xl mb-2 opacity-50">01</div>
              <p className="font-bold tracking-wider leading-relaxed text-sm md:text-base font-sans mt-auto">
                In this meetup, everyone will get a chance to introduce and explain their new or existing projects/products.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white text-black rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_0_#3b429e] border-[3px] border-[#3b429e] rotate-[1deg] backface-hidden transform-gpu hover:rotate-0 hover:translate-y-[-5px] transition-all flex flex-col">
              <div className="pixel-font text-6xl mb-2 text-[#3b429e] opacity-50">02</div>
              <p className="font-bold tracking-wider leading-relaxed text-sm md:text-base font-sans mt-auto">
                If you’re interested in presenting your project, contact the Admin. Based on your project, you’ll be invited to present it during the meetup. 🎤
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#3b429e] text-white rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_0_#9f84db] border-[3px] border-[#9f84db] rotate-[-1deg] backface-hidden transform-gpu hover:rotate-0 hover:translate-y-[-5px] transition-all flex flex-col">
              <div className="pixel-font text-6xl mb-2 opacity-50">03</div>
              <p className="font-bold tracking-wider leading-relaxed text-sm md:text-base font-sans mt-auto">
                We’re hoping for maximum participation! 🙌 This will be a great opportunity to share project insights, features & ideas, while improving communication and presentation skills.
              </p>
            </div>

          </div>

          {/* CTA Banner */}
          <div className="mx-4 bg-[#101012] border-[3px] border-[#9f84db] p-8 md:p-12 flex flex-col items-center justify-center text-center gap-8 shadow-[12px_12px_0_0_#3b429e] rounded-[2rem]">
            <p className="text-white archivo-font font-black text-xl md:text-2xl tracking-widest uppercase leading-snug max-w-2xl">
              Let’s get to know what projects/products everyone is working on! 🔥
            </p>
            <div className="flex flex-col gap-8 w-full items-center mt-4">
              {/* WhatsApp CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                <span className="text-white font-bold tracking-widest uppercase text-sm">
                  Get the Meet Link:
                </span>
                <a href="#" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#25D366] border-[3px] border-white text-black px-8 py-4 font-black uppercase tracking-widest text-sm hover:bg-white hover:text-[#25D366] transition-colors shadow-[6px_6px_0_0_#fff] rounded-full text-center">
                  JOIN WHATSAPP CHANNEL
                </a>
              </div>

              <div className="w-16 h-[2px] bg-white/20"></div>

              {/* Email CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                <span className="text-[#9f84db] font-bold tracking-widest uppercase text-sm">
                  Want to present?
                </span>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a href="mailto:Keralacoderscafe@gmail.com" className="flex-1 sm:flex-none inline-block bg-white border-[3px] border-[#3b429e] text-black px-6 py-3 font-black uppercase tracking-widest text-sm hover:bg-[#3b429e] hover:text-white transition-colors shadow-[4px_4px_0_0_#3b429e] rounded-full text-center">
                    Contact Admin
                  </a>
                  <button
                    onClick={handleShare}
                    className="flex-none bg-[#9f84db] text-white border-[3px] border-white p-3 rounded-full hover:bg-white hover:text-[#9f84db] transition-colors shadow-[4px_4px_0_0_#3b429e] relative group"
                    title="Share Event"
                  >
                    <Share2 className="w-5 h-5" strokeWidth={2.5} />
                    {copied && (
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap z-50">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section (Always visible) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 pt-8 w-full max-w-[1000px] mx-auto z-10">

          {/* Left: Graphic */}
          <div className="flex flex-col items-center lg:items-start relative w-full lg:w-[30%] mt-8 lg:mt-0">
            <div className="text-center lg:text-left mb-6 lg:ml-12">
              <p className="text-gray-300 archivo-font text-sm font-medium uppercase tracking-[0.15em] leading-relaxed">
                CODE, COFFEE &<br />NETWORKING
              </p>
            </div>

            <div className="relative w-48 h-48 flex items-center justify-center lg:ml-8">
              {/* Starburst */}
              <div className="absolute inset-0 starburst transform rotate-12 scale-[1.3] backface-hidden transform-gpu opacity-90"></div>

              {/* Mic outline */}
              <div className="relative z-10 w-[70px] h-[110px] border-[3px] border-white rounded-full flex flex-col items-center justify-center bg-[#9f84db] -mt-16">
                <Mic className="text-white w-10 h-10" strokeWidth={2} />
              </div>

              {/* Mic stand line */}
              <div className="absolute z-0 w-[3px] h-12 bg-white top-[70px]"></div>

              {/* Platform oval */}
              <div className="absolute top-[100px] w-24 h-8 border-[2px] border-[#9f84db] rounded-[100%] bg-transparent z-10"></div>

              {/* Date oval */}
              <div className="absolute -bottom-4 -left-6 w-36 h-16 border-[2px] border-white rounded-[100%] bg-[#101012] flex items-center justify-center rotate-[-15deg] backface-hidden transform-gpu z-20">
                <span className="pixel-font text-white text-3xl tracking-widest">THIS SUN</span>
              </div>
            </div>
          </div>

          {/* Middle: SHOW (MEETUP) text */}
          <div className="flex items-center gap-4 lg:gap-6 w-full lg:w-[40%] justify-center mt-4 lg:mt-0 lg:-ml-12">
            <div className="flex flex-col text-white opacity-60 font-medium text-xl leading-none font-sans tracking-widest text-right">
              <span>07</span>
              <span>PM</span>
            </div>
            <h2 className="pixel-font text-white text-[80px] sm:text-[110px] lg:text-[140px] leading-none tracking-tight">
              GOOGLE MEET

            </h2>
          </div>

          {/* Right: Blue Ticket */}
          <div className="w-full lg:w-[35%] flex justify-center lg:justify-end">
            <div className="bg-[#3b429e] rounded-3xl p-6 md:p-8 relative w-full max-w-[360px] text-white rotate-[2deg] backface-hidden transform-gpu shadow-xl">
              {/* Corner holes */}
              <div className="absolute top-4 left-4 w-4 h-4 bg-[#101012] rounded-full"></div>
              <div className="absolute top-4 right-4 w-4 h-4 bg-[#101012] rounded-full"></div>

              <h4 className="text-center font-bold uppercase tracking-widest text-sm mb-6 mt-4 opacity-90 font-sans border-b border-white/20 pb-4">
                PRESENTATION AGENDA:
              </h4>

              <div className="space-y-3 text-[10px] md:text-xs font-medium tracking-wide font-sans">
                <div className="flex gap-3 border-b border-white/10 pb-2">
                  <span className="opacity-70 font-bold">01.</span>
                  <p><strong className="text-white">Introduction</strong> – Introduce yourself and your project.</p>
                </div>
                <div className="flex gap-3 border-b border-white/10 pb-2">
                  <span className="opacity-70 font-bold">02.</span>
                  <p><strong className="text-white">Project Overview</strong> – Explain what it is and why you built it.</p>
                </div>
                <div className="flex gap-3 border-b border-white/10 pb-2">
                  <span className="opacity-70 font-bold">03.</span>
                  <p><strong className="text-white">Features</strong> – Highlight the main features of your project.</p>
                </div>
                <div className="flex gap-3 border-b border-white/10 pb-2">
                  <span className="opacity-70 font-bold">04.</span>
                  <p><strong className="text-white">Tech Stack</strong> – Mention the technologies/tools you used.</p>
                </div>
                <div className="flex gap-3 border-b border-white/10 pb-2">
                  <span className="opacity-70 font-bold">05.</span>
                  <p><strong className="text-white">Live Demo</strong> – Show how the project works.</p>
                </div>
                <div className="flex gap-3 border-b border-white/10 pb-2">
                  <span className="opacity-70 font-bold">06.</span>
                  <p><strong className="text-white">Challenges</strong> – Share main challenges & what you learned.</p>
                </div>
                <div className="flex gap-3 border-b border-white/10 pb-2">
                  <span className="opacity-70 font-bold">07.</span>
                  <p><strong className="text-white">Future Plans</strong> – Explain what you plan to improve or add.</p>
                </div>
                <div className="flex gap-3 pb-1">
                  <span className="opacity-70 font-bold">08.</span>
                  <p><strong className="text-white">Q&A</strong> – Answer questions from the participants.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}

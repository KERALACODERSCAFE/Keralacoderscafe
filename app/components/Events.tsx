"use client";

import { Video, Calendar, Users, Lightbulb, Target, ArrowRight, ArrowUpRight, ArrowDown, Clock, Coffee, Zap, Globe, X } from "lucide-react";
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
    <section className="relative w-full bg-[#111] text-white py-12 px-4 md:px-8 overflow-x-hidden flex justify-center z-10 selection:bg-[#ccff00] selection:text-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

        .font-archivo {
          font-family: 'Archivo', sans-serif;
        }

        .font-space {
          font-family: 'Space Mono', monospace;
        }

        .bg-grid {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        @keyframes vapour-rise {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(-8px); opacity: 0; }
        }

        .coffee-vapour path:nth-of-type(1) { animation: vapour-rise 2s infinite ease-in-out 0s; }
        .coffee-vapour path:nth-of-type(2) { animation: vapour-rise 2s infinite ease-in-out 0.4s; }
        .coffee-vapour path:nth-of-type(4) { animation: vapour-rise 2s infinite ease-in-out 0.8s; }

        @keyframes sunday-flash {
          0%, 100% { color: #f4f4f5; text-shadow: 4px 4px 0px rgba(0,0,0,0.5); }
          3% { color: #222; text-shadow: none; }
          6% { color: #f4f4f5; text-shadow: 4px 4px 0px rgba(0,0,0,0.5); }
          7% { color: #222; text-shadow: none; }
          8% { color: #f4f4f5; text-shadow: 4px 4px 0px rgba(0,0,0,0.5); }
          9% { color: #f4f4f5; text-shadow: 4px 4px 0px rgba(0,0,0,0.5); }
          10% { color: #333; text-shadow: none; }
          11% { color: #f4f4f5; text-shadow: 4px 4px 0px rgba(0,0,0,0.5); }
          50% { color: #f4f4f5; text-shadow: 4px 4px 0px rgba(0,0,0,0.5); }
          51% { color: #555; text-shadow: none; }
          52% { color: #f4f4f5; text-shadow: 4px 4px 0px rgba(0,0,0,0.5); }
          70% { color: #f4f4f5; text-shadow: 4px 4px 0px rgba(0,0,0,0.5); }
          71% { color: #111; text-shadow: none; }
          72% { color: #f4f4f5; text-shadow: 4px 4px 0px rgba(0,0,0,0.5); }
        }

        .flash-sunday {
          animation: sunday-flash 3s infinite;
        }

        #snake-pattern path { stroke: #7b61ff; stroke-width: 1px; }
        .snake-group { stroke: #000; }
        .snake {
          stroke-dasharray: 32 224;
          stroke-dashoffset: 256;
          animation: stroke-anim 4s steps(32) infinite;
        }
        @keyframes stroke-anim {
          to { stroke-dashoffset: 0; }
        }
        .snake-dot { animation: dot1 4s steps(1) infinite; }
        @keyframes dot1 { 
          0%, 26%, 91.1% { opacity: 1; }
          26.1%, 91% { opacity: 0; }
        }
        .dot-2 { animation-name: dot2; }
        @keyframes dot2 { 
          0%, 26%, 51%, 100% { opacity: 0; }
          26.1%, 50% { opacity: 1; }
        }
        .dot-3 { animation-name: dot3; }
        @keyframes dot3 { 
          0%, 50%, 92%, 100% { opacity: 0; }
          50.1%, 92% { opacity: 1; }
        }
      `}</style>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid z-0"></div>

      <div className="relative z-10 w-full max-w-[1000px] mx-auto border border-white/20 bg-[#121212] shadow-2xl flex flex-col font-space">
        
        {/* Top Navbar */}
        <div className="flex justify-between items-stretch border-b border-white/20 h-12">
          <div className="bg-[#7b61ff] px-4 md:px-6 flex items-center gap-3">
            <Video className="w-5 h-5 text-black" fill="currentColor" />
            <span className="font-bold text-white uppercase tracking-widest text-sm font-space">ONLINE MEETUP</span>
          </div>
          <div className="px-4 md:px-6 flex items-center gap-3 border-l border-white/20">
            <span className="font-bold text-[#7b61ff] uppercase tracking-widest text-xs md:text-sm">SAVE THE DATE</span>
            <X className="w-5 h-5 text-[#7b61ff]" />
          </div>
        </div>

        {/* Hero Title Section */}
        <div className="p-6 md:p-12 border-b border-white/20 relative">
          <div className="flex justify-between items-start">
            <div className="flex flex-col font-archivo font-black leading-[0.85] tracking-tighter">
              <h2 className="text-[60px] sm:text-[100px] md:text-[140px] text-[#f4f4f5] flash-sunday" style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.5)" }}>SUNDAY</h2>
              <h2 className="text-[60px] sm:text-[100px] md:text-[140px] text-[#7b61ff]" style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.5)" }}>MEETUP</h2>
            </div>
            
            {/* Right decorative area */}
            <div className="hidden md:flex flex-col items-end gap-12">
              <div className="flex items-start gap-8">
                <ArrowUpRight className="w-20 h-20 text-white stroke-[1]" />
                <div className="grid grid-cols-4 gap-3 opacity-40">
                  {[...Array(16)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>)}
                </div>
              </div>
              <div className="text-right font-archivo font-bold text-xl uppercase leading-tight mt-auto">
                <p className="text-white">LET'S BUILD.</p>
                <p className="text-white">SHARE.</p>
                <p className="text-[#ccff00]">GROW TOGETHER.</p>
                <div className="w-16 h-2 bg-[#ccff00] mt-3 ml-auto"></div>
              </div>
            </div>
          </div>

          {/* Date Badge */}
          <div className="mt-12 flex border border-[#ccff00] w-fit font-space">
            <div className="bg-[#ccff00] px-4 py-3 flex items-center justify-center border-r border-[#ccff00]">
              <Calendar className="w-7 h-7 text-black" strokeWidth={2.5} />
            </div>
            <div className="px-6 py-3 flex items-center justify-center">
              <span className="text-[#ccff00] font-bold text-lg md:text-xl uppercase tracking-widest">COMING SOON</span>
            </div>
          </div>
        </div>

        {/* View More Button (Visible on Home Page) */}
        {!isDetailsPage && (
          <div className="flex justify-center p-6 border-b border-white/20 w-full bg-[#121212]">
            <Link
              href="/events/sunday-meetup"
              className="w-full md:w-auto text-center bg-[#ccff00] text-black font-bold uppercase tracking-widest px-8 py-4 font-space hover:bg-white transition-colors"
            >
              View Full Details
            </Link>
          </div>
        )}

        {/* Main Content Body */}
        <div className={`${!isDetailsPage ? "hidden md:flex" : "flex"} flex-col w-full`}>

          {/* WHAT TO EXPECT Divider */}
          <div className="flex items-center p-6 md:p-8 gap-4 md:gap-8 border-b border-white/20">
            <div className="bg-white text-black px-4 py-2 font-bold uppercase tracking-widest text-xs md:text-sm whitespace-nowrap font-space">
              WHAT TO EXPECT?
            </div>
            <div className="h-px bg-white/30 flex-1"></div>
            <div className="text-white/50 text-2xl tracking-[0.3em] font-black hidden sm:block">////</div>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8 border-b border-white/20">
            
            {/* Card 1 */}
            <div className="border border-white/20 flex flex-col relative min-h-[320px] bg-[#121212]">
              <div className="flex justify-between items-start p-6">
                <div className="text-5xl font-archivo font-black text-black bg-[#ccff00] px-4 py-2">01</div>
                <Users className="w-12 h-12 text-[#ccff00]" strokeWidth={1.5} />
              </div>
              <div className="px-6 flex-1">
                <div className="w-8 h-1.5 mb-6 bg-[#ccff00]"></div>
                <p className="text-gray-300 font-space text-sm leading-relaxed">
                  In this session, everyone will get a chance to introduce themselves and share their projects/ideas.
                </p>
              </div>
              <div className="w-full h-4 bg-[#ccff00] mt-6"></div>
            </div>

            {/* Card 2 */}
            <div className="border border-white/20 flex flex-col relative min-h-[320px] bg-[#121212]">
              <div className="flex justify-between items-start p-6">
                <div className="text-5xl font-archivo font-black text-black bg-[#7b61ff] px-4 py-2">02</div>
                <Lightbulb className="w-12 h-12 text-[#7b61ff]" strokeWidth={1.5} />
              </div>
              <div className="px-6 flex-1">
                <div className="w-8 h-1.5 mb-6 bg-[#7b61ff]"></div>
                <p className="text-gray-300 font-space text-sm leading-relaxed">
                  If you're interested in promoting your project, contact the Admin. Short 5-7 min presentations will be hosted for you in this meetup. 🚀
                </p>
              </div>
              <div className="w-full h-4 bg-[#7b61ff] mt-6"></div>
            </div>

            {/* Card 3 */}
            <div className="border border-white/20 flex flex-col relative min-h-[320px] bg-[#121212]">
              <div className="flex justify-between items-start p-6">
                <div className="text-5xl font-archivo font-black text-black bg-[#ccff00] px-4 py-2">03</div>
                <Target className="w-12 h-12 text-[#ccff00]" strokeWidth={1.5} />
              </div>
              <div className="px-6 flex-1">
                <div className="w-8 h-1.5 mb-6 bg-[#ccff00]"></div>
                <p className="text-gray-300 font-space text-sm leading-relaxed">
                  We're looking for members participated 👑 This will be a great opportunity to share your knowledge, network & showcase your products/services.
                </p>
              </div>
              <div className="w-full h-4 bg-[#ccff00] mt-6"></div>
            </div>

          </div>

          {/* CTA Banner */}
          <div className="bg-[#7b61ff] flex flex-col lg:flex-row border-b border-white/20">
            
            {/* Left: Giant Asterisk */}
            <div className="hidden md:flex p-10 items-center justify-center border-r border-black/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -8 64 84" shapeRendering="crispEdges" className="w-[120px] h-[120px] lg:w-[150px] lg:h-[150px]">
                <defs>
                  <pattern id="snake-pattern" width="8" height="8" patternUnits="userSpaceOnUse" x="-4" y="-4">
                    <path d="M 0 0 L8 0 8 8 0 8 z" fill="none"></path>
                  </pattern>
                </defs>
                <g className="snake-group" strokeLinejoin="miter" strokeLinecap="square" strokeWidth="8" fill="none">
                  <path className="snake-dot dot-1" d="M28,48 l8,0z" />
                  <path className="snake-dot dot-2" d="M-4,48 l8,0z" />
                  <path className="snake-dot dot-3" d="M4,16 l8,0z" />
                  <path className="snake" d="M0 16 h48 v16 H32 v32 H0 V48 h16 V0 H0 v16"/>
                </g>
                <rect x="-4.5" y="-4.5" width="57" height="73" fill="url(#snake-pattern)"></rect>
              </svg>
            </div>
            
            {/* Middle: Text */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-black/20">
              <h3 className="font-archivo font-black text-3xl md:text-4xl lg:text-5xl text-black uppercase leading-tight tracking-tight">
                LET'S GET TO KNOW WHAT <br className="hidden md:block" />
                PROJECTS/PRODUCTS EVERYONE <br className="hidden md:block" />
                IS WORKING ON! 
                <span className="inline-flex bg-black p-2 ml-4 align-middle translate-y-[-4px]">
                  <Zap className="w-6 h-6 lg:w-8 lg:h-8 text-[#ccff00]" fill="currentColor" />
                </span>
              </h3>
            </div>

            {/* Right: Buttons */}
            <div className="p-8 md:p-12 flex flex-col justify-center gap-8 w-full lg:w-[400px]">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-black uppercase tracking-widest font-space">GET THE MEET LINK</span>
                <a 
                  href="https://whatsapp.com/channel/0029Vb7rrWPA2pLKAUOz4F29" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex justify-between items-center bg-[#ccff00] text-black font-bold px-5 py-4 uppercase text-sm border-2 border-transparent hover:border-black transition-all font-space"
                >
                  JOIN WHATSAPP CHANNEL <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-black uppercase tracking-widest font-space">WANT TO PRESENT?</span>
                <a 
                  href="mailto:Keralacoderscafe@gmail.com"
                  className="flex justify-between items-center bg-black text-white font-bold px-5 py-4 uppercase text-sm border-2 border-transparent hover:border-white hover:bg-[#111] transition-all font-space"
                >
                  CONTACT ADMIN <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Grid Layout */}
          <div className="flex flex-col md:flex-row border-b border-white/20">
            
            {/* Left Half (Google Meet & Time) */}
            <div className="w-full md:w-[45%] flex flex-col border-b md:border-b-0 md:border-r border-white/20">
              
              {/* Platform */}
              <div className="flex items-center gap-6 p-8 border-b border-white/20">
                <div className="bg-[#7b61ff] p-4 flex items-center justify-center">
                  <Video className="w-8 h-8 text-black" fill="currentColor" />
                </div>
                <div>
                  <div className="text-[10px] font-space tracking-widest text-white/60 mb-2 font-bold">PLATFORM</div>
                  <div className="text-2xl md:text-3xl font-bold font-space text-white">GOOGLE MEET</div>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-6 p-8 border-b border-white/20">
                <div className="bg-[#ccff00] p-4 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-black" fill="currentColor" />
                </div>
                <div>
                  <div className="text-[10px] font-space tracking-widest text-white/60 mb-2 font-bold">TIME</div>
                  <div className="text-3xl md:text-4xl font-bold font-space text-white">COMING SOON</div>
                  <div className="text-[#ccff00] text-sm font-space font-bold mt-2">TBA</div>
                </div>
              </div>

              {/* Coffee / Conversations */}
              <div className="flex items-center justify-between p-8">
                <div className="grid grid-cols-4 gap-4 opacity-30">
                  {[...Array(16)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>)}
                </div>
                <div className="flex items-center gap-5">
                  <div className="font-archivo font-bold text-[#ccff00] uppercase text-right leading-snug tracking-wide text-sm md:text-base">
                    <div>CODE.</div>
                    <div>COFFEE.</div>
                    <div>CONVERSATIONS.</div>
                  </div>
                  <Coffee className="w-10 h-10 md:w-12 md:h-12 text-[#ccff00] coffee-vapour" strokeWidth={1.5} />
                </div>
              </div>

            </div>

            {/* Right Half (Agenda) */}
            <div className="w-full md:w-[55%] flex bg-[#e5e5e5] text-black">
              
              <div className="flex-1 flex flex-col">
                {/* Agenda Header */}
                <div className="flex justify-between items-center border-b border-black/10">
                  <div className="p-6 md:p-8 font-archivo font-black text-2xl uppercase tracking-widest">AGENDA</div>
                  <div className="p-6 md:p-8 bg-[#7b61ff] border-l border-black/10 flex items-center justify-center">
                    <ArrowDown className="w-6 h-6 text-black" />
                  </div>
                </div>
                
                {/* Agenda List */}
                <div className="p-6 md:p-10 flex flex-col gap-2 font-space text-sm">
                  {[
                    { time: "07:00 PM", desc: "Welcome & Introductions" },
                    { time: "07:15 PM", desc: "Project Round - Quick Pitches" },
                    { time: "07:45 PM", desc: "Open Discussion & Feedback" },
                    { time: "08:15 PM", desc: "Networking & Q&A" },
                    { time: "08:45 PM", desc: "Announcements & Wrap-up" }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="flex items-center gap-6 py-4">
                        <span className="text-[#7b61ff] font-bold w-20 flex-shrink-0">{item.time}</span>
                        <div className="w-3 h-3 bg-[#7b61ff] flex-shrink-0"></div>
                        <span className="text-black font-bold opacity-80">{item.desc}</span>
                      </div>
                      {i !== 4 && <div className="w-full border-b border-black/15 border-dashed"></div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Vertical Yellow Strip */}
              <div className="w-12 md:w-16 bg-[#ccff00] border-l border-black/10 flex flex-col items-center justify-between py-6">
                <div className="writing-vertical font-archivo font-black text-black tracking-widest uppercase rotate-180 flex-1 flex items-center justify-center text-sm md:text-base">
                  LET'S GROW TOGETHER
                </div>
                <ArrowDown className="w-6 h-6 text-black mt-6" />
              </div>

            </div>

          </div>

          {/* Footer Ribbon */}
          <div className="flex items-stretch w-full">
            <div className="p-6 bg-[#7b61ff] flex items-center justify-center border-r border-white/20">
              <Globe className="w-6 h-6 text-black" />
            </div>
            
            <div className="p-6 flex-1 flex items-center justify-center text-center">
              <p className="font-space text-xs md:text-sm font-bold tracking-widest uppercase text-white/90">
                LET'S CONNECT, LEARN & BUILD AMAZING THINGS TOGETHER!
              </p>
            </div>
            
            <button 
              onClick={handleShare}
              className="p-6 bg-[#7b61ff] flex items-center justify-center border-l border-white/20 hover:bg-[#684be6] transition-colors cursor-pointer"
              title={copied ? "Copied!" : "Share Event"}
            >
              <ArrowUpRight className="w-6 h-6 text-black" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

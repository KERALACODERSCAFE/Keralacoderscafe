"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight, Heart, Users, User, MapPin, Calendar, Folder, Rocket, MessageSquare } from "lucide-react";
import { upvoteTeamMember } from "@/app/actions/upvote";

const skyBackgrounds = [
  "#000000",
  "linear-gradient(to bottom, #050505, #080808)",
  "linear-gradient(to bottom, #080808, #0a0a0a)",
  "linear-gradient(to bottom, #0a0a0a, #0c0c0c)",
  "linear-gradient(to bottom, #0c0c0c, #0f0f0f)",
  "linear-gradient(to bottom, #0f0f0f, #111111)",
  "linear-gradient(to bottom, #111111, #141414)",
  "linear-gradient(to bottom, #141414, #171717)",
  "linear-gradient(to bottom, #171717, #1a1a1a)",
  "linear-gradient(to bottom, #1a1a1a, #1c1c1c)",
  "linear-gradient(to bottom, #1c1c1c, #1f1f1f)",
  "linear-gradient(to bottom, #1f1f1f, #222222)",
  "linear-gradient(to bottom, #222222, #252525)",
  "linear-gradient(to bottom, #252525, #222222)",
  "linear-gradient(to bottom, #222222, #1f1f1f)",
  "linear-gradient(to bottom, #1f1f1f, #1c1c1c)",
  "linear-gradient(to bottom, #1c1c1c, #1a1a1a)",
  "linear-gradient(to bottom, #1a1a1a, #171717)",
  "linear-gradient(to bottom, #171717, #141414)",
  "linear-gradient(to bottom, #141414, #111111)",
  "linear-gradient(to bottom, #111111, #0f0f0f)",
  "linear-gradient(to bottom, #0f0f0f, #0c0c0c)",
  "linear-gradient(to bottom, #0c0c0c, #0a0a0a)",
  "linear-gradient(to bottom, #0a0a0a, #080808)",
  "#000000"
];

export default function Teams({ initialVotes = 0 }: { initialVotes?: number }) {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    setVotes(initialVotes);
  }, [initialVotes]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const voted = localStorage.getItem("teamVoted:akhil");
      if (voted) {
        setHasVoted(true);
      }
    }
  }, []);

  const handleLike = async () => {
    if (hasVoted || isVoting) return;
    
    setVotes((prev) => prev + 1);
    setHasVoted(true);
    setIsVoting(true);

    try {
      const res = await upvoteTeamMember("akhil");
      if (res.success && res.votes !== undefined) {
        setVotes(res.votes);
        localStorage.setItem("teamVoted:akhil", "true");
      } else {
        setVotes((prev) => prev - 1);
        setHasVoted(false);
      }
    } catch (err) {
      console.error("Failed to upvote:", err);
      setVotes((prev) => prev - 1);
      setHasVoted(false);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <section
      id="teams"
      className="relative px-6 py-20 lg:py-32 min-h-screen bg-black text-white font-sans overflow-hidden"
    >
      {/* Interactive Sky Background */}
      <div className="absolute inset-0 z-0 flex">
        {skyBackgrounds.map((bg, i) => (
          <div
            key={i}
            className="flex-1 h-full opacity-70 hover:opacity-100 active:absolute active:inset-0 active:opacity-100 active:z-[99] transition-opacity cursor-pointer"
            style={{ background: bg }}
          />
        ))}
      </div>

      {/* Background Decorative Elements */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: "radial-gradient(#000 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px"
        }}
      />
      <div className="absolute top-40 right-0 w-32 h-32 bg-black hidden xl:block" />
      <div className="absolute top-72 right-12 w-16 h-16 bg-black hidden xl:block" />
      <div className="absolute top-96 right-8 w-8 h-8 bg-[#C0FF00] hidden xl:block" />

      <div className="max-w-[1300px] mx-auto w-full grid grid-cols-1 xl:grid-cols-[540px_1fr] gap-10 xl:gap-16 relative z-10">
        
        {/* LEFT COLUMN - Sticky Profile Card */}
        <div className="xl:sticky xl:top-28 self-start pt-4 xl:pt-0">
          
          <div className="bg-[#111111] text-white rounded-2xl p-6 lg:p-10 flex flex-col gap-8 relative shadow-2xl">
            
            {/* Top Badges */}
            <div className="flex justify-between items-start">
              <div className="bg-[#C0FF00] text-black px-4 py-1.5 font-black uppercase tracking-wider text-[10px] rounded-sm">
                Available
              </div>
              <button 
                onClick={handleLike}
                disabled={hasVoted || isVoting}
                className="bg-transparent text-white px-4 py-2 flex items-center gap-2 border border-white/20 hover:border-white/40 rounded-lg transition-all cursor-pointer"
              >
                <Heart className={`w-3.5 h-3.5 ${hasVoted ? 'fill-white' : ''}`} />
                <span className="font-bold font-mono text-xs">{votes}</span>
              </button>
            </div>

            {/* Avatar & Bio */}
            <div className="flex flex-col xl:flex-row gap-8 items-center xl:items-start">
              
              {/* Avatar */}
              <div className="relative shrink-0 w-[200px] xl:w-[220px]">
                {/* Dot pattern */}
                <div 
                  className="absolute inset-0 -translate-x-8 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(#fff 1.5px, transparent 1.5px)",
                    backgroundSize: "12px 12px"
                  }}
                />
                {/* Green accent */}
                <div className="absolute inset-0 translate-y-6 -translate-x-4 bg-[#C0FF00] rounded-xl z-0" />
                <div className="w-full aspect-[4/5] bg-[#222] overflow-hidden relative z-10 rounded-xl">
                  <img 
                    src="/founder.jpg" 
                    alt="Akhil" 
                    className="w-full h-full object-cover object-top" 
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="flex flex-col gap-2 pt-2 text-center xl:text-left">
                <h3 className="text-xl tracking-tight text-white/80 font-medium">
                  Hi, I'm Akhil:
                </h3>
                <h2 className="text-3xl xl:text-[34px] font-black uppercase tracking-tight leading-[1.1] mt-2 mb-4">
                  Community <br className="hidden xl:block" />
                  <span className="text-[#C0FF00]">Builder</span> & <br className="hidden xl:block" />
                  Developer
                </h2>
                <p className="text-white/60 font-medium text-sm leading-relaxed">
                  I build developer communities that blend mentorship and collaboration, helping developers learn in public and ship real products together.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10 my-2" />

            {/* Info Grid */}
            <div className="grid grid-cols-3 gap-2 w-full">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-[#C0FF00]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-0.5">Role</span>
                  <span className="font-bold text-[11px] text-white/90">Founder,<br/>Kerala Coders Cafe</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#C0FF00]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-0.5">Location</span>
                  <span className="font-bold text-[11px] text-white/90">Kollam,<br/>Kerala</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-[#C0FF00]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-0.5">Member Since</span>
                  <span className="font-bold text-[11px] text-white/90">2023</span>
                </div>
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-wrap xl:flex-nowrap gap-3 mt-4 items-center">
              <div className="flex gap-2">
                <Link href="https://github.com/atomrobic" target="_blank" className="w-10 h-10 bg-[#222] rounded-lg text-white flex items-center justify-center hover:bg-white/10 transition-all">
                  <Github className="w-4 h-4" />
                </Link>
                <Link href="https://www.linkedin.com/in/akhil-a-7186052b5" target="_blank" className="w-10 h-10 bg-[#222] rounded-lg text-white flex items-center justify-center hover:bg-white/10 transition-all">
                  <Linkedin className="w-4 h-4" />
                </Link>
                <Link href="https://t.me/kerala_coders_cafe_akhil" target="_blank" className="w-10 h-10 bg-[#222] rounded-lg text-white flex items-center justify-center hover:bg-white/10 transition-all">
                  <Twitter className="w-4 h-4" />
                </Link>
                <Link href="mailto:keralacoderscafe@gmail.com" className="w-10 h-10 bg-[#222] rounded-lg text-white flex items-center justify-center hover:bg-white/10 transition-all">
                  <Mail className="w-4 h-4" />
                </Link>
              </div>

              <Link href="https://github.com/KERALACODERSCAFE" target="_blank" className="flex-1 min-w-[140px] bg-[#C0FF00] text-black rounded-lg flex items-center justify-center gap-2 px-4 py-3 font-black uppercase tracking-wider text-[10px] hover:brightness-110 transition-all">
                <span>View Contributions</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              
              <Link href="mailto:keralacoderscafe@gmail.com" className="flex-1 min-w-[140px] bg-transparent border border-white/20 rounded-lg text-white flex items-center justify-center gap-2 px-4 py-3 font-black uppercase tracking-wider text-[10px] hover:bg-white/5 transition-all">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Start A Conversation</span>
              </Link>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN - Main Content */}
        <div className="flex flex-col gap-10 mt-6 xl:mt-0 pb-20">
          
          {/* The Real Story */}
          <div className="bg-[#111111] rounded-2xl p-8 lg:p-12 relative overflow-hidden shadow-2xl border border-white/5">
            {/* Top Right Corner Decor */}
            <div className="absolute top-0 right-0 w-24 h-24">
              <div 
                className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#fff 1.5px, transparent 1.5px)",
                  backgroundSize: "8px 8px"
                }}
              />
              <div className="absolute top-0 right-0 w-12 h-12 bg-[#C0FF00]" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
            </div>

            <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tight text-white mb-8 relative z-10">
              The Real Story
            </h3>
            
            <div className="text-[15px] lg:text-base font-medium leading-relaxed text-white/70 space-y-6 relative z-10">
              <p>I graduated with a B.A. in History in 2020. Unsure about my future, I spent two years working in a small sales shop, knowing I wasn't growing.</p>
              
              <p>Determined to change my career, I tried different programs and dropped out twice. I worked part-time during the day to support myself and taught myself web development at night.</p>
              
              <p className="border-l-4 border-[#C0FF00] pl-6 py-2 my-8 text-white font-bold text-lg lg:text-xl">
                Everything changed when I discovered Telegram developer communities. They gave me the guidance, mentorship, and friendships I lacked.
              </p>
              
              <p>Through those connections, I finally landed my first job in the IT industry.</p>
              
              <h4 className="font-black text-white text-lg uppercase tracking-wider mt-10 mb-4">Connections can change lives.</h4>
              
              <p>Because of that, I started Kerala Coders Cafe. I wanted to build the kind of community that once helped me—a place where developers learn, support each other, and grow together without feeling alone.</p>
              
              <p>Today, seeing our members find jobs and help one another reminds me why I started this journey. Thank you for being part of it. ❤️</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

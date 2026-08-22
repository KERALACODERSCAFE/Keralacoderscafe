"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, TrendingUp, Sparkles, Plus } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";
import { memberProjectsData } from "@/lib/member-projects-data";
import { getProjectVotes, getUserVotedProjectIds } from "@/app/actions/upvote";

const memes = [
  { src: "https://res.cloudinary.com/ddtpurhae/image/upload/v1785135582/photo_2026-07-27_11-45-05_cjh0ie.jpg",  alt: "KCC Community", rotate: "-rotate-3", top: "top-6",  left: "left-[1%]" },
  { src: "https://res.cloudinary.com/ddtpurhae/image/upload/v1785135582/photo_2026-07-27_11-45-05_2_xqlats.jpg", alt: "KCC Meetup", rotate: "rotate-2",  top: "top-3",  left: "left-[17%]" },
  { src: "https://res.cloudinary.com/ddtpurhae/image/upload/v1785135582/photo_2026-07-27_11-45-05_3_r00rhn.jpg", alt: "Tech Discussion", rotate: "-rotate-1", top: "top-8",  left: "left-[33%]" },
  { src: "https://res.cloudinary.com/ddtpurhae/image/upload/v1785135582/photo_2026-07-27_12-29-25_bzsw83.jpg",  alt: "Networking", rotate: "rotate-3",  top: "top-4",  left: "left-[50%]" },
  { src: "https://res.cloudinary.com/ddtpurhae/image/upload/v1785135583/photo_2026-07-27_12-29-29_r0vigp.jpg",  alt: "Group Photo", rotate: "-rotate-2", top: "top-7",  left: "left-[66%]" },
  { src: "https://res.cloudinary.com/ddtpurhae/image/upload/v1785135582/photo_2026-07-27_11-45-04_wip9qk.jpg",  alt: "Event", rotate: "rotate-1",  top: "top-2",  left: "left-[82%]" },
];

export default function MemberProjects({ initialVotes, initialVotedProjects = [] }: { initialVotes?: Record<number, number>, initialVotedProjects?: number[] }) {

  const [isLoading, setIsLoading] = useState(!initialVotes || Object.keys(initialVotes).length === 0);
  const [votesMap, setVotesMap] = useState<Record<number, number>>(initialVotes || {});
  const [sortMode, setSortMode] = useState<"votes" | "new">("new");

  const [votedProjects, setVotedProjects] = useState<number[]>(initialVotedProjects);

  useEffect(() => {
    if (initialVotes && Object.keys(initialVotes).length > 0) {
      return;
    }
    async function loadData() {
      setIsLoading(true);
      try {
        const [votes, votedIds] = await Promise.all([
          getProjectVotes(),
          getUserVotedProjectIds()
        ]);
        setVotesMap(votes);
        setVotedProjects(votedIds || []);
      } catch (error) {
        console.error("Failed to load votes", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [initialVotes]);

  const sortedProjects = [...memberProjectsData]
    .sort((a, b) =>
      sortMode === "new"
        ? b.id - a.id
        : (votesMap[b.id] || 0) - (votesMap[a.id] || 0)
    )
    .slice(0, 7);

  const featuredProjects = useMemo(() => {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    const seed = d.getUTCFullYear() * 100 + weekNo;

    let value = seed;
    const prng = () => {
      value = (value * 9301 + 49297) % 233280;
      return value / 233280;
    };

    const shuffled = [...memberProjectsData];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(prng() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled.slice(0, 2).sort((a, b) => (votesMap[b.id] || 0) - (votesMap[a.id] || 0));
  }, [votesMap]);

  return (
    <section id="community-projects" className="scroll-mt-24 px-6 py-28 md:px-12 bg-[#FDFBF7] border-t-[3px] border-black relative overflow-hidden">

      {/* Pinned meme photos — corkboard style */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
        {memes.map((m) => (
          <div
            key={m.alt}
            className={cn(
              "absolute w-[140px] lg:w-[160px]",
              m.rotate, m.top, m.left
            )}
          >
            {/* Polaroid frame */}
            <div className="bg-white border-[2px] border-black/10 shadow-[4px_4px_12px_rgba(0,0,0,0.15)] p-2 pb-6">
              <Image
                src={m.src}
                alt={m.alt}
                width={160}
                height={130}
                className="w-full object-cover grayscale-[20%] opacity-80"
              />
            </div>
            {/* Push pin */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 border-[2px] border-black shadow-sm z-10" />
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-[1280px] relative z-10">

        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 relative">

          <svg className="absolute -top-10 left-1/2 w-16 h-16 text-[#42A5F5] fill-current animate-[spin_10s_linear_infinite] hidden md:block" viewBox="0 0 100 100">
            <path d="M50 0L60 35L95 35L65 55L75 90L50 70L25 90L35 55L5 35L40 35Z" />
          </svg>

          <div>
            <div className="inline-block border-[3px] border-black bg-[#A18CE5] px-4 py-1 text-xs font-black uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 rounded-full">
              MEMBER SHOWCASE
            </div>
            <h2 className="text-[clamp(3rem,6vw,5.5rem)] font-black uppercase tracking-tight text-black leading-[0.9]">
              Projects By
              <br />
              <span className="relative inline-block mt-3">
                <span className="relative z-10 bg-[#FFD166] border-[4px] border-black px-6 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-md inline-block -rotate-2 text-[clamp(1.5rem,4vw,3.5rem)]">
                  Community Members
                </span>
                <svg className="absolute -bottom-6 -right-12 w-16 h-16 text-[#A18CE5] z-0 -rotate-12" viewBox="0 0 100 100" fill="currentColor" stroke="black" strokeWidth="4">
                  <path d="M0 0 L100 50 L0 100 Z" />
                </svg>
              </span>
            </h2>
          </div>
          <p className="max-w-md text-black/80 font-bold text-lg border-l-4 border-black pl-4">
            Discover the amazing open-source tools, libraries, and self projects shipped by developers in the KCC community.
            <br className="mb-2" />
            <span className="text-black font-extrabold underline decoration-[#FFD166] decoration-4">Add your project too, and get featured here!</span>
          </p>
        </div>

        {/* Featured Projects Section */}
        <div className="w-full max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-2xl font-black uppercase tracking-tight text-black">Featured</h3>
            <div className="flex-1 h-[3px] bg-black/10 rounded-full" />
          </div>
          
          <p className="text-black/70 font-bold mb-6 text-[15px] border-l-4 border-[#A5FFD6] pl-3 py-1">
            Hey Coders! We want to see what you've been building. Submit your projects here to be featured in the Kerala Coders Cafe showcase. Whether it's an early-stage concept or a fully deployed application, drop your details below to inspire others and get feedback.
          </p>

          <div className="flex flex-col gap-4">
            {isLoading ? (
               Array.from({ length: 2 }).map((_, i) => (
                 <div key={i} className="bg-concrete shadow-concrete rounded-2xl p-4 h-[120px] w-full animate-pulse">
                   <div className="w-full h-full bg-black/10 rounded-xl"></div>
                 </div>
               ))
            ) : (
               featuredProjects.map((project, index) => (
                 <ProjectCard
                   key={`featured-${project.id}`}
                   project={project}
                   initialVotes={votesMap[project.id] || 0}
                   initialHasVoted={votedProjects.includes(project.id)}
                   isTopProject={true}
                 />
               ))
            )}
            
            {/* Plus Card */}
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSeeHzA9LoWRRBOkqAYeXTNQnce6RSUi1uf1xZYVhIVKLBJz7Q/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col md:flex-row items-center justify-center bg-white border-[3px] border-dashed border-black/30 rounded-[2rem] hover:border-black hover:bg-[#A5FFD6]/20 transition-all duration-300 p-6 gap-4 w-full cursor-pointer hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
               <div className="w-12 h-12 rounded-full border-[3px] border-black flex items-center justify-center bg-[#FFD166] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:scale-110 transition-transform">
                 <Plus className="w-6 h-6 text-black" strokeWidth={3} />
               </div>
               <span className="text-xl font-black tracking-tight text-black uppercase">Submit Your Project</span>
            </Link>
          </div>
        </div>

        {/* Regular Projects Section Header */}
        <div className="flex items-center gap-4 w-full max-w-4xl mx-auto mb-6 mt-16">
            <h3 className="text-2xl font-black uppercase tracking-tight text-black">More Projects</h3>
            <div className="flex-1 h-[3px] bg-black/10 rounded-full" />
        </div>

        {/* Sort Toggle */}
        <div className="flex items-center gap-3 w-full max-w-4xl mx-auto mb-6">
          <div className="flex items-center gap-1 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl p-1">
            <button
              onClick={() => setSortMode("votes")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg border-[2px] transition-all",
                sortMode === "votes"
                  ? "bg-[#FFD166] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black"
                  : "bg-transparent border-transparent text-black/40 hover:text-black"
              )}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Top Voted
            </button>
            <button
              onClick={() => setSortMode("new")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg border-[2px] transition-all",
                sortMode === "new"
                  ? "bg-[#A5FFD6] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black"
                  : "bg-transparent border-transparent text-black/40 hover:text-black"
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Latest
            </button>
          </div>
          <div className="flex-1 h-[3px] bg-transparent rounded-full" />
          <span className="text-xs font-black text-black/40 uppercase tracking-widest">
            {memberProjectsData.length} projects
          </span>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-concrete shadow-concrete rounded-2xl p-4 h-[120px] w-full animate-pulse">
                <div className="w-full h-full bg-black/10 rounded-xl"></div>
              </div>
            ))
          ) : (
            sortedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                initialVotes={votesMap[project.id] || 0}
                initialHasVoted={votedProjects.includes(project.id)}
                isTopProject={sortMode === "votes" && index < 3}
              />
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/projects"
            className="inline-flex h-16 items-center justify-center gap-3 border-[3px] border-black bg-[#A18CE5] px-8 text-lg font-black uppercase text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all w-full sm:w-auto rounded-xl cursor-pointer"
          >
            See All Projects
          </Link>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSeeHzA9LoWRRBOkqAYeXTNQnce6RSUi1uf1xZYVhIVKLBJz7Q/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-16 items-center justify-center gap-3 border-[3px] border-black bg-white px-8 text-lg font-black uppercase text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all w-full sm:w-auto rounded-xl"
          >
            Submit Project <ExternalLink className="w-5 h-5 stroke-[3]" />
          </Link>
        </div>

      </div>
    </section>
  );
}

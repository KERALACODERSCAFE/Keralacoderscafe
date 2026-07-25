"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { GridPattern } from "./GridPattern";
import { cn } from "@/lib/utils";
import { memberProjectsData } from "@/lib/member-projects-data";
import { getProjectVotes } from "@/app/actions/upvote";

export default function MemberProjects({ initialVotes }: { initialVotes?: Record<number, number> }) {

  const [isLoading, setIsLoading] = useState(!initialVotes || Object.keys(initialVotes).length === 0);
  const [votesMap, setVotesMap] = useState<Record<number, number>>(initialVotes || {});

  useEffect(() => {
    if (initialVotes && Object.keys(initialVotes).length > 0) {
      return;
    }
    async function loadVotes() {
      setIsLoading(true);
      try {
        const votes = await getProjectVotes();
        setVotesMap(votes);
      } catch (error) {
        console.error("Failed to load votes", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadVotes();
  }, [initialVotes]);

  return (
    <section id="community-projects" className="scroll-mt-24 px-6 py-28 md:px-12 bg-[#FDFBF7] border-t-[3px] border-black relative overflow-hidden">

      {/* Playful Memphis Grid Pattern */}
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom,white,transparent)]",
          "opacity-60 stroke-[#FF8C42]/40 fill-transparent"
        )}
      />

      <div className="mx-auto max-w-[1280px] relative z-10">

        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 relative">

          {/* Decorative squiggles and stars could go here */}
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
                {/* Decorative purple arrow behind text */}
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

        {/* Project Cards Grid */}
        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
          {isLoading ? (
            // Skeleton Loaders
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-concrete shadow-concrete rounded-2xl p-4 h-[120px] w-full animate-pulse">
                <div className="w-full h-full bg-black/10 rounded-xl"></div>
              </div>
            ))
          ) : (
            [...memberProjectsData]
              .sort((a, b) => (votesMap[b.id] || 0) - (votesMap[a.id] || 0))
              .slice(0, 7)
              .map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                initialVotes={votesMap[project.id] || 0} 
                isTopProject={index < 3}
              />
            ))
          )}
        </div>

        {/* Action Buttons Row */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/projects"
            className="inline-flex h-16 items-center justify-center gap-3 border-[3px] border-black bg-[#A18CE5] px-8 text-lg font-black uppercase text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all w-full sm:w-auto rounded-xl cursor-pointer"
          >
            See More Projects
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

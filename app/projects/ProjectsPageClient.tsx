"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { memberProjectsData } from "@/lib/member-projects-data";
import { cn } from "@/lib/utils";
import { getProjectVotes, getUserVotedProjectIds } from "@/app/actions/upvote";
import { TrendingUp, Sparkles } from "lucide-react";
import Image from "next/image";

const memes = [
  { src: "https://res.cloudinary.com/ddtpurhae/image/upload/v1785135582/photo_2026-07-27_11-45-05_cjh0ie.jpg",  alt: "KCC Community", rotate: "-rotate-3", top: "top-6",  left: "left-[1%]" },
  { src: "https://res.cloudinary.com/ddtpurhae/image/upload/v1785135582/photo_2026-07-27_11-45-05_2_xqlats.jpg", alt: "KCC Meetup", rotate: "rotate-2",  top: "top-3",  left: "left-[17%]" },
  { src: "https://res.cloudinary.com/ddtpurhae/image/upload/v1785135582/photo_2026-07-27_11-45-05_3_r00rhn.jpg", alt: "Tech Discussion", rotate: "-rotate-1", top: "top-8",  left: "left-[33%]" },
  { src: "https://res.cloudinary.com/ddtpurhae/image/upload/v1785135582/photo_2026-07-27_12-29-25_bzsw83.jpg",  alt: "Networking", rotate: "rotate-3",  top: "top-4",  left: "left-[50%]" },
  { src: "https://res.cloudinary.com/ddtpurhae/image/upload/v1785135583/photo_2026-07-27_12-29-29_r0vigp.jpg",  alt: "Group Photo", rotate: "-rotate-2", top: "top-7",  left: "left-[66%]" },
  { src: "https://res.cloudinary.com/ddtpurhae/image/upload/v1785135582/photo_2026-07-27_11-45-04_wip9qk.jpg",  alt: "Event", rotate: "rotate-1",  top: "top-2",  left: "left-[82%]" },
];

interface ProjectsPageClientProps {
  initialVotes?: Record<number, number>;
  initialVotedProjects?: number[];
}

export default function ProjectsPageClient({ initialVotes, initialVotedProjects = [] }: ProjectsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortMode, setSortMode] = useState<"votes" | "new">("new");
  const [votesMap, setVotesMap] = useState<Record<number, number>>(initialVotes || {});
  const newAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#new") {
      setSortMode("new");
      setTimeout(() => {
        newAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, []);

  const [votedProjects, setVotedProjects] = useState<number[]>(initialVotedProjects);

  useEffect(() => {
    if (initialVotes && Object.keys(initialVotes).length > 0) return;
    async function loadData() {
      try {
        const [votes, votedIds] = await Promise.all([
          getProjectVotes(),
          getUserVotedProjectIds()
        ]);
        setVotesMap(votes);
        setVotedProjects(votedIds || []);
      } catch (error) {
        console.error("Failed to load data", error);
      }
    }
    loadData();
  }, [initialVotes]);

  const categories = useMemo(() => {
    const cats = new Set(memberProjectsData.map(p => p.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    const projects = selectedCategory === "All"
      ? [...memberProjectsData]
      : memberProjectsData.filter(p => p.category === selectedCategory);

    if (sortMode === "new") {
      return projects.sort((a, b) => b.id - a.id);
    }
    return projects.sort((a, b) => (votesMap[b.id] || 0) - (votesMap[a.id] || 0));
  }, [selectedCategory, votesMap, sortMode]);

  return (
    <main className="relative z-10 flex flex-col min-h-screen bg-[#FDFBF7]">
      {/* Pinned meme photos — corkboard style */}
      <div className="absolute inset-0 pointer-events-none z-0 hidden md:block overflow-hidden">
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
      <div className="flex-grow flex flex-col items-center pt-32 pb-20 px-6 text-center max-w-[1280px] mx-auto w-full relative z-10">
        <span className="inline-block border-[3px] border-black bg-[#A5FFD6] px-4 py-1 text-xs font-black uppercase tracking-widest text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 rounded-full">
          Projects Directory
        </span>
        <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-black uppercase tracking-[-0.05em] text-black mb-8 leading-[0.9]">
          Projects By
          <span className="ml-4 inline-flex items-center gap-3 bg-[#FFD166] border-[4px] border-black px-4 py-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-2 rounded-md text-[clamp(2rem,4vw,4rem)]">
            Community Members
            <span className="relative flex h-5 w-5 mt-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-black"></span>
            </span>
          </span>
        </h1>
        <p className="max-w-[620px] text-xl font-bold leading-relaxed text-black/80 border-l-4 border-black pl-6 mb-12 text-left">
          Discover the amazing open-source tools, libraries, and self projects shipped by developers in the KCC community.
        </p>

        {/* Sort Toggle */}
        <div ref={newAnchorRef} id="new" className="scroll-mt-28 flex items-center gap-3 mb-10 bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl p-1.5">
          <button
            onClick={() => setSortMode("new")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 text-sm font-black uppercase tracking-wider rounded-lg border-[2px] transition-all",
              sortMode === "new"
                ? "bg-[#A5FFD6] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                : "bg-transparent border-transparent text-black/50 hover:text-black"
            )}
          >
            <Sparkles className="w-4 h-4" />
            Latest
          </button>
          <button
            onClick={() => setSortMode("votes")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 text-sm font-black uppercase tracking-wider rounded-lg border-[2px] transition-all",
              sortMode === "votes"
                ? "bg-[#FFD166] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                : "bg-transparent border-transparent text-black/50 hover:text-black"
            )}
          >
            <TrendingUp className="w-4 h-4" />
            Top Voted
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat as string}
              onClick={() => setSelectedCategory(cat as string)}
              className={cn(
                "px-5 py-2 text-sm font-black uppercase tracking-wider border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none",
                selectedCategory === cat
                  ? "bg-[#FFD166] text-black"
                  : "bg-white text-black"
              )}
            >
              {cat as string}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto mb-20">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              initialVotes={votesMap[project.id] || 0}
              initialHasVoted={votedProjects.includes(project.id)}
              isTopProject={sortMode === "votes" && index < 3}
            />
          ))}
        </div>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeeHzA9LoWRRBOkqAYeXTNQnce6RSUi1uf1xZYVhIVKLBJz7Q/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-16 items-center justify-center gap-3 border-[3px] border-black bg-white px-8 text-lg font-black uppercase text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all rounded-xl"
        >
          Submit Your Project
        </a>
      </div>
      <Footer />
    </main>
  );
}

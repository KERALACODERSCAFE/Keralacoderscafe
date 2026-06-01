import type { Metadata } from "next";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import { memberProjectsData } from "@/lib/member-projects-data";

export const metadata: Metadata = {
  title: "Community Projects",
  description: "Explore all open-source projects and ideas from the KCC community.",
};

export default function ProjectsPage() {
  return (
    <main className="relative z-10 flex flex-col min-h-screen bg-[#FDFBF7]">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundColor: '#e5e5f7',
          opacity: 0.4,
          backgroundImage: 'repeating-radial-gradient( circle at 0 0, transparent 0, #e5e5f7 10px ), repeating-linear-gradient( #4ede8b55, #4ede8b )',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)'
        }}
      />
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
        <p className="max-w-[620px] text-xl font-bold leading-relaxed text-black/80 border-l-4 border-black pl-6 mb-16 text-left">
          Discover the amazing open-source tools, libraries, and self projects shipped by developers in the KCC community.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto mb-20">
          {memberProjectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
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

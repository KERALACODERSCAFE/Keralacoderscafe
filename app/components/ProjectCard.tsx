"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Github, ArrowRight, Sparkles, X, Eye } from "lucide-react";
import UpvoteButton from "./UpvoteButton";

export default function ProjectCard({ project, initialVotes = 0, initialHasVoted = false, isTopProject = false }: { project: any, initialVotes?: number, initialHasVoted?: boolean, isTopProject?: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const githubUsername = project.github ? project.github.split('github.com/')[1]?.split('/')[0] : null;

  return (
    <>
      <div className="group relative flex flex-col md:flex-row items-start md:items-center bg-white border-[3px] border-black rounded-[2rem] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-4 md:p-5 gap-4 md:gap-6 w-full mb-2">
        
        {/* 1. Category Pill (Leftmost on desktop) */}
        <div className="hidden md:flex w-[140px] shrink-0 justify-center">
          <div className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border-[2px] border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${project.pillColor || "bg-[#E0F2FE]"} text-black text-center whitespace-nowrap`}>
            {project.category || "PROJECT"}
          </div>
        </div>

        {/* 2. Icon (Circle with background color) */}
        <div className="flex shrink-0 items-center justify-center relative">
          <div className={`w-14 h-14 md:w-16 md:h-16 border-[3px] border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center bg-white z-10 overflow-hidden relative`}>
             <div className={`absolute inset-0 opacity-20 ${project.windowColor || "bg-gray-200"}`} />
             {project.icon && (
               <project.icon className={`w-7 h-7 md:w-8 md:h-8 text-black relative z-10 drop-shadow-[1px_1px_0_rgba(0,0,0,0.1)] ${project.animationClass || ""}`} strokeWidth={2.5} />
             )}
          </div>
        </div>

        {/* 3. Content (Name, Description, Tags) */}
        <div className="flex flex-col flex-grow min-w-0 py-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-xl md:text-2xl font-black tracking-tight text-black truncate">
              {project.name}
            </h3>
            {isTopProject && (
              <span className="flex items-center gap-1 bg-[#FFD166] text-black border-[2px] border-black rounded-full px-2.5 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[10px] md:text-xs font-black uppercase tracking-widest">
                <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" /> Featured
              </span>
            )}
          </div>
          <p className="text-black/70 font-bold text-sm md:text-[15px] leading-snug line-clamp-2 md:line-clamp-1 mb-3">
            {project.description}
          </p>

          {/* Small tags below description */}
          <div className="flex flex-wrap items-center gap-2 mt-auto">
            <span className="bg-gray-100 border-[2px] border-black px-2 py-0.5 rounded-md shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-[9px] md:text-[10px] font-black uppercase tracking-wider text-black">
              {project.category || "APP"}
            </span>
            <span className="bg-white border-[2px] border-black px-2 py-0.5 rounded-full shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] text-[10px] font-bold text-black flex items-center gap-1">
              <span className="w-3 h-3 rounded-full border border-black overflow-hidden bg-gray-200 shrink-0">
                 {githubUsername && <img src={`https://github.com/${githubUsername}.png`} alt={project.author} className="w-full h-full object-cover" />}
              </span>
              {project.author || "Maker"}
            </span>
          </div>
        </div>

        {/* 4. Actions (Right side) */}
        <div className="shrink-0 flex items-center gap-3 md:gap-4 mt-2 md:mt-0 w-full md:w-auto justify-between md:justify-end border-t-2 md:border-t-0 border-black/10 pt-4 md:pt-0 border-dashed">
          <UpvoteButton projectId={project.id} initialVotes={initialVotes} initialHasVoted={initialHasVoted} isTopProject={isTopProject} />
          
          <div className="flex items-center gap-2">
            {isTopProject && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center gap-2 px-3 h-10 bg-[#E0F2FE] border-[2px] border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all text-black font-bold text-xs"
                title="View Details"
              >
                <Eye className="w-4 h-4" strokeWidth={2.5} /> View
              </button>
            )}
            {project.github && (
              <Link
                href={project.github}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-white border-[2px] border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all text-black"
                title="GitHub"
              >
                <Github className="w-4 h-4" strokeWidth={2.5} />
              </Link>
            )}
            {project.link && (
              <Link
                href={project.link}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-white border-[2px] border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all text-black"
                title="Visit Project"
              >
                <ArrowRight className="w-4 h-4 -rotate-45" strokeWidth={2.5} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div 
            className="relative w-full max-w-2xl bg-white border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center bg-white border-[2px] border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all text-black z-10"
            >
              <X className="w-5 h-5" strokeWidth={3} />
            </button>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 md:gap-6">
                <div className={`w-20 h-20 md:w-24 md:h-24 shrink-0 border-[3px] border-black rounded-[1.5rem] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center bg-white z-10 overflow-hidden relative`}>
                   <div className={`absolute inset-0 opacity-20 ${project.windowColor || "bg-gray-200"}`} />
                   {project.icon && (
                     <project.icon className={`w-10 h-10 md:w-12 md:h-12 text-black relative z-10 drop-shadow-[1px_1px_0_rgba(0,0,0,0.1)]`} strokeWidth={2.5} />
                   )}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="flex items-center gap-1 bg-[#FFD166] text-black border-[2px] border-black rounded-full px-3 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[10px] md:text-xs font-black uppercase tracking-widest">
                      <Sparkles className="w-3 h-3 md:w-4 md:h-4" /> Featured
                    </span>
                    <span className={`px-3 py-1 text-[10px] md:text-xs font-black uppercase tracking-widest border-[2px] border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${project.pillColor || "bg-[#E0F2FE]"} text-black whitespace-nowrap`}>
                      {project.category || "PROJECT"}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black">
                    {project.name}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-gray-200 shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                   {githubUsername ? (
                     <img src={`https://github.com/${githubUsername}.png`} alt={project.author} className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">{project.author?.charAt(0)}</div>
                   )}
                </div>
                <div>
                  <p className="text-xs font-black text-black/50 uppercase tracking-wider">Built by</p>
                  <p className="font-bold text-black text-lg leading-tight">{project.author}</p>
                </div>
              </div>

              <div className="w-full h-[2px] bg-black/10 my-2"></div>

              <div>
                <h4 className="text-sm font-black text-black/50 uppercase tracking-widest mb-3">About the Project</h4>
                <p className="text-black font-bold text-lg leading-relaxed whitespace-pre-line">
                  {project.longDescription || project.description}
                </p>
              </div>

              <div className="w-full h-[2px] bg-black/10 my-2"></div>

              <div className="flex flex-wrap gap-4 pt-2">
                {project.link && (
                  <Link
                    href={project.link}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] flex items-center justify-center gap-3 px-6 py-4 bg-[#A5FFD6] border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-black font-black uppercase tracking-wider"
                  >
                    Visit Website <ExternalLink className="w-5 h-5" strokeWidth={3} />
                  </Link>
                )}
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 min-w-[200px] flex items-center justify-center gap-3 px-6 py-4 bg-white border-[3px] border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-black font-black uppercase tracking-wider"
                  >
                    <Github className="w-5 h-5" strokeWidth={3} /> GitHub Repo
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          <div className="absolute inset-0 z-[-1]" onClick={() => setIsModalOpen(false)}></div>
        </div>
      )}
    </>
  );
}



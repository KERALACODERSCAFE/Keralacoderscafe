import Link from "next/link";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import UpvoteButton from "./UpvoteButton";

export default function ProjectCard({ project, initialVotes = 0, initialHasVoted = false, isTopProject = false }: { project: any, initialVotes?: number, initialHasVoted?: boolean, isTopProject?: boolean }) {
  const githubUsername = project.github ? project.github.split('github.com/')[1]?.split('/')[0] : null;

  return (
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
        <h3 className="text-xl md:text-2xl font-black tracking-tight text-black truncate mb-1">
          {project.name}
        </h3>
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
  );
}



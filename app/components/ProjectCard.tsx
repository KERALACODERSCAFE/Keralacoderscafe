import Link from "next/link";
import { ExternalLink, Github, Mail } from "lucide-react";
import type { MemberProject } from "@/lib/member-projects-data";

export default function ProjectCard({ project }: { project: MemberProject }) {
  return (
    <div className="group relative flex flex-col h-full bg-[#F2E8D9] border-[3px] sm:border-[4px] border-black rounded-2xl sm:rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[14px_14px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      
      {/* Hanging Tag - Hidden on mobile, visible on sm+ */}
      <div className={`hidden sm:flex absolute top-0 right-6 z-20 border-l-[4px] border-r-[4px] border-b-[4px] border-black rounded-b-xl px-3 pt-8 pb-3 min-w-[80px] ${project.pillColor} items-end justify-center`}>
        <span className="font-black text-black text-xs whitespace-nowrap tracking-wide">
          @{project.author.replace(' ', '').toLowerCase()}
        </span>
      </div>

      {/* MOBILE LIST VIEW */}
      <div className="flex sm:hidden items-center p-4 gap-4 relative z-10 w-full h-full">
        {/* Small Icon */}
        <div className={`shrink-0 w-16 h-16 border-[3px] border-black rounded-xl overflow-hidden bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center relative`}>
           <div className={`absolute w-12 h-12 rounded-full ${project.pillColor} blur-md opacity-80`} />
           {project.icon && (
             <project.icon className="w-8 h-8 text-black relative z-10 drop-shadow-[2px_2px_0_rgba(0,0,0,0.2)]" strokeWidth={2} />
           )}
        </div>
        
        {/* Info */}
        <div className="flex flex-col flex-grow min-w-0">
          <h3 className="text-xl font-black tracking-tight text-black truncate">
            {project.name}
          </h3>
          <p className="text-black/80 font-bold text-xs truncate">
            by {project.author}
          </p>
          <p className="text-black font-semibold text-sm leading-snug mt-1 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Action Link (Just External Link for space saving on mobile list) */}
        <div className="shrink-0">
           <Link
             href={project.link}
             target="_blank" rel="noopener noreferrer"
             className="flex items-center justify-center w-10 h-10 bg-[#FFD166] border-[3px] border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all text-black"
           >
             <ExternalLink className="w-4 h-4 stroke-[3]" />
           </Link>
        </div>
      </div>

      {/* DESKTOP CARD VIEW */}
      <div className="hidden sm:flex flex-col flex-grow relative z-10 p-6">
        <h3 className="text-2xl font-black tracking-tight text-black leading-tight mb-4 pr-20 text-left">
          {project.name}
        </h3>

        {/* Icon Section */}
        <div className={`relative w-full h-40 border-[4px] border-black rounded-xl overflow-hidden bg-white mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center transition-all duration-500`}>
          <div className={`absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent bg-[length:10px_10px]`} />
          <div className={`absolute w-24 h-24 rounded-full ${project.pillColor} blur-xl opacity-80 group-hover:scale-150 transition-transform duration-700`} />
          {project.icon && (
            <project.icon className="w-20 h-20 text-black relative z-10 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 drop-shadow-[4px_4px_0_rgba(0,0,0,0.2)]" strokeWidth={2} />
          )}
        </div>

        <div className="flex items-start gap-3 flex-grow text-left">
          <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-white border-[3px] border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mt-0.5">
             <span className="text-black font-bold text-xl">😎</span>
          </div>
          <p className="text-black font-bold text-sm leading-relaxed text-left">
            {project.description}
          </p>
        </div>
      </div>

      {/* DESKTOP Bottom Link Row */}
      <div className="hidden sm:flex items-center justify-end px-6 pb-6 mt-auto z-10">
        <div className="flex items-center gap-2">
          {project.email && (
            <Link
              href={`mailto:${project.email}`}
              className="flex items-center justify-center w-10 h-10 bg-white border-[3px] border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-black"
            >
              <Mail className="w-5 h-5" />
            </Link>
          )}
          {project.github && (
            <Link
              href={project.github}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 bg-white border-[3px] border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-black"
            >
              <Github className="w-5 h-5" />
            </Link>
          )}
          <Link
            href={project.link}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 bg-[#FFD166] border-[3px] border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-black"
          >
            <ExternalLink className="w-5 h-5 stroke-[3]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

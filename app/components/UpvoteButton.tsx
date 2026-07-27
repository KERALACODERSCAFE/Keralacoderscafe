"use client";

import { useState, useEffect } from "react";
import { ArrowBigUpDash } from "lucide-react";
import { upvoteProject } from "@/app/actions/upvote";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface UpvoteButtonProps {
  projectId: number;
  initialVotes: number;
  isTopProject?: boolean;
}

export default function UpvoteButton({ projectId, initialVotes, isTopProject = false }: UpvoteButtonProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [showSoul, setShowSoul] = useState(false);
  const [showAlreadyVotedPopup, setShowAlreadyVotedPopup] = useState(false);

  // Sync with prop in case it updates from parent
  useEffect(() => {
    setVotes(initialVotes);
  }, [initialVotes]);

  // Check local storage on mount
  useEffect(() => {
    const votedProjects = JSON.parse(localStorage.getItem("votedProjects") || "[]");
    if (votedProjects.includes(projectId)) {
      setHasVoted(true);
    }
  }, [projectId]);

  const handleUpvote = async () => {
    if (hasVoted || isVoting) return;

    // Trigger soul animation
    setShowSoul(true);
    setTimeout(() => setShowSoul(false), 1000);

    // Optimistic update
    setVotes((prev) => prev + 1);
    setHasVoted(true);
    setIsVoting(true);

    try {
      const result = await upvoteProject(projectId);
      
      if (result.triggerAuth) {
        // Not logged in, directly trigger Google sign in instead of showing popup
        const { signIn } = await import("next-auth/react");
        signIn("google");
        
        // Revert optimistic since they weren't logged in
        setVotes((prev) => prev - 1);
        setHasVoted(false);
        setIsVoting(false);
        return;
      }
      
      if (result.success && result.votes) {
        setVotes(result.votes);

        // Save to local storage for quick subsequent UI checks
        const votedProjects = JSON.parse(localStorage.getItem("votedProjects") || "[]");
        if (!votedProjects.includes(projectId)) {
          votedProjects.push(projectId);
          localStorage.setItem("votedProjects", JSON.stringify(votedProjects));
        }
      } else {
        // Revert on failure (e.g. already voted on server)
        setVotes((prev) => prev - 1);
        
        if (result.error && result.error.includes("already voted")) {
          setHasVoted(true);
          const votedProjects = JSON.parse(localStorage.getItem("votedProjects") || "[]");
          if (!votedProjects.includes(projectId)) {
            votedProjects.push(projectId);
            localStorage.setItem("votedProjects", JSON.stringify(votedProjects));
          }
          setShowAlreadyVotedPopup(true);
        } else {
          setHasVoted(false);
          if (result.error) alert(result.error);
        }
      }
    } catch (error) {
      console.error("Failed to upvote:", error);
      // Revert on error
      setVotes((prev) => prev - 1);
      setHasVoted(false);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleUpvote}
        disabled={hasVoted || isVoting}
        className={cn(
          "group relative flex items-center justify-center gap-1.5 h-10 px-4 bg-[#D1FADF] border-[2px] border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all font-black",
          hasVoted
            ? "bg-[#4CAF50] text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] translate-x-[2px] translate-y-[2px]"
            : "text-[#054F31] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        )}
        title={hasVoted ? "Thanks for the support !" : "Upvote this project"}
      >
        <div className="relative flex items-center justify-center">
          <ArrowBigUpDash className={cn("w-5 h-5 transition-transform duration-200 group-hover:-translate-y-1", hasVoted ? "fill-white text-white" : "fill-[#054F31] text-[#054F31]", isTopProject && !hasVoted && "animate-bounce-gap")} strokeWidth={hasVoted ? 2 : 2.5} />
          {showSoul && (
            <ArrowBigUpDash className="absolute top-0 left-0 w-5 h-5 fill-[#054F31] text-[#054F31] animate-soul-up pointer-events-none z-50" strokeWidth={2.5} />
          )}
        </div>
        <span className="text-sm">{votes}</span>
      </button>

      {/* Already Voted Custom Popup */}
      {showAlreadyVotedPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm pointer-events-auto"
            onClick={() => setShowAlreadyVotedPopup(false)}
          />
          
          {/* Modal Container */}
          <div className="relative z-[101] bg-[#FFF8F3] dark:bg-[#1a1a2e] border-[3px] border-black p-6 sm:p-8 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] max-w-sm w-full pointer-events-auto animate-in zoom-in-95 duration-200 flex flex-col items-center text-center">
            
            {/* Cute Graphic Placeholder */}
            <div className="mb-4 relative flex items-center justify-center">
              <span className="absolute -left-6 top-2 text-2xl animate-pulse text-yellow-400 z-10">✨</span>
              <span className="absolute -right-4 top-10 text-xl animate-pulse text-blue-400 delay-100 z-10">✨</span>
              <span className="absolute top-0 right-4 text-2xl animate-pulse text-pink-400 delay-200 z-10">✨</span>
              <Image 
                src="/already-voted-cat.png" 
                alt="Already Voted Cat" 
                width={120} 
                height={120} 
                className="object-contain"
              />
            </div>
            
            <h3 className="font-black text-2xl mb-2 text-black dark:text-white tracking-tight">
              Ayy! You already voted 😎
            </h3>
            <p className="text-sm font-bold text-black/70 dark:text-white/70 mb-6 leading-relaxed">
              One vote per project, legend!<br />
              Thanks for supporting our fellow developer. ❤️
            </p>
            
            <button
              onClick={() => setShowAlreadyVotedPopup(false)}
              className="bg-[#6C5DD3] text-white px-8 py-3 rounded-full font-black text-sm border-[2px] border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
            >
              Cool, got it! 😉
            </button>
          </div>
        </div>
      )}
    </>
  );
}

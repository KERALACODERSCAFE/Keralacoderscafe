"use client";

import { useState, useEffect } from "react";
import { ArrowBigUpDash } from "lucide-react";
import { upvoteProject } from "@/app/actions/upvote";
import { cn } from "@/lib/utils";

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
  const [showAuthPopup, setShowAuthPopup] = useState(false);

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
        // Not logged in, show the top floating popup
        setShowAuthPopup(true);
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
        setHasVoted(false);
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
      {/* Top Floating Login Popup */}
      {showAuthPopup && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:pt-24 pointer-events-none">
          {/* Backdrop click overlay */}
          <div 
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm pointer-events-auto"
            onClick={() => setShowAuthPopup(false)}
          />
          
          {/* Popup Content */}
          <div className="relative z-[101] bg-white dark:bg-[#0f172a] border-2 border-black dark:border-white/20 p-5 sm:p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] max-w-sm w-full pointer-events-auto animate-in slide-in-from-top-10 fade-in duration-300">
            <button 
              onClick={() => setShowAuthPopup(false)}
              className="absolute top-3 right-3 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="bg-yellow-500/20 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 dark:text-white">Sign In Required</h3>
                <p className="text-sm text-black/70 dark:text-white/70">Please sign in with Google to vote for projects. It's completely free!</p>
              </div>
              <button
                onClick={async () => {
                  const { signIn } = await import("next-auth/react");
                  signIn("google");
                }}
                className="w-full flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black py-2.5 px-4 rounded-xl font-bold hover:scale-[1.02] transition-transform active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      )}

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
    </>
  );
}

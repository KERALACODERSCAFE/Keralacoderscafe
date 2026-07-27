"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { LogIn, LogOut, Loader2 } from "lucide-react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-8 sm:h-10 items-center justify-center px-3 sm:px-5">
        <Loader2 className="h-4 w-4 animate-spin text-black/50 dark:text-white/50" />
      </div>
    );
  }

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="hidden sm:inline-flex h-8 sm:h-10 items-center gap-1.5 sm:gap-2 border-2 border-black dark:border-white/80 bg-red-100 dark:bg-red-900/30 px-3 sm:px-5 rounded-full text-[10px] sm:text-xs font-black uppercase text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0 order-2 lg:order-4"
        title={session.user?.email || "Sign Out"}
      >
        <span>Sign Out</span>
        <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="hidden sm:inline-flex h-8 sm:h-10 items-center gap-1.5 sm:gap-2 border-2 border-black dark:border-white/80 bg-white dark:bg-black px-3 sm:px-5 rounded-full text-[10px] sm:text-xs font-black uppercase text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] shrink-0 order-2 lg:order-4"
    >
      <span>Sign In</span>
      <LogIn className="h-3 w-3 sm:h-4 sm:w-4" />
    </button>
  );
}

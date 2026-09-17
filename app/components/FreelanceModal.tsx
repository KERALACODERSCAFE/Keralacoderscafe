"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function FreelanceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("Web Development");

  const workTypes = ["Web Development", "Mobile App", "UI/UX Design", "Consultation", "Other"];

  useEffect(() => {
    // Show modal if it hasn't been closed in this session yet
    const hasSeenModal = sessionStorage.getItem("kcc_freelance_modal_seen");
    
    if (!hasSeenModal) {
      // Delay showing the modal for 3 seconds so it's not too aggressive
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("kcc_freelance_modal_seen", "true");
  };

  return (
    <>
      {/* Floating Side Button to manually trigger the modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] bg-[#00D9C0] text-black font-black uppercase tracking-widest text-[11px] py-4 px-2 rounded-l-lg shadow-[-4px_4px_10px_rgba(0,0,0,0.3)] hover:pr-4 transition-all flex items-center justify-center gap-2"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        aria-label="Open Freelance Modal"
      >
        <Briefcase className="w-4 h-4 mb-2 -rotate-90" />
        Freelance
      </button>

      <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl">
          <div className="fixed inset-0" onClick={handleClose} />

          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="relative w-full max-w-[380px] text-white z-10 overflow-hidden rounded-2xl"
            style={{
              background: "linear-gradient(145deg, #0f0f0f 0%, #141414 100%)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 24px 60px -12px rgba(0,0,0,0.9), 0 0 40px -16px rgba(0,217,192,0.18)",
            }}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, transparent, #00D9C0 30%, #FFE66D 70%, transparent)" }}
            />

            {/* Ambient glow */}
            <div className="absolute top-[-40%] left-[-20%] w-[60%] h-[60%] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(0,217,192,0.07) 0%, transparent 70%)", filter: "blur(30px)" }}
            />

            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-500 hover:text-white rounded-full transition-all cursor-pointer z-30"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="px-6 pt-8 pb-6">
              {/* Header */}
              <div className="flex flex-col items-center text-center mb-5">
                <div className="w-12 h-12 bg-[#00D9C0]/10 rounded-full flex items-center justify-center mb-3">
                  <Briefcase className="w-6 h-6 text-[#00D9C0]" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-wide text-white leading-tight mb-1">
                  Open to Freelance Work
                </h3>
                <p className="text-xs text-[#00D9C0] font-bold uppercase tracking-widest">
                  Available Now
                </p>
              </div>

              <p className="text-sm font-medium text-zinc-400 mb-5 leading-relaxed text-center px-1">
                Looking for a developer? I'm currently taking on new projects. Let's talk about how I can help bring your ideas to life.
              </p>

              {/* Work Type Selection */}
              <div className="mb-6">
                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-zinc-500 mb-3 text-center">What do you need help with?</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {workTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider transition-all ${
                        selectedType === type
                          ? "bg-[#00D9C0] text-black shadow-[0_0_10px_rgba(0,217,192,0.3)]"
                          : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9544552818"}?text=${encodeURIComponent(`Hi Akhil, I'm reaching out from Kerala Coders Cafe. I need freelance help with: ${selectedType}`)}`}
                  target="_blank"
                  onClick={handleClose}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg font-black uppercase tracking-wider text-[11px] text-white transition-all hover:brightness-110"
                  style={{
                    background: "linear-gradient(135deg, #25D366 0%, #1DA851 100%)",
                    boxShadow: "0 3px 16px -4px rgba(37,211,102,0.45)",
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact on WhatsApp</span>
                </Link>
                
                <button
                  onClick={handleClose}
                  className="flex items-center justify-center w-full py-3 rounded-lg font-bold uppercase tracking-wider text-[10px] text-zinc-500 hover:text-white hover:bg-white/5 transition-all"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
}

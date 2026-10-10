"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Briefcase,
  Code2,
  Smartphone,
  Layout,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function FreelanceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("Web Development");
  const [description, setDescription] = useState<string>("");

  const workTypes = [
    { label: "Web Development", icon: Code2 },
    { label: "Mobile App", icon: Smartphone },
    { label: "UI/UX Design", icon: Layout },
    { label: "Consultation", icon: MessageCircle },
    { label: "Other", icon: Sparkles },
  ];

  // Auto-open logic disabled

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("kcc_freelance_modal_seen", "true");
  };

  return (
    <>
      {/* Floating Side Button to manually trigger the modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] bg-[#00E599] hover:bg-[#00c984] text-black font-black uppercase tracking-widest text-[11px] py-4 px-2.5 rounded-l-xl shadow-[-4px_4px_16px_rgba(0,229,153,0.35)] hover:pr-4 transition-all flex items-center justify-center gap-2 cursor-pointer group"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        aria-label="Open Freelance Modal"
      >
        <Briefcase className="w-4 h-4 mb-2 -rotate-90 group-hover:scale-110 transition-transform" />
        Freelance
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm">
            {/* Backdrop click to dismiss */}
            <div className="fixed inset-0" onClick={handleClose} />

            {/* Main Blackboard Card with Wooden Frame */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-[580px] z-10 select-none overflow-hidden rounded-2xl"
              style={{
                /* Simple, clean wooden border without aggressive glow */
                borderStyle: "solid",
                borderWidth: "12px",
                borderTopColor: "#b5905d",
                borderLeftColor: "#a37e4c",
                borderRightColor: "#8f6c3d",
                borderBottomColor: "#7d5b2f",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
                backgroundColor: "#1e2227",
              }}
            >
              {/* Inner Blackboard Surface - Simple & Clean */}
              <div
                className="relative p-6 sm:p-8"
                style={{
                  backgroundColor: "#1c2025",
                  border: "1px solid #2d333b",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 flex items-center justify-center rounded-full border border-zinc-600 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer z-30"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-3">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                    Open to Freelance
                  </h2>

                  {/* Available Now Badge - Clean & Simple */}
                  <div className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-semibold tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>Available Now</span>
                  </div>
                </div>

                {/* Body Text: Standard Reading Font, Highly Legible */}
                <div className="max-w-[460px] mx-auto text-center mb-6">
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
                    Looking for a developer? I&apos;m currently taking on new projects. Let&apos;s talk about how I can bring your ideas to life.
                  </p>
                </div>

                {/* Scope Selection Pills */}
                <div className="mb-6 max-w-[500px] mx-auto">
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 text-center mb-3">
                    What do you need help with?
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-2.5 justify-center">
                    {workTypes.map((item) => {
                      const isSelected = selectedType === item.label;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => setSelectedType(item.label)}
                          className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors cursor-pointer ${isSelected
                            ? "border-2 border-amber-400 bg-amber-400/10 text-amber-300"
                            : "border border-dashed border-zinc-600 bg-zinc-800/60 text-zinc-200 hover:border-zinc-400 hover:bg-zinc-800 hover:text-white"
                            }`}
                        >
                          <Icon
                            className={`w-4 h-4 shrink-0 ${isSelected ? "text-amber-400" : "text-zinc-400"
                              }`}
                          />
                          <span>{item.label}</span>
                          {isSelected && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 ml-0.5 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Description (Optional) */}
                <div className="mb-4 max-w-[500px] mx-auto">
                  <label
                    htmlFor="freelance-project-desc"
                    className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5"
                  >
                    Project Description{" "}
                    <span className="text-zinc-500 font-normal lowercase">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="freelance-project-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe what you want to build or discuss..."
                    rows={2}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-zinc-900/90 border border-zinc-700/80 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-amber-400/80 transition-colors resize-none"
                  />
                </div>

                {/* Primary Action Button: Simple, Solid WhatsApp Green, NO Glow */}
                <div className="mb-4">
                  <Link
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "9544552818"
                      }?text=${encodeURIComponent(
                        description.trim()
                          ? `Hi Akhil, I'm reaching out from Kerala Coders Cafe. I'm interested in discussing a project for: ${selectedType}.\n\nProject details: ${description.trim()}`
                          : `Hi Akhil, I'm reaching out from Kerala Coders Cafe. I'm interested in discussing a project for: ${selectedType}.`
                      )}`}
                    target="_blank"
                    onClick={handleClose}
                    className="flex items-center justify-between w-full py-3.5 px-6 rounded-xl font-semibold text-sm sm:text-base text-white bg-[#25D366] hover:bg-[#20ba5a] transition-colors cursor-pointer shadow-sm"
                  >
                    {/* WhatsApp Icon */}
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <svg
                        className="w-4 h-4 fill-white"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>

                    <span className="font-semibold text-white tracking-wide">
                      Contact on WhatsApp
                    </span>

                    <ArrowRight className="w-5 h-5 text-white/90 shrink-0" />
                  </Link>
                </div>

                {/* Dismiss Button */}
                <div className="text-center mb-4">
                  <button
                    onClick={handleClose}
                    className="text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors py-1 cursor-pointer"
                  >
                    Maybe Later
                  </button>
                </div>

                {/* Features Bar - Simple & Clean */}
                <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-6 pt-3 border-t border-zinc-800 text-zinc-400 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Quick Response</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Quality Assured</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Custom Solutions</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";
import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import "./OnamModal.css";

export default function OnamModal() {
  const [isOpen, setIsOpen] = useState(true);
  const doodleRef = useRef<any>(null);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("onam_modal_shown");
    if (hasShown) {
      setIsOpen(false);
    }
  }, []);

  // Auto-close after 15 seconds
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      setIsOpen(false);
      sessionStorage.setItem("onam_modal_shown", "true");
    }, 15000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen) {
      interval = setInterval(() => {
        if (doodleRef.current && doodleRef.current.update) {
          doodleRef.current.update();
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("onam_modal_shown", "true");
  };

  if (!isOpen) return null; // modal closed

  const doodleRules = `
    :doodle {
      @grid: 22 / 50vmin 50vmin;
      @max-size: 800px 800px;
      background: #475d50;
      border-radius: 4px;
      overflow: visible;
      contain: initial;
    }
    --c: @p(#e8aa3e, #d7e2eb, #dcc6f5); 
    @place-cell: center;
    @random(0.7) {
      z-index: 1;
      :after {
        content: "";
        transform: translate(@m2(@r(±36vmin))) rotate(@r(360deg));
        @size: 6vmin;
        background: @doodle(
          @grid: 3x4 / 100% 100%;
          @size: 20%;
          @place-cell: center;
          border-radius: 0 100% 0 100%;
          background: var(--c);
          opacity: @r(0.7, 1);
          transform: rotate(@r(360deg));
          transform-origin: 0 0;
          @match(i > 11) {
            :after {
              content: "";
              z-index: 1;
              position: absolute;
              top: -25%;
              left: -25%;
              @size: 50%;
              background: #d4603c;
              border: 0.5px solid rgba(0, 0, 0, 0.2);
              border-radius: 100%;
            }
          }
        );
      }
    }
    :before {
      content: "";
      @size: @r(1, 2)vmin;
      border-radius: 100% 0 100% 0;
      background: @p(#aec58d, #7c9852);
      transform: translate(@m2(@r(±32vmin))) rotate(@r(360deg));
      filter: drop-shadow(0.5px 0.5px 0.5px rgba(0, 0, 0, 0.7)) blur(@p(0, 1px));
      opacity: @r(0.6, 1);
    }
  `;

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/css-doodle/0.38.4/css-doodle.min.js" strategy="afterInteractive" />
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="onam-graph relative bg-[#fbf1da] p-[4vmin] sm:p-[6vmin] rounded-xl flex flex-col items-center max-w-[90vw] max-h-[90vh] overflow-hidden animate-fade-in-up">
          
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center bg-black text-white font-bold rounded-full hover:scale-110 transition-transform cursor-pointer"
          >
            ✕
          </button>

          <h2 className="text-3xl sm:text-5xl font-black text-[#d4603c] mb-6 tracking-widest text-center shadow-text uppercase">
            Happy Onam! 🌸
          </h2>
          
          <div className="doodle-container relative pointer-events-none flex items-center justify-center">
            {React.createElement("css-doodle", {
              ref: doodleRef,
              "click-to-update": true,
              dangerouslySetInnerHTML: { __html: doodleRules }
            })}
            
            {/* Center Logo */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] scale-[0.65] sm:scale-90">
              <svg viewBox="0 0 720 250" className="h-16 sm:h-24 w-auto text-white">
                <defs>
                  <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Playwrite+IE:wght@400&display=swap');
                    .modal-text-kerala { font: 900 110px 'Montserrat', sans-serif; letter-spacing: 16px; fill: currentColor; }
                    .modal-text-coders { font: 900 92px 'Montserrat', sans-serif; letter-spacing: 6px; fill: currentColor; opacity: 0.95; }
                    .modal-text-cafe { 
                      font: 400 85px 'Playwrite IE', cursive; 
                      fill: #FCCC12; 
                      animation: modalWriteCafe 6s ease-in-out infinite;
                    }
                    @keyframes modalWriteCafe {
                      0%, 10% { clip-path: inset(-20% 120% -20% -20%); opacity: 0; }
                      15% { opacity: 1; }
                      35%, 85% { clip-path: inset(-20% -20% -20% -20%); opacity: 1; }
                      95%, 100% { clip-path: inset(-20% -20% -20% -20%); opacity: 0; }
                    }
                  `}</style>
                </defs>
                <g>
                  <text x="10" y="100" className="modal-text-kerala">KERALA</text>
                  <text x="15" y="195" className="modal-text-coders">CODERS</text>
                  <text x="450" y="195" className="modal-text-cafe" transform="rotate(-8, 450, 195)">Cafe</text>
                </g>
                <g transform="translate(680, 20)">
                  {['#FCCC12', '#FF7112', '#EF1541', '#6E55DC', '#069DE0', '#05AC3F'].map((c, i) => (
                    <circle key={i} cy={i * 32} r={12} fill={c} />
                  ))}
                </g>
              </svg>
            </div>
          </div>
          
          <button 
            onClick={handleClose}
            className="mt-8 px-8 py-3 bg-kcc-green text-black border-2 border-black font-black uppercase tracking-widest shadow-[4px_4px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
          >
            Continue to Site
          </button>
        </div>
      </div>
    </>
  );
}

"use client";

import React, { useState } from "react";

interface LinkedInPost {
  id: number;
  title: string;
  embedUrl: string;
  linkUrl: string;
  height: number;
}

export default function LinkedInEmbed() {
  const posts: LinkedInPost[] = [
    {
      id: 1,
      title: "Agentic AI Development Session",
      embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:share:7479746378559320064?collapsed=1",
      linkUrl: "https://www.linkedin.com/feed/update/urn:li:share:7479746378559320064",
      height: 516,
    },
    {
      id: 2,
      title: "Why Kerala Coders Cafe Exists",
      embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7483533858244665344?collapsed=1",
      linkUrl: "https://www.linkedin.com/feed/update/urn:li:activity:7483533858244665344",
      height: 516,
    },
    {
      id: 3,
      title: "Break into Open Source",
      embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:share:7464572402635550720?collapsed=1",
      linkUrl: "https://www.linkedin.com/feed/update/urn:li:share:7464572402635550720",
      height: 520,
    }
  ];

  const [loadedPosts, setLoadedPosts] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
    3: false,
  });

  const toggleLoad = (id: number) => {
    setLoadedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="linkedin-update" className="scroll-mt-24 px-6 py-24 md:px-12 bg-white border-t-4 border-black text-black">
      <div className="mx-auto max-w-[1280px] flex flex-col items-center">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="inline-block border-2 border-black bg-[#FFE66D] px-3 py-1 text-xs font-black uppercase tracking-widest text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6">
            Support and social media presence
          </span>
          <h2 className="mt-5 text-[clamp(2.5rem,5.5vw,4.8rem)] font-black leading-[0.92] tracking-[-0.05em] text-black uppercase">
            Latest from
            <span className="ml-3 bg-[#00D9C0] border-3 border-black px-4 py-1.5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] inline-block -rotate-1 text-black">
              LinkedIn
            </span>
          </h2>
          <p className="mt-8 text-black/70 font-bold text-sm sm:text-base leading-relaxed max-w-xl mx-auto border-l-8 border-black pl-8 text-left md:text-center md:border-none md:pl-0">
            Stay updated with our latest milestones, announcements, and community discussions directly from our official page.
          </p>
        </div>

        {/* Embedded Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1280px]">
          {posts.map((post) => {
            const isLoaded = loadedPosts[post.id];
            return (
              <div
                key={post.id}
                className="w-full border-4 border-black p-2 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex flex-col justify-between"
              >
                <div className="relative w-full overflow-hidden bg-[#FAF9F5]" style={{ height: `${post.height}px` }}>
                  {!isLoaded ? (
                    // Fallback Image Card
                    <div className="w-full h-full border-2 border-dashed border-black/20 flex flex-col items-center justify-center p-6 relative group">
                      {/* Logo image, clicking it opens the link */}
                      <a
                        href={post.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-full flex flex-col items-center justify-center cursor-pointer select-none no-underline"
                      >
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-4 bg-white transition-transform group-hover:scale-105">
                          <img
                            src="/og-image.jpg"
                            alt="Kerala Coders Cafe Logo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-sm font-black text-black uppercase tracking-wider mb-2 text-center">
                          {post.title}
                        </h4>
                        <span className="text-[10px] sm:text-xs font-bold text-zinc-500 uppercase tracking-widest mb-12">
                          Click to view on LinkedIn
                        </span>
                      </a>

                      {/* Neubrutalist Button to load live post */}
                      <button
                        onClick={() => toggleLoad(post.id)}
                        className="absolute bottom-6 border-3 border-black bg-[#00D9C0] hover:bg-[#FFE66D] text-black px-4 py-2 font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-pointer z-10"
                      >
                        Load Live Post
                      </button>
                    </div>
                  ) : (
                    // Live Iframe
                    <div className="w-full h-full relative">
                      <iframe
                        src={post.embedUrl}
                        height={post.height}
                        className="w-full h-full border-none"
                        allowFullScreen={true}
                        title={post.title}
                      />

                      {/* Floating overlay link in case of rate limits or toggling back */}
                      <div className="absolute bottom-2 right-2 z-10 flex gap-2">
                        <button
                          onClick={() => toggleLoad(post.id)}
                          className="bg-black hover:bg-black/90 text-white border-2 border-black px-2 py-1 text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_rgba(255,255,255,0.2)] cursor-pointer"
                        >
                          Show Preview
                        </button>
                        <a
                          href={post.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#00D9C0] hover:bg-[#00C2AB] text-black border-2 border-black px-2 py-1 text-[9px] font-black uppercase tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,0.15)] no-underline cursor-pointer"
                        >
                          Open Link
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        <div className="mt-16 text-center">
          <a
            href="https://www.linkedin.com/company/131703944"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-4 border-black bg-white hover:bg-[#FFE66D] text-black px-6 py-3.5 font-black rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-sm no-underline cursor-pointer uppercase tracking-wider"
          >
            View More on LinkedIn
          </a>
        </div>

      </div>
    </section>
  );
}

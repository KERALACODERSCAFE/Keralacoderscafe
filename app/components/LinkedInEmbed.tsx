import React from "react";

export default function LinkedInEmbed() {
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
          {/* Post 1 */}
          <div className="w-full border-4 border-black p-2 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            <div className="relative w-full overflow-hidden" style={{ height: "516px" }}>
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:share:7479746378559320064?collapsed=1"
                height="516"
                className="w-full h-full border-none"
                allowFullScreen={true}
                title="Embedded post 1"
              />
            </div>
          </div>

          {/* Post 2 */}
          <div className="w-full border-4 border-black p-2 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            <div className="relative w-full overflow-hidden" style={{ height: "516px" }}>
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:activity:7483533858244665344?collapsed=1"
                height="516"
                className="w-full h-full border-none"
                allowFullScreen={true}
                title="Embedded post 2"
              />
            </div>
          </div>

          {/* Post 3 */}
          <div className="w-full border-4 border-black p-2 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
            <div className="relative w-full overflow-hidden" style={{ height: "520px" }}>
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:share:7464572402635550720?collapsed=1"
                height="520"
                className="w-full h-full border-none"
                allowFullScreen={true}
                title="Embedded post 3"
              />
            </div>
          </div>
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

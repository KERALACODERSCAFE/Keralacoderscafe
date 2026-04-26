"use client";

import { notFound, useRouter } from "next/navigation";
import { use, useState, useEffect } from "react";
import { REPOS, Project } from "@/lib/projects";
import { PROJECT_DETAILS, ProjectContent } from "@/lib/project-details";
import DiagonalGrid from "@/components/ui/demo";
import BackgroundGlow from "@/components/ui/background-components";
import ModelViewer from "@/app/components/ModelViewer";

/* ─── Reusable Components ─────────────────────────────────────── */

const StatCard = ({ bg, label, value }: { bg: string; label: string; value: string }) => (
  <div className={`${bg} border-4 border-black p-4 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center`}>
    <div className="text-2xl md:text-4xl font-black tracking-tighter">{value}</div>
    <div className="font-bold uppercase text-xs md:text-sm tracking-widest mt-2 opacity-75">{label}</div>
  </div>
);

const FeatureCard = ({ icon, label, bg }: { icon: string; label: string; bg: string }) => (
  <div className="flex items-center gap-3 md:gap-4 bg-white border-4 border-black p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-100 transition-colors cursor-default">
    <div className={`${bg} border-2 border-black p-2 flex-shrink-0`}>
      <span className="material-symbols-outlined text-xl md:text-2xl">{icon}</span>
    </div>
    <span className="font-bold text-sm md:text-lg uppercase tracking-tight leading-tight">{label}</span>
  </div>
);

const TeamMember = ({ name, role, img, shadow }: { name: string; role: string; img: string; shadow: string }) => (
  <div className="flex flex-col items-center gap-3 group">
    <div className={`w-32 h-32 md:w-48 md:h-48 border-4 border-black rounded-full overflow-hidden ${shadow} group-hover:scale-105 transition-transform duration-300`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt={name} className="w-full h-full object-cover" />
    </div>
    <div className="text-center">
      <h3 className="text-xl md:text-2xl font-black uppercase group-hover:text-amber-500 transition-colors">{name}</h3>
      <p className="text-xs font-bold uppercase tracking-widest opacity-60 mt-1">{role}</p>
    </div>
  </div>
);

/* ─── Live Contributors (both repos) ────────────────────────────── */

function LiveContributors() {
  const [contributors, setContributors] = useState<
    { login: string; avatar_url: string; html_url: string; contributions: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    // Responsive items per page
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 2 : 3);
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    const REPOS_TO_FETCH = [
      "https://api.github.com/repos/KERALACODERSCAFE/Keralacoderscafe/contributors?per_page=100",
      "https://api.github.com/repos/KERALACODERSCAFE/Kerala-toddy-finder/contributors?per_page=100",
    ];

    Promise.allSettled(
      REPOS_TO_FETCH.map((url) =>
        fetch(url).then((r) => (r.ok ? r.json() : Promise.resolve([])))
      )
    )
      .then((results) => {
        const merged = new Map<
          number,
          { login: string; avatar_url: string; html_url: string; contributions: number }
        >();
        for (const result of results) {
          if (result.status !== "fulfilled") continue;
          const list = Array.isArray(result.value) ? result.value : [];
          for (const c of list) {
            if (merged.has(c.id)) {
              merged.get(c.id)!.contributions += c.contributions;
            } else {
              merged.set(c.id, {
                login: c.login,
                avatar_url: c.avatar_url,
                html_url: c.html_url,
                contributions: c.contributions,
              });
            }
          }
        }
        const sorted = Array.from(merged.values()).sort(
          (a, b) => b.contributions - a.contributions
        );
        setContributors(sorted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Filter contributors while preserving fetched ranking order
  const filteredContributors = contributors
    .filter((c) => c.login.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(filteredContributors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContributors = filteredContributors.slice(startIndex, endIndex);

  // Reset to page 1 when search/sort/resize changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Loading skeleton for controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="h-14 w-full md:w-96 bg-black/10 border-4 border-black animate-pulse" />
          <div className="h-14 w-48 bg-black/10 border-4 border-black animate-pulse" />
        </div>

        {/* Loading skeleton for grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-full aspect-square border-4 border-black bg-black/10 animate-pulse mb-4" />
              <div className="space-y-2">
                <div className="h-4 bg-black/20 rounded-sm animate-pulse" />
                <div className="h-3 w-2/3 bg-black/10 rounded-sm animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (contributors.length === 0) {
    return (
      <div className="text-center py-20 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="text-6xl mb-4">🔍</div>
        <div className="font-black uppercase tracking-widest opacity-50 text-xl">
          No contributor data available
        </div>
      </div>
    );
  }

  const topContributor = filteredContributors[0];
  const totalContributions = contributors.reduce((sum, c) => sum + c.contributions, 0);

  return (
    <div className="space-y-8">
      {/* Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard bg="bg-yellow-400" label="Total Contributors" value={contributors.length.toString()} />
        <StatCard bg="bg-pink-400" label="Total Commits" value={totalContributions.toLocaleString()} />
        <StatCard bg="bg-cyan-400" label="Top Contributor" value={topContributor?.login.slice(0, 10) || "N/A"} />
        <StatCard bg="bg-lime-400" label="Showing Page" value={`${currentPage}/${totalPages}`} />
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="SEARCH CONTRIBUTORS..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 border-4 border-black font-black uppercase text-sm tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-0.5 focus:translate-y-0.5 transition-all outline-none"
          />
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            search
          </span>
        </div>

      </div>

      {/* Results info */}
      {searchTerm && (
        <div className="bg-yellow-400 border-4 border-black px-6 py-3 font-black uppercase text-sm tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          Found {filteredContributors.length} contributor{filteredContributors.length !== 1 ? "s" : ""} matching &quot;{searchTerm}&quot;
        </div>
      )}

      {/* Contributors Grid */}
      {currentContributors.length === 0 ? (
        <div className="text-center py-20 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-6xl mb-4">😔</div>
          <div className="font-black uppercase tracking-widest opacity-50 text-xl">
            No contributors found
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {currentContributors.map((c, i) => {
            const globalIndex = startIndex + i;
            const isTopThree = globalIndex < 3;
            const badgeColors = ["bg-yellow-400", "bg-gray-300", "bg-orange-400"];

            return (
              <a
                key={c.login}
                href={c.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
              >
                <div className={`bg-white border-4 border-black p-4 transition-all ${isTopThree
                    ? "shadow-[8px_8px_0px_0px_rgba(255,200,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,200,0,1)]"
                    : "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  } hover:-translate-y-1`}>

                  {/* Rank badge for top 3 */}
                  {isTopThree && (
                    <div className={`absolute -top-3 -right-3 w-12 h-12 ${badgeColors[globalIndex]} border-4 border-black flex items-center justify-center font-black text-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-12 group-hover:rotate-0 transition-transform`}>
                      {globalIndex + 1}
                    </div>
                  )}

                  {/* Avatar */}
                  <div className="relative w-full aspect-square border-4 border-black overflow-hidden mb-4 group-hover:border-yellow-400 transition-colors">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.avatar_url}
                      alt={c.login}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-yellow-400/0 group-hover:bg-yellow-400/20 transition-colors" />
                  </div>

                  {/* Info */}
                  <div className="space-y-2">
                    <h3 className="font-black uppercase text-sm md:text-base tracking-tighter group-hover:text-yellow-600 transition-colors truncate">
                      {c.login}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-black/10 border-2 border-black">
                        <div
                          className="h-full bg-black transition-all duration-500"
                          style={{ width: `${Math.min((c.contributions / topContributor.contributions) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest opacity-60">
                      {c.contributions.toLocaleString()} commits
                    </p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-6 bg-white border-4 border-black p-4 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Page info */}
          <div className="font-black uppercase text-sm tracking-wider">
            Page {currentPage} of {totalPages}
            <span className="opacity-50 ml-2">
              ({startIndex + 1}-{Math.min(endIndex, filteredContributors.length)} of {filteredContributors.length})
            </span>
          </div>

          {/* Pagination controls */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center w-full">
            {/* Previous */}
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 border-4 border-black font-black uppercase text-xs sm:text-sm text-center bg-white disabled:opacity-30 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              ← Previous
            </button>

            <div className="order-first sm:order-none font-black uppercase text-xs sm:text-sm tracking-widest px-2 sm:px-4 text-center">
              Page {currentPage} / {totalPages}
            </div>

            {/* Next */}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-full sm:w-auto px-4 sm:px-8 py-3 sm:py-4 border-4 border-black font-black uppercase text-xs sm:text-sm text-center bg-white disabled:opacity-30 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Next →
            </button>
          </div>
          
          {/* View All Button */}
          <div className="flex justify-center">
            <a 
              href="https://github.com/KERALACODERSCAFE/Keralacoderscafe/graphs/contributors"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto justify-center items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-kcc-gold text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-black uppercase text-xs sm:text-sm tracking-widest"
            >
              View all contributors
              <span className="material-symbols-outlined text-xl">open_in_new</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Bespoke Project Detail ─────────────────────────────────────── */

function BespokeProjectDetail({ content }: { content: ProjectContent }) {
  const { hero, userFeatures, ownerFeatures, why, team, progress, vision } = content;

  return (
    <DiagonalGrid className="bg-background text-on-background font-body min-h-screen">
      <BackgroundGlow className="absolute inset-0 pointer-events-none z-0" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@800;900&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap');
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 48; }
        h1, h2, h3, h4 { font-family: 'Epilogue', sans-serif; }
      `}</style>

      <div className="relative px-4 md:px-6 pt-24 md:pt-32 pb-16 md:pb-24 max-w-7xl mx-auto space-y-16 md:space-y-24">

        {/* Hero Section */}
        <section className={`grid ${hero.img ? 'lg:grid-cols-2' : 'grid-cols-1'} gap-8 lg:gap-12 items-center`}>
          <div className={`order-2 lg:order-1 mt-6 sm:mt-8 lg:mt-0 space-y-8 ${!hero.img ? 'text-center max-w-4xl mx-auto' : ''}`}>
            <div className={`inline-flex items-center gap-2 bg-black text-white px-4 py-2 border-2 border-yellow-400 font-black uppercase text-xs tracking-tighter shadow-[4px_4px_0px_0px_rgba(255,100,100,1)] ${!hero.img ? 'mx-auto' : ''}`}>
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
              {hero.badge}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-6">
              {hero.title.split(' ').map((word, i, arr) => (
                <span key={i}>
                  {i === arr.length - 1 ? <span className="bg-yellow-400 px-2">{word}</span> : word + ' '}
                </span>
              ))}
            </h1>
            <p className={`text-base md:text-xl font-medium leading-relaxed opacity-90 ${!hero.img ? 'mx-auto' : 'max-w-xl'}`}>
              {hero.intro}
            </p>
            <div className={`flex flex-wrap gap-4 ${!hero.img ? 'justify-center' : ''}`}>
              {content.prototypeLink && (
                <a
                  href={content.prototypeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-on-primary border-4 border-black px-6 md:px-10 py-3 md:py-5 text-lg md:text-2xl font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all text-center inline-block"
                >
                  Try Prototype
                </a>
              )}
              {content.github && (
                <a
                  href={content.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black border-4 border-black px-6 md:px-10 py-3 md:py-5 text-lg md:text-2xl font-black uppercase shadow-[8px_8px_0px_0px_rgba(255,200,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(255,200,0,1)] transition-all text-center inline-flex items-center gap-3"
                >
                  <svg className="w-6 h-6 md:w-8 md:h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>
          </div>
          {(content.glbModel || hero.img) && (
            <div className={`order-1 lg:order-2 relative group w-full ${!content.glbModel ? 'aspect-video md:aspect-auto' : 'aspect-square lg:aspect-auto lg:h-[600px]'}`}>
              {content.glbModel ? (
                <div className="w-full h-full">
                  <ModelViewer
                    modelUrl={content.glbModel}
                    coverImage={content.coverImg}
                    usdzUrl={content.usdzUrl}
                    title={hero.title}
                  />
                </div>
              ) : (
                <>
                  <div className="absolute -top-4 -left-4 w-full h-full bg-secondary-container border-4 border-black hidden md:block"></div>
                  <div className="relative border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full h-full overflow-hidden bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={hero.img} alt={hero.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        {/* Vision & Progress */}
        <section className="grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white border-4 border-black p-6 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,74,34,1)] relative overflow-hidden">
            <div className="absolute -top-3 -left-2 bg-black text-white px-4 py-2 font-black text-xs uppercase tracking-widest border-2 border-black z-10">Our Vision</div>
            <h2 className="text-2xl md:text-5xl font-black uppercase mb-6 tracking-tighter pt-4 leading-none">The Trusted <span className="text-green-600 underline">Discovery</span> Platform</h2>
            <p className="leading-relaxed font-bold text-lg opacity-80 mb-6">{vision}</p>
          </div>
          <div className="bg-yellow-400 border-4 border-black p-6 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,106,52,1)] relative">
            <div className="absolute -top-3 -left-2 bg-secondary text-white px-4 py-2 font-black text-xs uppercase tracking-widest border-2 border-black z-10">Project Progress</div>
            <h2 className="text-2xl md:text-5xl font-black uppercase mb-6 tracking-tighter pt-4 leading-none">{progress.phase}</h2>
            <p className="leading-relaxed opacity-75 font-bold mb-8">Platform is currently in community-vetting phase. Volunteers are mapping local shops and verifying hygiene standards across three districts.</p>
            <div className="space-y-6">
              {progress.stages.map((stage) => (
                <div key={stage.label} className="space-y-2">
                  <div className="flex justify-between items-center font-black uppercase text-[10px] md:text-xs tracking-widest">
                    <span>{stage.label}</span>
                    <span>{stage.percentage === 0 ? "Not Started" : `${stage.percentage}%`}</span>
                  </div>
                  <div className="h-4 bg-white border-2 border-black rounded-sm overflow-hidden flex">
                    <div className="h-full bg-black transition-all duration-1000 shadow-[inset_-2px_0px_0px_0px_rgba(255,255,255,0.3)]" style={{ width: `${stage.percentage}%` }}></div>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t-2 border-black/10">
                <div className="flex justify-between items-center font-black uppercase text-sm tracking-tighter">
                  <span>Overall Status</span>
                  <span className="bg-black text-yellow-400 px-2">
                    {Math.round(progress.stages.reduce((acc, s) => acc + s.percentage, 0) / progress.stages.length)}% Complete
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features for Users */}
        <section>
          <h2 className="text-2xl md:text-5xl font-black uppercase mb-8 md:mb-16 tracking-tighter border-l-8 border-black pl-4 md:pl-8">
            What Food Explorers Can Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {userFeatures.map((f) => <FeatureCard key={f.label} {...f} />)}
          </div>
        </section>

        {/* Features for Owners */}
        <section className="bg-white border-4 border-black p-10 md:p-20 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl md:text-5xl font-black uppercase mb-12 tracking-tighter">For Business Owners</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {ownerFeatures.map((f) => (
              <div key={f.label} className="flex gap-6 items-start group">
                <div className={`${f.bg} border-4 border-black p-3 group-hover:rotate-6 transition-transform`}>
                  <span className="material-symbols-outlined text-4xl">{f.icon}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-xl uppercase tracking-tight">{f.label.split(":")[0]}</h3>
                  <p className="font-bold opacity-60 leading-tight">{f.label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Platform */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <h2 className="text-3xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">Why this <br /> <span className="bg-red-400 px-3">Platform?</span></h2>
          <div className="space-y-4">
            {why.map((reason, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-2xl border-2 border-black group-hover:bg-yellow-400 group-hover:text-black transition-all">{idx + 1}</div>
                <p className="font-black uppercase text-lg md:text-2xl tracking-tighter group-hover:translate-x-2 transition-transform">{reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team — Live Contributors */}
        <section>
          <div className="mb-10 md:mb-16 text-center">
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">Contribution Member List</h2>
            <p className="font-bold uppercase tracking-widest opacity-60 mt-4 underline decoration-black underline-offset-4 decoration-2">Building Kerala&apos;s Digital Heritage</p>
            <div className="mt-4 inline-flex items-center gap-3 border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="h-3 w-3 border-2 border-black bg-emerald-500" />
              LIVE FROM GITHUB
            </div>
          </div>
          <LiveContributors />
        </section>

        {/* CTA / Conclusion */}
        <section className="bg-black text-white p-10 md:p-24 border-4 border-yellow-400 text-center relative overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container -mr-16 -mt-16 rotate-45 border-4 border-black"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary-container -ml-16 -mb-16 rotate-45 border-4 border-black"></div>

          <div className="relative z-10 max-w-4xl mx-auto space-y-12">
            <h2 className="text-3xl md:text-8xl font-black uppercase text-yellow-400 tracking-tighter leading-none italic">
              Protecting Tradition
            </h2>
            <p className="text-lg md:text-3xl font-medium leading-relaxed opacity-90 border-l-4 border-yellow-400 pl-8 text-left italic">
              This project is not just a listing platform. It is a community-driven initiative to promote Kerala's traditional food culture, support local businesses, and help people discover the best local experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href={content.github || "/join"}
                target={content.github ? "_blank" : "_self"}
                rel={content.github ? "noopener noreferrer" : ""}
                className="bg-yellow-400 text-black border-4 border-white px-10 py-5 text-xl md:text-3xl font-black uppercase shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all inline-block"
              >
                Become a Contributor
              </a>
            </div>
          </div>
        </section>
      </div>
    </DiagonalGrid>
  );
}

/* ─── Generic Project Detail ─────────────────────────────────────── */

function GenericProjectDetail({ project }: { project: Project }) {
  return (
    <DiagonalGrid className="bg-background text-on-background font-body min-h-screen">
      <BackgroundGlow className="absolute inset-0 pointer-events-none z-0" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@800;900&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap');
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-variation-settings: 'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 48; }
        h1, h2, h3, h4 { font-family: 'Epilogue', sans-serif; }
      `}</style>

      <div className="relative px-4 md:px-6 pt-24 md:pt-32 pb-16 md:pb-24 max-w-7xl mx-auto space-y-16 md:space-y-24">
        {/* Header Section */}
        <header className="space-y-8">
          <a href="/events" className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 border-2 border-black font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(255,230,109,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            ← Back to Projects
          </a>
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-black uppercase tracking-widest">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Active Building
            </div>
            <h1 className="text-4xl md:text-8xl font-black text-black uppercase tracking-tighter leading-[0.8] mb-6">
              {project.name.split(' ').map((word, i, arr) => (
                <span key={i}>
                  {i === arr.length - 1 ? <span className="bg-yellow-400 px-2">{word}</span> : word + ' '}
                </span>
              ))}
            </h1>
            <p className="text-xl md:text-3xl text-black font-bold leading-tight border-l-8 border-black pl-8 max-w-4xl">
              {project.description}
            </p>
          </div>
        </header>

        {/* Info Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard bg="bg-white" label="Problem" value={project.problem.slice(0, 20) + "..."} />
          <StatCard bg="bg-white" label="Audience" value={project.audience.slice(0, 20) + "..."} />
          <StatCard bg="bg-yellow-400" label="Language" value={project.language} />
          <StatCard bg="bg-black text-white" label="Author" value={project.submittedBy || "KCC Community"} />
        </div>

        {/* Detailed Cards */}
        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h3 className="text-2xl font-black uppercase tracking-tighter">The Challenge</h3>
            <p className="font-bold opacity-70 leading-relaxed text-lg">{project.problem}</p>
          </div>
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h3 className="text-2xl font-black uppercase tracking-tighter">Target Audience</h3>
            <p className="font-bold opacity-70 leading-relaxed text-lg">{project.audience}</p>
          </div>
        </section>

        {/* Topics */}
        <section className="space-y-6">
          <div className="text-xs font-black text-black/50 uppercase tracking-[0.3em]">Project Ecosystem</div>
          <div className="flex flex-wrap gap-4">
            {project.topics.map((topic) => (
              <span key={topic} className="px-6 py-3 bg-white border-4 border-black font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-100 transition-colors cursor-default">
                #{topic}
              </span>
            ))}
          </div>
        </section>

        {/* Contributors Section */}
        <section className="pt-16 border-t-8 border-black">
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">Community Effort</h2>
            <div className="inline-flex items-center gap-3 border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="h-3 w-3 border-2 border-black bg-emerald-500" />
              LIVE REPO STATS
            </div>
          </div>
          <LiveContributors />
        </section>

        {/* CTA Section */}
        <section className="bg-black text-white p-10 md:p-16 border-4 border-yellow-400 text-center relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div className="relative z-10 space-y-8">
            <h2 className="text-3xl md:text-5xl font-black uppercase text-yellow-400 tracking-tighter leading-none italic">
              Want to contribute?
            </h2>
            <p className="text-lg md:text-xl font-medium leading-relaxed opacity-90 max-w-2xl mx-auto">
              Join the Kerala Coders Cafe community and help us build {project.name}. Whether you are a developer, designer, or researcher, your contribution matters.
            </p>
            <div className="flex justify-center">
              <a 
                href={project.github || "/join"}
                target={project.github ? "_blank" : "_self"}
                rel={project.github ? "noopener noreferrer" : ""}
                className="bg-yellow-400 text-black border-4 border-white px-8 py-4 text-lg md:text-2xl font-black uppercase shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all inline-block"
              >
                Become a Contributor
              </a>
            </div>
          </div>
        </section>

        {/* Action Call */}
        {(project.link || project.github) && (
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-4 px-10 py-6 bg-black text-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(255,200,0,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all font-black uppercase text-2xl">
                Read Documentation
                <span className="material-symbols-outlined text-3xl group-hover:translate-x-2 transition-transform">arrow_right_alt</span>
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-4 px-10 py-6 bg-white text-black border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all font-black uppercase text-2xl">
                <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub Repo
              </a>
            )}
          </div>
        )}
      </div>
    </DiagonalGrid>
  );
}

/* ─── Route ─────────────────────────────────────────────────────── */

export default function ProjectDetailPage(props: PageProps<'/events/[id]'>) {
  const { id } = use(props.params);
  const router = useRouter();
  const numId = parseInt(id, 10);
  const project = REPOS.find((r) => r.id === numId);
  const bespokeDetails = PROJECT_DETAILS[numId];

  useEffect(() => {
    if (project?.slug) {
      router.replace(`/${project.slug}`);
    }
  }, [project, router]);

  if (!project) notFound();

  // Show a loading/placeholder during redirect if possible, 
  // but keep the current render as fallback for non-slugged projects
  if (bespokeDetails) return <BespokeProjectDetail content={bespokeDetails} />;
  return <GenericProjectDetail project={project} />;
}

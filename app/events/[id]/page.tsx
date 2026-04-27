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

/* ─── Project Activity Pulse ───────────────────────────────────── */

function ProjectPulse({ repoUrl }: { repoUrl?: string }) {
  const [activity, setActivity] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!repoUrl) {
      setLoading(false);
      return;
    }

    const repoPath = repoUrl.split("github.com/")[1];
    if (!repoPath) {
      setLoading(false);
      return;
    }

    // Using stats/contributors for detailed weekly data as requested
    fetch(`https://api.github.com/repos/${repoPath}/stats/contributors`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Initialize 52 weeks of zero activity
          const weeklyStats = new Array(52).fill(0);
          
          // Data is an array of contributor stats
          // Each item has a 'weeks' array of { w: timestamp, a: add, d: del, c: commit }
          data.forEach((contributor: any) => {
            if (contributor.weeks) {
              // Get the last 52 weeks
              const last52 = contributor.weeks.slice(-52);
              last52.forEach((week: any, index: number) => {
                if (index < 52) {
                  weeklyStats[index] += week.c;
                }
              });
            }
          });
          setActivity(weeklyStats);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [repoUrl]);

  if (loading) {
    return (
      <div className="bg-white border-4 border-black p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-pulse">
        <div className="h-4 w-48 bg-black/10 mb-4" />
        <div className="grid grid-cols-13 gap-2 h-24 bg-black/5" />
      </div>
    );
  }

  if (activity.length === 0) return null;

  const maxCommits = Math.max(...activity, 1);

  // GitHub's classic color palette
  const getGitColor = (count: number) => {
    if (count === 0) return "#ebedf0";
    const intensity = count / maxCommits;
    if (intensity < 0.25) return "#9be9a8";
    if (intensity < 0.5) return "#40c463";
    if (intensity < 0.75) return "#30a14e";
    return "#216e39";
  };

  return (
    <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
            <span className="w-4 h-4 bg-[#216e39] rounded-full animate-pulse shadow-[0_0_10px_rgba(33,110,57,0.5)]" />
            LIVE CONTRIBUTION HEATMAP
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Git contribution heatmap over 52 weeks</p>
        </div>
        <div className="flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full">
          <span className="text-[8px] font-black uppercase opacity-40 mr-1 tracking-widest">Intensity:</span>
          {["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"].map((color, i) => (
            <div 
              key={i} 
              className="w-4 h-4 border-2 border-black/10 rounded-sm" 
              style={{ backgroundColor: color }} 
            />
          ))}
        </div>
      </div>

      <div className="relative overflow-x-auto pb-4">
        <div className="flex gap-[3px] min-w-[600px] h-24 items-end">
          {activity.map((count, i) => {
            return (
              <div
                key={i}
                className="flex-1 border border-black/5 group relative transition-all duration-300 hover:scale-110 hover:z-10 cursor-pointer rounded-sm"
                style={{ 
                  height: count === 0 ? '15%' : `${15 + (count / maxCommits) * 85}%`,
                  backgroundColor: getGitColor(count)
                }}
              >
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-20">
                  <div className="bg-black text-white text-[10px] font-black px-3 py-2 whitespace-nowrap border-2 border-white shadow-2xl rounded-sm">
                    {count} Commits {count > 10 ? '🔥' : count > 0 ? '✨' : '💤'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between mt-4 text-[10px] font-black uppercase opacity-30 tracking-[0.3em] border-t-2 border-black/5 pt-4">
          <span>{new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</span>
          <span className="text-black opacity-100 italic">Live Velocity Data</span>
          <span>Present Day</span>
        </div>
      </div>
    </div>
  );
}

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
      if (window.innerWidth < 640) setItemsPerPage(4);
      else if (window.innerWidth < 1024) setItemsPerPage(8);
      else setItemsPerPage(12);
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    const REPOS_TO_FETCH = [
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white border-2 border-black p-4 flex gap-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="w-16 h-16 border-2 border-black bg-black/5 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-black/10 rounded-sm animate-pulse" />
                <div className="h-3 w-1/2 bg-black/5 rounded-sm animate-pulse" />
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

  return (
    <div className="space-y-12">
      {/* Leader Board Header & Filter */}
      <div className="bg-white border-4 border-black p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl text-yellow-500 drop-shadow-[0_2px_10px_rgba(250,204,21,0.5)]">👑</span>
            <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tighter">
              Leader Board
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-black/40 uppercase tracking-widest">filter:</span>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Input search word"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-50 text-black px-4 py-2 border-2 border-black rounded-full text-xs font-bold outline-none focus:ring-2 ring-yellow-400 transition-all w-48 sm:w-64"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-black/40 uppercase tracking-widest">sort:</span>
              <select className="bg-gray-50 text-black px-4 py-2 border-2 border-black rounded-full text-xs font-bold outline-none">
                <option>Commits</option>
                <option>Impact</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results info */}
        {searchTerm && (
          <div className="bg-yellow-400 border-2 border-black px-4 py-2 inline-block rounded-full font-black uppercase text-[10px] tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Found {filteredContributors.length} results for &quot;{searchTerm}&quot;
          </div>
        )}

        {/* Contributors List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {currentContributors.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-black/5 border-2 border-black/10 rounded-xl">
              <div className="text-6xl mb-4">🔍</div>
              <div className="font-black uppercase tracking-widest text-black/20 text-xl">
                NO_MATCH_FOUND
              </div>
            </div>
          ) : (
            currentContributors.map((c, i) => {
              const globalIndex = startIndex + i;
              const rank = globalIndex + 1;
              
              // Uniform background color as requested
              const rankBg = "bg-white";

              return (
                <a
                  key={c.login}
                  href={c.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center gap-4 p-4 ${rankBg} border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}
                >
                  {/* Rank Number */}
                  <div className="w-8 text-center font-black text-black text-xl md:text-2xl opacity-30">
                    {rank}
                  </div>

                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-black/10 overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.avatar_url} alt={c.login} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-black font-black text-base md:text-lg uppercase tracking-tighter truncate">
                      {c.login}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase opacity-30">Commits</span>
                        <span className="text-xs font-black">{c.contributions}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black uppercase opacity-30">Impact</span>
                        <span className="text-xs font-black">{Math.round((c.contributions / (topContributor?.contributions || 1)) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Icon */}
                  <div className="text-black/20 group-hover:text-black transition-colors">
                    <span className="material-symbols-outlined text-xl">north_east</span>
                  </div>
                </a>
              );
            })
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col gap-8 bg-white border-4 border-black p-6 sm:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          {/* Page info */}
          <div className="flex items-center justify-between border-b-4 border-black pb-4">
            <div className="font-black uppercase text-base tracking-[0.2em]">
              Dispatch <span className="text-yellow-500">#{currentPage}</span> / {totalPages}
            </div>
            <div className="font-bold uppercase text-[10px] tracking-widest opacity-40">
              {startIndex + 1}-{Math.min(endIndex, filteredContributors.length)} OF {filteredContributors.length} MEMBERS
            </div>
          </div>

          {/* Pagination controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between w-full">
            {/* Previous */}
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="group relative flex-1 sm:flex-none"
            >
              <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform disabled:opacity-0" />
              <div className="relative px-8 py-4 border-4 border-black font-black uppercase text-sm bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all group-active:translate-x-1 group-active:translate-y-1">
                ← PREVIOUS
              </div>
            </button>

            <div className="flex gap-2 justify-center">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNum = currentPage;
                if (currentPage <= 3) pageNum = i + 1;
                else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = currentPage - 2 + i;

                if (pageNum <= 0 || pageNum > totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 border-4 border-black font-black flex items-center justify-center transition-all ${currentPage === pageNum ? 'bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'bg-white hover:bg-black hover:text-white'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next */}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="group relative flex-1 sm:flex-none"
            >
              <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform disabled:opacity-0" />
              <div className="relative px-8 py-4 border-4 border-black font-black uppercase text-sm bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all group-active:translate-x-1 group-active:translate-y-1">
                NEXT →
              </div>
            </button>
          </div>

          {/* View All Button */}
          <div className="flex justify-center pt-8">
            <a
              href="https://github.com/KERALACODERSCAFE/Keralacoderscafe/graphs/contributors"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-6 px-16 py-6 bg-black text-white border-4 border-black overflow-hidden transition-all hover:bg-yellow-400 hover:text-black"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
              <span className="relative font-black uppercase text-base tracking-[0.4em]">ACCESS_GLOBAL_DATA</span>
              <span className="material-symbols-outlined relative text-2xl group-hover:rotate-45 transition-transform">
                analytics
              </span>
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

        {/* Project Progress */}
        <section className="bg-yellow-400 border-4 border-black p-6 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,106,52,1)] relative">
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
        </section>

        <ProjectPulse repoUrl={content.github} />

        {/* Features for Users */}
        <section>
          <h2 className="text-2xl md:text-5xl font-black uppercase mb-8 md:mb-16 tracking-tighter border-l-8 border-black pl-4 md:pl-8">
            What Food Explorers Can Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {userFeatures.map((f) => <FeatureCard key={f.label} {...f} />)}
          </div>
        </section>


        {/* Team — Live Contributors */}
        <section className="space-y-12">
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
        <section className="pt-16 border-t-8 border-black space-y-12">
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">Community Effort</h2>
            <div className="inline-flex items-center gap-3 border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <span className="h-3 w-3 border-2 border-black bg-emerald-500" />
              LIVE REPO STATS
            </div>
          </div>
          <ProjectPulse repoUrl={project.github} />
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

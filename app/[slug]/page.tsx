"use client";

import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";
import { REPOS, Project } from "@/lib/projects";
import { PROJECT_DETAILS, ProjectContent } from "@/lib/project-details";
import DiagonalGrid from "@/components/ui/demo";
import BackgroundGlow from "@/components/ui/background-components";
import ModelViewer from "@/app/components/ModelViewer";
import CursorFollower from "@/app/components/CursorFollower";

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

/* ─── Project Activity Pulse ───────────────────────────────────── */

interface PunchCardData {
  day: number;
  hour: number;
  count: number;
}

const getGitColor = (count: number, max: number) => {
  if (count === 0) return "bg-[#ebedf0]";
  const intensity = count / max;
  if (intensity < 0.25) return "bg-[#9be9a8]";
  if (intensity < 0.5) return "bg-[#40c463]";
  if (intensity < 0.75) return "bg-[#30a14e]";
  return "bg-[#216e39]";
};

const DayName = ({ name }: { name: string }) => (
  <div className="text-[10px] font-black uppercase opacity-40 h-4 flex items-center min-w-[32px]">
    {name}
  </div>
);

function ProjectPulse({ repoUrl }: { repoUrl?: string }) {
  const [punchData, setPunchData] = useState<number[][]>([]); // [day][hour]
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

    let retryCount = 0;
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/github?endpoint=repos/${repoPath}/stats/punch_card`);

        if (response.status === 202 && retryCount < 3) {
          retryCount++;
          setTimeout(fetchStats, 3000);
          return;
        }

        if (response.status === 403) {
          // Rate limited - use mock data for demonstration
          const mock = Array.from({ length: 7 }, () =>
            Array.from({ length: 24 }, () => Math.floor(Math.random() * 20))
          );
          setPunchData(mock);
          setIsMock(true);
          setLoading(false);
          return;
        }

        if (!response.ok) {
          setLoading(false);
          return;
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          const grid = Array.from({ length: 7 }, () => new Array(24).fill(0));
          data.forEach(([day, hour, count]) => {
            grid[day][hour] = count;
          });
          setPunchData(grid);
          setIsMock(false);
        }
      } catch (err) {
        console.error("Error fetching punch card:", err);
        // Fallback to mock on any error for demo purposes
        const mock = Array.from({ length: 7 }, () =>
          Array.from({ length: 24 }, () => Math.floor(Math.random() * 15))
        );
        setPunchData(mock);
        setIsMock(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [repoUrl]);

  if (loading) {
    return (
      <div className="bg-black text-white border-4 border-yellow-400 p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-pulse space-y-6">
        <div className="h-8 w-64 bg-white/10" />
        <div className="grid grid-cols-24 gap-1 h-32 bg-white/5" />
      </div>
    );
  }

  if (punchData.length === 0) {
    return (
      <div className="bg-black text-white border-4 border-yellow-400 p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center space-y-4">
        <div className="text-4xl opacity-20 font-black">PUNCH_CARD_EMPTY</div>
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">No hourly activity data found for this repository.</p>
      </div>
    );
  }

  const maxCommits = Math.max(...punchData.flat(), 1);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-black text-white border-4 border-yellow-400 p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-8 relative overflow-hidden">
      {isMock && (
        <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 font-black text-[8px] uppercase tracking-widest z-20 shadow-[-4px_4px_0px_0px_rgba(0,0,0,1)] border-b-2 border-l-2 border-yellow-400">
          Demo Mode: API Rate Limited
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
            <span className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
            PEAK ACTIVITY PUNCH CARD
          </h3>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Commit frequency by day and hour {isMock ? '(Demo Data)' : '(All time)'}</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <span className="text-[8px] font-black uppercase opacity-50 mr-1 tracking-widest">Quiet</span>
          {["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"].map((color, i) => (
            <div
              key={i}
              className="w-4 h-4 border-2 border-black/50 rounded-sm"
              style={{ backgroundColor: color }}
            />
          ))}
          <span className="text-[8px] font-black uppercase opacity-50 ml-1 tracking-widest">Peak</span>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 pr-1">
            {days.map(d => <DayName key={d} name={d} />)}
          </div>

          <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
            <div className="flex flex-col gap-1 min-w-max">
              {punchData.map((dayHours, dayIndex) => (
                <div key={dayIndex} className="flex gap-1">
                  {dayHours.map((count, hourIndex) => (
                    <div
                      key={hourIndex}
                      className={`w-6 h-4 md:w-8 md:h-6 rounded-sm border border-white/5 transition-all duration-300 hover:scale-110 hover:z-10 cursor-pointer ${getGitColor(count, maxCommits)}`}
                      title={mounted ? `${count} commits at ${hourIndex}:00 on ${days[dayIndex]}` : undefined}
                    >
                      {count > (maxCommits * 0.7) && count > 0 && (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[8px] font-black text-black/50">!</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex gap-1 mt-4 text-[8px] font-black uppercase opacity-40 tracking-widest min-w-max pl-[4px]">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="w-6 md:w-8 text-center text-white">
                  {i % 4 === 0 ? `${i}h` : ""}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4 text-[10px] font-black uppercase opacity-40 tracking-[0.3em] border-t-2 border-white/10 pt-4">
        <span>Midnight (00:00)</span>
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 opacity-100 font-black italic">
            {isMock ? 'Waiting for GitHub API reset...' : 'Visualizing peak collaboration windows'}
          </span>
        </div>
        <span>Night (23:00)</span>
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
      if (window.innerWidth < 640) setItemsPerPage(10);
      else if (window.innerWidth < 1024) setItemsPerPage(12);
      else setItemsPerPage(12);
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    const REPOS_TO_FETCH = [
      "/api/github?endpoint=repos/KERALACODERSCAFE/Kerala-toddy-finder/contributors?per_page=100",
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
          <div className="h-14 w-full md:w-96 bg-zinc-800 border-4 border-zinc-700 animate-pulse rounded-xl" />
          <div className="h-14 w-48 bg-zinc-800 border-4 border-zinc-700 animate-pulse rounded-full" />
        </div>

        {/* Loading skeleton for grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-[#1a1a1a] border-[3px] border-zinc-800 rounded-xl p-3 sm:p-2 md:p-4 flex gap-3 sm:gap-2 md:gap-4 shadow-none">
              <div className="w-10 h-10 sm:w-8 sm:h-8 md:w-16 md:h-16 rounded-full border-4 border-zinc-700 bg-zinc-800 animate-pulse shrink-0" />
              <div className="flex-1 space-y-2 mt-2">
                <div className="h-4 bg-zinc-700 rounded-sm animate-pulse w-3/4" />
                <div className="h-3 w-1/2 bg-zinc-800 rounded-sm animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (contributors.length === 0) {
    return (
      <div className="text-center py-20 bg-black border-4 border-yellow-400 shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
        <div className="text-6xl mb-4">🔍</div>
        <div className="font-black uppercase tracking-widest text-white/50 text-xl">
          No contributor data available
        </div>
      </div>
    );
  }

  const topContributor = filteredContributors[0];

  return (
    <div className="space-y-12">
      {/* Leader Board Header & Filter */}
      <div className="bg-black border-4 border-yellow-400 p-6 md:p-10 shadow-[12px_12px_0px_0px_rgba(250,204,21,1)] space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <svg className="w-10 h-10 md:w-12 md:h-12 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
              Leader Board
            </h2>
          </div>

          <div className="flex flex-nowrap items-center gap-2 sm:gap-4 w-full md:w-auto mt-4 md:mt-0">
            <div className="flex items-center gap-2 flex-1 md:flex-none">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest hidden sm:inline">filter:</span>
              <div className="relative flex-1 md:w-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#1a1a1a] text-white px-3 py-2 border-2 border-yellow-400 rounded-full text-xs font-bold outline-none focus:ring-2 ring-yellow-400 transition-all w-full md:w-48 lg:w-64 placeholder:text-zinc-500"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest hidden sm:inline">sort:</span>
              <select className="bg-[#1a1a1a] text-white px-3 py-2 border-2 border-yellow-400 rounded-full text-xs font-bold outline-none">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-4">
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

              const themes = [
                { border: 'border-[#4a8fb9]', text: 'text-[#4a8fb9]' },
                { border: 'border-[#a8327b]', text: 'text-[#a8327b]' },
                { border: 'border-[#4bb3bd]', text: 'text-[#4bb3bd]' },
                { border: 'border-[#e45a6c]', text: 'text-[#e45a6c]' },
                { border: 'border-[#f09c3e]', text: 'text-[#f09c3e]' },
                { border: 'border-[#6c5ce7]', text: 'text-[#6c5ce7]' },
              ];
              const theme = themes[globalIndex % themes.length];

              return (
                <a
                  key={c.login}
                  href={c.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center gap-3 sm:gap-2 md:gap-4 p-3 sm:p-2 md:p-4 bg-[#1a1a1a] border-[3px] ${theme.border} rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}
                >
                  {/* Rank Number */}
                  <div className={`w-8 sm:w-6 md:w-8 text-center font-black ${theme.text} text-xl sm:text-lg md:text-2xl opacity-80`}>
                    {rank}
                  </div>

                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 sm:w-8 sm:h-8 md:w-12 md:h-12 rounded-full border-[3px] border-black/50 overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.avatar_url} alt={c.login} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-black text-base sm:text-sm md:text-base uppercase tracking-tighter truncate">
                      {c.login}
                    </h3>
                    <div className="flex items-center gap-3 sm:gap-2 md:gap-4 mt-1">
                      <div className="flex flex-col">
                        <span className={`text-[8px] sm:text-[6px] md:text-[8px] font-black uppercase opacity-60 ${theme.text}`}>Commits</span>
                        <span className="text-xs sm:text-[10px] md:text-xs font-black text-white">{c.contributions}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-[8px] sm:text-[6px] md:text-[8px] font-black uppercase opacity-60 ${theme.text}`}>Impact</span>
                        <span className="text-xs sm:text-[10px] md:text-xs font-black text-white">{Math.round((c.contributions / (topContributor?.contributions || 1)) * 100)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Icon */}
                  <div className={`${theme.text} opacity-50 group-hover:opacity-100 transition-colors`}>
                    <span className="material-symbols-outlined text-xl sm:text-lg md:text-xl">north_east</span>
                  </div>
                </a>
              );
            })
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-8">
          <div className="flex gap-2">
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
                  className={`w-10 h-10 border-4 border-yellow-400 font-black flex items-center justify-center transition-all ${currentPage === pageNum ? 'bg-yellow-400 text-black shadow-[2px_2px_0px_0px_rgba(250,204,21,1)]' : 'bg-[#1a1a1a] text-yellow-400 hover:bg-yellow-400 hover:text-black'
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Bespoke Project Detail ─────────────────────────────────────── */

function BespokeProjectDetail({ content }: { content: ProjectContent }) {
  const { hero, userFeatures, ownerFeatures, why, team, progress, vision } = content;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <DiagonalGrid className="bg-background text-on-background font-body min-h-screen">
      <CursorFollower />
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
        <section className="bg-black border-4 border-yellow-400 p-6 md:p-12 shadow-[12px_12px_0px_0px_rgba(250,204,21,1)] relative">
          <div className="absolute -top-3 -left-2 bg-yellow-400 text-black px-4 py-2 font-black text-xs uppercase tracking-widest border-2 border-black z-10">Project Progress</div>
          <div className="text-center mb-12">
          </div>

          <div className="space-y-2">
            <style>{`
              @keyframes shimmer-sweep {
                0% { transform: translateX(-150%); }
                100% { transform: translateX(300%); }
              }
            `}</style>
            {progress.stages.map((stage, index) => {
              const themes = [
                { border: 'border-[#4a8fb9]', fill: 'bg-[#4a8fb9]', text: 'text-[#4a8fb9]', icon: 'visibility' },
                { border: 'border-[#a8327b]', fill: 'bg-[#a8327b]', text: 'text-[#a8327b]', icon: 'tune' },
                { border: 'border-[#4bb3bd]', fill: 'bg-[#4bb3bd]', text: 'text-[#4bb3bd]', icon: 'hourglass_empty' },
                { border: 'border-[#e45a6c]', fill: 'bg-[#e45a6c]', text: 'text-[#e45a6c]', icon: 'headset_mic' },
                { border: 'border-[#f09c3e]', fill: 'bg-[#f09c3e]', text: 'text-[#f09c3e]', icon: 'construction' },
                { border: 'border-[#6c5ce7]', fill: 'bg-[#6c5ce7]', text: 'text-[#6c5ce7]', icon: 'code' },
              ];
              const theme = themes[index % themes.length];
              const totalSegments = 40;
              const filledSegments = Math.round((stage.percentage / 100) * totalSegments);

              return (
                <div key={stage.label}>
                  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-8 w-full py-4">
                    {/* Mobile Header (Icon + Label + Percentage) */}
                    <div className="flex items-center justify-between w-full md:w-64 shrink-0">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${theme.fill} text-white flex items-center justify-center shadow-[inset_0_-5px_10px_rgba(0,0,0,0.4)] border-2 border-black drop-shadow-md shrink-0`}>
                          <span className="material-symbols-outlined text-base md:text-xl">{theme.icon}</span>
                        </div>
                        <span className={`font-serif text-base md:text-xl text-white leading-tight`}>{stage.label}</span>
                      </div>
                      {/* Percentage on Mobile Only */}
                      <div className={`md:hidden font-serif text-lg font-bold ${theme.text}`}>
                        {stage.percentage}%
                      </div>
                    </div>

                    {/* Middle: Progress Bar */}
                    <div className={`relative w-full md:flex-1 h-6 md:h-10 shrink-0 border-[3px] md:border-[4px] ${theme.border} rounded-lg md:rounded-xl flex items-center p-[2px] md:p-1 gap-[1px] md:gap-[2px] bg-[#1a1a1a] shadow-sm overflow-hidden`}>
                      {Array.from({ length: totalSegments }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-full flex-1 rounded-[1px] md:rounded-[2px] transition-all duration-700 ease-out ${i < (mounted ? filledSegments : 0)
                              ? theme.fill
                              : 'bg-zinc-800'
                            }`}
                          style={{ transitionDelay: `${i * 10}ms` }}
                        />
                      ))}
                      {/* Active Shimmer Animation */}
                      {stage.percentage > 0 && mounted && (
                        <div 
                          className="absolute inset-0 w-[60%] h-full pointer-events-none mix-blend-overlay"
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                            animation: `shimmer-sweep 2.5s infinite ease-in-out ${index * 0.15}s`
                          }}
                        />
                      )}
                    </div>

                    {/* Right: Percentage on Desktop Only */}
                    <div className={`hidden md:block w-16 text-right font-serif text-xl md:text-2xl ${theme.text} shrink-0`}>
                      {stage.percentage}%
                    </div>
                  </div>

                  {/* Dashed Separator */}
                  {index < progress.stages.length - 1 && (
                    <div className="border-b border-dashed border-zinc-700 w-full mt-2 opacity-50" />
                  )}
                </div>
              );
            })}
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
          <div className="mb-10 md:mb-16 text-center space-y-4">
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">Contribution Member List</h2>
            <p className="font-bold uppercase tracking-widest opacity-60 underline decoration-black underline-offset-4 decoration-2">Building Kerala&apos;s Digital Heritage</p>
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

/* ─── Route Handler ───────────────────────────────────────────── */

export default function SlugRedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = REPOS.find((r) => r.slug === slug);

  if (!project) notFound();

  const bespokeDetails = PROJECT_DETAILS[project.id];

  if (bespokeDetails) return <BespokeProjectDetail content={bespokeDetails} />;
  return <GenericProjectDetail project={project} />;
}

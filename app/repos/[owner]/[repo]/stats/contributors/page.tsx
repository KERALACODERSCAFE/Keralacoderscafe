"use client";

import { use, useState, useEffect } from "react";
import DiagonalGrid from "@/components/ui/demo";
import BackgroundGlow from "@/components/ui/background-components";

interface CommitActivity {
  days: number[];
  total: number;
  week: number;
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
  <div className="text-[8px] font-black uppercase opacity-30 h-3 flex items-center">
    {name}
  </div>
);

export default function RepoStatsPage({ params }: { params: Promise<{ owner: string; repo: string }> }) {
  const { owner, repo } = use(params);
  const [activity, setActivity] = useState<CommitActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/github?endpoint=repos/${owner}/${repo}/stats/commit_activity`);
        if (!response.ok) {
          if (response.status === 404) throw new Error("Repo not found");
          if (response.status === 202) {
            // GitHub is calculating stats, retry after a bit
            setTimeout(fetchStats, 3000);
            return;
          }
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setActivity(data);
        } else {
          setError("Invalid data received");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [owner, repo]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="bg-white border-4 border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center space-y-6 max-w-md">
          <div className="text-6xl">⚠️</div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Oops! {error}</h1>
          <p className="font-bold opacity-60">We couldn't find the repository stats for {owner}/{repo}.</p>
          <a href="/" className="inline-block bg-yellow-400 border-2 border-black px-6 py-2 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  const maxCommits = Math.max(...activity.flatMap(w => w.days), 1);
  const totalCommits = activity.reduce((acc, w) => acc + w.total, 0);

  return (
    <DiagonalGrid className="bg-background text-on-background font-body min-h-screen">
      <BackgroundGlow className="absolute inset-0 pointer-events-none z-0" />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Epilogue:wght@800;900&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap');
        h1, h2, h3, h4 { font-family: 'Epilogue', sans-serif; }
      `}</style>

      <div className="relative px-4 md:px-6 pt-24 md:pt-32 pb-16 md:pb-24 max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <header className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 border-2 border-yellow-400 font-black uppercase text-xs tracking-tighter shadow-[4px_4px_0px_0px_rgba(255,100,100,1)]">
            Repository Analytics
          </div>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            {owner}/<span className="bg-yellow-400 px-2">{repo}</span>
          </h1>
          <div className="flex justify-center gap-8 py-4">
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-black">{totalCommits}</div>
              <div className="text-[10px] font-black uppercase opacity-40 tracking-widest">Total Commits (Year)</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-black">{activity.length}</div>
              <div className="text-[10px] font-black uppercase opacity-40 tracking-widest">Weeks Tracked</div>
            </div>
          </div>
        </header>

        {/* Contribution Graph */}
        <div className="bg-white border-4 border-black p-6 md:p-12 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] space-y-8 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                <span className="w-4 h-4 bg-[#216e39] rounded-full animate-pulse shadow-[0_0_10px_rgba(33,110,57,0.5)]" />
                CONTRIBUTION_GRAPH
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Daily activity breakdown over 52 weeks</p>
            </div>
            <div className="flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full">
              <span className="text-[8px] font-black uppercase opacity-40 mr-1 tracking-widest">Less</span>
              {["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"].map((color, i) => (
                <div 
                  key={i} 
                  className="w-3 h-3 border border-black/10 rounded-sm" 
                  style={{ backgroundColor: color }} 
                />
              ))}
              <span className="text-[8px] font-black uppercase opacity-40 ml-1 tracking-widest">More</span>
            </div>
          </div>

          <div className="relative">
            <div className="flex gap-2">
              {/* Day Labels */}
              <div className="flex flex-col gap-1 pt-4 pr-1">
                <DayName name="Mon" />
                <div className="h-3" />
                <DayName name="Wed" />
                <div className="h-3" />
                <DayName name="Fri" />
              </div>

              {/* Grid Container */}
              <div className="flex-1 overflow-x-auto pb-4 custom-scrollbar">
                <div className="flex gap-1 min-w-max">
                  {loading ? (
                    <div className="flex gap-1 animate-pulse">
                      {Array.from({ length: 52 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-1">
                          {Array.from({ length: 7 }).map((_, j) => (
                            <div key={j} className="w-3 h-3 bg-black/5 rounded-sm" />
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    activity.map((week, i) => (
                      <div key={i} className="flex flex-col gap-1">
                        {week.days.map((count, j) => (
                          <div
                            key={j}
                            className={`w-3 h-3 rounded-sm border border-black/5 transition-all duration-300 hover:scale-125 hover:z-10 cursor-pointer ${getGitColor(count, maxCommits)}`}
                            title={`${count} commits on ${new Date((week.week + j * 86400) * 1000).toLocaleDateString()}`}
                          />
                        ))}
                      </div>
                    ))
                  )}
                </div>
                
                {/* Month Labels */}
                {!loading && (
                  <div className="flex mt-2 text-[8px] font-black uppercase opacity-30 tracking-widest">
                    {activity.map((week, i) => {
                      const date = new Date(week.week * 1000);
                      const isFirstInMonth = date.getDate() <= 7;
                      if (isFirstInMonth && i % 4 === 0) {
                        return (
                          <div key={i} style={{ width: '4rem' }}>
                            {date.toLocaleDateString(undefined, { month: 'short' })}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h4 className="text-xl font-black uppercase tracking-tighter border-b-2 border-black pb-2">Top Performance</h4>
            <div className="text-4xl font-black text-[#216e39]">{maxCommits}</div>
            <p className="text-xs font-bold uppercase opacity-60">Peak daily commits</p>
          </div>
          <div className="bg-yellow-400 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h4 className="text-xl font-black uppercase tracking-tighter border-b-2 border-black pb-2">Active Streak</h4>
            <div className="text-4xl font-black text-black">
              {activity.filter(w => w.total > 0).length}
            </div>
            <p className="text-xs font-bold uppercase opacity-60">Weeks with activity</p>
          </div>
          <div className="bg-black text-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(255,200,0,1)] space-y-4">
            <h4 className="text-xl font-black uppercase tracking-tighter border-b-2 border-white/20 pb-2">Velocity</h4>
            <div className="text-4xl font-black text-yellow-400">
              {(totalCommits / 52).toFixed(1)}
            </div>
            <p className="text-xs font-bold uppercase opacity-60">Average commits per week</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-8">
          <a
            href={`https://github.com/${owner}/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-6 px-16 py-6 bg-black text-white border-4 border-black overflow-hidden transition-all hover:bg-yellow-400 hover:text-black"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
            <span className="relative font-black uppercase text-lg tracking-[0.4em]">VIEW_ON_GITHUB</span>
            <span className="material-symbols-outlined relative text-2xl group-hover:rotate-45 transition-transform">
              north_east
            </span>
          </a>
        </div>
      </div>
    </DiagonalGrid>
  );
}

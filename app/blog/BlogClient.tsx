"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Calendar,
  User,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Search,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface TagType {
  id: number;
  name: string;
  slug: string;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string | null;
  author_name: string;
  category: Category;
  tags: TagType[];
  published_at: string | null;
}

interface BlogClientProps {
  initialBlogs: BlogPost[];
  initialCategories: Category[];
}

export default function BlogClient({ initialBlogs, initialCategories }: BlogClientProps) {
  const router = useRouter();
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("View all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Extract category list
  const categoryTabs = [
    "View all",
    ...Array.from(
      new Set([
        ...(initialCategories || []).map((c) => c.name),
        ...initialBlogs.map((b) => b.category?.name).filter(Boolean),
      ])
    ),
  ];

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Keep the featured post stable as the first overall blog post
  const activeFeatured = initialBlogs.length > 0 ? initialBlogs[0] : null;

  // Filter logic
  const filteredBlogs = initialBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "View all" || blog.category?.name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Determine whether to display the Featured Post Hero layout
  // We hide the banner when search query is active to make search results clear
  const showFeaturedHero = activeFeatured !== null && currentPage === 1 && searchQuery === "";

  // Filter out the active featured article from the grid
  const gridBlogs = showFeaturedHero
    ? filteredBlogs.filter((b) => b.id !== activeFeatured.id)
    : filteredBlogs;

  // Pagination calculation
  const totalPages = Math.ceil(gridBlogs.length / itemsPerPage);
  const visibleBlogs = gridBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Recently";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return "Recently";
    }
  };

  const getReadingTime = (excerpt: string) => {
    const words = (excerpt || "").split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200) + 1);
    return `${minutes} min read`;
  };

  const getCountForCategory = (cat: string) => {
    if (cat === "View all") return initialBlogs.length;
    return initialBlogs.filter((b) => b.category?.name === cat).length;
  };

  const handleCardClick = (slug: string) => {
    setLoadingSlug(slug);
    router.push(`/blog/${slug}`);
  };

  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-white text-black pt-32 pb-24 px-6 md:px-12 relative overflow-hidden isolate">
        <div className="mx-auto max-w-[1200px] relative z-10">
          
          {/* Header block with purple label and dynamic subtitle */}
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#6941C6] tracking-widest uppercase block mb-3 font-body">Our blog</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-slate-900 leading-tight mb-4 font-editorial italic">The latest writings from our team</h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-headline italic">Fresh perspectives on code, careers and technology.</p>
          </div>

          {/* Featured Banner Section */}
          {showFeaturedHero && activeFeatured && (
            <div className="mb-16">
              <div 
                onClick={() => handleCardClick(activeFeatured.slug)}
                className="relative w-full overflow-hidden rounded-[2rem] bg-[#0B0F19] text-white p-6 md:p-12 shadow-sm min-h-[380px] md:min-h-[440px] flex flex-col justify-end group cursor-pointer border border-white/5"
              >
                {/* Background image or fallback gradient */}
                {activeFeatured.cover_image ? (
                  <img
                    src={activeFeatured.cover_image}
                    alt={activeFeatured.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A] via-[#1E1B4B] to-[#0B0F19] flex items-center justify-end overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                      backgroundImage: "radial-gradient(#fff 2px, transparent 2px)",
                      backgroundSize: "16px 16px"
                    }} />
                    {/* Faded interactive mockup graphic in background on desktop */}
                    <div className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 opacity-35 group-hover:scale-[1.03] transition-transform duration-500">
                      <div className="w-64 h-40 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl flex flex-col overflow-hidden relative">
                        <div className="h-6 bg-slate-800 border-b border-slate-700/50 px-3 flex items-center gap-1.5 shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex-grow flex items-center justify-center bg-slate-950 p-4">
                          <div className="text-2xl font-black text-purple-400 select-none">React Dev</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dark gradient overlay for high contrast readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 z-10" />

                {/* Card Content Overlay */}
                <div className="relative z-20 w-full text-left max-w-3xl">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20 mb-5 select-none">
                    Featured
                  </span>
                  
                  <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3 group-hover:text-[#D6BBFB] transition-colors">
                    {activeFeatured.title}
                  </h2>
                  
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-6 font-medium line-clamp-2 max-w-2xl">
                    {activeFeatured.excerpt}
                  </p>

                  {/* Author profile, metadata, and CTA arrow button */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/10 w-full select-none">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                          <User className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-xs font-bold text-white">Community Member</span>
                      </div>
                      <span>•</span>
                      <span>{formatDate(activeFeatured.published_at)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-white/60" /> {getReadingTime(activeFeatured.excerpt)}
                      </span>
                    </div>

                    {/* Action circle arrow link overlay */}
                    <div className="text-white bg-white/15 group-hover:bg-white group-hover:text-black w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 shadow-sm">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Two Column Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 items-start mt-12">
            
            {/* Sidebar (Left Column) - Search box, categories vertical list, and CTA */}
            <aside className="flex flex-col gap-6 sticky top-28 shrink-0 self-start w-full lg:w-[240px]">
              
              {/* Search Bar */}
              <div className="relative flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
                <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs font-medium text-slate-850 placeholder-slate-400 outline-none bg-transparent"
                />
              </div>

              {/* Categories Navigation */}
              <div className="text-left">
                <h3 className="text-xs font-bold text-[#6941C6] uppercase tracking-wider mb-4 select-none">
                  Blog categories
                </h3>
                <div className="flex flex-col gap-1 border-l border-slate-100">
                  {categoryTabs.map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "flex items-center justify-between text-left text-xs transition-all cursor-pointer pl-4 pr-3 py-2 block w-full rounded-r-lg border-l-2",
                          isActive
                            ? "text-[#6941C6] bg-[#F9F5FF] font-bold border-[#6941C6]"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 font-medium border-transparent"
                        )}
                      >
                        <span>{cat}</span>
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full select-none",
                          isActive ? "bg-[#F4EBFF] text-[#6941C6]" : "bg-slate-100 text-slate-500"
                        )}>
                          {getCountForCategory(cat)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Second Sidebar Widget Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm text-left flex flex-col items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#F9F5FF] border border-[#E9E3FC] flex items-center justify-center text-[#6941C6]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug">
                    Love what you read?
                  </h4>
                  <p className="text-[10px] text-slate-500 font-semibold mt-1 leading-normal">
                    Join our community of 5000+ developers and never miss an update.
                  </p>
                </div>
                <a
                  href="/join"
                  className="w-full text-center border-2 border-[#00B9A5] hover:bg-[#00B9A5]/5 text-[#00B9A5] py-2 font-bold rounded-xl text-xs flex justify-center items-center gap-1.5 cursor-pointer no-underline transition-colors"
                >
                  Join Community <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </aside>

            {/* Articles Grid (Right Column) */}
            <div className="flex flex-col gap-12 w-full">
              {gridBlogs.length === 0 ? (
                <div className="border-2 border-slate-200 bg-slate-50/30 p-12 rounded-xl text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.03)] max-w-md mx-auto my-6">
                  <span className="text-sm font-bold text-slate-700 mb-1.5 block">No more articles yet</span>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-xs mx-auto">
                    We couldn't find any other posts matching this category or query. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-6 gap-x-8 gap-y-12">
                  {visibleBlogs.map((blog, index) => {
                    // First 2 items are larger (take 3 columns of 6), subsequent items are smaller (take 2 columns of 6)
                    const isLarge = index < 2;
                    return (
                      <article
                        key={blog.slug}
                        onClick={() => handleCardClick(blog.slug)}
                        className={cn(
                          "group flex flex-col bg-white overflow-hidden cursor-pointer h-full relative",
                          isLarge ? "col-span-1 md:col-span-3" : "col-span-1 md:col-span-2",
                          loadingSlug === blog.slug ? "opacity-75 cursor-wait" : ""
                        )}
                      >
                        {/* Cover image */}
                        <div className={cn(
                          "relative overflow-hidden w-full bg-slate-50 shrink-0 rounded-2xl mb-4",
                          isLarge ? "h-56 md:h-64" : "h-40 md:h-44"
                        )}>
                          {blog.cover_image ? (
                            <img
                              src={blog.cover_image}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-tr from-purple-50 via-indigo-50 to-white flex items-center justify-center overflow-hidden">
                              <span className="text-2xl font-black opacity-10 tracking-widest text-slate-900">KCC BLOG</span>
                            </div>
                          )}
                        </div>

                        {/* Category and read time info */}
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#6941C6] mb-2.5">
                          {blog.category && <span>{blog.category.name}</span>}
                          {blog.category && !isLarge && <span>•</span>}
                          {!isLarge && <span className="text-slate-405 font-medium">{getReadingTime(blog.excerpt)}</span>}
                        </div>

                        {/* Card Title */}
                        <h4 className={cn(
                          "font-bold text-slate-900 group-hover:text-[#6941C6] transition-colors leading-snug mb-2 flex justify-between items-start gap-2",
                          isLarge ? "text-[16px] md:text-[17px]" : "text-[14px] md:text-[15px]"
                        )}>
                          <span>{blog.title}</span>
                          <ArrowUpRight className="w-4 h-4 text-slate-400 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </h4>

                        {/* Card Excerpt */}
                        <p className="text-xs text-slate-550 leading-relaxed line-clamp-2 mb-4">
                          {blog.excerpt}
                        </p>

                        {/* Author info */}
                        <div className="flex items-center gap-3 mt-auto">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                            <User className="w-4 h-4 text-slate-450" />
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-slate-900 leading-none">Community Member</div>
                            <div className="text-[9px] text-slate-450 font-semibold mt-1">{formatDate(blog.published_at)}</div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Clean Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-6 select-none">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex h-9 items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-4 rounded-lg font-bold text-xs shadow-sm cursor-pointer disabled:opacity-40 disabled:hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" /> Previous
                  </button>

                  <div className="hidden sm:flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={cn(
                          "w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs transition-colors cursor-pointer",
                          currentPage === pageNum
                            ? "bg-purple-50 text-[#6941C6]"
                            : "bg-white text-slate-650 hover:bg-slate-50"
                        )}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex h-9 items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-4 rounded-lg font-bold text-xs shadow-sm cursor-pointer disabled:opacity-40 disabled:hover:bg-white transition-colors"
                  >
                    Next <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* KCC Blog Submission Banner */}
          <div className="relative rounded-3xl bg-[#F4F1FD] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto mt-20 shadow-sm border border-[#E9E3FC]">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 bg-white border border-[#E9E3FC] rounded-full flex items-center justify-center text-[#6941C6] shadow-xs shrink-0">
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm md:text-base font-bold text-slate-900 leading-tight">
                  Share your story with the KCC Community
                </h3>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  We welcome submissions from all members! Write about your current situation, developer lifestyle, IT experiences, or thoughts on AI. Simply send your draft to us via email to get featured.
                </p>
              </div>
            </div>
            
            <a
              href="mailto:keralacoderscafe@gmail.com?subject=Blog%20Submission"
              className="bg-[#6941C6] hover:bg-[#5330a6] text-white px-6 py-3 font-bold rounded-xl text-xs transition-colors shrink-0 flex items-center gap-1.5 no-underline cursor-pointer shadow-sm"
            >
              Submit via Email ✉️ <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

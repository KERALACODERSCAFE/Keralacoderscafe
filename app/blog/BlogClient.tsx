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
  BookOpen,
  Code
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { getBlogAuthor } from "@/lib/blog-overrides";

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
  const theme = "dark";

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

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
  const composerCategories = categoryTabs.filter((c) => c !== "View all");

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

  // Split gridBlogs for the top section if showFeaturedHero is true
  const topGridBlogs = showFeaturedHero ? gridBlogs.slice(0, 6) : [];
  const mainGridBlogs = showFeaturedHero ? gridBlogs.slice(6) : gridBlogs;

  // Pagination calculation based on mainGridBlogs
  const totalPages = Math.ceil(mainGridBlogs.length / itemsPerPage);
  const visibleBlogs = mainGridBlogs.slice(
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
    <div className={cn("min-h-screen transition-colors duration-300", theme === "dark" ? "dark bg-[#090d16]" : "bg-white")}>
      <NavBar />

      <main className="min-h-screen bg-white dark:bg-[#090d16] text-black dark:text-slate-100 pt-32 pb-24 px-6 md:px-12 relative overflow-hidden isolate transition-colors duration-300">
        <div className="mx-auto max-w-[1200px] relative z-10">
          



          {/* Header block with purple label and dynamic subtitle */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-slate-900 dark:text-white leading-tight mb-4 font-editorial italic">The latest writings from our team</h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-headline italic">Fresh perspectives on code, careers and technology.</p>
          </div>



          {/* Featured Banner & Top Posts Section */}
          {showFeaturedHero && activeFeatured && (
            <div className="mb-16 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12">
              
              {/* Left Column: Large Featured Post */}
              <div 
                onClick={() => handleCardClick(activeFeatured.slug)}
                className="relative w-full overflow-hidden rounded-[2rem] bg-[#0B0F19] text-white p-6 md:p-10 shadow-sm min-h-[380px] flex flex-col justify-end group cursor-pointer border border-white/5"
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
                    <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 opacity-35 group-hover:scale-[1.03] transition-transform duration-500">
                      <div className="w-48 h-32 bg-slate-900 border border-slate-700/50 rounded-xl shadow-2xl flex flex-col overflow-hidden relative">
                        <div className="h-4 bg-slate-800 border-b border-slate-700/50 px-2 flex items-center gap-1 shrink-0">
                          <div className="w-1 h-1 rounded-full bg-red-500/80" />
                          <div className="w-1 h-1 rounded-full bg-yellow-500/80" />
                          <div className="w-1 h-1 rounded-full bg-green-500/80" />
                        </div>
                        <div className="flex-grow flex items-center justify-center bg-slate-950 p-2">
                          <Code className="w-6 h-6 text-purple-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Dark gradient overlay for high contrast readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 z-10" />

                {/* Card Content Overlay */}
                <div className="relative z-20 w-full text-left max-w-xl pr-8 md:pr-12">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20 mb-4 select-none">
                    Featured
                  </span>
                  
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3 group-hover:text-[#D6BBFB] transition-colors line-clamp-3">
                    {activeFeatured.title}
                  </h2>
                  
                  <p className="text-xs text-slate-300 leading-relaxed mb-5 font-medium line-clamp-2 max-w-lg">
                    {activeFeatured.excerpt}
                  </p>
 
                  {/* Author profile, metadata */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-4 border-t border-white/10 w-full select-none text-[10px] font-semibold text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                        <User className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className="font-bold text-white">
                        {getBlogAuthor(activeFeatured.slug, activeFeatured.author_name)}
                      </span>
                    </div>
                    <span>•</span>
                    <span>{formatDate(activeFeatured.published_at)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-white/60" /> {getReadingTime(activeFeatured.excerpt)}
                    </span>
                  </div>

                  {/* Action circle arrow link overlay positioned absolutely in the corner */}
                  <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-white bg-white/15 group-hover:bg-white group-hover:text-black w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Right Column: Top Grid Blogs (2 columns x 3 rows) */}
              {topGridBlogs.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 items-start self-start">
                  {topGridBlogs.map((blog) => (
                    <div 
                      key={blog.id} 
                      onClick={() => handleCardClick(blog.slug)}
                      className="group cursor-pointer flex flex-col gap-3"
                    >
                      {/* Image */}
                      <div className="w-full aspect-[16/9] relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 shrink-0 shadow-sm">
                        {blog.cover_image ? (
                          <img
                            src={blog.cover_image}
                            alt={blog.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                            <Code className="w-6 h-6 text-slate-400 dark:text-slate-600 opacity-50" />
                          </div>
                        )}
                        {/* Overlay to subtly darken images in dark mode for better contrast */}
                        <div className="absolute inset-0 bg-black/0 dark:bg-black/10 group-hover:dark:bg-black/0 transition-colors duration-300" />
                      </div>
                      
                      {/* Content */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(blog.published_at)}</span>
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug group-hover:text-[#6941C6] dark:group-hover:text-[#D6BBFB] transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* Bottom Layout - Sidebar + Main Grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 items-start mt-12">
            
            {/* Sidebar (Left Column) - Search box, categories vertical list, and CTA */}
            <aside className="flex flex-col gap-6 sticky top-28 shrink-0 self-start w-full lg:w-[240px]">
              
              {/* Search Bar */}
              <div className="relative flex items-center bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 shadow-sm">
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 mr-2" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs font-medium text-slate-850 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-650 outline-none bg-transparent"
                />
              </div>

              {/* Categories Navigation */}
              <div className="text-left">
                <h3 className="text-xs font-bold text-[#6941C6] dark:text-purple-400 uppercase tracking-wider mb-3 lg:mb-4 select-none">
                  Blog categories
                </h3>
                <div className="flex flex-row lg:flex-col gap-2 lg:gap-1 overflow-x-auto lg:overflow-x-visible scrollbar-hide border-none lg:border-l lg:border-slate-100 lg:dark:border-slate-800 pb-2 lg:pb-0">
                  {categoryTabs.map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={cn(
                          "flex items-center justify-between text-left text-xs transition-all cursor-pointer whitespace-nowrap shrink-0",
                          // Mobile styles (pills)
                          "px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-medium",
                          isActive && "border-[#6941C6] dark:border-white bg-[#F9F5FF] dark:bg-white text-[#6941C6] dark:text-black font-bold",
                          // Desktop styles (standard vertical buttons)
                          "lg:px-4 lg:py-2.5 lg:block lg:w-full lg:rounded-xl lg:border-none lg:bg-transparent lg:dark:bg-transparent lg:text-slate-600 lg:dark:text-slate-400 hover:lg:bg-slate-50 hover:lg:dark:bg-slate-800/50",
                          isActive && "lg:bg-white lg:dark:bg-white lg:text-slate-900 lg:dark:text-black lg:font-bold lg:shadow-sm"
                        )}
                      >
                        <span className="relative z-10">{cat}</span>
                        <span className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-full select-none ml-1.5 lg:ml-0 relative z-10",
                          isActive ? "bg-slate-100 dark:bg-slate-200 text-slate-800 dark:text-black" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                        )}>
                          {getCountForCategory(cat)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
 
              {/* Second Sidebar Widget Card - Hidden on mobile */}
              <div className="hidden lg:flex bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-2xl p-5 shadow-sm text-left flex-col items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#F9F5FF] dark:bg-purple-950/40 border border-[#E9E3FC] dark:border-purple-900/40 flex items-center justify-center text-[#6941C6] dark:text-purple-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white leading-snug">
                    Love what you read?
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1 leading-normal">
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

              {/* Blog Submission Sidebar Widget (Neubrutalist Style matching write-for-kcc) */}
              <div className="border-4 border-black bg-[#FFE66D] p-5 text-left flex flex-col items-start gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] text-black w-full rounded-none">
                <div className="w-10 h-10 border-3 border-black bg-white flex items-center justify-center text-black shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-black">
                    WRITE FOR KCC
                  </h4>
                  <p className="text-[11px] text-black/90 font-bold leading-normal mt-1">
                    Share your knowledge, ideas, projects and opinions with our developer community.
                  </p>
                </div>
                <a
                  href="https://forms.gle/Z6wCFuYcbLdCyT1n9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center border-3 border-black bg-black hover:bg-slate-900 text-white py-2.5 font-black uppercase text-xs flex justify-center items-center gap-1.5 cursor-pointer no-underline transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none"
                >
                  SUBMIT YOUR BLOG <ArrowRight className="w-3.5 h-3.5 text-white" />
                </a>
              </div>

            </aside>

            {/* Articles Grid (Right Column) */}
            <div className="flex flex-col gap-12 w-full">
              {gridBlogs.length === 0 ? (
                <div className="border-2 border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10 p-12 rounded-xl text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.03)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.01)] max-w-md mx-auto my-6">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5 block">No more articles yet</span>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium leading-relaxed max-w-xs mx-auto">
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
                          "group flex flex-col bg-white dark:bg-transparent overflow-hidden cursor-pointer h-full relative",
                          isLarge ? "col-span-1 md:col-span-3" : "col-span-1 md:col-span-2",
                          loadingSlug === blog.slug ? "opacity-75 cursor-wait" : ""
                        )}
                      >
                        {/* Cover image */}
                        <div className={cn(
                          "relative overflow-hidden w-full bg-slate-50 dark:bg-slate-900/80 shrink-0 rounded-2xl mb-4",
                          isLarge ? "h-56 md:h-64" : "h-40 md:h-44"
                        )}>
                          {blog.cover_image ? (
                            <img
                              src={blog.cover_image}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-tr from-purple-50 via-indigo-50 to-white dark:from-slate-900 dark:to-slate-800 flex items-center justify-center overflow-hidden">
                              <span className="text-2xl font-black opacity-10 dark:opacity-5 tracking-widest text-slate-900 dark:text-white">KCC BLOG</span>
                            </div>
                          )}
                        </div>

                        {/* Category and read time info */}
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#6941C6] dark:text-purple-400 mb-2.5">
                          {blog.category && <span>{blog.category.name}</span>}
                          {blog.category && !isLarge && <span>•</span>}
                          {!isLarge && <span className="text-slate-450 dark:text-slate-500 font-medium">{getReadingTime(blog.excerpt)}</span>}
                        </div>

                        {/* Card Title */}
                        <h4 className={cn(
                          "font-bold text-slate-900 dark:text-white group-hover:text-[#6941C6] dark:group-hover:text-purple-400 transition-colors leading-snug mb-2 flex justify-between items-start gap-2",
                          isLarge ? "text-[16px] md:text-[17px]" : "text-[14px] md:text-[15px]"
                        )}>
                          <span>{blog.title}</span>
                          <ArrowUpRight className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </h4>

                        {/* Card Excerpt */}
                        <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
                          {blog.excerpt}
                        </p>

                        {/* Author info */}
                        <div className="flex items-center gap-3 mt-auto">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center border dark:border-slate-800">
                            <User className="w-4 h-4 text-slate-450 dark:text-slate-500" />
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-slate-900 dark:text-slate-200 leading-none">
                              {getBlogAuthor(blog.slug, blog.author_name)}
                            </div>
                            <div className="text-[9px] text-slate-450 dark:text-slate-500 font-semibold mt-1">{formatDate(blog.published_at)}</div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Clean Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6 mt-6 select-none">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex h-9 items-center gap-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 rounded-lg font-bold text-xs shadow-sm cursor-pointer disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-slate-900 transition-colors"
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
                            ? "bg-purple-50 dark:bg-purple-950/40 text-[#6941C6] dark:text-purple-300"
                            : "bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                        )}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex h-9 items-center gap-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 px-4 rounded-lg font-bold text-xs shadow-sm cursor-pointer disabled:opacity-40 disabled:hover:bg-white dark:disabled:hover:bg-slate-900 transition-colors"
                  >
                    Next <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>


        </div>
      </main>

      {/* Mobile Floating Action Button for "Write for KCC" */}
      <a
        href="https://forms.gle/Z6wCFuYcbLdCyT1n9"
        target="_blank"
        rel="noopener noreferrer"
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#0B0F19] dark:bg-white rounded-full shadow-lg border border-slate-700 dark:border-white/20 flex items-center justify-center text-white dark:text-black hover:scale-105 transition-transform"
        aria-label="Write for KCC"
      >
        <svg className="w-6 h-6 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
      </a>

      <Footer />
    </div>
  );
}

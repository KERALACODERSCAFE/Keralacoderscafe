"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  BookOpen,
  ArrowRight,
  Bookmark,
  Twitter,
  Linkedin,
  Copy,
  Check,
  Lightbulb,
  Sun,
  Moon
} from "lucide-react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
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

interface AuthorType {
  name: string;
  title: string | null;
}

interface BlogDetail {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  author_name?: string;
  author?: AuthorType;
  category: Category;
  tags: TagType[];
  published_at: string | null;
  updated_at?: string;
}

interface SimilarBlog {
  title: string;
  slug: string;
  category: string;
}

interface BlogDetailClientProps {
  blog: BlogDetail | null;
  similarBlogs?: SimilarBlog[];
}

interface ToCItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogDetailClient({ blog, similarBlogs = [] }: BlogDetailClientProps) {
  const router = useRouter();
  const [toc, setToC] = useState<ToCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isSaved, setIsSaved] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("kcc_theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("kcc_theme", "dark");
      setTheme("dark");
    }
  };

  const isImageInContent = (() => {
    if (!blog || !blog.cover_image || !blog.content) return false;
    if (blog.content.includes(blog.cover_image)) return true;
    try {
      const urlParts = blog.cover_image.split("/");
      const filename = urlParts[urlParts.length - 1];
      if (filename && filename.length > 4 && blog.content.includes(filename)) {
        return true;
      }
    } catch {
      // fallback
    }
    return false;
  })();

  // Parse Table of Contents and inject IDs
  useEffect(() => {
    if (!blog) return;

    // Wait a brief tick for the content to render in DOM
    const timer = setTimeout(() => {
      const container = document.getElementById("blog-content-body");
      if (!container) return;

      const headings = container.querySelectorAll("h1, h2, h3");
      const items: ToCItem[] = [];

      headings.forEach((heading, idx) => {
        const text = heading.textContent || "";
        const slugged = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        const id = slugged || `heading-${idx}`;
        heading.id = id;

        items.push({
          id,
          text,
          level: heading.tagName === "H1" ? 1 : heading.tagName === "H2" ? 2 : 3
        });
      });

      setToC(items);
    }, 100);

    return () => clearTimeout(timer);
  }, [blog]);

  // Scroll Spy to highlight active section
  useEffect(() => {
    if (toc.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      // Find the heading that is closest to the top of the viewport
      let currentActive = "";
      for (const item of toc) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            currentActive = item.id;
          }
        }
      }

      // Default to first item if scrolled to top
      if (!currentActive && toc.length > 0) {
        currentActive = toc[0].id;
      }

      setActiveId(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial trigger
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  if (!blog) {
    return (
      <>
        <NavBar />
        <main className="min-h-screen bg-[#F8FAFC] text-black pt-32 pb-24 px-6 md:px-12 flex items-center justify-center">
          <div className="mx-auto max-w-lg w-full border border-slate-100 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm text-center">
            <h1 className="text-3xl font-black uppercase text-red-500 mb-4">404 - Not Found</h1>
            <p className="font-semibold text-slate-500 mb-8 text-xs sm:text-sm">
              We couldn't retrieve details for this blog article. It may have expired or been removed.
            </p>
            <Link 
              href="/blog"
              className="no-underline inline-flex items-center gap-2 bg-[#00B9A5] text-white px-6 py-3 font-bold rounded-xl shadow-sm text-xs"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Publication
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    e.preventDefault();
    const container = document.getElementById("blog-content-body");
    if (!container) return;

    const headings = container.querySelectorAll("h1, h2, h3");
    const targetHeading = headings[index];
    if (targetHeading) {
      const yOffset = -120; // sticky header padding offset
      const y = targetHeading.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Recently";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return "Recently";
    }
  };

   const readingTime = (() => {
    const words = (blog.content || "").replace(/<[^>]*>/g, "").split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 225));
    return `${minutes} min read`;
  })();

  const processedContent = (() => {
    if (!blog || !blog.content) return "";
    
    // 1. Inject mobile placeholders BEFORE each pre block
    let html = blog.content.replace(
      /<pre([\s\S]*?)>([\s\S]*?)<\/pre>/gi,
      (match) => {
        return `
          <div class="my-6 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-[#F8FAFC]/50 dark:bg-slate-900/20 flex flex-col items-center justify-center text-center gap-2 select-none md:hidden">
            <div class="w-10 h-10 rounded-full bg-[#E6F9F6] dark:bg-teal-950/40 flex items-center justify-center text-[#00B9A5] mb-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h4 class="text-sm font-bold text-slate-850 dark:text-slate-200 leading-snug">
              Code View Available on Desktop
            </h4>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 font-medium max-w-[280px]">
              This code snippet is optimized for desktop view. Switch to a desktop screen to copy and inspect the code.
            </p>
          </div>
          ${match}
        `;
      }
    );

    // 2. Hide all original pre blocks on mobile using Tailwind hidden md:block
    html = html.replace(
      /<pre([\s\S]*?)>/gi,
      (match) => {
        if (match.includes('class="') || match.includes("class='")) {
          return match.replace(/class=["']/i, (cMatch) => `${cMatch}hidden md:block `);
        } else {
          return match.replace(/<pre/i, '<pre class="hidden md:block"');
        }
      }
    );

    // 3. Inject mobile placeholders BEFORE each table block
    html = html.replace(
      /<table([\s\S]*?)>([\s\S]*?)<\/table>/gi,
      (match) => {
        return `
          <div class="my-6 p-6 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-[#F8FAFC]/50 dark:bg-slate-900/20 flex flex-col items-center justify-center text-center gap-2 select-none md:hidden">
            <div class="w-10 h-10 rounded-full bg-[#E6F9F6] dark:bg-teal-950/40 flex items-center justify-center text-[#00B9A5] mb-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h4 class="text-sm font-bold text-slate-850 dark:text-slate-200 leading-snug">
              Table View Available on Desktop
            </h4>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 font-medium max-w-[280px]">
              This comparison table is optimized for desktop view. Switch to a desktop screen to view it.
            </p>
          </div>
          ${match}
        `;
      }
    );

    return html;
  })();

  return (
    <div className={cn("min-h-screen transition-colors duration-300 overflow-x-clip", theme === "dark" ? "dark bg-[#090d16]" : "bg-white")}>
      <NavBar />
      
      <main className="min-h-screen bg-white dark:bg-[#090d16] text-black dark:text-slate-100 pt-32 pb-24 px-6 md:px-12 relative isolate transition-colors duration-300">
        <div className="mx-auto max-w-[1200px] relative z-10">
          
          {/* Theme Toggle Switch */}
          <div className="flex justify-end mb-6">
            <label className="relative inline-block text-[3.5px] sm:text-[4px] md:text-[4.5px] lg:text-[5px] cursor-pointer select-none">
              <input
                className="toggle-checkbox"
                type="checkbox"
                checked={theme === "dark"}
                onChange={toggleTheme}
                aria-label="Toggle Dark Mode"
              />
              <div className="toggle-slot">
                <div className="sun-icon-wrapper">
                  <Sun className="sun-icon" size="6em" />
                </div>
                <div className="toggle-button" />
                <div className="moon-icon-wrapper">
                  <Moon className="moon-icon" size="6em" />
                </div>
              </div>
            </label>
          </div>


          {/* Back link & Top share actions row */}
          <div className="mb-10 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
            <Link 
              href="/blog"
              className="no-underline inline-flex items-center gap-1.5 text-slate-650 dark:text-slate-400 hover:text-[#00B9A5] dark:hover:text-[#00B9A5] font-bold transition-colors text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to all articles
            </Link>
            
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 dark:text-slate-500 select-none">
              <span>Share this article</span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white bg-white dark:bg-slate-900 cursor-pointer"
                  title="Share on Twitter"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white bg-white dark:bg-slate-900 cursor-pointer"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <button
                  onClick={handleCopyLink}
                  className="w-7 h-7 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white bg-white dark:bg-slate-900 cursor-pointer"
                  title="Copy link"
                >
                  {shareCopied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>


          {/* Two-Column Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 items-start">
            
            {/* Sidebar (Left Column) - Table of Contents & CTA */}
            <aside className="hidden lg:flex flex-col gap-6 sticky top-28 w-[240px] shrink-0 self-start max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar pr-2 pb-4">
              {toc.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                    On this page
                  </h3>
                  <nav className="flex flex-col gap-3">
                    {toc.map((item, index) => (
                      <a
                        key={`${item.id}-${index}`}
                        href={`#${item.id}`}
                        onClick={(e) => handleTocClick(e, index)}
                        className={cn(
                          "text-xs transition-colors hover:text-[#00B9A5] leading-relaxed block w-full pl-3.5 border-l",
                          activeId === item.id
                            ? "text-[#00B9A5] font-bold border-[#00B9A5]"
                            : "text-slate-500 dark:text-slate-400 font-medium border-slate-100 dark:border-slate-800"
                        )}
                        style={{ paddingLeft: `${item.level === 3 ? "24px" : "14px"}` }}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Callout Info Card */}
              <div className="bg-[#E6F9F6] dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 rounded-2xl p-5 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-teal-900/50 flex items-center justify-center text-[#00B9A5] shadow-xs mb-3">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  Master the fundamentals. Crack the interviews.
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-1">
                  Strong basics = Confident developer.
                </p>
              </div>

              {/* Similar Blogs */}
              {similarBlogs && similarBlogs.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                    More from KCC
                  </h3>
                  <div className="flex flex-col gap-4">
                    {similarBlogs.map((sb, idx) => (
                      <Link href={`/blog/${sb.slug}`} key={idx} className="group block">
                        <span className="text-[9px] font-bold text-[#00B9A5] uppercase tracking-wider block mb-1.5">
                          {sb.category}
                        </span>
                        <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug group-hover:text-[#00B9A5] transition-colors line-clamp-2">
                          {sb.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            {/* Main Content Area (Right Column) */}
            <div className="w-full min-w-0 overflow-hidden">
              {/* Category pill */}
              {blog.category && (
                <span className="text-xs font-bold text-[#00B9A5] tracking-wider uppercase block mb-4">
                  {blog.category.name}
                </span>
              )}

              {/* Article Main Heading */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-8">
                {blog.title}
              </h1>

              {/* Excerpt */}
              <p className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-10">
                {blog.excerpt}
              </p>

              {/* Author & Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-slate-100 dark:border-slate-800 mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0 border dark:border-slate-850">
                    <User className="w-4.5 h-4.5 text-slate-500 dark:text-slate-400" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-200 leading-none">
                      By {getBlogAuthor(blog.slug, blog.author_name)}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-1.5">
                      <span>{formatDate(blog.published_at)}</span>
                      <span>•</span>
                      <span>{readingTime}</span>
                      <span>•</span>
                      <span className="text-[#00B9A5]">Technical</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={cn(
                    "flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-xs font-bold transition-all shadow-xs cursor-pointer",
                    isSaved
                      ? "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  <Bookmark className={cn("w-3.5 h-3.5", isSaved ? "fill-emerald-700 dark:fill-emerald-400" : "")} />
                  {isSaved ? "Saved" : "Save for later"}
                </button>
              </div>


              {/* Cover image wrapper (only if not already embedded in body) */}
              {blog.cover_image && !isImageInContent && (
                <div className="w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shadow-xs mb-10 max-h-[320px] lg:max-w-4xl select-none mx-auto">
                  <img
                    src={blog.cover_image}
                    alt={blog.title}
                    className="w-full h-full object-cover max-h-[320px]"
                  />
                </div>
              )}

              <div className="prose-blog-container mb-12">
                <style dangerouslySetInnerHTML={{ __html: `
                  .prose-blog-container {
                    font-family: var(--font-newsreader), Georgia, serif;
                    font-size: 1.125rem;
                    line-height: 1.85;
                    color: #1e293b;
                    max-width: 100%;
                  }
                  .prose-blog-container p {
                    margin-bottom: 1.75rem;
                    font-weight: 400;
                    color: #1e293b;
                    line-height: 1.85;
                    font-size: 1.125rem;
                  }
                  .prose-blog-container a {
                    color: #00B9A5;
                    text-decoration: underline;
                    text-decoration-thickness: 1.5px;
                    text-underline-offset: 3px;
                    font-weight: 700;
                    transition: color 0.15s ease;
                  }
                  .prose-blog-container a:hover {
                    color: #008f80;
                  }
                  .prose-blog-container a::after {
                    content: " ↗";
                    font-size: 0.85em;
                    display: inline-block;
                    margin-left: 2px;
                    vertical-align: middle;
                  }
                  .prose-blog-container h1, 
                  .prose-blog-container h2, 
                  .prose-blog-container h3 {
                    font-family: var(--font-manrope), sans-serif;
                    font-weight: 700;
                    color: #0f172a;
                    letter-spacing: -0.02em;
                    line-height: 1.3;
                    scroll-margin-top: 120px;
                  }
                  .prose-blog-container h1 {
                    font-size: 1.8rem;
                    margin-top: 2.75rem;
                    margin-bottom: 1.25rem;
                  }
                  .prose-blog-container h2 {
                    font-size: 1.5rem;
                    margin-top: 2.25rem;
                    margin-bottom: 1rem;
                  }
                  .prose-blog-container h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-top: 1.75rem;
                    margin-bottom: 0.75rem;
                  }
                  .prose-blog-container ul {
                    list-style-type: none;
                    padding-left: 0.5rem;
                    margin-bottom: 1.75rem;
                  }
                  .prose-blog-container ol {
                    list-style-type: decimal;
                    padding-left: 1.25rem;
                    margin-bottom: 1.75rem;
                  }
                  .prose-blog-container ul li {
                    position: relative;
                    padding-left: 1.5rem;
                    margin-bottom: 0.75rem;
                    color: #334155;
                    line-height: 1.8;
                    font-weight: 400;
                    font-size: 1.1rem;
                  }
                  .prose-blog-container ul li::before {
                    content: "•";
                    color: #00B9A5;
                    font-weight: 900;
                    font-size: 1.25rem;
                    position: absolute;
                    left: 0.25rem;
                    top: -0.1rem;
                  }
                  .prose-blog-container ol li {
                    margin-bottom: 0.75rem;
                    color: #334155;
                    line-height: 1.8;
                    font-weight: 400;
                    font-size: 1.1rem;
                    padding-left: 0.5rem;
                  }
                  .prose-blog-container strong {
                    font-weight: 700;
                    color: #0f172a;
                  }
                  .prose-blog-container pre {
                    background-color: #0b0f19;
                    color: #e2e8f0;
                    padding: 1.25rem;
                    border: 1px solid #1e293b;
                    border-radius: 1rem;
                    overflow-x: auto;
                    margin: 2rem 0;
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                    font-size: 0.9rem;
                    line-height: 1.6;
                  }
                  .prose-blog-container code {
                    background-color: #f1f5f9;
                    color: #d1123f;
                    padding: 0.2rem 0.4rem;
                    border-radius: 0.35rem;
                    font-size: 0.85em;
                    font-weight: 600;
                    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
                  }
                  .prose-blog-container pre code {
                    background-color: transparent;
                    color: inherit;
                    padding: 0;
                    border-radius: 0;
                    border: none;
                    font-size: inherit;
                    font-weight: 400;
                  }
                  .prose-blog-container blockquote {
                    border-left: 4px solid #00B9A5;
                    padding-left: 1.5rem;
                    font-style: italic;
                    color: #334155;
                    margin: 2rem 0;
                    font-weight: 400;
                    font-size: 1.15rem;
                    line-height: 1.7;
                    background-color: #f8fafc;
                    padding-top: 1rem;
                    padding-bottom: 1rem;
                    border-top-right-radius: 0.75rem;
                    border-bottom-right-radius: 0.75rem;
                  }
                  .prose-blog-container table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 2rem 0;
                    font-size: 0.95rem;
                    border: 1px solid #e2e8f0;
                    display: block;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    max-width: 100%;
                  }
                  .prose-blog-container th {
                    background-color: #f8fafc;
                    border: 1px solid #e2e8f0;
                    padding: 0.75rem 1rem;
                    font-weight: 700;
                    text-align: left;
                    color: #1e293b;
                  }
                  .prose-blog-container td {
                    border: 1px solid #e2e8f0;
                    padding: 0.75rem 1rem;
                    color: #334155;
                  }
                  .prose-blog-container tr:nth-child(even) td {
                    background-color: #f8fafc;
                  }
                  .prose-blog-container hr {
                    margin: 2.5rem 0;
                    border: 0;
                    border-top: 1px dashed #e2e8f0;
                  }
                  .dark .prose-blog-container {
                    color: #cbd5e1;
                  }
                  .dark .prose-blog-container p {
                    color: #cbd5e1;
                  }
                  .dark .prose-blog-container h1, 
                  .dark .prose-blog-container h2, 
                  .dark .prose-blog-container h3 {
                    color: #ffffff;
                  }
                  .dark .prose-blog-container ul li,
                  .dark .prose-blog-container ol li {
                    color: #cbd5e1;
                  }
                  .dark .prose-blog-container strong {
                    color: #ffffff;
                  }
                  .dark .prose-blog-container code {
                    background-color: #1e293b;
                    color: #fda4af;
                  }
                  .dark .prose-blog-container blockquote {
                    color: #cbd5e1;
                    background-color: #0f172a;
                    border-left-color: #00B9A5;
                  }
                  .dark .prose-blog-container table,
                  .dark .prose-blog-container th,
                  .dark .prose-blog-container td {
                    border-color: #334155;
                  }
                  .dark .prose-blog-container th {
                    background-color: #0f172a;
                    color: #ffffff;
                  }
                  .dark .prose-blog-container td {
                    color: #cbd5e1;
                  }
                  .dark .prose-blog-container tr:nth-child(even) td {
                    background-color: #0f172a;
                  }
                  .dark .prose-blog-container hr {
                    border-top-color: #334155;
                  }
                  @media (max-width: 768px) {
                    .prose-blog-container table {
                      display: none !important;
                    }
                  }
                `}} />
                
                <div 
                  id="blog-content-body"
                  className="max-w-none text-[#334155] dark:text-[#cbd5e1]"
                  dangerouslySetInnerHTML={{ __html: processedContent }} 
                />
              </div>

              {/* Author Card */}
              <div className="mt-8 mb-12 p-6 rounded-2xl bg-white dark:bg-[#0c1220] border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-xs transition-colors">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                  <User className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5">
                    Written by {getBlogAuthor(blog.slug, blog.author_name)}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                    Contributing writer at Kerala Coders Cafe. Passionate about software engineering, technical deep dives, and sharing knowledge with the community.
                  </p>
                </div>
              </div>

              {/* Bottom CTA block */}
              <div className="border border-slate-100 dark:border-slate-800 bg-[#F5FBF9] dark:bg-slate-900/40 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6 mt-10">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center text-[#00B9A5] shadow-xs shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-md font-bold text-slate-900 dark:text-white leading-none">
                      Enjoyed this article?
                    </h3>
                    <p className="font-semibold text-slate-500 dark:text-slate-400 text-xs mt-1.5">
                      Explore more technical deep dives and tutorials.
                    </p>
                  </div>
                </div>
                
                <Link 
                  href="/blog"
                  className="no-underline inline-flex items-center gap-2 bg-[#00B9A5] hover:bg-[#009686] text-white px-5 py-2.5 font-bold rounded-xl shadow-xs text-xs transition-colors shrink-0"
                >
                  Browse more articles <ArrowRight className="w-4 h-4 text-white" />
                </Link>
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

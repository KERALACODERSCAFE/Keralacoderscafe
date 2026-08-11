import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function getFeaturedBlogs() {
  try {
    const res = await fetch("https://api.interviewkit.online/api/blogs/", {
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    if (!res.ok) throw new Error("Failed to fetch blogs");
    const data = await res.json();
    const allBlogs = Array.isArray(data) ? data : (data.value || []);
    
    // Filter published and active posts from July 2026 onwards
    const activeBlogs = allBlogs.filter((blog: any) => {
      if (!blog.published_at) return false;
      const pubDate = new Date(blog.published_at);
      return pubDate >= new Date("2026-07-01");
    });

    // Sort descending by date
    activeBlogs.sort((a: any, b: any) => {
      return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
    });

    // Return first 3
    return activeBlogs.slice(0, 3);
  } catch (error) {
    console.error("Error loading featured blog data:", error);
    return [];
  }
}

function getReadingTime(text: string): string {
  const words = (text || "").replace(/<[^>]*>/g, "").split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 225));
  return `${minutes} min read`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function FeaturedBlogs() {
  const blogs = await getFeaturedBlogs();

  if (blogs.length === 0) return null;

  return (
    <section id="featured-blogs" className="scroll-mt-24 px-6 py-28 md:px-12 bg-white border-t-4 border-black text-black">
      <div className="mx-auto max-w-[1280px]">
        
        {/* Header Block */}
        <div className="mb-16 md:flex md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-block border-2 border-black bg-kcc-green px-3 py-1 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-6">
              Community Blog
            </span>
            <h2 className="mt-5 text-[clamp(2.8rem,5vw,4.5rem)] font-black leading-[0.92] tracking-[-0.05em] text-black uppercase">
              Stories &
              <span className="ml-3 bg-kcc-gold border-3 border-black px-3 py-1 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] inline-block -rotate-1 text-black">
                Insights.
              </span>
            </h2>
            <p className="mt-8 text-lg font-bold leading-relaxed text-black/80 border-l-8 border-black pl-8 max-w-xl">
              Thoughts, tutorials, and lifestyle updates from Kerala's premier developer network.
            </p>
          </div>
          
          <div className="mt-8 md:mt-0">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 border-4 border-black bg-white hover:bg-slate-50 text-black px-6 py-3 font-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-sm no-underline cursor-pointer"
            >
              Browse All Articles <ArrowRight className="w-4 h-4 text-black" />
            </Link>
          </div>
        </div>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {blogs.map((blog: any) => (
            <Link href={`/blog/${blog.slug}`} key={blog.slug} className="no-underline group">
              <article className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col">
                
                {/* Cover Image */}
                <div className="relative overflow-hidden w-full h-48 bg-slate-50 border-2 border-black mb-4 select-none">
                  {blog.cover_image ? (
                    <img 
                      src={blog.cover_image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-purple-50 via-indigo-50 to-white flex items-center justify-center">
                      <span className="text-lg font-black opacity-10 tracking-widest text-black">KCC BLOG</span>
                    </div>
                  )}
                </div>

                {/* Category & Date */}
                <div className="flex items-center justify-between text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">
                  <span className="text-[#6941C6]">{blog.category?.name || "General"}</span>
                  <span>{formatDate(blog.published_at)}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-black text-black leading-snug mb-3 group-hover:text-amber-600 transition-colors">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs font-semibold text-slate-650 leading-relaxed line-clamp-3 mb-6">
                  {blog.excerpt}
                </p>

                {/* Read Time Footer */}
                <div className="mt-auto pt-4 border-t-2 border-black/10 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-black">Read Article →</span>
                  <span className="text-[10px] text-slate-400 font-bold">{getReadingTime(blog.excerpt)}</span>
                </div>

              </article>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

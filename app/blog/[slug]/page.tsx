import type { Metadata } from "next";
import BlogDetailClient from "./BlogDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogDetails(slug: string) {
  try {
    const res = await fetch(`https://api.interviewkit.online/api/blogs/${slug}/`, {
      next: { revalidate: 60 } // cache for 1 minute
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogDetails(slug);
  
  if (!blog) {
    return {
      title: "Blog Not Found | KCC Publication",
    };
  }

  return {
    title: `${blog.title} | KCC Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      url: `/blog/${slug}`,
      images: blog.cover_image ? [blog.cover_image] : ["https://www.keralacoderscafe.in/og-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: blog.cover_image ? [blog.cover_image] : ["https://www.keralacoderscafe.in/og-image.jpg"],
    }
  };
}

export async function generateStaticParams() {
  try {
    const res = await fetch("https://api.interviewkit.online/api/blogs/", {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return [];
    const data = await res.json();
    const allBlogs = Array.isArray(data) ? data : (data.value || []);
    return allBlogs
      .filter((blog: any) => blog.slug && blog.published_at && new Date(blog.published_at) >= new Date("2026-07-01"))
      .map((blog: any) => ({
        slug: blog.slug,
      }));
  } catch (error) {
    console.error("Error generating static params for blogs:", error);
    return [];
  }
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogDetails(slug);
  
  let similarBlogs = [];
  try {
    const res = await fetch("https://api.interviewkit.online/api/blogs/", {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const data = await res.json();
      const allBlogs = Array.isArray(data) ? data : (data.value || []);
      similarBlogs = allBlogs
        .filter((b: any) => b.slug !== slug)
        .slice(0, 3)
        .map((b: any) => ({
          title: b.title,
          slug: b.slug,
          category: b.category?.name || "Community News"
        }));
    }
  } catch (error) {
    console.error("Failed to fetch similar blogs", error);
  }

  return <BlogDetailClient blog={blog} similarBlogs={similarBlogs} />;
}

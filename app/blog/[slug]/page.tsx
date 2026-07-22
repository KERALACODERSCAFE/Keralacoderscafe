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

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogDetails(slug);
  return <BlogDetailClient blog={blog} />;
}

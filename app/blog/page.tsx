import { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "KCC Blog | Technical Insights & Community News",
  description: "Read about technical interview preparation, software engineering, hackathons, and updates from Kerala's top developer community.",
};

async function getBlogs() {
  try {
    const res = await fetch("https://api.interviewkit.online/api/blogs/", {
      next: { revalidate: 60 } // Cache for 1 minute
    });
    if (!res.ok) throw new Error("Failed to fetch blogs");
    const data = await res.json();
    const allBlogs = Array.isArray(data) ? data : (data.value || []);
    return allBlogs.filter((blog: any) => {
      if (!blog.published_at) return false;
      const pubDate = new Date(blog.published_at);
      return pubDate >= new Date("2026-07-01");
    });
  } catch (error) {
    console.error("Error loading blog data:", error);
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch("https://api.interviewkit.online/api/blogs/categories/", {
      next: { revalidate: 60 } // Cache for 1 minute
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error loading categories data:", error);
    return [];
  }
}

export default async function BlogPage() {
  const [blogs, categories] = await Promise.all([getBlogs(), getCategories()]);
  return <BlogClient initialBlogs={blogs} initialCategories={categories} />;
}

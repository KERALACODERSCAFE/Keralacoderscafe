/**
 * Mapping to override blog author names based on keywords in the blog slug.
 * This allows hardcoding author names for specific posts without changing the backend.
 */
export const BLOG_AUTHOR_OVERRIDES: Record<string, string> = {
  "kimi-k3": "Moonshot AI Team",
  "trip-planner": "Aswin Pradeep C",
};

/**
 * Returns the resolved author name for a blog post.
 * Checks the overrides map first (partial match on slug), then falls back to the API author name,
 * and finally defaults to "Community Member".
 */
export const getBlogAuthor = (slug: string, apiAuthorName?: string): string => {
  const lowerSlug = slug.toLowerCase();
  for (const [key, value] of Object.entries(BLOG_AUTHOR_OVERRIDES)) {
    if (lowerSlug.includes(key.toLowerCase())) {
      return value;
    }
  }
  return apiAuthorName || "Community Member";
};

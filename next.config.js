/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    // Legacy numeric-ID project URLs (/events/:id) → canonical /:slug.
    // Handled here (not just in app/events/[id]/page.tsx) so search
    // engines get a real 308 instead of a client-rendered redirect —
    // keep in sync with the `id`/`slug` pairs in lib/projects.ts.
    const legacyProjectIdRedirects = [
      { id: 1, slug: "used-books" },
      { id: 2, slug: "creator-collab" },
      { id: 3, slug: "pharma-db" },
      { id: 4, slug: "toddy-shop-finder-opensource-project" },
      { id: 5, slug: "journal-tool" },
      { id: 6, slug: "meetup-finder" },
      { id: 7, slug: "repo-pulse" },
      { id: 8, slug: "nature-id" },
      { id: 9, slug: "ease-up" },
      { id: 10, slug: "deep-peep" },
      { id: 11, slug: "sheet-crm" },
      { id: 12, slug: "ai-coding-workspace" },
    ].map(({ id, slug }) => ({
      source: `/events/${id}`,
      destination: `/${slug}`,
      permanent: true,
    }));

    return [
      {
        source: "/events-opensource_projects",
        destination: "/events",
        permanent: true,
      },
      ...legacyProjectIdRedirects,
    ];
  },
};

module.exports = nextConfig;

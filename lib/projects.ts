export interface Project {
  id: number;
  name: string;
  slug: string;
  description: string;
  submittedBy: string;
  problem: string;
  audience: string;
  language: string;
  languageColor: string;
  topics: string[];
  date: string;
  link?: string;
}

export const REPOS: Project[] = [
  {
    id: 1,
    name: "Kerala Dev Directory",
    slug: "kerala-dev-directory",
    description: "A home for member profiles, skills, and discovery so people can find collaborators across the community.",
    submittedBy: "@aswin",
    problem: "Finding relevant developers in Kerala for specific tech stacks is currently scattered.",
    audience: "Developers, Recruiters",
    language: "Next.js",
    languageColor: "#000000",
    topics: ["COMMUNITY", "PROFILES", "NETWORK"],
    date: "Apr 7",
  },
  {
    id: 2,
    name: "Tech Events Calendar",
    slug: "tech-events-calendar",
    description: "A clearer way to track meetups, workshops, and community happenings across Kerala.",
    submittedBy: "@vyshak",
    problem: "Tech events in Kerala are often missed because there isn't a central hub.",
    audience: "Tech Enthusiasts, Students",
    language: "TypeScript",
    languageColor: "#3178c6",
    topics: ["EVENTS", "DISCOVER", "UPDATES"],
    date: "Apr 7",
  },
  {
    id: 3,
    name: "Pharma Cost DB",
    slug: "pharma-cost-db",
    description: "A transparent database to compare medicine prices and find generic alternatives in Kerala pharmacies.",
    submittedBy: "@rahul",
    problem: "Information asymmetry in pharmaceutical pricing makes healthcare expensive.",
    audience: "General Public",
    language: "React",
    languageColor: "#61dafb",
    topics: ["HEALTHCARE", "DATA", "OPENSOURCE"],
    date: "Apr 7",
  },
  {
    id: 4,
    name: "Find-Toddy-Shop",
    slug: "toddy-shop-finder-opensource-project",
    description: "A web and mobile app to discover authentic toddy shops across Kerala — with locations, food availability, quality info, and user reviews.",
    submittedBy: "@kcc-builders",
    problem: "Authentic Keralite toddy shop culture is hard to navigate for tourists and locals alike.",
    audience: "Foodies, Travelers",
    language: "Flutter",
    languageColor: "#02569B",
    topics: ["KERALA", "MAPS", "FOOD-CULTURE"],
    date: "Apr 7",
  },
  {
    id: 5,
    name: "Open Source Tracker",
    slug: "open-source-tracker",
    description: "A simple stream of community contributions, issues, and work worth noticing.",
    submittedBy: "@nithin",
    problem: "Visibility of Kerala-based open-source work is low.",
    audience: "OSS Contributors",
    language: "Go",
    languageColor: "#00add8",
    topics: ["OPENSOURCE", "VISIBILITY", "SHIPPING"],
    date: "Apr 7",
  },
  {
    id: 6,
    name: "KCC Snippets",
    slug: "kcc-snippets",
    description: "A curated collection of reusable code snippets and common solutions for Kerala-specific use cases.",
    submittedBy: "@arjun",
    problem: "Developers spend too much time on repetitive boilerplates and configuration.",
    audience: "Developers, students",
    language: "TypeScript",
    languageColor: "#3178c6",
    topics: ["AI", "CODING", "DEV"],
    date: "Apr 7",
  },
];

export default REPOS;

export interface ProjectContent {
  id: number;
  hero: {
    badge: string;
    title: string;
    intro: string;
    img: string;
  };
  vision: string;
  progress: {
    phase: string;
    stages: { label: string; percentage: number }[];
  };
  userFeatures: { icon: string; label: string; bg: string }[];
  ownerFeatures: { icon: string; label: string; bg: string }[];
  why: string[];
  team: { name: string; role: string; img: string; shadow: string }[];
  glbModel?: string;
  /** Cover/poster image shown before the 3D loads */
  coverImg?: string;
  /** iOS AR Quick Look — .usdz URL */
  usdzUrl?: string;
  prototypeLink?: string;
}

export const PROJECT_DETAILS: Record<number, ProjectContent> = {
  4: {
    id: 4,
    hero: {
      badge: "First Project Started in our Community",
      title: "Toddy Shop Finder",
      intro: "Kerala’s toddy shops are not just places to eat; they are part of our culture and tradition. We help tourists and locals discover the best, cleanest, and most authentic spots across the region.",
      img: "",
    },
    vision: "To become the most trusted platform for discovering authentic and high-quality toddy shop experiences in Kerala while promoting local culture and supporting small businesses.",
    progress: {
      phase: "Initial Vetting Phase",
      stages: [
        { label: "Requirement Analysis", percentage: 100 },
        { label: "DB Designing", percentage: 70 },
        { label: "UI/UX Design", percentage: 0 },
        { label: "Backend Dev", percentage: 0 },
        { label: "Frontend", percentage: 0 },
        { label: "Mobile Optimization", percentage: 0 },
      ],
    },
    userFeatures: [
      { icon: "travel_explore", label: "Search & find toddy shops", bg: "bg-yellow-400" },
      { icon: "menu_book", label: "View shop details, food items, photos", bg: "bg-green-400" },
      { icon: "star", label: "See ratings & reviews", bg: "bg-orange-400" },
      { icon: "favorite", label: "Save favorite toddy shops", bg: "bg-blue-400" },
      { icon: "recommend", label: "Get personalized recommendations", bg: "bg-red-400" },
      { icon: "filter_list", label: "Filter by location, rating, food", bg: "bg-purple-400" },
    ],
    ownerFeatures: [
      { icon: "visibility", label: "Increase business visibility", bg: "bg-amber-100" },
      { icon: "trending_up", label: "Attract more customers", bg: "bg-green-100" },
      { icon: "photo_camera", label: "Showcase food and specialties", bg: "bg-orange-100" },
      { icon: "verified_user", label: "Trust through ratings & reviews", bg: "bg-blue-100" },
    ],
    why: [
      "Focus on toddy shops ONLY",
      "Promoting Kerala culture and food",
      "Helping tourists find hidden gems",
      "Directly supporting local businesses",
      "Trusted communal ratings and reviews"
    ],
    team: [
      { name: "Akhil", role: "Lead Backend Engineer", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuANqZUaGV08v2k0BBKzaqd8fT3h8b4Te14tBFTq2wgMBfLQ3knOlC9PEJVJ9xNs69S4y9T570T9pyRm5GmY7cGtB0V64tvZUPfDz2t4e_ieCeEsVeLnDL0axiQi8ObOB9CBsjubZMsIRa_7RQW8dEL8wkmN-xdEPhnojNqWzxEqhbJjkR2oV6Z8_2LnUGUCUVflqdcz_9MJO6J_ohmKDI3dM2lex6CeYm9bKDkSNh0BTaC7BR6wPMIbgSBXse5OWWUypMivkc5hil8Q", shadow: "shadow-[8px_8px_0px_0px_rgba(253,224,71,1)]" },
      { name: "Shan", role: "Lead Frontend Engineer", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVVEXH-tYKh3yoF7qQIBx3ceB4Y4JIxFiz5Xg_9JcyvBoiuAODKh76UNRCHMtEQbQD005lxl1mFKAHGg3dPeFbXwMQHcVUXsKBHWc6q2rBj53uF1Zmrh4G1474T5u1Uvp8ifojOuiEAm5fM8Pf_L05_HFb9YozPBpqRuIDeUAtX_e1dpWiHlEdIyYKEdA0Y5zEytM_4v76JrghBtEE8hqNb7VjEBh8k5SZu2VsRpZ-D19VnhouzATj68hLBdTIK3zvctGpP9ikXQZ4", shadow: "shadow-[8px_8px_0px_0px_rgba(74,222,128,1)]" },
      { name: "Amal", role: "UI/UX Strategy", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiTN5A84WUHpWc0w9DxQrbhhjTbWIC48Buv9ASL9C8K9kbqwIG-Fw0RLVkEQvtX6tMyJuI5MP_4qS1kyO0WlrQl2PL0Lkwh5VeGFbJYNa_E0Sf0V1PQX6XyO7qW8Ueu-SOZFtTn2Ut3iSZlWVj5aEluw_mfhohc2PyPtkiQYHI7rq3FOp93k6PXXof6r2YSczERzZcxY29VbWIsEoPwV_QUshrtdcvZ_Y4oBnGcZhVgkVIwPhtCA1u79bXyfYqn6cDtm_LvMcUsZqZ", shadow: "shadow-[8px_8px_0px_0px_rgba(144,72,0,1)]" },
    ],
    glbModel: "/models/toddy.glb",
    coverImg: "/toddy-cover.jpg",
    prototypeLink: "https://reference-toddy.vercel.app/",
  },
};

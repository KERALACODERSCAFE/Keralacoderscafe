const projects = [
  {
    title: "Kerala Dev Directory",
    description: "Our Kerala Coders Cafe developer profile showcase — explore member profiles, discover skills, and connect with talented developers in our community. Includes a blog for developers to share insights and tutorials.",
    tags: ["React", "Next.js", "TypeScript"],
    badge: "Coming Soon",
    colSpan: "md:col-span-2 md:row-span-2",
    featured: true,
  },
  {
    title: "Tech Events Calendar",
    description: "Never miss a meetup, workshop, or conference in Kerala.",
    tags: ["Vue", "Firebase"],
    badge: "Coming Soon",
    colSpan: "md:col-span-2",
    featured: false,
  },
  {
    title: "Job Board",
    description: "Kerala-focused tech opportunities",
    tags: [],
    badge: "Coming Soon",
    colSpan: "md:col-span-1",
    featured: false,
  },
  {
    title: "Learning Hub",
    description: "Curated resources and tutorials",
    tags: [],
    badge: "Coming Soon",
    colSpan: "md:col-span-1",
    featured: false,
  },
  {
    title: "Open Source Contributions",
    description: "Track and celebrate community contributions to global open source projects",
    tags: ["Python", "Django"],
    badge: "Coming Soon",
    colSpan: "md:col-span-2",
    featured: false,
  },
  {
    title: "Developers Blog",
    description: "Articles, tutorials, and insights written by Kerala developers. Share your knowledge and learn from the community.",
    tags: [],
    badge: "Coming Soon",
    colSpan: "md:col-span-2",
    featured: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6 md:px-12 bg-kcc-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2
            className="text-5xl md:text-7xl italic text-kcc-accent"
            style={{ fontFamily: "var(--font-newsreader)" }}
          >
            Featured Projects
          </h2>
          <p className="text-kcc-text-dim mt-4">Community-driven open source initiatives</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`${project.colSpan} bg-kcc-surface-elevated group cursor-pointer overflow-hidden relative hover-lift`}
            >
              {project.featured && (
                <div className="absolute inset-0 bg-gradient-to-br from-kcc-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}
              <div className="relative p-6 md:p-8 h-full flex flex-col justify-between">
                <div>
                  {project.featured && (
                    <span className="text-xs tracking-widest text-kcc-gold uppercase">Featured</span>
                  )}
                  <h3
                    className={`text-kcc-accent mt-2 ${project.featured ? "text-3xl mt-4" : "text-xl md:text-2xl"}`}
                    style={{ fontFamily: "var(--font-newsreader)" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm text-kcc-text-dim mt-2 md:mt-4 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.badge ? (
                    <span className="text-xs text-kcc-gold uppercase tracking-wider">{project.badge}</span>
                  ) : (
                    project.tags.map((tag) => (
                      <span key={tag} className="text-xs text-kcc-text-dim bg-kcc-bg px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

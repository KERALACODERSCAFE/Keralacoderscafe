import ProjectsPageClient from "./ProjectsPageClient";
import { getProjectVotesQuery } from "@/lib/queries";

export const metadata = {
  title: "KCC Projects | Open Source Contributions & Community Showcase",
  description: "Explore the library of open-source tools, websites, packages, and prototypes built by developers in Kerala's premier tech community.",
};

export default async function ProjectsPage() {
  const votes = await getProjectVotesQuery();
  return <ProjectsPageClient initialVotes={votes} />;
}

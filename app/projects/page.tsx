import ProjectsPageClient from "./ProjectsPageClient";
import { getProjectVotes } from "@/app/actions/upvote";

export const metadata = {
  title: "KCC Projects | Open Source Contributions & Community Showcase",
  description: "Explore the library of open-source tools, websites, packages, and prototypes built by developers in Kerala's premier tech community.",
};

export default async function ProjectsPage() {
  const votes = await getProjectVotes();
  return <ProjectsPageClient initialVotes={votes} />;
}

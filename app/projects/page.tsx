import ProjectsPageClient from "./ProjectsPageClient";
import { getProjectVotesQuery } from "@/lib/queries";
import { getUserVotedProjectIds } from "@/app/actions/upvote";

export const metadata = {
  title: "KCC Projects | Open Source Contributions & Community Showcase",
  description: "Explore the library of open-source tools, websites, packages, and prototypes built by developers in Kerala's premier tech community.",
};

export default async function ProjectsPage() {
  const [votes, votedIds] = await Promise.all([
    getProjectVotesQuery(),
    getUserVotedProjectIds()
  ]);
  return <ProjectsPageClient initialVotes={votes} initialVotedProjects={votedIds} />;
}

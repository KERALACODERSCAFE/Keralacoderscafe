import { notFound, permanentRedirect } from "next/navigation";
import { REPOS } from "@/lib/projects";

// Legacy numeric-ID project URLs. Every project now lives at its slug
// (`/[slug]`), so this route only exists to 308-redirect old links/bookmarks
// there instead of rendering (and duplicating) project content itself.
export default async function EventRedirectPage(props: PageProps<"/events/[id]">) {
  const { id } = await props.params;
  const project = REPOS.find((r) => r.id === parseInt(id, 10));

  if (!project) notFound();

  permanentRedirect(`/${project.slug}`);
}

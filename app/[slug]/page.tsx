import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { REPOS } from "@/lib/projects";
import { PROJECT_DETAILS } from "@/lib/project-details";
import ProjectDetailClient from "./ProjectDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return REPOS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = REPOS.find((r) => r.slug === slug);

  if (!project) {
    return { title: "Project Not Found | Kerala Coders Cafe" };
  }

  const bespoke = PROJECT_DETAILS[project.id];
  const title = bespoke?.hero.title || project.name;
  const description = bespoke?.hero.intro || project.description;

  return {
    title: `${title} | Kerala Coders Cafe`,
    description,
    alternates: {
      canonical: `/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `/${slug}`,
      images: bespoke?.coverImg ? [bespoke.coverImg] : ["/og-image.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: bespoke?.coverImg ? [bespoke.coverImg] : ["/og-image.jpg"],
    },
  };
}

export default async function SlugRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = REPOS.find((r) => r.slug === slug);

  if (!project) notFound();

  return <ProjectDetailClient project={project} />;
}

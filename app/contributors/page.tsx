import type { Metadata } from "next";
import ContributorsPageClient from "./ContributorsPageClient";

export const metadata: Metadata = {
  title: "Contributors | Kerala Coders Cafe",
  description:
    "Everyone who has contributed to Kerala Coders Cafe and its affiliated open-source projects, including the Kerala Toddy Finder.",
  alternates: {
    canonical: "/contributors",
  },
  openGraph: {
    title: "Contributors | Kerala Coders Cafe",
    description:
      "Everyone who has contributed to Kerala Coders Cafe and its affiliated open-source projects.",
    type: "website",
    url: "/contributors",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contributors | Kerala Coders Cafe",
    description:
      "Everyone who has contributed to Kerala Coders Cafe and its affiliated open-source projects.",
    images: ["/og-image.jpg"],
  },
};

export default function ContributorsPage() {
  return <ContributorsPageClient />;
}

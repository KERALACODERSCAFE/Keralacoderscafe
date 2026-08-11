import type { Metadata } from "next";
import EventsPageClient from "./EventsPageClient";

export const metadata: Metadata = {
  title: "Community Projects | Kerala Coders Cafe",
  description:
    "Real project ideas from the Kerala Coders Cafe community — submitted, reviewed, and in active development. See what's being built and submit your own idea.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "Community Projects | Kerala Coders Cafe",
    description:
      "Real project ideas from the Kerala Coders Cafe community — submitted, reviewed, and in active development.",
    type: "website",
    url: "/events",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Projects | Kerala Coders Cafe",
    description:
      "Real project ideas from the Kerala Coders Cafe community — submitted, reviewed, and in active development.",
    images: ["/og-image.jpg"],
  },
};

export default function EventsPage() {
  return <EventsPageClient />;
}

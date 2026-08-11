import type { Metadata } from "next";
import JoinPageClient from "./JoinPageClient";

export const metadata: Metadata = {
  title: "Join the Community | Kerala Coders Cafe",
  description:
    "Join Kerala Coders Cafe's WhatsApp and Telegram communities to connect with developers, designers, and tech enthusiasts across Kerala.",
  alternates: {
    canonical: "/join",
  },
  openGraph: {
    title: "Join the Community | Kerala Coders Cafe",
    description:
      "Join Kerala Coders Cafe's WhatsApp and Telegram communities to connect with developers across Kerala.",
    type: "website",
    url: "/join",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join the Community | Kerala Coders Cafe",
    description:
      "Join Kerala Coders Cafe's WhatsApp and Telegram communities to connect with developers across Kerala.",
    images: ["/og-image.jpg"],
  },
};

export default function JoinPage() {
  return <JoinPageClient />;
}

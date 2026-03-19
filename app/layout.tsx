import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kerala Coders Cafe | The Tech Community for Kerala",
    template: "%s | Kerala Coders Cafe",
  },
  description: "Join Kerala Coders Cafe (KCC), the most vibrant tech community in Kerala. A space for developers, programmers, and students to learn, build, and grow together.",
  keywords: ["Kerala Coders Cafe", "KCC", "Tech Community Kerala", "Coding Community Kerala", "Developers Kerala", "Programming Community", "Learn Coding Kerala"],
  authors: [{ name: "Kerala Coders Cafe Team" }],
  creator: "Kerala Coders Cafe",
  publisher: "Kerala Coders Cafe",
  metadataBase: new URL("https://kcc.sh"), // Change to actual URL when available
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kcc.sh",
    title: "Kerala Coders Cafe | The Tech Community for Kerala",
    description: "Learn, Build, and Grow Together. Join the most active tech coding community in Kerala.",
    siteName: "Kerala Coders Cafe",
    images: [
      {
        url: "/og-image.png", // User would need to provide this
        width: 1200,
        height: 630,
        alt: "Kerala Coders Cafe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kerala Coders Cafe | The Tech Community for Kerala",
    description: "The most active tech coding community in Kerala. Join us and let's build the future together.",
    creator: "@KeralaCodersCafe",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full font-sans selection:bg-blue-500/30">
        <div className="bg-grid fixed inset-0 z-[-2]" />
        <div className="glow fixed inset-0 z-[-1]" />
        {children}
      </body>
    </html>
  );
}

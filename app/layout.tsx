import type { Metadata } from "next";
import { Newsreader, Manrope } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});


export const metadata: Metadata = {
  title: {
    default: "Kerala Coders Cafe | കേരള കോഡേഴ്സ് കഫേ",
    template: "%s | Kerala Coders Cafe",
  },
  description: "A vibrant community of developers from God's Own Country. Building, learning, and growing together.",
  keywords: ["Kerala Coders Cafe", "KCC", "Tech Community Kerala", "Coding Community Kerala", "Developers Kerala", "Programming Community", "Learn Coding Kerala"],
  authors: [{ name: "Kerala Coders Cafe Team" }],
  creator: "Kerala Coders Cafe",
  publisher: "Kerala Coders Cafe",
  metadataBase: new URL("https://kcc.sh"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kcc.sh",
    title: "Kerala Coders Cafe | കേരള കോഡേഴ്സ് കഫേ",
    description: "A vibrant community of developers from God's Own Country. Building, learning, and growing together.",
    siteName: "Kerala Coders Cafe",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Kerala Coders Cafe" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kerala Coders Cafe | The Tech Community for Kerala",
    description: "The most active tech coding community in Kerala.",
    creator: "@KeralaCodersCafe",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${manrope.variable} h-full dark`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full">
        <div className="grid-bg" />
        <div className="glow-overlay" />
        {children}
      </body>
    </html>
  );
}

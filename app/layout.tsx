import type { Metadata } from "next";
import { Caveat, Instrument_Serif, Manrope, Newsreader, Chilanka } from "next/font/google";
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

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "400",
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const chilanka = Chilanka({
  variable: "--font-chilanka",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kcc.sh"),

  title: "Kerala Coders Cafe | Kerala's Top Developer Community",
  description: "A vibrant community of developers from Kerala",

  keywords: [
    "Kerala Coders Cafe",
    "Kerala developers",
    "Coding community Kerala",
    "Learn programming Kerala",
    "Open source Kerala",
    "Developers India community",
  ],

  authors: [{ name: "Kerala Coders Cafe Team" }],
  creator: "Kerala Coders Cafe",
  publisher: "Kerala Coders Cafe",
  category: "technology",

  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "https://kcc.sh",
      "en-US": "https://kcc.sh",
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "Kerala Coders Cafe ",
    description:
      "A vibrant community of developers from Kerala. Build, learn, and grow together.",
    siteName: "Kerala Coders Cafe",
    images: ["https://www.keralacoderscafe.in/og-image.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kerala Coders Cafe 🚀",
    description:
      "Join Kerala's fastest growing developer community.",
    creator: "@KeralaCodersCafe",
    images: ["https://www.keralacoderscafe.in/og-image.jpg"],
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  manifest: "/manifest.json", // 🔥 PWA support
};


// 🔥 Enhanced Schema (SEO boost)
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kerala Coders Cafe",
  url: "https://kcc.sh",
  logo: "https://kcc.sh/logo.png",
  description:
    "Kerala Coders Cafe is a developer community focused on learning, building, and contributing to open-source.",
  foundingLocation: {
    "@type": "Place",
    name: "Kerala, India",
  },
  sameAs: [
    "https://github.com/atomrobic/keralacoderscafe-saas",
    process.env.WHATSAPP_INVITE_LINK || "",
  ],
};


import FloatingCTA from "./components/FloatingCTA";
import SmoothScroll from "./components/SmoothScroll";
import NavBar from "./components/NavBar";
import PageLoader from "./components/PageLoader";
import AnnouncementPopup from "./components/AnnouncementPopup";
import Script from "next/script";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${manrope.variable} ${instrumentSerif.variable} ${caveat.variable} ${chilanka.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationLd),
          }}
        />
        {/* Playwrite IE Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playwrite+IE:wght@100..400&display=swap" rel="stylesheet" />
        
        {/* Pre-render Loader Script to prevent flash */}
        <Script
          id="kcc-pre-render"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var lastSeen = localStorage.getItem('kcc_loader_seen');
                var now = Date.now();
                var isHash = window.location.hash;
                if (!isHash && (!lastSeen || (now - parseInt(lastSeen, 10)) >= 3600000)) {
                  document.documentElement.classList.add('kcc-loader-active');
                }
              } catch (e) {}
            `
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .kcc-loader-wrapper {
                opacity: 0;
                pointer-events: none;
              }
              html.kcc-loader-active .kcc-loader-wrapper {
                opacity: 1 !important;
                pointer-events: auto !important;
              }
            `
          }}
        />
      </head>

      <body className="min-h-full bg-kcc-paper text-black antialiased">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RNVWKJQTT5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RNVWKJQTT5');
          `}
        </Script>

        <Suspense fallback={null}>
          <PageLoader />
        </Suspense>
        <NavBar />
        <AnnouncementPopup />
        <SmoothScroll>
          {children}
          <FloatingCTA />
        </SmoothScroll>
      </body>
    </html>
  );
}

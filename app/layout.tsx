import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kerala Coders Cafe | Tech Coding Community",
  description: "A space for developers, programmers, and students to learn, build, and grow together.",
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

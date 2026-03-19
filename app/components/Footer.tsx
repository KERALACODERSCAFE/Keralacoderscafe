import { Github, Globe, Hash, Briefcase, Coffee } from "lucide-react";
import Link from "next/link";

const footLinks = [
  { name: "Channel", icon: Hash, href: "#" },
  { name: "Jobs", icon: Briefcase, href: "#" },
  { name: "Hangout", icon: Coffee, href: "#" },
  { name: "GitHub", icon: Github, href: "https://github.com/atomrobic/Keralacoderscafe" },
];

const rules = [
  "Be respectful and professional.",
  "No spam or self-promotion without context.",
  "Collaborate, learn, and help others.",
];

export default function Footer() {
  return (
    <footer className="mt-auto py-12 px-6 border-t border-white/5 bg-slate-950/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white">
              K
            </div>
            <span className="text-xl font-bold text-white">Kerala Coders Cafe</span>
          </div>
          <p className="text-slate-400 text-sm max-w-sm">
            Building the strongest tech community in Kerala. Join us in our journey 
            to innovate and build amazing things together.
          </p>
          <div className="flex gap-4">
            {footLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-blue-400 transition-colors"
                title={link.name}
              >
                <link.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-white font-semibold flex items-center gap-2 text-lg">
            Community Rules
          </h3>
          <ul className="space-y-3">
            {rules.map((rule, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-slate-500 text-xs">
        &copy; {new Date().getFullYear()} Kerala Coders Cafe. All rights reserved.
      </div>
    </footer>
  );
}

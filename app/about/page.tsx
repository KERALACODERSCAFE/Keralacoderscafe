import Footer from "../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Kerala Coders Cafe",
  description: "Learn more about Kerala Coders Cafe, our mission, and the community of developers in Kerala.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-black pt-32 pb-24 relative overflow-hidden isolate">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-5" />

      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <div className="border border-gray-100 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm mb-12 relative overflow-hidden">
          <span className="inline-flex items-center gap-1.5 bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            About Us
          </span>
          <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-black leading-tight tracking-tight text-slate-900 uppercase">
            Kerala <span className="text-[#00B9A5]">Coders Cafe</span>
          </h1>

          <div className="mt-8 border-t border-gray-100 pt-8 prose prose-slate max-w-none font-medium text-slate-600 text-sm md:text-base leading-relaxed space-y-6">
            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight pt-4">Who We Are</h2>
            <p>
              Kerala Coders Cafe (KCC) is a thriving community of developers, designers, and tech enthusiasts based in Kerala. We believe in the power of building together, learning in public, and fostering a supportive ecosystem for software engineering.
            </p>
            <p>
              Our community ranges from students taking their first steps in coding to seasoned industry professionals. What brings us together is our shared passion for technology and a commitment to open-source collaboration.
            </p>

            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight pt-4">Our Mission</h2>
            <p>
              Our mission is to create a robust and inclusive developer ecosystem in Kerala. We strive to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Learn Together:</strong> Provide a platform where knowledge sharing is free and accessible to all.</li>
              <li><strong>Build in Public:</strong> Encourage members to showcase their projects, receive constructive feedback, and collaborate on open-source initiatives.</li>
              <li><strong>Connect:</strong> Bridge the gap between aspiring developers and industry veterans through meetups, workshops, and online discussions.</li>
              <li><strong>Empower:</strong> Equip individuals with the skills and network needed to succeed in the fast-paced tech industry.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight pt-4">What We Do</h2>
            <p>
              At Kerala Coders Cafe, we host a variety of events and initiatives designed to engage and educate our community:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Hackathons & Coding Challenges:</strong> Pushing the boundaries of what we can build in a limited time.</li>
              <li><strong>Tech Meetups:</strong> Regular gatherings (both physical and virtual) to discuss the latest trends, tools, and frameworks.</li>
              <li><strong>Open Source Projects:</strong> Collaborative efforts to build tools that benefit the wider developer community.</li>
              <li><strong>Mentorship:</strong> Guiding the next generation of engineers through their career paths.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight pt-4">Join Us</h2>
            <p>
              Whether you are looking to learn a new language, find contributors for your project, or simply hang out with like-minded individuals, you have a place at Kerala Coders Cafe.
            </p>
            <p>
              Check out our <a href="/join" className="text-[#00B9A5] hover:underline">Join page</a> to connect with us on WhatsApp, or follow our work on <a href="https://github.com/KERALACODERSCAFE" target="_blank" rel="noopener noreferrer" className="text-[#00B9A5] hover:underline">GitHub</a>. Let's code, create, and grow together!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

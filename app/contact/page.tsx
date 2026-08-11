import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import type { Metadata } from "next";
import { Mail, MessageCircle, Github, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Kerala Coders Cafe",
  description: "Get in touch with the Kerala Coders Cafe community maintainers.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-black pt-32 pb-24 relative overflow-hidden isolate">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-5" />

      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <div className="border border-gray-100 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm mb-12 relative overflow-hidden">
          <span className="inline-flex items-center gap-1.5 bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Get in touch
          </span>
          <h1 className="text-[clamp(2rem,4vw,3.2rem)] font-black leading-tight tracking-tight text-slate-900 uppercase">
            Contact <span className="text-[#00B9A5]">Us</span>
          </h1>
          <p className="mt-4 text-slate-500 font-semibold text-sm md:text-base leading-relaxed max-w-xl">
            Have questions about our meetups, community guidelines, job listings, or sponsorship opportunities? Reach out to us through any of the channels below.
          </p>

          <div className="mt-10 border-t border-gray-100 pt-10 grid gap-8 md:grid-cols-2">
            {/* Message form */}
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Send us a message
              </h2>
              <ContactForm />
            </div>

            {/* Contact cards */}
            <div className="grid gap-6">
            <a
              href="mailto:keralacoderscafe@gmail.com"
              className="group border border-gray-100 bg-slate-50 p-6 rounded-[2rem] hover:border-slate-200 transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5 text-[#00B9A5]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base group-hover:text-[#00B9A5] transition-colors">Email Us</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">keralacoderscafe@gmail.com</p>
                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                  Send us queries, job post details, or generic community enquiries.
                </p>
              </div>
            </a>

            <a
              href="/join"
              className="group border border-gray-100 bg-slate-50 p-6 rounded-[2rem] hover:border-slate-200 transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5 text-[#10B981]" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base group-hover:text-[#10B981] transition-colors">WhatsApp Community</h3>
                <p className="text-xs text-[#10B981] font-bold uppercase tracking-wider mt-0.5">Join Discussion</p>
                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                  Be a part of active local discussions, peer learning, and event announcements.
                </p>
              </div>
            </a>

            <a
              href="https://github.com/KERALACODERSCAFE"
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-gray-100 bg-slate-50 p-6 rounded-[2rem] hover:border-slate-200 transition-all duration-300 flex items-start gap-4"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                <Github className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base group-hover:text-slate-700 transition-colors">GitHub Org</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">KERALACODERSCAFE</p>
                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                  Contribute to community websites, templates, packages, and open source projects.
                </p>
              </div>
            </a>

            <div className="border border-gray-100 bg-slate-50 p-6 rounded-[2rem] flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                <MapPin className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-base">Location</h3>
                <p className="text-xs text-amber-500 font-bold uppercase tracking-wider mt-0.5">Kerala, India</p>
                <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">
                  Operating online and hosting physical developer meetups across Kerala.
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

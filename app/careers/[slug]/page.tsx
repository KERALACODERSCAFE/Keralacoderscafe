import type { Metadata } from "next";
import Link from "next/link";

export const dynamicParams = true;
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Building2,
  DollarSign,
  Clock,
  ExternalLink,
  Award,
  FileText,
  Send
} from "lucide-react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ShareJobButton from "../../components/ShareJobButton";
import CareerDisplayAd from "../../components/CareerDisplayAd";

interface JobDetail {
  slug: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  location_type: string;
  job_type: string;
  salary: string;
  link: string;
  experience: string;
  description: string;
  posted_at?: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getJobDetails(slug: string): Promise<JobDetail | null> {
  try {
    const res = await fetch(`https://api.interviewkit.online/api/jobs/${slug}/`, {
      next: { revalidate: 60 } // cache for 1 min so new jobs appear fast
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobDetails(slug);

  if (!job) {
    return {
      title: "Job Not Found | KCC Careers",
    };
  }

  const cleanTitle = job.title.replace(new RegExp(`\\s+at\\s+${job.company}`, "i"), "");

  return {
    title: `${cleanTitle} at ${job.company} | KCC Careers`,
    description: `KCC is hiring a ${cleanTitle} at ${job.company} in ${job.location}. Click to apply now!`,
    openGraph: {
      title: `${cleanTitle} at ${job.company}`,
      description: `Join ${job.company} as a ${cleanTitle}. Apply today on Kerala Coders Cafe.`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cleanTitle} at ${job.company}`,
      description: `Join ${job.company} as a ${cleanTitle}. Apply today on Kerala Coders Cafe.`,
    }
  };
}

export async function generateStaticParams() {
  // We return an empty array to avoid building 750+ static job pages during build time.
  // Since 'dynamicParams = true' is set, Next.js will generate job pages on-demand (ISR) 
  // when a user actually visits the specific career URL.
  return [];
}

export default async function CareerDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getJobDetails(slug);

  const getLocTypePillStyles = (type: string) => {
    switch (type.toLowerCase()) {
      case "remote": return "bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]";
      case "hybrid": return "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]";
      default: return "bg-[#E6F9F6] text-[#00B9A5] border-[#B2F5EA]";
    }
  };

  const getJobTypePillStyles = (type: string) => {
    switch (type.toLowerCase()) {
      case "fulltime": return "bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]";
      case "internship": return "bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]";
      default: return "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]";
    }
  };

  const cleanLocation = (loc: string) => {
    if (!loc) return "";
    const parts = loc.split(/[;,]/).map(p => p.trim());
    if (parts.length > 2) {
      const filtered = parts.filter(p =>
        !p.toLowerCase().includes("district") &&
        !p.toLowerCase().includes("division") &&
        !p.toLowerCase().includes("konkan")
      );
      if (filtered.length > 0) {
        return filtered.slice(0, 3).join(", ");
      }
    }
    return loc;
  };

  const getLogoBgColor = (logo: string) => {
    const colors = [
      "bg-red-500",
      "bg-amber-500",
      "bg-emerald-500",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-violet-500",
      "bg-pink-500"
    ];
    if (!logo) return colors[0];
    const code = logo.charCodeAt(0) + (logo.charCodeAt(1) || 0);
    return colors[code % colors.length];
  };

  if (!job) {
    return (
      <>
        <NavBar />
        <main className="min-h-screen bg-kcc-paper text-black pt-32 pb-24 px-6 md:px-12 flex items-center justify-center neo-brutalist-grid">
          <div className="mx-auto max-w-lg w-full border-4 border-black bg-white p-8 md:p-12 shadow-brutalist text-center">
            <h1 className="text-4xl font-black uppercase text-red-600 mb-4">404 - Not Found</h1>
            <p className="font-bold text-black/70 mb-8">
              We couldn't retrieve details for this job role. It may have expired or been removed.
            </p>
            <Link
              href="/careers"
              className="no-underline inline-flex items-center gap-2 border-3 border-black bg-kcc-gold px-6 py-3 font-black text-black uppercase tracking-wider shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 active:translate-y-0.5"
            >
              <ArrowLeft className="w-5 h-5" /> Back to Careers
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-[#F8FAFC] text-black pt-32 pb-24 px-6 md:px-12 relative isolate">
        {/* Background SVG Pattern */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2000 1500"
            className="w-full h-full object-cover opacity-60"
          >
            <rect fill="#ffffff" width="2000" height="1500" />
            <defs>
              <rect stroke="#ffffff" strokeWidth="0.6" width="1" height="1" id="s" />
              <pattern id="a" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(42 1000 750) scale(21.95) translate(-954.44 -715.83)">
                <use fill="#fcfcfc" href="#s" y="2" />
                <use fill="#fcfcfc" href="#s" x="1" y="2" />
                <use fill="#fafafa" href="#s" x="2" y="2" />
                <use fill="#fafafa" href="#s" />
                <use fill="#f7f7f7" href="#s" x="2" />
                <use fill="#f7f7f7" href="#s" x="1" y="1" />
              </pattern>
              <pattern id="b" width="7" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(42 1000 750) scale(21.95) translate(-954.44 -715.83)">
                <g fill="#f5f5f5">
                  <use href="#s" />
                  <use href="#s" y="5" />
                  <use href="#s" x="1" y="10" />
                  <use href="#s" x="2" y="1" />
                  <use href="#s" x="2" y="4" />
                  <use href="#s" x="3" y="8" />
                  <use href="#s" x="4" y="3" />
                  <use href="#s" x="4" y="7" />
                  <use href="#s" x="5" y="2" />
                  <use href="#s" x="5" y="6" />
                  <use href="#s" x="6" y="9" />
                </g>
              </pattern>
              <pattern id="h" width="5" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(42 1000 750) scale(21.95) translate(-954.44 -715.83)">
                <g fill="#f5f5f5">
                  <use href="#s" y="5" />
                  <use href="#s" y="8" />
                  <use href="#s" x="1" y="1" />
                  <use href="#s" x="1" y="9" />
                  <use href="#s" x="1" y="12" />
                  <use href="#s" x="2" />
                  <use href="#s" x="2" y="4" />
                  <use href="#s" x="3" y="2" />
                  <use href="#s" x="3" y="6" />
                  <use href="#s" x="3" y="11" />
                  <use href="#s" x="4" y="3" />
                  <use href="#s" x="4" y="7" />
                  <use href="#s" x="4" y="10" />
                </g>
              </pattern>
              <pattern id="c" width="17" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(42 1000 750) scale(21.95) translate(-954.44 -715.83)">
                <g fill="#f2f2f2">
                  <use href="#s" y="11" />
                  <use href="#s" x="2" y="9" />
                  <use href="#s" x="5" y="12" />
                  <use href="#s" x="9" y="4" />
                  <use href="#s" x="12" y="1" />
                  <use href="#s" x="16" y="6" />
                </g>
              </pattern>
              <pattern id="d" width="19" height="17" patternUnits="userSpaceOnUse" patternTransform="rotate(42 1000 750) scale(21.95) translate(-954.44 -715.83)">
                <g fill="#ffffff">
                  <use href="#s" y="9" />
                  <use href="#s" x="16" y="5" />
                  <use href="#s" x="14" y="2" />
                  <use href="#s" x="11" y="11" />
                  <use href="#s" x="6" y="14" />
                </g>
                <g fill="#efefef">
                  <use href="#s" x="3" y="13" />
                  <use href="#s" x="9" y="7" />
                  <use href="#s" x="13" y="10" />
                  <use href="#s" x="15" y="4" />
                  <use href="#s" x="18" y="1" />
                </g>
              </pattern>
              <pattern id="e" width="47" height="53" patternUnits="userSpaceOnUse" patternTransform="rotate(42 1000 750) scale(21.95) translate(-954.44 -715.83)">
                <g fill="#F60">
                  <use href="#s" x="2" y="5" />
                  <use href="#s" x="16" y="38" />
                  <use href="#s" x="46" y="42" />
                  <use href="#s" x="29" y="20" />
                </g>
              </pattern>
              <pattern id="f" width="59" height="71" patternUnits="userSpaceOnUse" patternTransform="rotate(42 1000 750) scale(21.95) translate(-954.44 -715.83)">
                <g fill="#F60">
                  <use href="#s" x="33" y="13" />
                  <use href="#s" x="27" y="54" />
                  <use href="#s" x="55" y="55" />
                </g>
              </pattern>
              <pattern id="g" width="139" height="97" patternUnits="userSpaceOnUse" patternTransform="rotate(42 1000 750) scale(21.95) translate(-954.44 -715.83)">
                <g fill="#F60">
                  <use href="#s" x="11" y="8" />
                  <use href="#s" x="51" y="13" />
                  <use href="#s" x="17" y="73" />
                  <use href="#s" x="99" y="57" />
                </g>
              </pattern>
            </defs>
            <rect fill="url(#a)" width="100%" height="100%" />
            <rect fill="url(#b)" width="100%" height="100%" />
            <rect fill="url(#h)" width="100%" height="100%" />
            <rect fill="url(#c)" width="100%" height="100%" />
            <rect fill="url(#d)" width="100%" height="100%" />
            <rect fill="url(#e)" width="100%" height="100%" />
            <rect fill="url(#f)" width="100%" height="100%" />
            <rect fill="url(#g)" width="100%" height="100%" />
          </svg>
        </div>
        <div className="mx-auto max-w-4xl relative z-10">

          {/* Back button */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/careers"
              className="no-underline inline-flex items-center gap-1.5 text-[#00B9A5] hover:text-[#008F80] font-black transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to all listings
            </Link>
            <ShareJobButton title={job.title} />
          </div>

          {/* Job Header Card */}
          <article className="border border-gray-100 bg-white p-5 md:p-8 rounded-[2rem] shadow-sm mb-6 relative overflow-hidden">
            {/* Top Right Job Type Pill Removed */}

            <div className="flex items-center gap-5 pb-6 border-b border-gray-100">
              {/* Logo block */}
              <div className="w-16 h-16 rounded-[1.25rem] bg-slate-50 border border-slate-200/80 flex items-center justify-center shadow-sm shrink-0">
                <svg className="w-10 h-10" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="48" y="144" width="416" height="288" rx="32" fill="#00B9A5" />
                  <path d="M192 144V104C192 90.7 202.7 80 216 80H296C309.3 80 320 90.7 320 104V144" stroke="#00B9A5" strokeWidth="24" strokeLinecap="round" fill="none" />
                  <rect x="232" y="232" width="48" height="36" rx="6" fill="#FFFFFF" />
                  <path d="M48 248H464" stroke="#008F80" strokeWidth="12" />
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="text-xl md:text-3xl font-black uppercase tracking-tight text-slate-900 leading-tight break-words">
                  {job.title.replace(new RegExp(`\\s+at\\s+${job.company}`, "i"), "")}
                </h1>
                <p className="mt-1 font-bold text-slate-500 text-sm flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  {job.company}
                </p>
              </div>
            </div>

            {/* Meta details grid in a single card */}
            <div className="mt-6 border border-slate-100 bg-slate-50/50 rounded-2xl p-5 md:p-6">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Location</div>
                    <div className="font-extrabold text-xs md:text-sm text-slate-700 truncate">{cleanLocation(job.location)}</div>
                  </div>
                </div>

                {/* Experience */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Experience</div>
                    <div className="font-extrabold text-xs md:text-sm text-slate-700 truncate">{job.experience || "Not specified"}</div>
                  </div>
                </div>

                {/* Salary */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Salary</div>
                    <div className="font-extrabold text-xs md:text-sm text-slate-700 truncate">{job.salary}</div>
                  </div>
                </div>

                {/* Placement */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full border border-slate-100 flex items-center justify-center text-slate-400 shrink-0 shadow-sm">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Placement</div>
                    <div className="font-extrabold text-xs md:text-sm text-slate-700 truncate capitalize">{job.location_type}</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom tags */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              <span className={`text-[10px] font-black uppercase tracking-wider border px-3 py-1 rounded-full ${getLocTypePillStyles(job.location_type)}`}>
                {job.location_type}
              </span>
            </div>
          </article>

          {/* Job Description Card */}
          <div className="border border-gray-100 bg-white p-8 rounded-[2rem] shadow-sm mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#E6F9F6] rounded-full flex items-center justify-center text-[#00B9A5]">
                <FileText className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tight text-slate-800">
                Job Description
              </h2>
            </div>

            <div className="h-[3px] w-12 bg-[#00B9A5] mb-8" />

            <style dangerouslySetInnerHTML={{
              __html: `
              .prose-custom p,
              .prose-custom span,
              .prose-custom div,
              .prose-custom h1,
              .prose-custom h2,
              .prose-custom h3,
              .prose-custom h4,
              .prose-custom h5,
              .prose-custom h6 {
                color: #475569 !important;
              }
              .prose-custom p {
                margin-bottom: 1.25rem;
                font-weight: 500;
                line-height: 1.6;
              }
              .prose-custom strong,
              .prose-custom b {
                font-weight: 800;
                color: #0f172a !important;
                display: inline-block;
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
                font-size: 1.1rem;
              }
              .prose-custom ul {
                list-style: none;
                padding-left: 0;
                margin-bottom: 1.5rem;
              }
              .prose-custom li {
                display: flex;
                align-items: flex-start;
                gap: 0.5rem;
                font-weight: 500;
                color: #475569 !important;
                line-height: 1.6;
                margin-bottom: 0.75rem;
              }
              .prose-custom li p,
              .prose-custom li div {
                display: inline;
                margin: 0;
              }
              .prose-custom li::before {
                content: "✓";
                color: #0D9488 !important; /* teal-600 */
                font-weight: 900;
                font-size: 1.1rem;
                line-height: 1.4;
                flex-shrink: 0;
              }
              .prose-custom a {
                color: #00B9A5 !important;
                text-decoration: underline;
              }
            `}} />

            {/* Safe rendering of description payload styled in neubrutalist typography rules */}
            <div
              className="prose-custom max-w-none text-[#334155] font-semibold leading-relaxed text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </div>

          {/* Apply section banner (Hidden on mobile) */}
          <div className="hidden md:flex border border-[#B2F5EA] bg-[#E6F9F6] rounded-[2rem] p-6 shadow-sm flex-col md:flex-row items-center justify-between gap-6 mt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#00B9A5] shadow-sm shrink-0">
                <Send className="w-5 h-5 -rotate-45" />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight text-slate-800">
                  Ready to Apply?
                </h3>
                <p className="font-semibold text-slate-600 text-xs md:text-sm mt-0.5">
                  You will be redirected to Mopid's job listing / application system.
                </p>
              </div>
            </div>

            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline inline-flex items-center gap-2 bg-[#064E3B] hover:bg-[#022C22] text-white px-6 py-3.5 font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm text-sm"
            >
              Apply Now <ExternalLink className="w-4 h-4 text-white" />
            </a>
          </div>

          {/* Sticky Mobile Apply Button (Docks at the bottom of this container) */}
          <div className="sticky bottom-0 -mx-6 md:hidden bg-white border-t border-gray-200 p-4 mt-6 shadow-[0_-4px_15px_rgba(0,0,0,0.05)] z-40">
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-full items-center justify-center gap-2 bg-[#064E3B] hover:bg-[#022C22] text-white px-6 rounded-[1rem] no-underline transition-all shadow-sm"
            >
              <span className="font-black uppercase tracking-wider text-sm">
                Apply Now
              </span>
              <ExternalLink className="h-4 w-4 text-white" />
            </a>
          </div>

          {/* Ad slot right above the footer */}
          <div className="mt-8">
            <CareerDisplayAd />
          </div>

          {/* Icon Attribution */}
          <div className="mt-6 text-center text-[10px] text-slate-400">
            Bag briefcase business case Icon by <a href="https://icon-icons.com/authors/452-dinosoftlabs" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-650">DinosoftLabs</a> on <a href="https://icon-icons.com/authors/452-dinosoftlabs" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-650">Icon-Icons.com</a>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

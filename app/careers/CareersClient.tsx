"use client";

import { useEffect, useState, useId, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  MapPin,
  Search,
  Building2,
  Clock,
  Filter,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Bookmark,
  SlidersHorizontal,
  Compass,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CareerDisplayAd from "../components/CareerDisplayAd";

interface Job {
  slug: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  location_type: string; // "onsite", "hybrid", "remote"
  job_type: string; // "fulltime", "internship", "parttime", "freelance"
  salary: string;
  tags: string[];
  posted_at: string;
}

interface CareersClientProps {
  initialJobs: Job[];
}

const getJobFunction = (job: Job) => {
  const title = job.title.toLowerCase();
  const tags = (job.tags || []).map(t => t.toLowerCase());
  
  if (
    title.includes("developer") ||
    title.includes("engineer") ||
    title.includes("frontend") ||
    title.includes("backend") ||
    title.includes("fullstack") ||
    title.includes("devops") ||
    title.includes("qa") ||
    title.includes("tester") ||
    title.includes("programmer") ||
    title.includes("tech") ||
    title.includes("data") ||
    tags.includes("engineering") ||
    tags.includes("development") ||
    tags.includes("coding")
  ) {
    return "Engineering";
  }
  
  if (
    title.includes("design") ||
    title.includes("ui") ||
    title.includes("ux") ||
    title.includes("graphic") ||
    title.includes("illustrator") ||
    title.includes("artist") ||
    tags.includes("design") ||
    tags.includes("ui/ux")
  ) {
    return "Design";
  }

  if (
    title.includes("product") ||
    title.includes("manager") ||
    title.includes("scrum") ||
    title.includes("agile") ||
    tags.includes("product") ||
    tags.includes("management")
  ) {
    return "Product";
  }

  if (
    title.includes("marketing") ||
    title.includes("sales") ||
    title.includes("hr") ||
    title.includes("operations") ||
    title.includes("content") ||
    title.includes("writer") ||
    tags.includes("marketing") ||
    tags.includes("operations")
  ) {
    return "Operations";
  }

  return "Others";
};

type DotPatternProps = {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
};

export function DotsPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}: Readonly<DotPatternProps>) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          height={height}
          id={id}
          patternContentUnits="userSpaceOnUse"
          patternUnits="userSpaceOnUse"
          width={width}
          x={x}
          y={y}
        >
          <circle cx={cx} cy={cy} id="pattern-circle" r={cr} />
        </pattern>
      </defs>
      <rect fill={`url(#${id})`} height="100%" strokeWidth={0} width="100%" />
    </svg>
  );
}

export default function CareersClient({ initialJobs }: CareersClientProps) {
  const router = useRouter();
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);

  const handleCardClick = (slug: string, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(".action-btn") || target.closest(".bookmark-btn")) {
      return;
    }
    setLoadingSlug(slug);
    router.push(`/careers/${slug}`);
  };

  // Advanced Filtering States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedWorkplaceTypes, setSelectedWorkplaceTypes] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    document.getElementById("jobs-list-start")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Reset page when filter criteria change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCompanies, selectedWorkplaceTypes, selectedJobTypes, selectedFunctions]);

  // Filter Logic
  const filteredJobs = initialJobs.filter((job) => {
    // Only show jobs from the last 15 days
    try {
      const postDate = new Date(job.posted_at);
      const now = new Date();
      // Calculate difference in days
      const diffTime = now.getTime() - postDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      if (diffDays > 30) {
        return false;
      }
    } catch {
      return false;
    }

    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCompany =
      selectedCompanies.length === 0 || selectedCompanies.includes(job.company);

    const matchesWorkplaceType =
      selectedWorkplaceTypes.length === 0 ||
      selectedWorkplaceTypes.includes(job.location_type.toLowerCase());

    const matchesJobType =
      selectedJobTypes.length === 0 ||
      selectedJobTypes.includes(job.job_type.toLowerCase());

    const matchesFunction =
      selectedFunctions.length === 0 ||
      selectedFunctions.includes(getJobFunction(job));

    return matchesSearch && matchesCompany && matchesWorkplaceType && matchesJobType && matchesFunction;
  });

  const getLocTypePillStyles = (type: string) => {
    switch (type.toLowerCase()) {
      case "remote": return "bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]";
      case "hybrid": return "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]";
      default: return "bg-[#E6F9F6] text-[#00B9A5] border-[#B2F5EA]";
    }
  };

  const getLogoColor = (logo: string) => {
    const colors = [
      "bg-red-200",
      "bg-amber-200",
      "bg-emerald-200",
      "bg-blue-200",
      "bg-indigo-200",
      "bg-violet-200",
      "bg-pink-200"
    ];
    if (!logo) return colors[0];
    const code = logo.charCodeAt(0) + (logo.charCodeAt(1) || 0);
    return colors[code % colors.length];
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

  const formatRelativeTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays <= 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 30) return `${diffDays}d ago`;
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths}m ago`;
    } catch {
      return "Recently";
    }
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSelectedCompanies([]);
    setSelectedWorkplaceTypes([]);
    setSelectedJobTypes([]);
    setSelectedFunctions([]);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  const visibleJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  // Helper counts
  const getCountForCompany = (company: string) => {
    return initialJobs.filter(j => j.company === company).length;
  };

  const getCountForWorkplace = (type: string) => {
    return initialJobs.filter(j => j.location_type.toLowerCase() === type.toLowerCase()).length;
  };

  const getCountForFunction = (func: string) => {
    return initialJobs.filter(j => getJobFunction(j) === func).length;
  };

  const getCountForJobType = (type: string) => {
    return initialJobs.filter(j => j.job_type.toLowerCase() === type.toLowerCase()).length;
  };

  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-white text-black pt-32 pb-24 px-6 md:px-12 relative overflow-hidden isolate">
        {/* Top Corner Eucalyptus Decorative Graphic */}
        <div className="absolute top-0 right-0 w-[380px] sm:w-[480px] md:w-[650px] h-auto pointer-events-none z-0 opacity-85 select-none overflow-hidden">
          <img
            src="/careers-eucalyptus.png"
            alt="Eucalyptus background graphic"
            className="w-full h-auto object-contain transform translate-x-6 -translate-y-6 sm:translate-x-12 sm:-translate-y-12"
            style={{
              maskImage: "radial-gradient(circle at 80% 20%, black 55%, transparent 85%)",
              WebkitMaskImage: "radial-gradient(circle at 80% 20%, black 55%, transparent 85%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-[1280px] relative z-10">

          {/* Unified Hero Container */}
          <div className="relative border border-slate-100 bg-white/50 backdrop-blur-[2px] rounded-[2.5rem] p-8 md:p-12 mb-12 overflow-hidden shadow-sm">
            {/* Dots Pattern background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
              <DotsPattern
                className="[mask-image:radial-gradient(circle_at_30%_30%,white,transparent_75%)] fill-[#00B9A5]/25 opacity-80"
                width={18}
                height={18}
                cx={2}
                cy={2}
                cr={1.5}
              />
            </div>

            {/* Right side background blob & vector illustration */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[320px] h-[240px] hidden lg:flex items-center justify-center z-0 select-none">
              {/* Organic Fluid Blob */}
              <div className="absolute w-[260px] h-[200px] bg-gradient-to-tr from-cyan-200/50 to-teal-100/40 rounded-full filter blur-xl opacity-70" />
              
              {/* Extra dotted pattern near blob */}
              <div className="absolute bottom-4 right-8 w-12 h-12 pointer-events-none opacity-20">
                <div className="w-full h-full" style={{
                  backgroundImage: "radial-gradient(#00B9A5 2px, transparent 2px)",
                  backgroundSize: "10px 10px"
                }} />
              </div>

              {/* Vector Resume Search Illustration */}
              <svg className="relative z-10 w-full h-full object-contain drop-shadow-md" viewBox="0 0 959.999 769.493" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(-498.446 -244.507)">
                  <path d="M17.567,0H674.7a17.567,17.567,0,1,1,0,35.135H17.567A17.567,17.567,0,0,1,17.567,0Z" transform="translate(498.446 597.413) rotate(-30.649)" fill="#f2f2f2"/>
                  <path d="M17.567,0H674.7a17.567,17.567,0,1,1,0,35.135H17.567A17.567,17.567,0,0,1,17.567,0Z" transform="translate(627.889 627.001) rotate(-30.649)" fill="#f2f2f2"/>
                  <path d="M17.567,0H674.7a17.567,17.567,0,1,1,0,35.135H17.567A17.567,17.567,0,0,1,17.567,0Z" transform="translate(742.539 659.362) rotate(-30.649)" fill="#f2f2f2"/>
                  <circle cx="204.562" cy="204.562" r="204.562" transform="translate(721.332 260.898)" fill="#fff"/>
                  <path d="M385.341,360.7c0-113.635,92.449-206.084,206.084-206.084S797.508,247.062,797.508,360.7,705.059,566.781,591.424,566.781,385.341,474.332,385.341,360.7Zm3.043,0c0,111.957,91.084,203.04,203.041,203.04S794.465,472.654,794.465,360.7,703.381,157.657,591.424,157.657,388.384,248.74,388.384,360.7Z" transform="translate(334.469 104.763)" fill="#3f3d56"/>
                  <path d="M526.082,332.558h0a36.465,36.465,0,1,1,36.465,36.465,36.465,36.465,0,0,1-36.465-36.465Zm36.465-34.687a34.726,34.726,0,0,0-34.687,34.687h0a34.687,34.687,0,1,0,34.687-34.687Z" transform="translate(363.346 133.791)" fill="#3f3d56" style={{ isolation: "isolate" }}/>
                  <path d="M498.776,338.16h0a69.373,69.373,0,1,1,69.373,69.373,69.373,69.373,0,0,1-69.373-69.373Zm69.373-67.594a67.594,67.594,0,1,0,67.594,67.594,67.594,67.594,0,0,0-67.594-67.594Z" transform="translate(357.744 128.189)" fill="#ccc" style={{ isolation: "isolate" }}/>
                  <path d="M444.166,349.365A135.189,135.189,0,1,1,579.354,484.554,135.189,135.189,0,0,1,444.166,349.365Zm135.189-133.41a133.41,133.41,0,1,0,133.41,133.41,133.41,133.41,0,0,0-133.41-133.41Z" transform="translate(346.539 116.984)" fill="#ccc" style={{ isolation: "isolate" }}/>
                  <circle cx="16.899" cy="16.899" r="16.899" transform="translate(908.995 448.561)" fill="#6c63ff" style={{ isolation: "isolate" }}/>
                  <circle cx="16.899" cy="16.899" r="16.899" transform="translate(865.414 497.479)" fill="#6c63ff" style={{ isolation: "isolate" }}/>
                  <circle cx="16.899" cy="16.899" r="16.899" transform="translate(1035.436 490.363)" fill="#6c63ff" style={{ isolation: "isolate" }}/>
                  <circle cx="8.005" cy="8.005" r="8.005" transform="translate(917.889 457.455)" fill="#2f2e41"/>
                  <circle cx="8.005" cy="8.005" r="8.005" transform="translate(1044.33 499.258)" fill="#2f2e41"/>
                  <circle cx="8.005" cy="8.005" r="8.005" transform="translate(874.308 507.262)" fill="#2f2e41"/>
                  <circle cx="8.005" cy="8.005" r="8.005" transform="translate(544.341 367.626)" fill="#6c63ff"/>
                  <path d="M412.562,132.98H61.248V131.2H414.342v91.607h-1.78Z" transform="translate(512.887 243.096)" fill="#2f2e41"/>
                  <path d="M227.2,255.013a23.124,23.124,0,1,1,23.124,23.124A23.124,23.124,0,0,1,227.2,255.013Zm23.124-21.346a21.346,21.346,0,1,0,21.346,21.346,21.346,21.346,0,0,0-21.346-21.346Z" transform="translate(302.021 120.618)" fill="#2f2e41"/>
                  <circle cx="8.005" cy="8.005" r="8.005" transform="translate(597.705 597.981)" fill="#6c63ff"/>
                  <path d="M271.478,446.15h0A23.124,23.124,0,1,1,294.6,469.274a23.124,23.124,0,0,1-23.124-23.124ZM294.6,424.8a21.346,21.346,0,1,0,21.345,21.346A21.346,21.346,0,0,0,294.6,424.8Z" transform="translate(311.107 159.836)" fill="#2f2e41"/>
                  <circle cx="8.005" cy="8.005" r="8.005" transform="translate(1292.473 404.98)" fill="#6c63ff"/>
                  <path d="M847.963,286.008a23.124,23.124,0,1,1,23.124,23.124A23.124,23.124,0,0,1,847.963,286.008Zm23.124-21.346a21.37,21.37,0,0,0-21.346,21.346h0a21.346,21.346,0,1,0,21.346-21.346Z" transform="translate(429.39 126.978)" fill="#2f2e41"/>
                  <path d="M457.3,166.136l226.784-3.571.028,1.778-225.032,3.544v89.844H457.3Z" transform="translate(594.148 249.531)" fill="#2f2e41"/>
                  <path d="M105.9,338H359.375V248.171h1.779v91.607H105.9Z" transform="translate(522.048 267.096)" fill="#2f2e41"/>
                  <path d="M3.113,0H94.721a3.113,3.113,0,0,1,0,6.226H3.113A3.113,3.113,0,0,1,3.113,0Z" transform="translate(503.428 417.432)" fill="#ccc"/>
                  <path d="M3.113,0H94.721a3.113,3.113,0,0,1,0,6.226H3.113A3.113,3.113,0,0,1,3.113,0Z" transform="translate(503.428 435.221)" fill="#ccc"/>
                  <path d="M3.113,0H94.721a3.113,3.113,0,0,1,0,6.226H3.113A3.113,3.113,0,0,1,3.113,0Z" transform="translate(503.428 453.008)" fill="#ccc"/>
                  <path d="M3.113,0H94.721a3.113,3.113,0,0,1,0,6.226H3.113A3.113,3.113,0,0,1,3.113,0Z" transform="translate(556.792 647.787)" fill="#ccc"/>
                  <path d="M3.113,0H94.721a3.113,3.113,0,0,1,0,6.226H3.113A3.113,3.113,0,0,1,3.113,0Z" transform="translate(556.792 665.575)" fill="#ccc"/>
                  <path d="M3.113,0H94.721a3.113,3.113,0,0,1,0,6.226H3.113A3.113,3.113,0,0,1,3.113,0Z" transform="translate(556.792 683.363)" fill="#ccc"/>
                  <path d="M3.113,0H94.721a3.113,3.113,0,0,1,0,6.226H3.113A3.113,3.113,0,0,1,3.113,0Z" transform="translate(1251.561 455.677)" fill="#ccc"/>
                  <path d="M3.113,0H94.721a3.113,3.113,0,0,1,0,6.226H3.113A3.113,3.113,0,0,1,3.113,0Z" transform="translate(1251.561 473.464)" fill="#ccc"/>
                  <path d="M3.113,0H94.721a3.113,3.113,0,0,1,0,6.226H3.113A3.113,3.113,0,0,1,3.113,0Z" transform="translate(1251.561 491.253)" fill="#ccc"/>
                  <g transform="translate(1228.291 561.07)">
                    <path d="M0,561.827c0,.525.227.947.509.947H229.645c.283,0,.509-.422.509-.947s-.227-.947-.509-.947H.509C.227,560.88,0,561.3,0,561.827Z" transform="translate(0 -109.844)" fill="#e6e6e6"/>
                    <g transform="translate(42.175 0)">
                      <path d="M16.92,40.607C15.575,47.355,10.777,51.732,6.2,50.379S-.992,42.453.353,35.705A15.206,15.206,0,0,1,3.79,28.488L9.862,0l14.2,4.679-7.5,27.589a17.094,17.094,0,0,1,.342,8.339h0Z" transform="matrix(0.951, -0.309, 0.309, 0.951, 10.32, 212.482)" fill="#ed9da0"/>
                      <rect width="16.663" height="23.642" transform="translate(32.493 414.034)" fill="#ed9da0"/>
                      <path d="M284.427,554.38c2.849.255,17.109,1.385,17.825-1.886a14.012,14.012,0,0,0-.446-6.565c-1.369-13.639-1.878-13.79-2.188-13.878-.485-.143-1.9.533-4.2,2.013l-.143.1-.032.167c-.04.215-1.058,5.22-5.889,4.448-3.31-.525-4.385-1.257-4.727-1.615a2.036,2.036,0,0,0,.875-.732,2.561,2.561,0,0,0,.183-2.133,33.125,33.125,0,0,0-2.562-5.753l-.215-.382-18.939,12.78-11.7,3.342a3.014,3.014,0,0,0-1.95,1.727h0a3.017,3.017,0,0,0,.764,3.406c2.125,1.91,6.342,5.18,10.774,5.586,1.178.111,2.737.151,4.488.151,7.313,0,17.992-.756,18.071-.772Z" transform="translate(-250.088 -103.161)" fill="#2f2e43"/>
                      <rect width="16.663" height="23.642" transform="translate(78.655 414.034)" fill="#ed9da0"/>
                      <path d="M226.417,554.38c2.849.255,17.109,1.385,17.825-1.886a14.012,14.012,0,0,0-.446-6.565c-1.369-13.639-1.878-13.79-2.188-13.878-.485-.143-1.9.533-4.2,2.013l-.143.1-.032.167c-.04.215-1.058,5.22-5.889,4.448-3.31-.525-4.385-1.257-4.727-1.615a2.035,2.035,0,0,0,.875-.732,2.56,2.56,0,0,0,.183-2.133,33.123,33.123,0,0,0-2.562-5.753l-.215-.382-18.939,12.78-11.7,3.342a3.014,3.014,0,0,0-1.95,1.727h0a3.017,3.017,0,0,0,.764,3.406c2.125,1.91,6.342,5.18,10.774,5.586,1.178.111,2.737.151,4.488.151,7.313,0,17.992-.756,18.071-.772Z" transform="translate(-145.916 -103.161)" fill="#2f2e43"/>
                      <path d="M19.882,45.233A22.7,22.7,0,1,1,40.626,36.64l4.8,21.868L19.882,69.127Z" transform="translate(38.405 22.215)" fill="#ed9da0"/>
                      <path d="M24.918,34.817l-3.13,3.8L16.124,28.7S8.9,29.076,8.9,23.714,2.264,18.2,2.264,18.2-7.119,1.811,12.321,6.127c0,0,18.531-11.205,25.24-3.31,0,0,20.563,10.352,14.675,28.381L46.262,44.664l-2.218-4.2s-7.511-10.57-19.133-5.65Z" transform="translate(47.32 9.317) rotate(16)" fill="#2f2e43"/>
                      <path d="M172.367,254.19h86.951L238.041,473.57l-24.668-1.591L212.155,313.99l-12.937,71.3-7.132,85.494-22.48,1.194s-3.3-45.045-2.61-99.492S172.367,254.19,172.367,254.19Z" transform="translate(-140.797 -47.202)" fill="#2f2e43"/>
                      <path d="M221.592,83.19,192.15,90.352,166.98,199.122l2.96,20.14a47.674,47.674,0,0,0,28.215,15.922c18.432,3.119,45.511-3.445,45.511-3.445l13.225-12.477Z" transform="translate(-138.37 -12.274)" fill="#6c63ff"/>
                      <path d="M173.531,82.313l10.564,5.994L198.9,96.932,211.086,243.14l-38.84,1.793s-14.456-81.021-14.134-121.676S173.531,82.313,173.531,82.313Z" transform="translate(-90.758 -12.095)" fill="#2f2e43"/>
                      <path d="M272.64,91.353s4.351-4.458,2.108,29.886-11.083,107.489-11.083,107.489H246.635V107.392l17.029-13.528Z" transform="translate(-218.654 -13.964)" fill="#2f2e43"/>
                      <path d="M302.513,108.868l-10.1,2.077s-4.424,1.623-6.032,14.2-1.886,54.8-1.886,54.8l-1.488,61.554,19.5,6.43-6.5-30.09,6.509-108.97Z" transform="translate(-264.433 -17.518)" fill="#2f2e43"/>
                      <path d="M16.268,39.732c-4.1,5.53-10.3,7.432-13.862,4.257s-3.119-10.233.979-15.772a15.1,15.1,0,0,1,6.2-5.053L27.249,0,38.087,10.3,19.522,32.037a17.13,17.13,0,0,1-3.255,7.687h0Z" transform="translate(80.417 199.9) rotate(-17)" fill="#ed9da0"/>
                      <path d="M137.2,99.238l8.069-2.538s10.934,2.714,14.554,16.369c0,0,10.373,34.658,7.3,64.443a139.861,139.861,0,0,1-16.128,51.782l-13.27-8.582,8.867-56.254-9.4-65.219Z" transform="translate(-37.538 -11.944)" fill="#2f2e43"/>
                    </g>
                  </g>
                </g>
              </svg>
            </div>

            {/* Hero Header Content */}
            <div className="relative z-10 max-w-2xl pt-4 mb-8">
              <h1 className="text-[clamp(2.3rem,5vw,3.6rem)] font-extrabold leading-[1.1] tracking-tight text-slate-900">
                All <span className="text-[#00B9A5]">open</span> positions
              </h1>
              <p className="mt-4 text-slate-500 font-semibold text-xs sm:text-sm leading-relaxed max-w-xl">
                This page is dedicated to bringing the best job opportunities to the members of Kerala Coders Cafe. Explore open positions across various companies and find the role that matches your skills and career goals.
              </p>

              {/* Simple Community Opinions / Feedbacks */}
              <div className="mt-6 flex flex-wrap items-center gap-3 bg-white/40 backdrop-blur-[1px] border border-slate-100/50 rounded-2xl p-3 max-w-lg">
                <div className="flex -space-x-2 shrink-0">
                  <img className="h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop" alt="User 1" />
                  <img className="h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop" alt="User 2" />
                  <img className="h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=80&fit=crop" alt="User 3" />
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-600 leading-tight">
                  <span className="text-slate-400 block sm:inline">What developers say: </span>
                  <span className="text-teal-600">"Extremely fast responses"</span>
                  <span className="text-slate-400 mx-1.5 hidden sm:inline">•</span>
                  <span className="text-slate-500 italic block sm:inline">"Very transparent process"</span>
                </div>
              </div>
            </div>

            {/* Search bar inside container */}
            <div id="jobs-list-start" className="relative z-15 bg-white border border-slate-100 rounded-3xl p-3 shadow-sm flex flex-col md:flex-row gap-3 items-center max-w-3xl">
              <div className="flex-grow w-full flex items-center gap-3 px-3">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by job title, company, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full font-semibold text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
                />
              </div>
              
              <div className="h-6 w-[1px] bg-slate-200 hidden md:block" />

              <div className="w-full md:w-auto flex items-center gap-2 px-3 shrink-0">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-sm font-semibold text-slate-700">Kerala, India</span>
              </div>

              <button
                onClick={() => {}}
                className="w-full md:w-auto bg-[#00B9A5] hover:bg-[#008F80] text-white px-7 py-3.5 font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-sm cursor-pointer"
              >
                Search Open Positions
              </button>
            </div>
          </div>

          {/* Main Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[290px_1fr] gap-8 mb-16 items-start">
            
            {/* Sidebar Filter Panel (Desktop) */}
            <aside className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm sticky top-28 hidden lg:block">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#00B9A5]" />
                  Filter Your Results
                </h2>
                {(selectedCompanies.length > 0 ||
                  selectedWorkplaceTypes.length > 0 ||
                  selectedJobTypes.length > 0 ||
                  selectedFunctions.length > 0 ||
                  searchQuery.length > 0) && (
                  <button
                    onClick={handleClearAll}
                    className="text-[11px] font-bold text-[#00B9A5] hover:underline cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Company Filter Group */}
              <div className="mb-6">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Company</h3>
                <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1">
                  {Array.from(new Set(initialJobs.map(j => j.company))).map((company) => (
                    <label key={company} className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-600 hover:text-slate-950">
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(company)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCompanies([...selectedCompanies, company]);
                          } else {
                            setSelectedCompanies(selectedCompanies.filter(c => c !== company));
                          }
                        }}
                        className="rounded border-slate-300 text-[#00B9A5] focus:ring-[#00B9A5] w-4 h-4"
                      />
                      <span className="flex-grow truncate">{company}</span>
                      <span className="text-[10px] text-slate-400 font-bold">({getCountForCompany(company)})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Workplace Type Filter Group */}
              <div className="mb-6">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Workplace type</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { key: "onsite", label: "Onsite" },
                    { key: "hybrid", label: "Hybrid" },
                    { key: "remote", label: "Remote Only" }
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-600 hover:text-slate-950">
                      <input
                        type="checkbox"
                        checked={selectedWorkplaceTypes.includes(item.key)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedWorkplaceTypes([...selectedWorkplaceTypes, item.key]);
                          } else {
                            setSelectedWorkplaceTypes(selectedWorkplaceTypes.filter(t => t !== item.key));
                          }
                        }}
                        className="rounded border-slate-300 text-[#00B9A5] focus:ring-[#00B9A5] w-4 h-4"
                      />
                      <span className="flex-grow">{item.label}</span>
                      <span className="text-[10px] text-slate-400 font-bold">({getCountForWorkplace(item.key)})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Function Filter Group */}
              <div className="mb-6">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Job function</h3>
                <div className="flex flex-col gap-2">
                  {["Engineering", "Design", "Product", "Operations", "Others"].map((func) => {
                    const count = getCountForFunction(func);
                    if (count === 0) return null;
                    return (
                      <label key={func} className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-600 hover:text-slate-950">
                        <input
                          type="checkbox"
                          checked={selectedFunctions.includes(func)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFunctions([...selectedFunctions, func]);
                            } else {
                              setSelectedFunctions(selectedFunctions.filter(f => f !== func));
                            }
                          }}
                          className="rounded border-slate-300 text-[#00B9A5] focus:ring-[#00B9A5] w-4 h-4"
                        />
                        <span className="flex-grow">{func}</span>
                        <span className="text-[10px] text-slate-400 font-bold">({count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Commitment Filter Group */}
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Commitment</h3>
                <div className="flex flex-col gap-2">
                  {[
                    { key: "fulltime", label: "Full-time" },
                    { key: "internship", label: "Internship" },
                    { key: "parttime", label: "Part-time" },
                    { key: "freelance", label: "Freelance" }
                  ].map((item) => {
                    const count = getCountForJobType(item.key);
                    if (count === 0) return null;
                    return (
                      <label key={item.key} className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-600 hover:text-slate-950">
                        <input
                          type="checkbox"
                          checked={selectedJobTypes.includes(item.key)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedJobTypes([...selectedJobTypes, item.key]);
                            } else {
                              setSelectedJobTypes(selectedJobTypes.filter(t => t !== item.key));
                            }
                          }}
                          className="rounded border-slate-300 text-[#00B9A5] focus:ring-[#00B9A5] w-4 h-4"
                        />
                        <span className="flex-grow">{item.label}</span>
                        <span className="text-[10px] text-slate-400 font-bold">({count})</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </aside>



            {/* Right Job Listing Panel */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-900">
                  {filteredJobs.length} open position{filteredJobs.length !== 1 ? 's' : ''}
                </h2>
                <span className="text-[11px] font-bold text-slate-400">
                  Showing {Math.min(visibleJobs.length, filteredJobs.length)} of {filteredJobs.length} results
                </span>
              </div>

              {filteredJobs.length === 0 ? (
                <div className="border border-slate-100 bg-white p-16 rounded-3xl shadow-sm text-center">
                  <p className="text-sm font-bold uppercase text-slate-900 mb-2">No Openings Found</p>
                  <p className="font-semibold text-slate-450 max-w-sm mx-auto text-xs leading-relaxed">
                    No jobs match your selected filter criteria. Try adjusting the search query or clearing some filters.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {visibleJobs.map((job) => {
                    const logoBgColor = getLogoColor(job.logo);
                    const relativeTime = formatRelativeTime(job.posted_at);
                    const isToday = relativeTime === "Today";

                    return (
                      <div
                        key={job.slug}
                        onClick={(e) => handleCardClick(job.slug, e)}
                        className={`group relative flex flex-col md:flex-row items-start md:items-center justify-between border rounded-2xl shadow-sm hover:shadow-md p-5 gap-4 transition-all duration-300 cursor-pointer ${
                          isToday 
                            ? "bg-slate-100/60 border-slate-300 hover:border-slate-400" 
                            : "bg-white border-slate-50 hover:border-slate-200"
                        } ${loadingSlug === job.slug ? "opacity-70 cursor-wait" : ""}`}
                      >
                        <div className="flex items-start gap-4 min-w-0 flex-grow">
                          {/* Circle Briefcase Logo */}
                          <div className="w-12 h-12 border border-slate-200/80 rounded-2xl flex items-center justify-center bg-slate-50 shrink-0 shadow-sm">
                            <svg className="w-7 h-7" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="48" y="144" width="416" height="288" rx="32" fill="#00B9A5" />
                              <path d="M192 144V104C192 90.7 202.7 80 216 80H296C309.3 80 320 90.7 320 104V144" stroke="#00B9A5" strokeWidth="24" strokeLinecap="round" fill="none" />
                              <rect x="232" y="232" width="48" height="36" rx="6" fill="#FFFFFF" />
                              <path d="M48 248H464" stroke="#008F80" strokeWidth="12" />
                            </svg>
                          </div>

                          <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-base font-bold tracking-tight text-slate-900 group-hover:text-[#00B9A5] transition-colors leading-snug">
                                  {job.title.replace(new RegExp(`\\s+at\\s+${job.company}`, "i"), "")}
                                </h3>
                                {isToday && (
                                  <span className="bg-[#E6FDF9] text-[#00B9A5] border border-[#00B9A5]/30 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full animate-pulse">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-500 font-semibold text-xs mt-1 flex flex-wrap items-center gap-1.5">
                                <span className="font-bold text-slate-700">{job.company}</span>
                                <span className="text-slate-300">•</span>
                                <span>{cleanLocation(job.location)}</span>
                                <span className="text-slate-300">•</span>
                                <span className="capitalize">{job.job_type === "fulltime" ? "Full-time" : job.job_type === "parttime" ? "Part-time" : job.job_type}</span>
                              </p>
                            </div>
                          </div>

                          {/* Actions & Meta */}
                          <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-100 pt-3 md:pt-0 border-dashed">
                            <span className={`${isToday ? "text-[#00B9A5] font-bold" : "text-slate-400 font-semibold"} text-xs`}>
                              Posted {relativeTime}
                            </span>

                            <button
                              onClick={() => {
                                setLoadingSlug(job.slug);
                                router.push(`/careers/${job.slug}`);
                              }}
                              disabled={loadingSlug !== null}
                              className="action-btn px-4.5 py-2 bg-slate-100 group-hover:bg-[#00B9A5] text-slate-700 group-hover:text-white border border-slate-200 group-hover:border-[#00B9A5] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                              {loadingSlug === job.slug ? (
                                <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <>
                                  View <ArrowRight className="w-3 h-3" />
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                    );
                  })}
                </div>
              )}

              {/* Real Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 border rounded-xl flex items-center justify-center font-bold text-xs transition-colors cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-[#00B9A5] border-[#00B9A5] text-white"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Call to Action Section */}
          <div className="relative rounded-[2.5rem] bg-gradient-to-r from-[#004D40] to-[#00B9A5] p-10 md:p-14 text-center overflow-hidden shadow-md max-w-5xl mx-auto">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white leading-tight">
                Ready to move your career to the next level?
              </h2>
              <p className="mt-4 text-white/80 font-semibold text-xs sm:text-sm leading-relaxed">
                Connect with leading tech teams in Kerala and get notified when premium roles open.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <a
                  href="https://forms.gle/REVtkCeb7DdRkqoDA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-slate-50 text-slate-900 px-6 py-3 font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-sm no-underline"
                >
                  Join Our Talent Pool 🚀
                </a>
                <a
                  href="mailto:keralacoderscafe@gmail.com?subject=Job%20Board%20Submission"
                  className="bg-[#002C26] hover:bg-[#001D19] text-white px-6 py-3 font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-sm no-underline border border-emerald-950/20"
                >
                  I'm Hiring 👥
                </a>
              </div>
            </div>
          </div>

          {/* Ad slot below Bottom CTA */}
          <div className="mt-8 max-w-5xl mx-auto">
            <CareerDisplayAd />
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

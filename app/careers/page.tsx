import { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "KCC Careers | Find Tech Jobs in Kerala",
  description: "Explore engineering, design, and product roles in Kochi, Trivandrum, Kozhikode, and remote from Kerala's top developers community.",
};

async function getJobs() {
  try {
    const res = await fetch("https://api.interviewkit.online/api/jobs/", {
      next: { revalidate: 86400 } // Cache for 24 hours to reduce Vercel ISR writes
    });
    if (!res.ok) throw new Error("Failed to fetch from API");
    return await res.json();
  } catch (error) {
    console.error("Error loading careers data:", error);
    return [];
  }
}

export default async function CareersPage() {
  const jobs = await getJobs();
  return <CareersClient initialJobs={jobs} />;
}

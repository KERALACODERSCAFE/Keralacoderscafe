import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Mission from "./components/Mission";
import Contributors from "./components/Contributors";
import Projects from "./components/Projects";
import MemberProjects from "./components/MemberProjects";
import FeaturedBlogs from "./components/FeaturedBlogs";
import Testimonials from "./components/Testimonials";
import LinkedInEmbed from "./components/LinkedInEmbed";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";
import { getProjectVotesQuery } from "@/lib/queries";
import { getUserVotedProjectIds } from "@/app/actions/upvote";


export default async function Home() {
  const [votes, votedIds] = await Promise.all([
    getProjectVotesQuery(),
    getUserVotedProjectIds()
  ]);

  return (
    <main className="relative z-10">

      <Marquee />
      <Hero />
      <Mission />
      <Contributors />
      <Projects />
      <MemberProjects initialVotes={votes} initialVotedProjects={votedIds} />
      <FeaturedBlogs />
      <Testimonials />
      <LinkedInEmbed />
      <Footer />
      <FloatingCTA />
    </main>
  );
}




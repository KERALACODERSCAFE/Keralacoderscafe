import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Mission from "./components/Mission";
import Contributors from "./components/Contributors";
import Projects from "./components/Projects";
import MemberProjects from "./components/MemberProjects";
import FeaturedBlogs from "./components/FeaturedBlogs";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative z-10">
      <Marquee />
      <Hero />
      <Mission />
      <Contributors />
      <Projects />
      <MemberProjects />
      <FeaturedBlogs />
      <Testimonials />
      <Footer />
    </main>
  );
}




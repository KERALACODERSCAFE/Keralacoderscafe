import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Contributors from "./components/Contributors";
import Projects from "./components/Projects";
import JoinCTA from "./components/JoinCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative z-10 overflow-x-clip bg-kcc-bg pb-24 text-kcc-text md:pb-0">
      <NavBar />
      <Hero />
      <Mission />
      <Contributors />
      <Projects />
      <JoinCTA />
      <Footer />
    </main>
  );
}

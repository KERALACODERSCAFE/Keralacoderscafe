import Hero from "./components/Hero";
import Contributors from "./components/Contributors";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        
        {/* Divider */}
        <div className="w-full max-w-2xl mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />
        
        <Contributors />
      </div>
      
      <Footer />
    </main>
  );
}

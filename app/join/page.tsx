import JoinGate from "../components/JoinGate";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-kcc-paper">
      <NavBar />
      <div className="pt-24 lg:pt-32">
        <JoinGate />
      </div>
      <Footer />
    </main>
  );
}

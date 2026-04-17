
import HeroSection from "../components/HeroSection";
import MockDashboard from "../components/MockDashboard";
import Features from "../components/Features";
import Footer from "../../server/components/Footer";
import CTA from "../components/CTA";
import Navbar from "../../server/components/Navbar";


export default function Home() {

  return (
    <div className="min-h-screen bg-[#080a0d] font-mono">
      <Navbar />
      
      <HeroSection />

      <div className="h-px bg-[#1c2130] mx-8" />
      
      <MockDashboard />

      <div className="h-px bg-[#1c2130] mx-8" />

      <Features />

      <div className="h-px bg-[#1c2130] mx-8" />

      <CTA />

      <Footer />
    </div>
  );
}

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import FestivalSpecials from "@/components/FestivalSpecials";
import FloatingMic from "@/components/FloatingMic";
import MobileBottomNav from "@/components/MobileBottomNav";
import Footer from "@/components/Footer";

const Index = () => {
  const [voiceQuery, setVoiceQuery] = useState("");
  const [lang, setLang] = useState("English");

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navbar lang={lang} onLangChange={setLang} />
      <main>
        <HeroSection lang={lang} />
        <ProductGrid voiceQuery={voiceQuery} onClearVoice={() => setVoiceQuery("")} lang={lang} />
        <FestivalSpecials />
      </main>
      <Footer />
      <FloatingMic lang={lang} onResults={(q) => setVoiceQuery(q)} />
      <MobileBottomNav />
    </div>
  );
};

export default Index;

"use client";
import React from "react";
import Home from "@/components/Home";
import CombineText from "@/components/CombineText";
import SlideText from "@/components/SlideText";
import BlurRevealText from "@/components/BlurRevealText";
import StorySection from "@/components/StorySection";
import Footer from "@/components/Footer";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import LanguageDropdown from "@/components/LanguageDropdown";

const MainScreen = () => {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
};

const MainContent = () => {
  const { toggleLanguage, language, t } = useLanguage();
  const router = useRouter();

  return (
    <div className="w-full overflow-hidden font-[dm_mono] selection:bg-redy selection:text-whitey">
      {/* Header/Nav Placeholder */}
     <LanguageDropdown />
      <Home />
      <CombineText />
      <SlideText />
      <BlurRevealText items={t.blurRevealText.items.slice(0, 2)} />
      <StorySection />
      <BlurRevealText items={[t.blurRevealText.items[2]]} />
      <Footer />
      <button
        onClick={() => {
          router.push("/assessment");
        }}
        className="bg-redy hover:bg-[#B91C1C] active:bg-[#991B1B] text-white transition-colors duration-150 py-2 px-4 rounded-sm cursor-pointer fixed bottom-5 right-5 z-50 uppercase md:text-md text-sm"
      >
        prolingualhub
      </button>
    </div>
  );
};

export default MainScreen;

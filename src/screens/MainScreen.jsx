"use client";
import React from "react";
import Home from "@/components/Home";
import CombineText from "@/components/CombineText";
import SlideText from "@/components/SlideText";
import BlurRevealText from "@/components/BlurRevealText";
import Footer from "@/components/Footer";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";

const MainScreen = () => {
    return (
        <LanguageProvider>
            <MainContent />
        </LanguageProvider>
    );
};

const MainContent = () => {
    const { toggleLanguage, language } = useLanguage();

    return (
        <div className="w-full overflow-hidden font-[dm_mono] selection:bg-redy selection:text-whitey">
            {/* Header/Nav Placeholder */}
            <div className="p-6 fixed top-0 left-0 flex justify-between items-center z-50">
                <div className="font-bold text-xl flex items-center gap-1">
                    <span
                        onClick={() => language !== "en" && toggleLanguage()}
                        className={`cursor-pointer transition-colors ${
                            language === "en"
                                ? "text-redy"
                                : "text-gray-300 hover:text-redy"
                        }`}
                    >
                        En
                    </span>{" "}
                    <span className="text-gray-300">|</span>{" "}
                    <span
                        onClick={() => language !== "ru" && toggleLanguage()}
                        className={`cursor-pointer transition-colors ${
                            language === "ru"
                                ? "text-redy"
                                : "text-gray-300 hover:text-redy"
                        }`}
                    >
                        Ru
                    </span>
                </div>
            </div>
            <Home />
            <CombineText />
            <SlideText />
            <BlurRevealText />
            <Footer />
            <button
                onClick={() =>
                    window.open("https://cal.com")
                }
                className="text-redy border border-redy hover:bg-redy hover:text-white transition-colors duration-300 py-2 px-4 rounded-md cursor-pointer fixed bottom-5 right-5 z-50 uppercase"
            >
                prolingualhub
            </button>
        </div>
    );
};

export default MainScreen;

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import BackButton from "./BackButton";
import { useLanguage } from "@/context/LanguageContext";

const Assessment = ({ onStart, onJoinWorkshop }) => {
    const router = useRouter();
    const { t } = useLanguage();

    const handleBack = () => {
        router.back();
    };
    return (
        <div className="flex h-full items-center justify-center flex-col gap-4 max-w-7xl mx-auto p-4 md:p-8 relative">
            {/* Back Button */}
            <BackButton onBack={handleBack} />
            <h1 className="text-[22px] md:text-7xl font-semibold text-center px-4 leading-none uppercase">
                {t.assessment.intro.title}
            </h1>
            <p className="text-xs md:text-2xl font-medium w-3/4 md:w-2/3 text-center text-[#818181]">
                {t.assessment.intro.subtitle}
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-3.5 mt-4 font-semibold w-full px-7 md:w-auto md:px-0 text-sm md:text-base">
                <button
                    onClick={onStart}
                    className="bg-redy text-white py-2.5 px-6 md:py-2 md:px-4 rounded-sm cursor-pointer hover:bg-red-700 transition-colors w-full md:w-auto uppercase"
                >
                    {t.assessment.intro.start}
                </button>
                <button
                    onClick={onJoinWorkshop}
                    className="text-redy border border-redy hover:bg-red-50 transition-colors py-2.5 px-6 md:py-2 md:px-4 rounded-sm cursor-pointer w-full md:w-auto text-center uppercase"
                >
                    {t.assessment.intro.learn}
                </button>
            </div>
        </div>
    );
};

export default Assessment;

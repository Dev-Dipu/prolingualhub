"use client";
import React from "react";
import { BookOpen, Type, Mic } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const AssessmentResult = ({ scores, onRetake, onJoinWorkshop }) => {
    const { t } = useLanguage();

    // Calculate overall score
    const totalQuestions = Object.values(scores).reduce(
        (acc, curr) => acc + curr.total,
        0
    );
    const totalCorrect = Object.values(scores).reduce(
        (acc, curr) => acc + curr.score,
        0
    );
    const percentage =
        totalQuestions > 0
            ? Math.round((totalCorrect / totalQuestions) * 100)
            : 0;

    let level = "C1 - Beginner";
    if (percentage >= 80) level = "A1 - Advanced";
    else if (percentage >= 60) level = "A2 - Proficient";
    else if (percentage >= 40) level = "B1 - Intermediate";
    else if (percentage >= 20) level = "B2 - Elementary";

    const getIcon = (id) => {
        switch (id) {
            case "grammar":
                return <BookOpen className="md:w-6 md:h-6 w-4 h-4 text-redy" />;
            case "vocabulary":
                return <Type className="md:w-6 md:h-6 w-4 h-4 text-redy" />;
            case "speaking":
                return <Mic className="md:w-6 md:h-6 w-4 h-4 text-redy" />;
            default:
                return (
                    <BookOpen className="md:w-6 md:h-6 w-4 h-4  text-redy" />
                );
        }
    };

    return (
        <div className="w-full h-full flex justify-center flex-col max-w-4xl mx-auto px-7 py-8">
            <h1 className="text-[22px] md:text-4xl font-bold text-center mb-2 uppercase">
                {t.assessment.result.title}
            </h1>
            <p className="text-gray-500 text-xs md:text-base text-center leading-tight mb-12 max-w-xs md:max-w-lg mx-auto">
                {t.assessment.result.subtitle}
            </p>

            {/* Main Result Card */}
            <div className="bg-whitey rounded-sm py-2 px-4 md:p-6 md:pl-8 flex md:flex-row items-center justify-between shadow-sm md:mb-12 mb-8">
                <div className="flex-1">
                    <p className="text-gray-500 mb-1 md:mb-2 text-[8px] md:text-base uppercase">
                        {t.assessment.result.levelLabel}
                    </p>
                    <h2 className="md:text-4xl font-bold text-redy mb-1 md:mb-4">
                        {level}
                    </h2>
                    <p className="text-gray-500 text-[6px] md:text-sm leading-tight w-4/5">
                        {t.assessment.result.levelDesc}
                    </p>
                </div>

                {/* Abstract Illustration Placeholder */}
                <div className="flex-1 flex justify-center items-center">
                    <div className="relative w-fit md:w-58 h-24 md:h-40">
                        {/* Simple abstract drawing using SVG */}
                        <svg viewBox="0 0 200 150" className="w-full h-full">
                            <path
                                d="M20,100 Q50,140 100,130 T180,100"
                                fill="none"
                                stroke="black"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            <path
                                d="M20,90 L100,110 L180,90"
                                fill="none"
                                stroke="black"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            <path
                                d="M20,80 L100,100 L180,80"
                                fill="none"
                                stroke="black"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            <path
                                d="M20,70 L100,90 L180,70"
                                fill="none"
                                stroke="black"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />

                            <path
                                d="M150,30 C180,30 180,60 150,60 L50,60 C20,60 20,30 50,30 L100,30"
                                fill="none"
                                stroke="#DC2626"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            <path
                                d="M100,30 L100,80"
                                fill="none"
                                stroke="#DC2626"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            <path
                                d="M160,50 L190,50 L180,40 M190,50 L180,60"
                                fill="none"
                                stroke="#DC2626"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            <path
                                d="M40,50 L10,50 L20,40 M10,50 L20,60"
                                fill="none"
                                stroke="#DC2626"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Detailed Breakdown */}
            <h3 className="text-sm md:text-xl font-bold mb-4.5 md:mb-6 uppercase">
                {t.assessment.result.breakdown}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mb-12">
                {Object.entries(scores).map(([key, data]) => (
                    <div
                        key={key}
                        className="bg-whitey p-4 md:p-6 rounded-sm border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="">{getIcon(key)}</div>
                            <h4 className="font-bold text-sm md:text-lg ">
                                {data.title}
                            </h4>
                        </div>
                        <div className="flex items-end gap-1 mb-2">
                            <span className="text-[8px] md:text-sm text-gray-400">
                                {Math.round((data.score / data.total) * 100)}
                                /100
                            </span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-redy"
                                style={{
                                    width: `${(data.score / data.total) * 100}%`,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row justify-end gap-4 mt-auto">
                <button
                    onClick={onRetake}
                    className="px-8 py-3 rounded-sm border border-red-200 text-redy font-semibold hover:bg-red-50 transition-colors cursor-pointer w-full md:w-auto text-center text-sm md:text-base uppercase"
                >
                    {t.assessment.result.retake}
                </button>
                <button
                    onClick={onJoinWorkshop}
                    className="px-8 py-3 rounded-sm bg-redy text-white font-semibold hover:bg-red-700 transition-colors cursor-pointer w-full md:w-auto text-center text-sm md:text-base uppercase"
                >
                    {t.assessment.result.start}
                </button>
            </div>
        </div>
    );
};

export default AssessmentResult;

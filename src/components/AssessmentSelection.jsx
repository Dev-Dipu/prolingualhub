import React, { useState } from "react";
import { BookOpen, Type, Mic } from "lucide-react";
import BackButton from "./BackButton";

const AssessmentSelection = ({ onStart, onBack }) => {
    const [selectedTypes, setSelectedTypes] = useState([]);

    const toggleSelection = (type) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter((t) => t !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    const handleStart = () => {
        if (selectedTypes.length > 0) {
            onStart(selectedTypes);
        }
    };

    const options = [
        {
            id: "grammar",
            title: "Grammar Test",
            description:
                "Evaluate your understanding of english grammar rules.",
            icon: <BookOpen className="md:w-6 md:h-6 w-4 h-4 text-redy" />,
        },
        {
            id: "vocabulary",
            title: "Vocabulary Test",
            description: "Measure the breadth and depth of your vocabulary.",
            icon: <Type className="md:w-6 md:h-6 w-4 h-4 text-redy" />,
        },
    ];

    return (
        <div className="flex flex-col items-center pt-12 md:pt-0 md:justify-center h-dvh w-full max-w-5xl mx-auto px-7 relative">
                <BackButton onBack={onBack} />
            {/* Mobile back button needs to be visible too, usually top left. Main container has pt-12 on mobile which might conflict.
           Let's just put it absolute. top-4 left-4 for mobile.
        */}

            <h1 className="text-[22px] md:text-5xl font-semibold mb-4 text-center">
                Complete English Skill Assessment
            </h1>

            <p className="text-xs md:text-lg text-gray-500 mb-12 text-center">
                Choose a test to start your assessment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:w-3/4 mb-12">
                {options.map((option) => (
                    <div
                        key={option.id}
                        onClick={() => toggleSelection(option.id)}
                        className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 flex flex-col items-start gap-4 h-full
              ${
                  selectedTypes.includes(option.id)
                      ? "border-red-200 shadow-[0_0_15px_rgba(220,38,38,0.1)] bg-whitey"
                      : "border-gray-100 hover:border-gray-200 bg-whitey"
              }`}
                    >
                        <div className="flex md:flex-col items-center md:items-start gap-2 md:gap-4">
                            <div className="p-2 bg-red-50 rounded-sm">
                                {option.icon}
                            </div>
                            <h3 className="text-sm md:text-lg font-bold leading-none">
                                {option.title}
                            </h3>
                        </div>

                        <p className="text-xs md:text-sm text-gray-500 leading-tight w-4/5 md:w-full">
                            {option.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="w-full mt-auto md:mt-0 md:flex md:justify-end mb-8 md:mb-0">
                <button
                    onClick={handleStart}
                    disabled={selectedTypes.length === 0}
                    className={`px-8 py-3 w-full md:w-auto cursor-pointer rounded-sm font-semibold transition-colors text-sm md:text-base
            ${
                selectedTypes.length > 0
                    ? "bg-redy text-white hover:bg-red-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
                >
                    Start Test
                </button>
            </div>
        </div>
    );
};

export default AssessmentSelection;

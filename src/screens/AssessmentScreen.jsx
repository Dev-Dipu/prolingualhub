"use client"
import React, { useState } from "react";
import Assessment from "@/components/Assessment";
import AssessmentSelection from "@/components/AssessmentSelection";
import AssessmentQuestion from "@/components/AssessmentQuestion";
import AssessmentResult from "@/components/AssessmentResult";
import { assessmentData } from "@/data/assessmentData";

const AssessmentScreen = () => {
    const [step, setStep] = useState("intro"); // intro, selection, question, result
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
    const [scores, setScores] = useState({});

    const handleStartAssessment = () => {
        setStep("selection");
    };

    const handleSelectionComplete = (types) => {
        setSelectedTypes(types);
        setCurrentTypeIndex(0);
        setScores({});
        setStep("question");
    };

    const handleQuestionComplete = (score, isSectionComplete) => {
        const currentType = selectedTypes[currentTypeIndex];

        setScores((prev) => ({
            ...prev,
            [currentType]: {
                title: assessmentData[currentType].title,
                score: (prev[currentType]?.score || 0) + score,
                total: assessmentData[currentType].questions.length,
            },
        }));

        if (isSectionComplete) {
            if (currentTypeIndex < selectedTypes.length - 1) {
                setCurrentTypeIndex((prev) => prev + 1);
            } else {
                setStep("result");
            }
        }
    };

    const handleSkip = (isSectionComplete) => {
        const currentType = selectedTypes[currentTypeIndex];
        // Initialize score entry if not present (for skipped sections/questions)
        setScores((prev) => {
            if (prev[currentType]) return prev;
            return {
                ...prev,
                [currentType]: {
                    title: assessmentData[currentType].title,
                    score: 0,
                    total: assessmentData[currentType].questions.length,
                },
            };
        });

        if (isSectionComplete) {
            if (currentTypeIndex < selectedTypes.length - 1) {
                setCurrentTypeIndex((prev) => prev + 1);
            } else {
                setStep("result");
            }
        }
    };

    const handleRetake = () => {
        setStep("selection");
        setSelectedTypes([]);
        setCurrentTypeIndex(0);
        setScores({});
    };

    const handleJoinWorkshop = () => {
        // Handle join workshop action
        console.log("Join Workshop");
    };

    // Calculate total progress
    const totalQuestions = selectedTypes.reduce(
        (acc, type) => acc + assessmentData[type].questions.length,
        0
    );
    const currentType = selectedTypes[currentTypeIndex];
    // This is a simplified progress calculation. For more accuracy, we'd need to track exact question index in parent.
    // For now, we can pass a calculated progress based on completed sections.
    const completedSectionsProgress =
        (currentTypeIndex / selectedTypes.length) * 100;

    return (
        <div className="w-full h-screen overflow-hidden font-[dm_sans] selection:bg-redy selection:text-whitey bg-white flex flex-col">
            {/* Header/Nav Placeholder */}
            <div className="p-6 fixed top-0 left-0 flex justify-between items-center">
                <div className="text-redy font-bold text-xl">
                    <span className="font-bold">En</span>{" "}
                    <span className="text-gray-300">|</span>{" "}
                    <span className="text-gray-300">Ru</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {step === "intro" && (
                    <Assessment onStart={handleStartAssessment} />
                )}

                {step === "selection" && (
                    <AssessmentSelection onStart={handleSelectionComplete} />
                )}

                {step === "question" && currentType && (
                    <AssessmentQuestion
                        key={currentType} // Force re-mount on type change
                        data={assessmentData[currentType]}
                        onNext={handleQuestionComplete}
                        onSkip={handleSkip}
                        totalProgress={completedSectionsProgress}
                    />
                )}

                {step === "result" && (
                    <AssessmentResult
                        scores={scores}
                        onRetake={handleRetake}
                        onJoinWorkshop={handleJoinWorkshop}
                    />
                )}
            </div>
        </div>
    );
};

export default AssessmentScreen;

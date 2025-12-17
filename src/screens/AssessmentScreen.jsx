"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Assessment from "@/components/Assessment";
import AssessmentSelection from "@/components/AssessmentSelection";
import AssessmentQuestion from "@/components/AssessmentQuestion";
import AssessmentResult from "@/components/AssessmentResult";

const AssessmentScreen = () => {
    const [step, setStep] = useState("intro"); // intro, selection, question, result
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
    const [scores, setScores] = useState({});
    const [assessmentData, setAssessmentData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/admin/questions");
                const data = await res.json();
                setAssessmentData(data);
            } catch (error) {
                console.error("Failed to load assessment data", error);
            }
        };
        fetchData();
    }, []);

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

    const router = useRouter();

    const handleJoinWorkshop = () => {
        router.push("/courses");
    };

    if (!assessmentData)
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );

    // Calculate total progress
    const totalQuestions = selectedTypes.reduce(
        (acc, type) => acc + assessmentData[type].questions.length,
        0
    );
    const currentType = selectedTypes[currentTypeIndex];
    // This is a simplified progress calculation. For more accuracy, we'd need to track exact question index in parent.
    // For now, we can pass a calculated progress based on completed sections.
    const completedQuestionsCount = selectedTypes
        .slice(0, currentTypeIndex)
        .reduce((acc, type) => acc + assessmentData[type].questions.length, 0);

    return (
        <div className="w-full h-dvh overflow-hidden font-[dm_mono] selection:bg-redy selection:text-whitey bg-whitey flex flex-col uppercase">
            <div className="flex-1 overflow-y-auto">
                {step === "intro" && (
                    <Assessment
                        onStart={handleStartAssessment}
                        onJoinWorkshop={handleJoinWorkshop}
                    />
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
                        totalQuestions={totalQuestions}
                        completedQuestionsCount={completedQuestionsCount}
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

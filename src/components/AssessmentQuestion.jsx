"use client";
import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import BackButton from "./BackButton";
import { useLanguage } from "@/context/LanguageContext";

const AssessmentQuestion = ({
    data,
    onComplete,
    onBack,
    totalQuestions,
    completedQuestionsCount,
}) => {
    const { t } = useLanguage();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [userAnswers, setUserAnswers] = useState({}); // { index: { option, score } }

    const currentQuestion = data.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === data.questions.length - 1;

    // Resolve translated title if possible, else fallback
    const localizedTitle = t.assessment.selection[data.id]?.title || data.title;

    useEffect(() => {
        // Restore state if we have visited this question before
        if (userAnswers[currentQuestionIndex]) {
            setSelectedOption(userAnswers[currentQuestionIndex].option);
            setIsAnswered(true);
        } else {
            setSelectedOption(null);
            setIsAnswered(false);
        }
    }, [currentQuestionIndex, userAnswers]);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsAnswered(true);
    };

    const calculateTotalScore = (finalAnswers) => {
        return Object.values(finalAnswers).reduce(
            (acc, curr) => acc + curr.score,
            0
        );
    };

    const handleNext = () => {
        const score = selectedOption === currentQuestion.correctAnswer ? 1 : 0;

        const newAnswers = {
            ...userAnswers,
            [currentQuestionIndex]: { option: selectedOption, score },
        };
        setUserAnswers(newAnswers);

        if (isLastQuestion) {
            const totalScore = calculateTotalScore(newAnswers);
            onComplete(totalScore);
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handleSkip = () => {
        const newAnswers = {
            ...userAnswers,
            [currentQuestionIndex]: { option: null, score: 0 },
        };
        setUserAnswers(newAnswers);

        if (isLastQuestion) {
            const totalScore = calculateTotalScore(newAnswers);
            onComplete(totalScore);
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        } else if (onBack) {
            onBack();
        }
    };

    // Calculate global progress
    const currentGlobalQuestion =
        completedQuestionsCount + currentQuestionIndex + 1;
    const progressPercentage = (currentGlobalQuestion / totalQuestions) * 100;

    return (
        <div className="w-full max-w-3xl mx-auto px-4 flex flex-col h-full py-6 relative">
            <BackButton onBack={handleBack} />

            {/* Progress Bar */}
            <div className="shrink-0 mt-8 md:mt-4">
                <div className="flex justify-between text-[10px] md:text-sm font-medium mb-2 uppercase">
                    <span>
                        {Math.round(progressPercentage)}%{" "}
                        {t.assessment.question.progress}
                    </span>
                </div>
                <div className="h-1.5 md:h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-redy transition-all duration-300 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
                <p className="text-[9px] md:text-xs text-gray-400 mt-2 uppercase">
                    {t.assessment.question.phase}: {localizedTitle}
                </p>
            </div>

            {/* Question Card */}
            <div className="flex-1 flex flex-col justify-center my-6">
                <div className="bg-whitey rounded-sm border py-6 px-4 md:p-8 shadow-sm w-full">
                    <p className="text-gray-500 mb-1.5 md:mb-4 text-[9px] md:text-base uppercase">
                        {t.assessment.question.question}{" "}
                        {currentQuestionIndex + 1} {t.assessment.question.of}{" "}
                        {data.questions.length}
                    </p>

                    <h2 className="text-[10px] md:text-3xl font-bold mb-3.5 md:mb-8 leading-tight">
                        {currentQuestion.type === "fill-in-blank"
                            ? "Choose the correct word to fill in the blank."
                            : "Select the Correct Choice"}
                    </h2>

                    {currentQuestion.type === "fill-in-blank" && (
                        <div className=" mb-6 md:mb-8 p-6 border border-gray-200 rounded-sm bg-gray-50 text-center text-xs md:text-base font-medium">
                            {currentQuestion.question}
                        </div>
                    )}
                    {currentQuestion.type === "multiple-choice" && (
                        <div className="mb-6 md:mb-8 py-3 md:p-6 border border-gray-200 rounded-sm bg-gray-50 text-center text-xs md:text-base font-medium">
                            {currentQuestion.question}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {currentQuestion.options.map((option, index) => {
                            const isSelected = selectedOption === option;

                            let buttonStyle =
                                "border-gray-200 hover:border-gray-300";
                            if (isSelected) {
                                buttonStyle =
                                    "bg-red-50 border-red-200 text-black";
                            }

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleOptionSelect(option)}
                                    className={`p-2.5 md:p-4 rounded-sm border text-left transition-all relative flex items-center text-xs md:text-base justify-between  ${buttonStyle}`}
                                >
                                    <span className="font-medium">
                                        {option}
                                    </span>
                                    {isSelected && (
                                        <CheckCircle2 className="md:w-5 md:h-5 h-4 w-4 text-redy" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="shrink-0 pt-4">
                <div className="flex flex-col-reverse md:flex-row justify-end md:gap-4 gap-2.5 text-sm md:text-base">
                    <button
                        onClick={handleSkip}
                        className="px-8 py-2 w-full md:w-auto rounded-sm border border-red-200 text-redy font-medium hover:bg-red-50 transition-colors cursor-pointer text-center uppercase"
                    >
                        {t.assessment.question.skip}
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!isAnswered}
                        className={`px-8 py-2 w-full md:w-auto cursor-pointer rounded-sm font-medium transition-colors text-center uppercase ${
                            isAnswered
                                ? "bg-redy text-white hover:bg-red-700"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        {isLastQuestion
                            ? t.assessment.question.finish
                            : t.assessment.question.next}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssessmentQuestion;

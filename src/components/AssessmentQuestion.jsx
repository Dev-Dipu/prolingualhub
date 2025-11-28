import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const AssessmentQuestion = ({ data, onNext, onSkip, totalProgress }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const currentQuestion = data.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === data.questions.length - 1;

    const handleOptionSelect = (option) => {
        if (isAnswered) return;
        setSelectedOption(option);
        setIsAnswered(true);
    };

    const handleNext = () => {
        const score = selectedOption === currentQuestion.correctAnswer ? 1 : 0;

        if (isLastQuestion) {
            onNext(score, true); // true indicates section complete
        } else {
            onNext(score, false);
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        }
    };

    const handleSkip = () => {
        if (isLastQuestion) {
            onSkip(true);
        } else {
            onSkip(false);
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        }
    };

    // Calculate progress for the current section
    const sectionProgress =
        ((currentQuestionIndex + 1) / data.questions.length) * 100;

    return (
        <div className="w-full max-w-3xl mx-auto px-4 flex flex-col h-full justify-center">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm font-medium mb-2">
                    <span>{Math.round(totalProgress)}% Complete</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-redy transition-all duration-300 ease-out"
                        style={{ width: `${totalProgress}%` }}
                    />
                </div>
                <p className="text-xs text-gray-400 mt-2">Step: {data.title}</p>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl border border-red-100 p-8 shadow-sm mb-8">
                <p className="text-gray-500 mb-4">
                    Question {currentQuestionIndex + 1} Of{" "}
                    {data.questions.length}
                </p>

                <h2 className="text-3xl font-bold mb-8 leading-tight">
                    {currentQuestion.type === "fill-in-blank"
                        ? "Choose the correct word to fill in the blank."
                        : "Select the Correct Choice"}
                </h2>

                {currentQuestion.type === "fill-in-blank" && (
                    <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50 text-center text-lg font-medium">
                        {currentQuestion.question}
                    </div>
                )}
                {currentQuestion.type === "multiple-choice" && (
                    <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50 text-center text-lg font-medium">
                        {currentQuestion.question}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedOption === option;
                        const isCorrect =
                            option === currentQuestion.correctAnswer;

                        let buttonStyle =
                            "border-gray-200 hover:border-gray-300";
                        if (isAnswered) {
                            if (isSelected) {
                                buttonStyle =
                                    "bg-red-50 border-red-200 text-black";
                            }
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(option)}
                                className={`p-4 rounded-lg border text-left transition-all relative flex items-center justify-between ${buttonStyle}`}
                            >
                                <span className="font-medium">{option}</span>
                                {isAnswered && isSelected && (
                                    <CheckCircle2 className="w-5 h-5 text-redy" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end gap-4">
                <button
                    onClick={handleSkip}
                    className="px-8 py-2 rounded-md border border-red-200 text-redy font-medium hover:bg-red-50 transition-colors cursor-pointer"
                >
                    Skip
                </button>
                <button
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className={`px-8 py-2 cursor-pointer rounded-md font-medium transition-colors ${
                        isAnswered
                            ? "bg-redy text-white hover:bg-red-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                >
                    {isLastQuestion ? "Finish Section" : "Next"}
                </button>
            </div>
        </div>
    );
};

export default AssessmentQuestion;

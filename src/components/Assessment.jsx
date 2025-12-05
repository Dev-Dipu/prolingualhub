import React from "react";

const Assessment = ({ onStart, onJoinWorkshop }) => {
    return (
        <div className="flex h-full items-center justify-center flex-col gap-4">
            <h1 className="text-4xl md:text-7xl font-semibold text-center px-4">
                Check your English level
            </h1>
            <p className="text-lg md:text-2xl font-medium w-11/12 md:w-1/2 text-center text-[#818181]">
                Check your English level and see how well you perform across
                Grammar, Vocabulary, and Speaking abilities.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-2 font-semibold w-full px-4 md:w-auto md:px-0">
                <button
                    onClick={onStart}
                    className="bg-redy text-white py-3 px-6 md:py-2 md:px-4 rounded-md cursor-pointer hover:bg-red-700 transition-colors w-full md:w-auto"
                >
                    Start Assessment
                </button>
                <button
                    onClick={onJoinWorkshop}
                    className="text-redy border border-redy hover:bg-red-50 transition-colors py-3 px-6 md:py-2 md:px-4 rounded-md cursor-pointer w-full md:w-auto text-center"
                >
                    Join Workshop
                </button>
            </div>
        </div>
    );
};

export default Assessment;

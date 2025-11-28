import React from "react";

const Assessment = ({ onStart }) => {
    return (
        <div className="flex h-screen items-center justify-center flex-col gap-4">
            <h1 className="text-7xl font-semibold ">
                Check your English level
            </h1>
            <p className="text-2xl font-medium md:w-1/2 text-center text-[#818181]">
                Check your English level and see how well you perform across
                Grammar, Vocabulary, and Speaking abilities.
            </p>
            <div className="flex items-center justify-center gap-4 mt-2 font-semibold">
                <button
                    onClick={onStart}
                    className="bg-redy text-white py-2 px-4 rounded-md cursor-pointer hover:bg-red-700 transition-colors"
                >
                    Start Assessment
                </button>
                <button className="text-redy border border-redy py-2 px-4 rounded-md cursor-pointer">
                    Join Workshop
                </button>
            </div>
        </div>
    );
};

export default Assessment;

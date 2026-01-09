import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const Assessment = ({ onStart, onJoinWorkshop }) => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <div className="flex h-full items-center justify-center flex-col gap-4 max-w-7xl mx-auto p-4 md:p-8 relative">
      {/* Back Button */}
      <div className="absolute top-8 left-7">
        <button
          onClick={handleBack}
          className="mb-4 md:mb-8 p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer inline-flex items-center"
        >
          <ChevronLeft className="w-6 h-6 text-[#1C1C1C]" />
        </button>
      </div>
      <h1 className="text-[22px] md:text-7xl font-semibold text-center px-4 leading-none">
        Check your English level
      </h1>
      <p className="text-xs md:text-2xl font-medium w-3/4 md:w-2/3 text-center text-[#818181]">
        Check your English level and see how well you perform across Grammar,
        Vocabulary and Speaking ability.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3.5 mt-4 font-semibold w-full px-7 md:w-auto md:px-0 text-sm md:text-base">
        <button
          onClick={onStart}
          className="bg-redy text-white py-2.5 px-6 md:py-2 md:px-4 rounded-sm cursor-pointer hover:bg-red-700 transition-colors w-full md:w-auto uppercase"
        >
          Start Assessment
        </button>
        <button
          onClick={onJoinWorkshop}
          className="text-redy border border-redy hover:bg-red-50 transition-colors py-2.5 px-6 md:py-2 md:px-4 rounded-sm cursor-pointer w-full md:w-auto text-center uppercase"
        >
          Start Learning
        </button>
      </div>
    </div>
  );
};

export default Assessment;

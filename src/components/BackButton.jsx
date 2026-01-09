"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackButton({ onBack, className = "" }) {
    const router = useRouter();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.back();
        }
    };

    return (
        <button
            onClick={handleBack}
            className={`fixed top-4 left-4 md:top-8 md:left-8 z-50 p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer inline-flex items-center ${className}`}
            aria-label="Go back"
        >
            <ChevronLeft className="w-6 h-6 text-[#1C1C1C]" />
        </button>
    );
}

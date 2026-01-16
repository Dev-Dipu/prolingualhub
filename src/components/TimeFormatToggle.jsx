"use client";

export default function TimeFormatToggle({ value, onChange }) {
    return (
        <div className="inline-flex items-center p-[3px] border border-gray-200 rounded-lg bg-white">
            <button
                onClick={() => onChange("12h")}
                className={`px-3 py-1 text-[13px] font-medium rounded-md transition-all duration-200 ${
                    value === "12h"
                        ? "bg-redy text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                }`}
            >
                12h
            </button>
            <button
                onClick={() => onChange("24h")}
                className={`px-3 py-1 text-[13px] font-medium rounded-md transition-all duration-200 ${
                    value === "24h"
                        ? "bg-redy text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                }`}
            >
                24h
            </button>
        </div>
    );
}

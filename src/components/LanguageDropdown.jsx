"use client";
import { useState } from "react";

const languages = ["ENGLISH", "RUSSIAN", "ARABIC", "TURKISH"];

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("ENGLISH");

  return (
    <div className="fixed top-6 left-6 z-50">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition text-gray-500 font-medium tracking-wide text-xs cursor-pointer"
      >
        <img
  src="/world.png"
  alt="Language"
  className="w-3.5 h-3.5 opacity-90"
/>

        <span className="uppercase">{selected}</span>
        <svg className="w-3.5 h-3.5 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.292l3.71-4.06a.75.75 0 011.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="mt-1.5 w-40 bg-white border border-gray-200 rounded-sm shadow-md">
          {languages.map((lang) => (
            <div
              key={lang}
              onClick={() => {
                setSelected(lang);
                setOpen(false);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer text-xs tracking-wide transition ${
                selected === lang
                  ? "bg-gray-100 text-gray-900 font-semibold"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <span className={`w-1.5 h-1.5 inline-block ${selected === lang ? "bg-gray-900" : "bg-gray-400"}`} />
              <span className="uppercase">{lang}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

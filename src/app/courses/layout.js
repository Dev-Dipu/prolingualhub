"use client";

import { LanguageProvider } from "@/context/LanguageContext";

export default function CoursesLayout({ children }) {
    return <LanguageProvider initialLanguage="en">{children}</LanguageProvider>;
}

"use client";
import PackagePage from "@/app/courses/package/page";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RuPackagePage() {
    return (
        <LanguageProvider initialLanguage="ru">
            <PackagePage />
        </LanguageProvider>
    );
}

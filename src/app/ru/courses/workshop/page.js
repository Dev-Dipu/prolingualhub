"use client";
import WorkshopPage from "@/app/courses/workshop/page";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RuWorkshopPage() {
    return (
        <LanguageProvider initialLanguage="ru">
            <WorkshopPage />
        </LanguageProvider>
    );
}

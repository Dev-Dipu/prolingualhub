"use client";
import PrivateLessonPage from "@/app/courses/private-lesson/page";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RuPrivateLessonPage() {
    return (
        <LanguageProvider initialLanguage="ru">
            <PrivateLessonPage />
        </LanguageProvider>
    );
}

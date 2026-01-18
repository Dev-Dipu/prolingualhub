"use client";
import PrivateLessonCheckoutPage from "@/app/courses/private-lesson/checkout/page";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RuPrivateLessonCheckoutPage() {
    return (
        <LanguageProvider initialLanguage="ru">
            <PrivateLessonCheckoutPage />
        </LanguageProvider>
    );
}

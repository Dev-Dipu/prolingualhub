"use client";
import WorkshopCheckoutPage from "@/app/courses/workshop/checkout/page";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RuWorkshopCheckoutPage() {
    return (
        <LanguageProvider initialLanguage="ru">
            <WorkshopCheckoutPage />
        </LanguageProvider>
    );
}

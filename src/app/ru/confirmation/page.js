"use client";
import ConfirmationPage from "@/app/confirmation/page";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RuConfirmationPage() {
    return (
        <LanguageProvider initialLanguage="ru">
            <ConfirmationPage />
        </LanguageProvider>
    );
}

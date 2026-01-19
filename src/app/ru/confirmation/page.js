"use client";
import ConfirmationScreen from "@/screens/ConfirmationScreen";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RuConfirmationPage() {
    return (
        <LanguageProvider initialLanguage="ru">
            <ConfirmationScreen />
        </LanguageProvider>
    );
}

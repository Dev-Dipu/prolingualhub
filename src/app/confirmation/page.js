"use client";

import ConfirmationScreen from "@/screens/ConfirmationScreen";
import { LanguageProvider } from "@/context/LanguageContext";

export default function ConfirmationPage() {
    return (
        <LanguageProvider initialLanguage="en">
            <ConfirmationScreen />
        </LanguageProvider>
    );
}

"use client";
import CoursesScreen from "@/screens/CoursesScreen";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RuCoursesPage() {
    return (
        <LanguageProvider initialLanguage="ru">
            <CoursesScreen />
        </LanguageProvider>
    );
}

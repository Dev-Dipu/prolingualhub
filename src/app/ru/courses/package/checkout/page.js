"use client";
import PackageCheckoutPage from "@/app/courses/package/checkout/page";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RuPackageCheckoutPage() {
    return (
        <LanguageProvider initialLanguage="ru">
            <PackageCheckoutPage />
        </LanguageProvider>
    );
}

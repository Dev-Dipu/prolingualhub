"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children, initialLanguage }) => {
    const [language, setLanguage] = useState(initialLanguage || "en"); // 'en' or 'ru'
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (initialLanguage) {
            setIsLoaded(true);
            return;
        }
        const storedLang = localStorage.getItem("language");
        if (storedLang) {
            setLanguage(storedLang);
        }
        setIsLoaded(true);
    }, [initialLanguage]);

    const toggleLanguage = () => {
        const newLang = language === "en" ? "ru" : "en";
        localStorage.setItem("language", newLang);
        window.location.reload();
    };

    const t = translations[language];

    if (!isLoaded) {
        return null;
    }

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);

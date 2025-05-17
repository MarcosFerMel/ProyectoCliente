"use client";
import en from "../locales/en.json";
import es from "../locales/es.json";
import { I18n } from "i18n-js";
import { createContext, useContext, useEffect, useState } from "react";

const translator = new I18n({ en, es });
translator.defaultLocale = "es";

const LanguageContext = createContext({
    language: "en",
    changeLanguage: (lang: string) => { },
    translator,
});

export const LanguageProvider = ({ children }: any) => {
    const [language, setLanguage] = useState("es");

    useEffect(() => {
        translator.locale = language;
    }, [language]);

    const changeLanguage = (lang: string) => {
        setLanguage(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, translator }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
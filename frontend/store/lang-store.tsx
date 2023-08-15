"use client";
import { ReactNode, createContext, useState } from "react";

export const LangContext = createContext({
  lang: "en",
  toggleLang: () => {},
});

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const toggleLang = () => {
    setLang(lang === "en" ? "ar" : "en");
  };

  const [lang, setLang] = useState("en");

  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
};

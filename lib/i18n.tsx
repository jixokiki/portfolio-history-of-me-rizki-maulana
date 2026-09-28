"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { content as en } from "@/data/content.en";
import { content as ko } from "@/data/content.ko";
import type { Content } from "@/data/content.types";

export type Locale = "en" | "ko";

const dictionaries: Record<Locale, Content> = { en, ko };
const STORAGE_KEY = "portfolio-locale";

type Ctx = { locale: Locale; setLocale: (l: Locale) => void; t: Content };

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ko") setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: dictionaries[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useContent must be used inside LanguageProvider");
  return ctx;
}
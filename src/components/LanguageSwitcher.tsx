"use client";

import { useTranslation } from "react-i18next";
import {
  I18N_SUPPORTED_LANGUAGES,
  LANGUAGE_NAMES,
  type SupportedLanguage,
} from "@/lib/i18n";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/constants";

type Props = {
  /** "light" for dark backgrounds (e.g. hero), "dark" for white backgrounds */
  theme?: "light" | "dark";
};

export default function LanguageSwitcher({ theme = "dark" }: Props) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = (i18n.language?.slice(0, 2) as SupportedLanguage) ?? "en";

  const changeLanguage = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const textColor = theme === "light" ? "text-white" : "text-grey-700";
  const iconColor = theme === "light" ? "white" : "#374151";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "flex items-center gap-1.5 text-sm font-medium px-2 py-1 rounded-md hover:opacity-80 transition-opacity",
          textColor
        )}
      >
        <Globe size={16} color={iconColor} />
        <span>{LANGUAGE_NAMES[currentLang] ?? "English"}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-grey-100 min-w-[120px] py-1 z-[100]"
        >
          {I18N_SUPPORTED_LANGUAGES.map((lang) => (
            <li key={lang}>
              <button
                role="option"
                aria-selected={currentLang === lang}
                onClick={() => changeLanguage(lang)}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm hover:bg-grey-50 transition-colors",
                  currentLang === lang
                    ? "font-semibold text-primary"
                    : "text-grey-700"
                )}
              >
                {LANGUAGE_NAMES[lang]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

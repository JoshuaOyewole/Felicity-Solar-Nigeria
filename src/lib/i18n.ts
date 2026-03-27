import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const I18N_SUPPORTED_LANGUAGES = ["en", "zh", "es"] as const;
export type SupportedLanguage = (typeof I18N_SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: "English",
  zh: "中文",
  es: "Español",
};

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: I18N_SUPPORTED_LANGUAGES,
    defaultNS: "common",
    ns: ["common", "home", "about", "after-sales"],
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      requestOptions: { cache: "no-cache" },
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
export { I18N_SUPPORTED_LANGUAGES };

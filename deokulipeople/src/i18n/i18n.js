import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; 
import LanguageDetector from 'i18next-browser-languagedetector';

import translation_hi from './locales/hi/hi.json';
import translation_mai from './locales/mai/mai.json';
import translation_kaithi from './locales/kaithi/kaithi.json';
import translation_en from './locales/en/en.json'; 

const resources = {
  hi: { translation: translation_hi },
  mai: { translation: translation_mai },
  kaithi: { translation: translation_kaithi },
  en: { translation: translation_en } 
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'hi',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

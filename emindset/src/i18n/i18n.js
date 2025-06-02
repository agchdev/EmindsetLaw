import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importamos los archivos de traducción
import translationES from './locales/es.json';
import translationFR from './locales/fr.json';
import translationCA from './locales/ca.json';
import translationEN from './locales/en.json';

// Recursos de traducción
const resources = {
  es: {
    translation: translationES
  },
  fr: {
    translation: translationFR
  },
  ca: {
    translation: translationCA
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(LanguageDetector) // Detecta el idioma del navegador
  .use(initReactI18next) // Inicializa react-i18next
  .init({
    resources,
    fallbackLng: 'es', // Idioma por defecto
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false // React ya escapa los valores
    }
  });

export default i18n;

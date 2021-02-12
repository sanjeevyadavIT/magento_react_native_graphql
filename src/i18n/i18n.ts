import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import en from './locales/en.json';
import es from './locales/es.json';

// Should the app fallback to English if user locale doesn't exists
i18n.fallbacks = true;

// Define the supported translation
i18n.translations = {
  en,
  es,
};

export const initLocale = () => {
  const fallback = { languageTag: 'en', isRTL: false };
  const { languageTag } =
    RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations)) ||
    fallback;

  i18n.locale = languageTag;
};

initLocale();

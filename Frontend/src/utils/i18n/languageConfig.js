import esFlag from '@/assets/flags/es.svg';
import enFlag from '@/assets/flags/gb.svg';

import enValidation from './locales/en/validation.json';
import enCommon from './locales/en/en.json';
import enAuth from './locales/en/auth.json';

import esValidation from './locales/es/validation.json';
import esCommon from './locales/es/es.json';
import esAuth from './locales/es/auth.json';

export const resources = {
  en: { 
    validation: enValidation, 
    common: enCommon,
    auth: enAuth, 
  },

  es: { 
    validation: esValidation, 
    common: esCommon,
    auth: esAuth,
  },
};

export const languageConfig = {
    en: { label: 'English', icon: enFlag },
    es: { label: 'Español', icon: esFlag },
};

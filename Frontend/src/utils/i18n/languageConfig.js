import esFlag from '@/assets/flags/es.svg';
import enFlag from '@/assets/flags/gb.svg';

import enValidation from './locales/en/validation.json';
import enAuth from './locales/en/auth.json';
import enNavbar from './locales/en/navbar.json';
import enUser from '@/utils/i18n/locales/en/user.json';
import enAccount from '@/utils/i18n/locales/en/account.json';
import enTips from '@/utils/i18n/locales/en/tips.json';
import enTransaction from '@/utils/i18n/locales/en/transaction.json';

import esValidation from './locales/es/validation.json';
import esAuth from './locales/es/auth.json';
import esNavbar from './locales/es/navbar.json';
import esUser from '@/utils/i18n/locales/es/user.json';
import esAccount from '@/utils/i18n/locales/es/account.json';
import esTips from '@/utils/i18n/locales/es/tips.json';
import esTransaction from '@/utils/i18n/locales/es/transaction.json';

export const resources = {
  en: { 
    validation: enValidation, 
    auth: enAuth,
    navbar: enNavbar,
    user: enUser,
    account: enAccount,
    tips: enTips,
    transaction: enTransaction,
  },

  es: { 
    validation: esValidation, 
    auth: esAuth,
    navbar: esNavbar,
    user: esUser,
    account: esAccount,
    tips: esTips,
    transaction: esTransaction,
  },
};

export const languageConfig = {
    en: { label: 'English', icon: enFlag },
    es: { label: 'Español', icon: esFlag },
};

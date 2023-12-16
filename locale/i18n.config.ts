import { pt, en } from "./index";

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'pt',
    messages: {
      pt,
      en
    },
    languages: ['pt', 'en']
  }))
  
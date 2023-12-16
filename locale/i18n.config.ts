import { pt, en } from "./index";

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
      pt,
      en
    },
    languages: ['pt', 'en']
  }))
  
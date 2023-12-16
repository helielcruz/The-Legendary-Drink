// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/i18n',
  ],
  pinia: {
    storesDirs: ['./stores/**']
  },
  i18n: {
    vueI18n: './locale/i18n.config.ts'
  }
})

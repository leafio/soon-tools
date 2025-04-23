// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:false,
  devtools: { enabled: true },
  app: {
    baseURL: process.env.DEPLOY_ENV === 'GH_PAGES' ? '/soon-tools/' : '/' 
  },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@element-plus/nuxt'
  ],
  fonts: {
    provider:'none'
  },

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27'
})
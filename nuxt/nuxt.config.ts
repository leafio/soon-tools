// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    'nuxt-shiki',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vite-pwa/nuxt'
  ],
  devServer: {
    port: 9000
  },
  app: {
    baseURL: '/soon-tools/'
  }

  // ,pwa:{
  //   manifest:{
  //     name:'soon-tools',
  //     short_name:'soon-tools'
  //   }
  // }
})
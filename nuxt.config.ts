// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/google-fonts',
    [
      'nuxt-viewport', {
        viewport: {
          breakpoints: {
            desktop: 1024,
            desktopMedium: 1280,
            desktopWide: 1600,
      
            mobile: 640,
            mobileMedium: 375,
            mobileWide: 425,
      
            tablet: 768,
          },
        },
      }
    ],
  ],
  googleFonts: {
    families: {
      K2D: true
    }
  },
  routeRules: {
    '/': { redirect: '/home' },
  },
})
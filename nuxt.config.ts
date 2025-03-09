// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],

  modules: ['@nuxtjs/google-fonts', [
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
  ], '@nuxtjs/tailwindcss', '@pinia/nuxt'],

  googleFonts: {
    families: {
      K2D: true
    }
  },

  routeRules: {
    '/': { redirect: '/home' },
  },

  compatibilityDate: '2024-12-11',
})
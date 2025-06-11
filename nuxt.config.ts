// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['', '@nuxtjs/tailwindcss', 'nuxt-charts'],
  css: ['~/assets/css/main.css', 'leaflet/dist/leaflet.css',],
  vite: {
    server: {
      allowedHosts: ['1b7a-182-1-69-8.ngrok-free.app']
    }
  },
    runtimeConfig: {
    public: {
      apiBase: 'https://1b7a-182-1-69-8.ngrok-free.app'
    },
  }
  }
)
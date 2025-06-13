// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["", "@nuxtjs/tailwindcss", "nuxt-charts", "vue3-carousel-nuxt"],
  css: ["~/assets/css/main.css", "leaflet/dist/leaflet.css"],
  vite: {
    server: {
      allowedHosts: ["b925-103-3-222-97.ngrok-free.app", "bc26-103-3-222-97.ngrok-free.app"],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "https://b925-103-3-222-97.ngrok-free.app",
    },
  },
});
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["", "@nuxtjs/tailwindcss", "nuxt-charts"],
  css: ["~/assets/css/main.css", "leaflet/dist/leaflet.css"],
  vite: {
    server: {
      allowedHosts: ["c0a4-182-253-126-194.ngrok-free.app"],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "https://9d89-182-253-126-194.ngrok-free.app/api",
    },
  },
});

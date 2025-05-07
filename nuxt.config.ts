import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  nitro: {
    ignore: ["/*"],
  },

  icon: {
    size: "22px",
  },

  modules: [
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxt/test-utils/module",
    "@nuxt/icon",
    '@nuxt/fonts',
    '@vite-pwa/nuxt'
  ],

  pwa: {
    devOptions: {
      enabled: true,
    },
    manifest: {
      name: "Aizen",
      short_name: "Aizen",
      description: "A web based lemmy client",
      theme_color: "#ffffff",
      start_url: "/",
      display: "standalone",
      background_color: "#000000",
    },
    registerType: "autoUpdate",
    workbox: {
      globPatterns: ["**/*.{js,css,html,ico,png,svg,txt,xml,webmanifest}"],
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  image: {
    quality: 100,
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
    {
      path: "~/services",
      pathPrefix: false,
    },
  ],

  css: ["~/assets/css/main.css"],

  compatibilityDate: "2024-11-21",
});

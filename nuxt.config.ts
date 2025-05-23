import tailwindcss from "@tailwindcss/vite";
import type { ManifestOptions } from "vite-plugin-pwa";
import Manifest from "./public/manifest.json";

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
    "@nuxt/test-utils/module",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@vite-pwa/nuxt",
    "nuxt-svgo",
  ],

  pwa: {
    devOptions: {
      enabled: true,
    },
    manifest: Manifest as ManifestOptions,
    workbox: {
      navigateFallback: "/index.html",
      globPatterns: [
        "**/*.{js,css,html,png,jpg,jpeg,svg,webp,ttf,ico,webmanifest}",
      ],
      runtimeCaching: [
        {
          urlPattern:
            /^(?=.*_nuxt(?!\/(utils|services|tests|node_modules)\/)).*$/,
          handler: "CacheFirst",
          options: {
            cacheName: "nuxt-assets-cache",
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    quality: 100,
    formats: ["webp", "jpeg", "png"],
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

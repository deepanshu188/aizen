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
    "@pinia/nuxt",
    "@nuxt/test-utils/module",
    "@nuxt/icon",
    '@nuxt/fonts',
    '@vite-pwa/nuxt'
  ],

  pwa: {
    manifest: Manifest as ManifestOptions,
    registerType: "autoUpdate",
    workbox: {
      globPatterns: [
        "**/*.{js,css,html,png,jpg,jpeg,svg,webp,ttf,ico,webmanifest}"
      ],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\.iconify\.design/,
          handler: "CacheFirst",
          options: {
            cacheName: "iconify-cache",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          handler: "StaleWhileRevalidate",
          urlPattern: /^\/_nuxt\//,
          method: "GET",
          options: {
            cacheName: "nuxt-cache",
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
    server: {
      allowedHosts: ['rneef-103-216-142-2.a.free.pinggy.link'],
    }
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

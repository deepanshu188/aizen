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
    '@vite-pwa/nuxt',
    'nuxt-svgo'
  ],

  pwa: {
    devOptions: {
      enabled: true,
    },
    manifest: Manifest as ManifestOptions,
    workbox: {
      navigateFallback: "/index.html",
      globPatterns: [
        "**/*.{js,css,html,png,jpg,jpeg,svg,webp,ttf,ico,webmanifest}"
      ],
      runtimeCaching: [
        {
          urlPattern: /^(?=.*_nuxt(?!\/(utils|services|node_modules)\/)).*$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'nuxt-assets-cache',
            cacheableResponse: { statuses: [0, 200] }
          }
        },
        {
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'html-cache',
            cacheableResponse: { statuses: [0, 200] }
          }
        },
        {
          urlPattern: /^https:\/\/api\.iconify\.design/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'iconify-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30
            },
            cacheableResponse: { statuses: [0, 200] },
          }
        },
        {
          urlPattern: /^https:\/\/.*\/api\/v\d+\/site\??$/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'api-site-cache',
            cacheableResponse: { statuses: [0, 200] },
          }
        },
      ]
    }
    ,
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
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

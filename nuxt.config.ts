import tailwindcss from "@tailwindcss/vite";
import type { ManifestOptions } from "vite-plugin-pwa";
import Manifest from "./manifest.json";

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

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
      // Required in dev: the module only serves /manifest.webmanifest when this
      // is enabled. Precache warnings are suppressed because Vite serves assets
      // from memory, so glob patterns can't match files on disk.
      enabled: true,
      suppressWarnings: true,
    },
    manifest: Manifest as ManifestOptions,
    workbox: {
      // @vite-pwa/nuxt rewrites the precached index.html entry to "/", so the
      // navigation fallback must point there too. "/index.html" is not in the
      // precache manifest and makes Workbox throw a non-precached-url error.
      navigateFallback: "/",
      globPatterns: [
        "**/*.{js,css,html,png,jpg,jpeg,svg,webp,ttf,woff,woff2,ico}",
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

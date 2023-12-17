export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  nitro: {
    ignore: ['/*'],
  },
  modules: ['@nuxt/image', '@pinia/nuxt', '@vite-pwa/nuxt'],
  pwa: {
    manifest: {
      name: 'Aizen for Lemmy',
      short_name: 'Aizen',
      theme_color: '#fff',
      background_color: '#000',
    },
    client: {
      installPrompt: true,
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'StaleWhileRevalidate',
        },
      ],
    },
    devOptions: {
      enabled: true,
    },
  },
  image: {
    quality: 100,
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/services',
      pathPrefix: false,
    },
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});

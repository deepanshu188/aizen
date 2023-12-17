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
      theme_color: '#ffffff',
    },
    client: {
      installPrompt: true,
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

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  nitro: {
    ignore: ['/*'],
  },

  icon: {
    size: '22px',
  },

  modules: ['@nuxt/image', '@pinia/nuxt', '@nuxt/test-utils/module', '@nuxt/icon'],

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

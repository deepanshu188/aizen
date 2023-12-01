export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    '@nuxt/image',
    '@pinia/nuxt',
  ],
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
})

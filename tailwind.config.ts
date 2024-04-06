/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],

  daisyui: {
    themes: [
      {
        dark: {
          primary: '#3f00ff',

          secondary: '#ffffff',

          accent: '#30e500',

          neutral: '#000d0a',

          'base-100': '#191825',

          info: '#3d97ff',

          success: '#00ed94',

          warning: '#d98d00',

          error: '#ff4462',
        },
        light: {
          primary: '#1A1A1A',

          secondary: '#000000',

          accent: '#003bff',

          neutral: '#181d26',

          'base-100': '#fffdf1',

          info: '#048bff',

          success: '#2ca73d',

          warning: '#ff7200',

          error: '#fe004d',
        },
      },
    ],
  },
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  daisyui: {
    themes: [
      {
        dark: {

          "primary": "#3f00ff",

          "secondary": "#1f00ff",

          "accent": "#30e500",

          "neutral": "#000d0a",

          "base-100": "#262626",

          "info": "#3d97ff",

          "success": "#00ed94",

          "warning": "#d98d00",

          "error": "#fe004d",
        },
        light: {

          "primary": "#9A79D0",

          "secondary": "#ff5e00",

          "accent": "#003bff",

          "neutral": "#181d26",

          "base-100": "#fffdf1",

          "info": "#048bff",

          "success": "#2ca73d",

          "warning": "#ff7200",

          "error": "#ff4462",
        },
      }],
  },
}


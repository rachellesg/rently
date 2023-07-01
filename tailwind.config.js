
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    daisyui: {
      styled: true,
      themes: ["light", "dark", "cupcake"],
    },
  },
  plugins: [require("daisyui")],
}


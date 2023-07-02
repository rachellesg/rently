
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  daisyui: {
    styled: true,
    base: false,
    utils: true,
    logs: true,
    darkTheme: "cupcake",
    themes: ["light", "cupcake"],
  },
  plugins: [require("daisyui")],
}


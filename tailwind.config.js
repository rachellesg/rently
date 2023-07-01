
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
  daisyui: {
    styled: true, daisyui: {
      themes: [
        {
          mytheme: {
            "primary": "#17ea84",
            "secondary": "#8bd8ef",
            "accent": "#8daf0f",
            "neutral": "#2a222a",
            "base-100": "#f8f9fc",
            "info": "#5899da",
            "success": "#74e7c2",
            "warning": "#edae50",
            "error": "#f0759c",
          },
        },
      ],
    },
  },
  plugins: [require("daisyui")],
}


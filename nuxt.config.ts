// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  mode: "universal",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  tailwindcss: {
    cssPath: "~/assets/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: "first",
    viewer: true,
  },
});

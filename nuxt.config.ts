// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/global.css"],
  imports: {
    dirs: ["types", "stores"],
  },
  modules: ["@pinia/nuxt"],
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
  },
});

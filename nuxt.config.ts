// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {
    routeRules: {
      "/**": { isr: true }
    }
  },

  $development: {
    devtools: { enabled: true }
  },

  runtimeConfig: {
    // Keys internally defined

    // Keys exposed client-side too
    public: {
      apiBase: ""
    }
  },

  typescript: {
    typeCheck: true
  },

  css: ["./assets/scss/main.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_colors.scss" as *;'
        }
      }
    }
  },

  modules: ["@nuxt/eslint", "@nuxt/test-utils/module"]
});

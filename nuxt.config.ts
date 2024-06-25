// https://nuxt.com/docs/api/configuration/nuxt-config

import * as AntD from "ant-design-vue";
import { addComponent } from "@nuxt/kit";

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

  css: ["normalize.css"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/main.scss" as *;'
        }
      }
    }
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/test-utils/module",
    "@nuxtjs/device",
    "@nuxt/image",
    async function () {
      for (const key in AntD) {
        if (["version", "install"].includes(key)) continue;
        await addComponent({
          filePath: "ant-design-vue",
          name: `A${key}`,
          export: key
        });
      }
    }
  ]
});

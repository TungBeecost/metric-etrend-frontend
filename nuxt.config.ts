import * as AntD from "ant-design-vue";
import { addComponent } from "@nuxt/kit";

export default defineNuxtConfig({
    ssr: false, // Bật chế độ SSR

    app: {
      cdnURL: process.env.URL_CDN || 'https://ereport.vn/_nuxt',
      head: {
          title: "eReport - Kho báo cáo Ecommerce toàn diện",
          htmlAttrs: {
              lang: "vi",
          },
          meta: [
              { charset: "utf-8" },
              { name: "viewport", content: "width=device-width, initial-scale=1" },
              {
                  hid: "description",
                  name: "description",
                  content:
                      "eReport là Kho báo cáo thị trường Ecommerce toàn diện giúp Doanh nghiệp, Thương hiệu và Nhà bán tiết kiệm thời gian nghiên cứu thị trường, giảm thiểu rủi ro đầu tư với dữ liệu chính xác nhất.",
              },
              { name: "google-site-verification", content: "-A5h4Bx3cBpC9vnJxfRvxvegNFZgMorMQlE6M76uLbc" },
              { name: "zalo-platform-site-verification", content: "N8Qw0ApqOJbHzja6h_fi0bwDtIIo-mrwD3arc" },
          ],
          link: [
              {
                  rel: "icon",
                  href: "https://lh3.googleusercontent.com/pw/AP1GczPkZUEomYgWJzr7JaCALCuscVq41NLzjst1TQIhEKTwj8oFIe2X7zoaQO6M6utUHVgJVhkV0fzthEl9kKXnlx6Jx6eNmvsV7tdTo3ppWrjJldRefKHG5SvF7jKagtqc2LdyG1OBURFD781F1hllgJg=w52-h53-s-no-gm",
              },
              {
                  rel: "stylesheet",
                  href: "https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap",
              },
          ],
          script: [
              {
                  src: "https://accounts.google.com/gsi/client",
                  async: true,
                  defer: true,
              },
              {
                  src: "https://accounts.google.com/gsi/client",
              },
              {
                  hid: 'gtm',
                  children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-MLBXG49P');`,
                  type: 'text/javascript'
              }
          ],
          noscript: [
              {
                  children: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MLBXG49P"
                  height="0" width="0" style="display:none;visibility:hidden"></iframe>`
              }
          ],
      },
  },

  $production: {
      routeRules: {
          "/**": { ssr: true },
      },
  },

  $development: {
      devtools: { enabled: true },
  },

  runtimeConfig: {
      public: {
          gtagId: 'GTM-MLBXG49P',
          apiBase: process.env.API_ENDPOINT,
          URL_AUTH_SERVICE_API: process.env.URL_AUTH_SERVICE_API,
          API_ENDPOINT: process.env.API_ENDPOINT,
          BASE_URL: process.env.BASE_URL,
          MODE: process.env.MODE,
          SSR: process.env.SSR,
          gtm: {
              id: 'GTM-MLBXG49P',
          },
      },
      publicRuntimeConfig: {
          gtm: {
              id: 'GTM-MLBXG49P',
          },
      },
  },

  typescript: {
      typeCheck: true,
  },

  plugins: [
      "~/plugins/antd.ts",
      {
          src: "~/plugins/analytics.js",
          ssr: false,
      },
      "~/plugins/vue3-carousel.client.ts",
      "~/plugins/nuxt-gtm.js",
      "~/plugins/gtm-tracking.js",
      "~/plugins/vue-gtm.client.js",
  ],

  css: [
      "~/assets/reset.css",
      "~/assets/antd.css",
      "~/assets/variables.less",
      "normalize.css",
  ],

  vite: {
      css: {
          preprocessorOptions: {
              scss: {
                  additionalData: '@use "~/assets/scss/main.scss" as *;',
              },
          },
      },
  },

  components: {
      global: true,
      dirs: ['~/components'],
  },

  modules: [
      "@nuxt/eslint",
      "@nuxt/test-utils/module",
      "@nuxtjs/device",
      "@nuxt/image",
      "vue3-carousel-nuxt",
      '@zadigetvoltaire/nuxt-gtm',
      '@nuxtjs/sitemap',
      ["nuxt-highcharts", {}],

      "nuxt-svgo",
      "@ant-design-vue/nuxt",
      "@pinia/nuxt",
      "nuxt-gtag",
  ],

  antd: {
      extractStyle: true,
  },

  gtm: {
      id: 'GTM-MLBXG49P',
  },

  site: {
      url: 'https://ereport.staging.muadee.vn',
      name: 'eReport',
  },

  compatibilityDate: "2024-09-22",
});
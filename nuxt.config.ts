export default defineNuxtConfig({
    ssr: process.env.SSR === 'true', // Bật chế độ SSR\
    app: {
        buildAssetsDir: '/ereport_nuxt/',
        baseURL:  process.env.BASE_PATH || '/',
        head: {
            // title: "eReport - Kho báo cáo Ecommerce toàn diện",
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
                {
                    hid: "og:image",
                    property: "og:image",
                    content: "https://lh3.googleusercontent.com/pw/AP1GczMTZp0lf_VW7W_Y6n3qg602m-LlqfpCIeVX_i4D3pnqT6FiloK5hY86XfTsqVHd4xRRs9tSKppP6FZdEPWO_V8D_UEsfj8KEnChoiU7zyiwDlHzZaTeAePmGxcqzG98qDJ9bahok5MhwtDzp3EKTiI_=w1600-h900-s-no-gm?authuser=0",
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
                  })(window,document,'script','dataLayer','GTM-522F9NZ');`,
                    type: 'text/javascript'
                }
            ],
            noscript: [
                {
                    children: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-522F9NZ"
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
            gtagId: 'GTM-522F9NZ',
            apiBase: process.env.API_ENDPOINT,
            API_ENDPOINT: process.env.API_ENDPOINT,
            URL_AUTH_SERVICE_API: process.env.URL_AUTH_SERVICE_API,
            BASE_URL: process.env.BASE_URL,
            MODE: process.env.MODE,
            SSR: process.env.SSR,
            gtm: {
                id: 'GTM-522F9NZ',
            },
        },
        publicRuntimeConfig: {
            gtm: {
                id: 'GTM-522F9NZ',
            },
        },
    },

    plugins: [
        "~/plugins/antd.ts",
        "~/plugins/vue3-carousel.client.ts",
        {
            src: "~/plugins/analytics.js",
            ssr: false,
        },
        {
            src:   "~/plugins/gtm-tracking.js",
            ssr: true,
        },
        {
            src:  "~/plugins/nuxt-gtm.js",
            ssr: true,
        },
    ],

    css: [
        "~/assets/reset.css",
        "~/assets/antd.css",
        "~/assets/variables.less",
        // "normalize.css",
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
        "@nuxt/eslint",//use
        "@nuxt/test-utils/module",
        "@nuxtjs/device",
        "@nuxt/image",//use
        "vue3-carousel-nuxt",
        '@zadigetvoltaire/nuxt-gtm',
        ["nuxt-highcharts", {}],
        "nuxt-svgo",
        "@ant-design-vue", //use
        "@pinia/nuxt",
        "nuxt-gtag",
    ],

    antd: {
        extractStyle: true,
    },

    gtm: {
        id: 'GTM-522F9NZ',
    },

    // site: {
    //     url: 'https://ereport.staging.muadee.vn',
    //     name: 'eReport',
    // },
    compatibilityDate: "2024-09-22",
    build: {
        transpile: ['tslib']
    }
});

export default defineNuxtConfig({
    ssr: true, // Bật chế độ SSR\
    app: {
        buildAssetsDir: '/ereport_nuxt/',
        baseURL: process.env.BASE_PATH || '/',
        head: {
            title: "eReport - Kho báo cáo Ecommerce toàn diện",
            htmlAttrs: {
                lang: "vi",
            },
            meta: [
                {charset: "utf-8"},
                {name: "viewport", content: "width=device-width, initial-scale=1"},
                {
                    hid: "description",
                    key: "description",
                    name: "description",
                    content:
                        "eReport là Kho báo cáo thị trường Ecommerce toàn diện giúp Doanh nghiệp, Thương hiệu và Nhà bán tiết kiệm thời gian nghiên cứu thị trường, giảm thiểu rủi ro đầu tư với dữ liệu chính xác nhất.",
                },
                {
                    hid: "og:image",
                    key: "og:image",
                    property: "og:image",
                    content: "https://lh3.googleusercontent.com/pw/AP1GczMTZp0lf_VW7W_Y6n3qg602m-LlqfpCIeVX_i4D3pnqT6FiloK5hY86XfTsqVHd4xRRs9tSKppP6FZdEPWO_V8D_UEsfj8KEnChoiU7zyiwDlHzZaTeAePmGxcqzG98qDJ9bahok5MhwtDzp3EKTiI_=w1600-h900-s-no-gm?authuser=0",
                },
                {name: "google-site-verification", content: "-A5h4Bx3cBpC9vnJxfRvxvegNFZgMorMQlE6M76uLbc"},
                {name: "zalo-platform-site-verification", content: "N8Qw0ApqOJbHzja6h_fi0bwDtIIo-mrwD3arc"},
            ],
            link: [
                {
                    rel: "preconnect",
                    href: "https://lh3.googleusercontent.com/pw/AM-JKLVKUzx1GjapZkkkECUXYDk4Vaiguh_oem4OaXJ4pr5xICAgjbRPHZ7QXO4uZ4iHJc97ZnLoTW6sAjkjJr--D14mkA2lHsr4SmVX1d0vshEnjan0WvlOVEoLLrqnpGB_7ypmpyfcKXgm4X6tvRRUO-H_=w52",
                },
                {
                    rel: "preconnect",
                    href: "https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap",
                },
            ],
            script: [
                {
                    src: "https://www.googletagmanager.com/gtag/js?id=G-1KSWMFJGH1",
                    async: true,
                },
                {
                    hid: "gtag",
                    innerHTML: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-1KSWMFJGH1');
                      `,
                    type: "text/javascript",
                },
                {
                    src: "https://accounts.google.com/gsi/client",
                    defer: true,
                    async: true,
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
            "/**": {ssr: true},
        },
    },

    $development: {
        devtools: {enabled: true},
    },

    runtimeConfig: {
        public: {
            gtagId: 'G-1KSWMFJGH1',
            apiBase: process.env.API_ENDPOINT,
            API_ENDPOINT: process.env.API_ENDPOINT,
            URL_AUTH_SERVICE_API: process.env.URL_AUTH_SERVICE_API,
            URL_CRM_BACKEND_API: process.env.URL_CRM_BACKEND_API,
            BASE_URL: process.env.BASE_URL,
            BASE_PATH: process.env.BASE_PATH || '/',
            MODE: process.env.MODE,
            SSR: process.env.SSR,
            gtm: {
                id: 'GTM-522F9NZ',
            },
            posthogPublicKey: process.env.POSTHOG_PUBLIC_KEY,
            posthogHost: process.env.POSTHOG_HOST,
            samplePdfUrl: process.env.SAMPLE_PDF_URL,
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
    ],

    css: [
        "~/assets/reset.css",
        "~/assets/antd.css",
        "~/assets/variables.less",
        "~/assets/style.css",
        // "~/assets/tailwind.less",
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

    modules: ['@nuxt/ui', //use
    "@nuxt/eslint", "@nuxt/test-utils/module", "@nuxtjs/device", //use
    "@nuxt/image", "vue3-carousel-nuxt", ["nuxt-highcharts", {}], "nuxt-svgo", //use
    "@ant-design-vue", // "nuxt-gtag",
    "@pinia/nuxt", "@nuxt/scripts"],

    // image: {
    //   provider: 'ipx',
    //   format: ['webp'],
    //   formats: {
    //     webp: {
    //       quality: 80
    //     }
    //   },
    //   domains: [
    //     'cf.shopee.vn', 
    //     'vn-live-01.slatic.net', 
    //     'storage.googleapis.com', 
    //     'filebroker-cdn.lazada.vn', 
    //     'lh3.googleusercontent.com',
    //     'p16-oec-va.ibyteimg.com',
    //   ]
    // },
    //
    antd: {
        extractStyle: true,
    },

    colorMode: {
        preference: 'light'
    },
    // site: {
    //     url: 'https://ereport.staging.muadee.vn',
    //     name: 'eReport',
    // },
    compatibilityDate: "2024-09-22",
    build: {
        transpile: ['tslib'],
    },

    nitro: {
        compressPublicAssets: true,
    },
});

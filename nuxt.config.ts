import * as AntD from "ant-design-vue";
import { addComponent } from "@nuxt/kit";

export default defineNuxtConfig({
    ssr: false,
    app: {
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
                {
                    hid: "og:image",
                    property: "og:image",
                    content:
                        "https://lh3.googleusercontent.com/pw/AJFCJaUn5ypN4E-22nDvTNWPlPwnJwI806mq9CkQ7S_GqMWLzgGGJdegi3w1jIxImAj6hgzgQGdkF9BsNXvvOMAmpX3umQmuOAsG3k_4U3WwIQBIlH_ymqVTpu1DkvESjZeqrC4ac6KnMgF4Wy5BSi1NOY8u=w1920-h1080-no",
                },
                { name: "google-site-verification", content: "-A5h4Bx3cBpC9vnJxfRvxvegNFZgMorMQlE6M76uLbc" },
            ],
            link: [
                {
                    rel: "icon",
                    href: "https://lh3.googleusercontent.com/pw/AM-JKLVKUzx1GjapZkkkECUXYDk4Vaiguh_oem4OaXJ4pr5xICAgjbRPHZ7QXO4uZ4iHJc97ZnLoTW6sAjkjJr--D14mkA2lHsr4SmVX1d0vshEnjan0WvlOVEoLLrqnpGB_7ypmpyfcKXgm4X6tvRRUO-H_=w192-h164-no",
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
            apiBase: process.env.API_ENDPOINT,
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
                id: process.env.GTM_ID,
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
        ["nuxt-highcharts", {}],
        async function () {
            for (const key in AntD) {
                if (["version", "install"].includes(key)) continue;
                await addComponent({
                    filePath: "ant-design-vue",
                    name: `A${key}`,
                    export: key,
                });
            }
        },
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
});
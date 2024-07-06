// https://nuxt.com/docs/api/configuration/nuxt-config

import * as AntD from "ant-design-vue";
import {addComponent} from "@nuxt/kit";


export default defineNuxtConfig({
    app: {

        head: {
            title: "Metric - Nền tảng Số liệu E-commerce",
            htmlAttrs: {
                lang: "vi",
            },
            meta: [
                {charset: "utf-8"},
                {name: "viewport", content: "width=device-width, initial-scale=1"},
                {
                    hid: "description",
                    name: "description",
                    content:
                        "Metric là Nền tảng Số liệu Thương mại Điện tử dành cho Doanh nghiệp, Thương hiệu và Nhà bán. Metric tạo ra báo cáo phân tích dữ liệu thị trường chỉ trong 30 giây, giúp việc thực thi và ra quyết định kinh doanh nhanh hơn 5 lần",
                },
                //  og:image
                {
                    hid: "og:image",
                    property: "og:image",
                    content: "https://lh3.googleusercontent.com/pw/AJFCJaUn5ypN4E-22nDvTNWPlPwnJwI806mq9CkQ7S_GqMWLzgGGJdegi3w1jIxImAj6hgzgQGdkF9BsNXvvOMAmpX3umQmuOAsG3k_4U3WwIQBIlH_ymqVTpu1DkvESjZeqrC4ac6KnMgF4Wy5BSi1NOY8u=w1920-h1080-no"

                },

            ],
            link: [
                {
                    rel: "icon",
                    href: "https://lh3.googleusercontent.com/pw/AM-JKLVKUzx1GjapZkkkECUXYDk4Vaiguh_oem4OaXJ4pr5xICAgjbRPHZ7QXO4uZ4iHJc97ZnLoTW6sAjkjJr--D14mkA2lHsr4SmVX1d0vshEnjan0WvlOVEoLLrqnpGB_7ypmpyfcKXgm4X6tvRRUO-H_=w192-h164-no",
                },
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap",
                },
            ],
            // __dangerouslyDisableSanitizers: ["script"],
            script: [
                {
                    src: "https://www.googletagmanager.com/gtag/js?id=G-GC4KKGMFXN",
                    async: true,
                },
                {
                    hid: "gtag",
                    innerHTML: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
            
                        gtag('config', 'G-GC4KKGMFXN');
                    `,
                    type: "text/javascript",
                    // charset: "utf-8",
                },
                {
                    src: "https://accounts.google.com/gsi/client",
                }
            ],
        },
    },
    $production: {
        routeRules: {
            "/**": {isr: true}
        }
    },
    $development: {
        devtools: {enabled: true}
    },
    runtimeConfig: {
        // Keys internally defined

        // Keys exposed client-side too
        public: {
            // apiBase: "https://api-ereport.staging.muadee.vn"
            apiBase: "https://api-ereport.staging.muadee.vn"
        }
    },
    typescript: {
        typeCheck: true
    },
    plugins: ["~/plugins/antd.js","~/plugins/vue3-carousel.client.js"],
    css: [
        "~/assets/reset.css",
        "~/assets/antd.css",
        "~/assets/variables.less",
        "normalize.css"
    ],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/scss/main.scss" as *;'
                }
            }
        },
    },
    components: {
        global: true,
        dirs: ['~/components']
    },
    modules: [
        "@nuxt/eslint",
        "@nuxt/test-utils/module",
        "@nuxtjs/device",
        "@nuxt/image",
        "vue3-carousel-nuxt",
        ["nuxt-highcharts", {}],
        async function () {
            for (const key in AntD) {
                if (["version", "install"].includes(key)) continue;
                await addComponent({
                    filePath: "ant-design-vue",
                    name: `A${key}`,
                    export: key
                });
            }
        },
        "nuxt-svgo",
        "@ant-design-vue/nuxt",
        "@pinia/nuxt",
        "nuxt-gtag"
    ],
    antd: {
        extractStyle: true
    }
});
import { defineNuxtPlugin } from '#app'
import { createGtm } from '@gtm-support/vue-gtm'

export default defineNuxtPlugin(nuxtApp => {
    const gtmConfig = {
        id: 'GTM-MLBXG49P',
        queryParams: {
            gtm_auth: process.env.GTM_AUTH,
            gtm_preview: process.env.GTM_PREVIEW,
            gtm_cookies_win: 'x',
        },
        source: 'https://www.googletagmanager.com/gtm.js',
        defer: false,
        compatibility: false,
        nonce: '2726c7f26c',
        enabled: true,
        debug: true,
        loadScript: true,
        vueRouter: nuxtApp.$router,
    }

    nuxtApp.vueApp.use(createGtm(gtmConfig))
})

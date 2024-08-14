import { createGtm } from '@gtm-support/vue-gtm'

export default  defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(createGtm({
        id: 'GTM-MLBXG49P',
        defer: false,
        compatibility: false,
        // nonce: '2726c7f26c',
        enabled: true,
        debug: true,
        loadScript: true,
        vueRouter: useRouter(),
        trackOnNextTick: false,
    }))
})
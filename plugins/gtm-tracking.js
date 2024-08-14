// plugins/gtm-tracking.js
import { defineNuxtPlugin } from '#app'
import { useGtm } from '~/composables/useGTM'
import { useRouter } from 'vue-router'

export default defineNuxtPlugin(() => {
    const gtm = useGtm()
    const router = useRouter()

    if (gtm) {
        router.afterEach((to, from) => {
            // Track page view event with page path
            gtm.pushEvent('page_view', { page: to.path })
        })
    }
})

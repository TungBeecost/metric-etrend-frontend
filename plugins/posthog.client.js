import { defineNuxtPlugin } from '#app'
import posthog from 'posthog-js'
export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig();
  const posthogClient = posthog.init(runtimeConfig.public.posthogPublicKey, {
    api_host: runtimeConfig.public.posthogHost || 'https://us.i.posthog.com',
    capture_pageview: false, // we add manual pageview capturing below
    loaded: (posthog) => {
      if (import.meta.env.MODE === 'development') posthog.debug();
    },
    // Disable automatic sending of events
    send_immediately: false,
    flush_at: 1,
    flush_interval: 0,
  })

  // Make sure that pageviews are captured with each route change
  const router = useRouter();
  router.afterEach((to, from) => {
    nextTick(() => {
      if (from.fullPath !== to.fullPath) {
        posthog.capture('$pageleave', {
          current_url: from.fullPath,
        })
      }

      posthog.capture('$pageview', {
        current_url: to.fullPath,
      })
    })
  })

  // Function to force send events
  const forceSendEvents = () => {
    return new Promise((resolve) => {
      posthog.capture('$pageclose', {}, {
        transport: 'sendBeacon',
        send_immediately: true
      })
      // Force flush any queued events
      posthog._send_request(
        posthog.config.api_host + '/capture/',
        { data: JSON.stringify(posthog._compress_data(posthog._queued_events)) },
        { transport: 'sendBeacon' }
      )
      resolve()
    })
  }

  // Add beforeunload event listener
  if (process.client) {
    window.addEventListener('beforeunload', async (event) => {
      // Ensure events are sent before the page unloads
      await forceSendEvents()
    })
  }

  nuxtApp.provide('posthog', posthogClient)
})

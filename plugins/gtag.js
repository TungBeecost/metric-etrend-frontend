export default defineNuxtPlugin(nuxtApp => {
  const gtagId = useRuntimeConfig().public.gtagId;
  const { proxy } = useScriptGoogleAnalytics({
    id: gtagId,
  })

  const trackEvent = (eventName, params) => {
    proxy.gtag('event', eventName, params);
  };
  nuxtApp.provide('trackEvent', trackEvent);
  nuxtApp.hook('page:finish', (to, from) => {
    proxy.gtag('config', gtagId, {
      page_path: to.fullPath
    })
  });
  nuxtApp.provide('setUserId', (userId) => {
    if (window.gtag && userId) {
        console.log('Setting user_id in Google Analytics:', userId);
        // gtag('set', 'user_id', userId);
      proxy.gtag('set', 'user_id', userId);
    } else {
        console.warn('user_id or gtag not available');
    }
  });
});

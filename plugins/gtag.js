// plugins/gtag.js
export default defineNuxtPlugin(nuxtApp => {
    // Lấy Google Analytics ID từ runtimeConfig
    const gtagId = useRuntimeConfig().public.gtagId;

    if (process.client && gtagId) {
        // Nếu có gtagId, cấu hình Google Analytics
        const gtag = window.gtag || function() {};

        // Cấu hình Google Analytics ID
        gtag('config', gtagId, { send_page_view: true });

        // Theo dõi sự kiện pageview mỗi khi tải trang
        nuxtApp.hook('page:finish', (to, from) => {
            gtag('config', gtagId, {
                page_path: to.fullPath
            });
        });

        // Cung cấp trackEvent toàn cục để theo dõi sự kiện từ các nơi khác trong ứng dụng
        const trackEvent = (eventName, params) => {
            gtag('event', eventName, params);
        };

        // Cung cấp trackEvent vào global context của Nuxt
        nuxtApp.provide('trackEvent', trackEvent);
    }
});

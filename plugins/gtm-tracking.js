export default defineNuxtPlugin(() => {
    if (import.meta.client) {
        const router = useRouter();  // Use Nuxt's `useRouter` hook to access the router
        router.afterEach((to, from) => {
            if (window && window.dataLayer) {
                window.dataLayer.push({
                    event: 'Pageview',
                    page: {
                        path: to.fullPath,
                        name: to.name,
                        title: document.title,
                    },
                });
            }
        });
    } else {
        console.error('Not running on the client side');
    }
});

export default defineNuxtPlugin(() => {
  debugger
    if (import.meta.client) {
        const router = useRouter();  // Use Nuxt's `useRouter` hook to access the router
        router.afterEach((to, from) => {
      debugger
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

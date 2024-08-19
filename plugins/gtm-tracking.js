export default ({ app }) => {
    if (import.meta.client) {
        if (app && app.router) {
            app.router.afterEach((to, from) => {
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
            console.error('Router is not defined');
        }
    } else {
        console.error('Not running on the client side');
    }
};
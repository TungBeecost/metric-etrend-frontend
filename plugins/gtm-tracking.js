export default ({ app }) => {
    app.router.afterEach((to, from) => {
        if (window && window.dataLayer) {
            window.dataLayer.push({
                event: 'pageview',
                page: {
                    path: to.fullPath,
                    name: to.name,
                    title: document.title,
                },
            });
        }
    });
};
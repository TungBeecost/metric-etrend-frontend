export const goToUrl = (url, mode = "_self") => {
    if (url?.length > 0) {
        window.open(url, mode);
    }
};
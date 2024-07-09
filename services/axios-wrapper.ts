import axios from "axios";

axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent

        // add Auth header
        // const accessToken = useCookie("access-token");
        const accessToken = localStorage.getItem("access_token");
        // const accessToken = 'K7YrXMU3bcibX-TmdGs_dVF1xYqau-zvtVDTmpOlmUM'
        // config.headers.Authorization = `Bearer ${accessToken.value || 'K7YrXMU3bcibX-TmdGs_dVF1xYqau-zvtVDTmpOlmUM'}`;
        config.headers.Authorization = `Bearer ${accessToken}`;

        return config;
    },
    function (err) {
        // Do something with request error
        return Promise.reject(err.response?.data?.detail || err.message || err);
    }
);

export default axios;

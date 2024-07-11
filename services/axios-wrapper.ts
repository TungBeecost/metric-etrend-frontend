import axios from "axios";

const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

request.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            return config;
        }
        config.headers.Authorization = `Bearer ${accessToken}`;

        return config;
    },
    function (err) {
        return Promise.reject(err.response?.data?.detail || err.message || err);
    }
);


export default request;

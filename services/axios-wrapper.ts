import axios from "axios";
import {getIndexedDB} from "~/helpers/IndexedDBHelper";

const request = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

request.interceptors.request.use(
    async function (config) {
        const accessToken = await getIndexedDB("access_token");
        const visitorId = await getIndexedDB("__visitor");

        if (accessToken) {
            config.headers.Authorization = `${accessToken}`;
        }
        if (visitorId) {
            config.headers.VisitorId = visitorId.visitor_id;
        }

        return config;
    },
    function (err) {
        return Promise.reject(err.response?.data?.detail || err.message || err);
    }
);

export default request;

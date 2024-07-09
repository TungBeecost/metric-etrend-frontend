import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    // add Auth header
    const accessToken = useCookie("access-token");
    config.headers.Authorization = `Bearer ${accessToken.value || 'K7YrXMU3bcibX-TmdGs_dVF1xYqau-zvtVDTmpOlmUM'}`;

    return config;
  },
  function (err) {
    // Do something with request error
    return Promise.reject(err.response?.data?.detail || err.message || err);
  }
);

export default axios;

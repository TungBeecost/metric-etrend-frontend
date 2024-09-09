import axios from 'axios';
// const API_ENDPOINT = 'http://localhost:8000';
const config = useRuntimeConfig();
const accessToken = typeof window !== 'undefined' ? localStorage.getItem("access_token") : '';


export const getListUserStaffOptions = async () => {
    try {
        const response = await axios.get(`${config.public.API_ENDPOINT}/api/user/staff_options`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Fetch User Staff Options, status=${e.response?.status}, message=${e.message}`);
        return [];
    }
};

export const getListCCOptions = async () => {
    try {
        const {$api} = useNuxtApp();
        const response = await $api.user.getCCOptions();
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Fetch CC Options, status=${e.response?.status}, message=${e.message}`)
        return [];
    }
}
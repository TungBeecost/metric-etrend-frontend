import axios from 'axios';
import {getIndexedDB} from "~/helpers/IndexedDBHelper.js";
const config = useRuntimeConfig();
// const accessToken = typeof window !== 'undefined' ? localStorage.getItem("access_token") : '';
export const getListUserStaffOptions = async () => {
    const accessToken = await getIndexedDB("access_token");
    const visitorId = await getIndexedDB("__visitor");
    try {
        const response = await axios.get(`${config.public.API_ENDPOINT}/api/user/staff_options`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `${accessToken}`,
                'Visitorid': visitorId.visitor_id,
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Fetch User Staff Options, status=${e.response?.status}, message=${e.message}`);
        return [];
    }
};

export const getListCCOptions = async () => {
    const accessToken = await getIndexedDB("access_token");
    const visitorId = await getIndexedDB("__visitor");
    try {
        const response = await axios.get(`${config.public.API_ENDPOINT}/api/user/user/cc_options`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `${accessToken}`,
                'Visitorid': visitorId.visitor_id,
            }
        });
        return response?.data;
    } catch (e) {
        console.error(`[ERROR] Fetch CC Options, status=${e.response?.status}, message=${e.message}`);
        return [];
    }
};
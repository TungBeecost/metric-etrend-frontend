import {USER_ENDPOINTS} from "~/constant/endpoints";
import axios from "./axios-wrapper";
import {getIndexedDB, setIndexedDB} from "~/helpers/IndexedDBHelper";

interface ProfileRes {
    id: number;
    email: string;
    display_name: string;
    first_name: string;
    last_name: string;
    avatar: string;
    list_personal_discount: any[];
    current_plan: CurrentPlan;
}

interface CurrentPlan {
    plan_id: number;
    plan_name: string;
    plan_code: string;
    remain_claim: number;
    remain_claim_pdf: number;
}

interface ProfileMetricRes {
    platform_id: number;
    platform_user_id: string;
    platform_user_email: string;
    max_query_count: number | null;
    end_query_time: string;
    inactive_vouchers: any[];
    remain_free_search_count: number;
    remain_free_search_count_per_week: number;
    remain_free_search_count_per_month: number | null;
    remain_free_search_count_all_time: number;
    remain_product_download_count_per_week: number | null;
    remain_shop_download_count_per_week: number | null;
    is_new_user: boolean;
    metadata: {
        histories: {
            plan_code: string;
            archived_at: string;
            remaining_quota: number;
            remaining_download_rows: number;
        }[];
        plan_code: string;
        remaining_quota: number;
        remaining_download_rows: number;
    };
}

interface ProfileMetricAuthRes {
    id: number;
    email: string;
    username: string | null;
    first_name: string;
    last_name: string;
    roles: string[];
    first_login: string;
    last_login: string;
    end_query_time: string;
    link_emails: string[];
    referral_code: string;
    url_thumbnail: string;
    maximum_devices: number;
}



export const fetchUserProfile = async (headers: object) => {
    try {
        const response = await axios.get(useBEEndpoint(USER_ENDPOINTS.profile.endpoint), {
            headers
        });
        const result = response.data as ProfileRes;

        if (!result?.id) {
            return;
        }

        return result;
    } catch (error: any) {
        console.error("fetchUserProfile error: ", error);

        const statusCode = error.response?.status;
        console.log("Error: ", statusCode, error);
        if (statusCode === 401) {
            await setIndexedDB('access_token', '');
            await setIndexedDB('__visitor', '');
        }
        return {}
    }
};

export const fetchUserMetricProfile = async (headers: object): Promise<ProfileMetricRes | {}> => {
    try {
        const accessToken = await getIndexedDB("access_token");
        const modifiedHeaders = {
            ...headers,
            Token: `${accessToken}`
        };
        const response = await axios.get('https://apiv4.metric.vn/market/user/paid/me', {
            headers: modifiedHeaders
        });
        const result = response.data as ProfileMetricRes;

        // if (!result?.platform_id) {
        //     return {};
        // }

        return result;
    } catch (error: any) {
        console.error("fetchUserProfile error: ", error);

        const statusCode = error.response?.status;
        console.log("Error: ", statusCode, error);
        if (statusCode === 401) {
            await setIndexedDB('access_token', '');
            await setIndexedDB('__visitor', '');
        }
        return {};
    }
};

export const fetchUserMetricProfileAuth = async (headers: object): Promise<ProfileMetricAuthRes | {}> => {
    try {
        const accessToken = await getIndexedDB("access_token");
        const modifiedHeaders = {
            ...headers,
            Token: `${accessToken}`
        };
        const response = await axios.get('https://apiv4.metric.vn/market/me', {
            headers: modifiedHeaders
        });
        const result = response.data as ProfileMetricAuthRes;

        // if (!result?.id) {
        //     return {};
        // }

        return result;
    } catch (error: any) {
        console.error("fetchUserProfile error: ", error);

        const statusCode = error.response?.status;
        console.log("Error: ", statusCode, error);
        if (statusCode === 401) {
            await setIndexedDB('access_token', '');
            await setIndexedDB('__visitor', '');
        }
        return {};
    }
}

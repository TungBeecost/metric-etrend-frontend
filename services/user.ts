import {USER_ENDPOINTS} from "~/constant/endpoints";
import axios from "./axios-wrapper";
import {setIndexedDB} from "~/helpers/IndexedDBHelper";

interface ProfileRes {
    id: number;
    email: string;
    display_name: string;
    first_name: string;
    last_name: string;
    avatar: string;
    current_plan: CurrentPlan;
}

interface CurrentPlan {
    plan_id: number;
    plan_name: string;
    plan_code: string;
    remain_claim: number;
    remain_claim_pdf: number;
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
    } catch (error) {
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
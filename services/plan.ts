import { PLAN_ENDPOINTS } from "~/constant/endpoints";
import axios from "./axios-wrapper";
import type { SearchReportPayload, SearchReportRes } from "~/services/ticket";

export const getPlan = async (planCode: any) => {
    try {
        const response = await axios.get(useBEEndpoint(PLAN_ENDPOINTS.planInfo.endpoint), {
            params: {
                plan_code: planCode
            }
        });
        return response.data.plan_info; // Return the plan_info object
    } catch (error) {
        console.error("getPlan error: ", error);
        return null;
    }
};
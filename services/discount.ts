import { DISCOUNT_ENDPOINTS } from "~/constant/endpoints";
import axios from "./axios-wrapper";

export const getVoucherInfo = async (code: string) => {
    try {
        const response = await axios.get(`${useBEEndpoint(DISCOUNT_ENDPOINTS.discountInfo.endpoint)}?code=${code}`, {
            headers: {
                'accept': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error getting voucher info:", error);
        return null;
    }
};
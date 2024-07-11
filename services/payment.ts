import {PAYMENT_ENDPOINTS} from "~/constant/endpoints";
import axios from "./axios-wrapper";

export const createTransaction = async (paymentMethod: string, itemCode: string, redirectUrl: string) => {
    try {
        const response = await axios.post(`${useBEEndpoint(PAYMENT_ENDPOINTS.payment.endpoint)}?payment_method=${paymentMethod}&item_code=${itemCode}&redirect_url=${redirectUrl}`, {}, {
            headers: {
                'accept': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error("createTransaction error: ", error);
        return null;
    }
};

import {createTransaction} from "~/services/payment";

export default function usePayment() {
    const createPaymentTransaction = async (paymentMethod: string, itemCode: string, redirectUrl: string) => {
        try {
            return await createTransaction(paymentMethod, itemCode, redirectUrl);
        } catch (error) {
            console.error("createPaymentTransaction error: ", error);
            return null;
        }
    };

    return { createPaymentTransaction };
}

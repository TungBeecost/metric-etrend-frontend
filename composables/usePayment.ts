import {checkTransactionStatus, createTransaction} from "~/services/payment";

export default function usePayment() {
    const createPaymentTransaction = async (paymentMethod: string, itemCode: string, redirectUrl: string) => {
        try {
            return await createTransaction(paymentMethod, itemCode, redirectUrl);
        } catch (error) {
            console.error("createPaymentTransaction error: ", error);
            return null;
        }
    };

    const verifyTransaction = async (transactionId: string) => {
        try {
            return await checkTransactionStatus(transactionId);
        } catch (error) {
            console.error("verifyTransaction error: ", error);
            return { message: "Failed to verify transaction status", code: "VERIFY_TRANSACTION_ERROR" };
        }
    };


    return { createPaymentTransaction, verifyTransaction };
}

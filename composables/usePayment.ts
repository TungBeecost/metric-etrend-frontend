import {checkTransactionStatus, createTransaction, sendLeadInformation} from "~/services/payment";

export default function usePayment() {
    const createPaymentTransaction = async (paymentMethod: string, itemCode: string, redirectUrl: string, totalPrice: string, discountCode?: string)=> {
        try {
            return await createTransaction(paymentMethod, itemCode, redirectUrl, totalPrice, discountCode);
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

    const submitLeadInformation = async (name: string, email: string, phone: string, nameCompany: string, transactionId: string) => {
        try {
            return await sendLeadInformation(name, email, phone, nameCompany, transactionId);
        } catch (error) {
            console.error("submitLeadInformation error: ", error);
            return { message: "Failed to submit lead information", code: "SUBMIT_LEAD_INFORMATION_ERROR" };
        }
    };

    return { createPaymentTransaction, verifyTransaction, submitLeadInformation };
}
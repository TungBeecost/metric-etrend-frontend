import {checkTransactionStatus, createTransaction, createTransactionPdf, sendLeadInformation} from "~/services/payment";

export default function usePayment() {
    const createPaymentTransaction = async (paymentMethod: string, itemCode: string, redirectUrl: string, totalPrice: string, discountCode: string | null,  name: string | null, phone: string | null, company: string | null, tax_code: string | null, receive_email: string | null, address: string | null) => {
        try {
            return await createTransaction(paymentMethod, itemCode, redirectUrl, totalPrice, discountCode, name, phone, company, tax_code, receive_email, address);
        } catch (error) {
            console.error("createPaymentTransaction error: ", error);
            return null;
        }
    };

    const createPaymentTransactionPdf = async (paymentMethod: string, report_id: string, redirectUrl: string, totalPrice: string, discountCode: string | null, name: string | null, phone: string | null, company: string | null, tax_code: string | null, receive_email: string | null, address: string | null) => {
        try {
            return await createTransactionPdf(paymentMethod, report_id, redirectUrl, totalPrice, discountCode, name, phone, company, tax_code, receive_email, address);
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

    return { createPaymentTransaction, verifyTransaction, submitLeadInformation, createPaymentTransactionPdf };
}
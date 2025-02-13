import {
    checkTransactionStatus,
    createTransaction,
    createTransactionPdf,
    sendLeadInformation,
    createTransactionGuest,
    createTransactionPdfGuest, getInfoTransactionPayment
} from "~/services/payment";

export default function usePayment() {
    const createPaymentTransaction = async (paymentMethod: string, itemCode: string, redirectUrl: string, discountCode: string | null,  name: string | null, phone: string | null, company: string | null, tax_code: string | null, receive_email: string | null, address: string | null) => {
        try {
            return await createTransaction(paymentMethod, itemCode, redirectUrl, discountCode, name, phone, company, tax_code, receive_email, address);
        } catch (error) {
            console.error("createPaymentTransaction error: ", error);
            return null;
        }
    };

    const createPaymentTransactionGuest  = async (paymentMethod: string, itemCode: string, redirectUrl: string, discountCode: string | null,  name: string | null, phone: string | null, emailAccount: string | null,  company: string | null, tax_code: string | null, receive_email: string | null, address: string | null) => {
        try {
            return await createTransactionGuest(paymentMethod, itemCode, redirectUrl, discountCode, name, phone, emailAccount, company, tax_code, receive_email, address);
        } catch (error) {
            console.error("createPaymentTransaction error: ", error);
            return error;
        }
    };

    const createPaymentTransactionPdf = async (
      paymentMethod: string, report_id: string, 
      redirectUrl: string, discountCode: string | null, 
      reportLink: string, name: string | null, 
      phone: string | null, company: string | null, 
      tax_code: string | null, receive_email: string | null, 
      address: string | null,
      startDate: string | null,
      endDate: string | null
    ) => {
        try {
            return await createTransactionPdf(
              paymentMethod, report_id, redirectUrl, 
              discountCode, reportLink, name, phone, 
              company, tax_code, receive_email, address,
              startDate, endDate
            );
        } catch (error) {
            console.error("createPaymentTransaction error: ", error);
            return null;
        }
    };

    const createPaymentTransactionPdfGuest = async (paymentMethod: string, report_id: string, redirectUrl: string, totalPrice: string, discountCode: string | null, reportLink: string, name: string | null, phone: string | null, emailAccount: string | null, company: string | null, tax_code: string | null, receive_email: string | null, address: string | null) => {
        try {
            return await createTransactionPdfGuest(paymentMethod, report_id, redirectUrl, totalPrice, discountCode, reportLink, name, phone, emailAccount, company, tax_code, receive_email, address);
        } catch (error) {
            console.error("createPaymentTransaction error: ", error);
            return null;
        }
    }

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

    const getInfoTransaction = async (transactionId: string) => {
        try {
            const response = await getInfoTransactionPayment(transactionId);
            return response;
        } catch (error) {
            console.error("getInfoTransaction error: ", error);
            return { message: "Failed to get info transaction", code: "GET_INFO_TRANSACTION_ERROR" };
        }
    };

    return { createPaymentTransaction, verifyTransaction, submitLeadInformation, createPaymentTransactionPdf, createPaymentTransactionGuest, createPaymentTransactionPdfGuest, getInfoTransaction };
}

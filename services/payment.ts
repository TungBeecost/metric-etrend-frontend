import {PAYMENT_ENDPOINTS} from "~/constant/endpoints";
import axios from "./axios-wrapper";

export const createTransaction = async (
    paymentMethod: string,
    itemCode: string,
    redirectUrl: string,
    totalPrice: string,
    discountCode: string | null,
    name: string | null,
    phone: string | null,
    company: string | null,
    tax_code: string | null,
    receive_email: string | null,
    address: string | null
) => {
    try {
        const params = new URLSearchParams({
            payment_method: paymentMethod,
            item_code: itemCode,
            redirect_url: redirectUrl,
            total_price: totalPrice
        });

        if (discountCode) {
            params.append('discount_code', discountCode);
        }
        if (name) {
            params.append('name', name);
        }
        if (phone) {
            params.append('phone', phone);
        }
        if (company) {
            params.append('company', company);
        }
        if (tax_code) {
            params.append('tax_code', tax_code);
        }
        if (receive_email) {
            params.append('receive_email', receive_email);
        }
        if (address) {
            params.append('address', address);
        }

        const response = await axios.post(`${useBEEndpoint(PAYMENT_ENDPOINTS.payment.endpoint)}?${params.toString()}`, {}, {
            headers: {
                'accept': 'application/json',
            },
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error("createTransaction error: ", error);
        return null;
    }
};

export const createTransactionGuest = async (
    paymentMethod: string,
    itemCode: string,
    redirectUrl: string,
    totalPrice: string,
    discountCode: string | null,
    name: string | null,
    phone: string | null,
    emailAccount: string | null,
    company: string | null,
    tax_code: string | null,
    receive_email: string | null,
    address: string | null
) => {
    try {
        const params = new URLSearchParams({
            payment_method: paymentMethod,
            item_code: itemCode,
            redirect_url: redirectUrl,
            total_price: totalPrice
        });

        if (discountCode) {
            params.append('discount_code', discountCode);
        }
        if (name) {
            params.append('name', name);
        }
        if (phone) {
            params.append('phone', phone);
        }
        if (emailAccount) {
            params.append('email_account', emailAccount);
        }
        if (company) {
            params.append('company', company);
        }
        if (tax_code) {
            params.append('tax_code', tax_code);
        }
        if (receive_email) {
            params.append('receive_email', receive_email);
        }
        if (address) {
            params.append('address', address);
        }

        const response = await axios.post(`${useBEEndpoint(PAYMENT_ENDPOINTS.payment_guest.endpoint)}?${params.toString()}`, {}, {
            headers: {
                'accept': 'application/json',
            },
            withCredentials: true
        });
        console.log("response", response);
        return response.data;
    } catch (error) {
        if ((error as any)?.response?.data?.detail === "Invalid email account") {
            return {message: "Invalid email account"};
        }
        return null;
    }
};

export const createTransactionPdf = async (
    paymentMethod: string,
    report_id: string,
    redirectUrl: string,
    totalPrice: string,
    discountCode: string | null,
    reportLink: string,
    name: string | null,
    phone: string | null,
    company: string | null,
    tax_code: string | null,
    receive_email: string | null,
    address: string | null
) => {
    try {
        const params = new URLSearchParams({
            payment_method: paymentMethod,
            report_id: report_id,
            redirect_url: redirectUrl,
            total_price: totalPrice,
            report_link: reportLink
        });

        if (discountCode) {
            params.append('discount_code', discountCode);
        }
        if (name) {
            params.append('name', name);
        }
        if (phone) {
            params.append('phone', phone);
        }
        if (company) {
            params.append('company', company);
        }
        if (tax_code) {
            params.append('tax_code', tax_code);
        }
        if (receive_email) {
            params.append('receive_email', receive_email);
        }
        if (address) {
            params.append('address', address);
        }

        const response = await axios.post(`${useBEEndpoint(PAYMENT_ENDPOINTS.payment_pdf.endpoint)}?${params.toString()}`, {}, {
            headers: {
                'accept': 'application/json',
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("createTransaction error: ", error);
        return null;
    }
};

export const createTransactionPdfGuest = async (
    paymentMethod: string,
    report_id: string,
    redirectUrl: string,
    totalPrice: string,
    discountCode: string | null,
    reportLink: string,
    name: string | null,
    phone: string | null,
    emailAccount: string | null,
    company: string | null,
    tax_code: string | null,
    receive_email: string | null,
    address: string | null
) => {
    try {
        const params = new URLSearchParams({
            payment_method: paymentMethod,
            report_id: report_id,
            redirect_url: redirectUrl,
            total_price: totalPrice,
            report_link: reportLink
        });

        if (discountCode) {
            params.append('discount_code', discountCode);
        }
        if (name) {
            params.append('name', name);
        }
        if (phone) {
            params.append('phone', phone);
        }
        if (emailAccount) {
            params.append('email_account', emailAccount);
        }
        if (company) {
            params.append('company', company);
        }
        if (tax_code) {
            params.append('tax_code', tax_code);
        }
        if (receive_email) {
            params.append('receive_email', receive_email);
        }
        if (address) {
            params.append('address', address);
        }

        const response = await axios.post(`${useBEEndpoint(PAYMENT_ENDPOINTS.payment_pdf_guest.endpoint)}?${params.toString()}`, {}, {
            headers: {
                'accept': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("createTransaction error: ", error);
        return null;
    }
}

export const checkTransactionStatus = async (transactionId: string) => {
    try {
        const response = await axios.get(`${useBEEndpoint(PAYMENT_ENDPOINTS.checkTransaction.endpoint)}?transaction_code=${transactionId}`, {
            headers: {
                'accept': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error checking transaction status:", error);
        return null;
    }
};

export const sendLeadInformation = async (name: string, email: string, phone: string, nameCompany: string, transactionId: string) => {
    try {
        const url = `${useBEEndpoint(PAYMENT_ENDPOINTS.leadInformation.endpoint)}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&name_company=${encodeURIComponent(nameCompany)}&transaction_id=${encodeURIComponent(transactionId)}`;
        const response = await axios.post(url, {}, {
            headers: {
                'accept': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("sendLeadInformation error: ", error);
        return null;
    }
};

export const getInfoTransactionPayment = async (transactionId: string) => {
    try {
        const response = await axios.get(`${useBEEndpoint(PAYMENT_ENDPOINTS.infoTransaction.endpoint)}?transaction_id=${transactionId}`, {
            headers: {
                'accept': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error checking transaction status:", error);
        return null;
    }
};


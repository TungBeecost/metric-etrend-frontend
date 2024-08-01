import {getVoucherInfo} from "~/services/discount";

export default function useDiscount() {
    const getVoucher = async (code: string) => {
        try {
            return await getVoucherInfo(code);
        } catch (error) {
            console.error("submitLeadInformation error: ", error);
            return { message: "Failed to submit lead information", code: "SUBMIT_LEAD_INFORMATION_ERROR" };
        }
    };

    return { getVoucher }
}
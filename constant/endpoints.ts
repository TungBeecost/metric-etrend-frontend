export type METHODS = "POST" | "GET" | "HEAD" | "PATCH" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE";

export const REPORT_ENDPOINTS: { [key: string]: { endpoint: string; method: METHODS } } = {
    search: {endpoint: `/api/report/search`, method: "POST"},
    search_community: {endpoint: `/api/report/search_community`, method: "GET"},
    list_recomend: {endpoint: `/api/report/recommend`, method: "GET"},
    marketing_report_recommend: {endpoint: `/api/report/marketing_report_recommend`, method: "GET"},
    claim: {endpoint: `/api/report/claim`, method: "GET"},
    claim_pdf: {endpoint: `/api/report/claim_pdf`, method: "GET"},
    list_claimed: {endpoint: `/api/report/claimed-list`, method: "GET"},
    list_claimed_pdf: {endpoint: `/api/report/claimed-list-pdf`, method: "GET"},
    list_report_sent_by_sale: {endpoint: `/api/report/claimed-list-sent_report_by_sale`, method: "GET"},
    export_report_send_mail: {endpoint: `/api/report/export_report_send_mail`, method: "POST"},
};

export const AUTH_ENDPOINTS: { [key: string]: { endpoint: string; method: METHODS } } = {
    googleCallback: {endpoint: `/api/google/callback`, method: "POST"}
}

export const USER_ENDPOINTS: { [key: string]: { endpoint: string; method: METHODS } } = {
    profile: {endpoint: `/api/user/profile`, method: "GET"},
    profile_metric: {endpoint: `/market/user/paid/me`, method: "GET"}
}

export const PAYMENT_ENDPOINTS: { [key: string]: { endpoint: string; method: METHODS } } = {
    payment: {endpoint: `/api/payment/create-transaction`, method: "POST"},
    payment_guest: {endpoint: `/api/payment/create_transaction_guest`, method: "POST"},
    payment_pdf: {endpoint: `/api/payment/create-transaction_pdf`, method: "POST"},
    payment_pdf_guest: {endpoint: `/api/payment/create_transaction_pdf_guest`, method: "POST"},
    checkTransaction: {endpoint: `/api/payment/transaction/check`, method: "GET"},
    leadInformation: {endpoint: `/api/payment/lead_information`, method: "POST"},
    list_statistical_transaction: {endpoint: `/api/payment/get_statistical_transaction`, method: "GET"},
    list_statistical_discount_code: {endpoint: `/api/payment/get_statistical_discount_code`, method: "GET"},
    infoTransaction: {endpoint: `/api/payment/get_info_transaction`, method: "GET"},
}

export const DISCOUNT_ENDPOINTS: { [key: string]: { endpoint: string; method: METHODS } } = {
    discountInfo: {endpoint: `/api/discount/get_voucher_info`, method: "GET"}
}

export const PLAN_ENDPOINTS: { [key: string]: { endpoint: string; method: METHODS } } = {
    planInfo: {endpoint: `/api/plan/get_plan_info_by_code`, method: "GET"}
}

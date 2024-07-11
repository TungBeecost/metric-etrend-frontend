export type METHODS = "POST" | "GET" | "HEAD" | "PATCH" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE";

export const REPORT_ENDPOINTS: { [key: string]: { endpoint: string; method: METHODS } } = {
    search: {endpoint: `/api/report/search`, method: "POST"},
    list_recomend: {endpoint: `/api/report/recommend`, method: "GET"},
    marketing_report_recommend: {endpoint: `/api/report/marketing_report_recommend`, method: "GET"},
    claim: {endpoint: `/api/report/claim`, method: "GET"},
    list_claimed: {endpoint: `/api/report/claimed-list`, method: "GET"}
};


export const AUTH_ENDPOINTS: { [key: string]: { endpoint: string; method: METHODS } } = {
    googleCallback: {endpoint: `/api/google/callback`, method: "POST"}
}

export const USER_ENDPOINTS: { [key: string]: { endpoint: string; method: METHODS } } = {
    profile: {endpoint: `/api/user/profile`, method: "GET"}
}

export const PAYMENT_ENDPOINTS: { [key: string]: { endpoint: string; method: METHODS } } = {
    payment: {endpoint: `/api/payment/create-transaction`, method: "POST"}
}
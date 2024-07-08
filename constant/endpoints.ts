export type METHODS = "POST" | "GET" | "HEAD" | "PATCH" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE";

export const REPORT_ENDPOINTS: { [key: string]: { endpoint: string; method: METHODS } } = {
    search: {endpoint: `/api/report/search`, method: "POST"},
    list_recomend: {endpoint: `/api/report/recommend`, method: "GET"},
    claim: {endpoint: `/api/report/claim`, method: "GET"}
};


export const AUTH_ENDPOINTS: { [key: string]: { endpoint: string; method: METHODS } } = {
    googleCallback: {endpoint: `/api/auth/google/callback`, method: "POST"}
}

export const USER_ENDPOINTS: { [key: string]: { endpoint: string; method: METHODS } } = {
    profile: {endpoint: `/api/user/profile`, method: "GET"}
}
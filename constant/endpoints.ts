export type METHODS = "POST" | "GET" | "HEAD" | "PATCH" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE";

export const REPORT_ENDPOINTS: { [key: string]: { endpoint: string; method: METHODS } } = {
  search: { endpoint: `/api/report/search`, method: "POST" },

  // reports
  claim: { endpoint: `/api/report/claim`, method: "GET" }
};

import useBEEndpoint from "../composables/useBEEndpoint";
import { REPORT_ENDPOINTS } from "../constant/endpoints";

export const searchReport = async (body: SearchReportPayload) => {
  const { data, error } = await useFetch(useBEEndpoint(REPORT_ENDPOINTS.search.endpoint), { method: REPORT_ENDPOINTS.search.method, body: body });
  const result = data.value as any as SearchReportRes;

  if (error.value || !result?.lst_report) {
    throw new Error(`Something went wrong: ${error.value}`);
  }

  return result;
};

export const fetchUnlockReport = async (slug: string) => {
  const { error } = await useFetch(useBEEndpoint(REPORT_ENDPOINTS.claim.endpoint), { method: REPORT_ENDPOINTS.claim.method, query: { slug: slug } });

  if (error.value) {
    throw new Error(`Something went wrong: ${error.value}`);
  }

  return true;
};

export interface SearchReportPayload {
  limit?: number;
  lst_category_report_id?: Array<string>;
  lst_field?: Array<string>;
  lst_query?: Array<string>;
  offset?: number;
  sort?: string;
}
export interface SearchReportRes {
  total: number;
  breadcrumb?: any;
  lst_category?: Array<string>;
  lst_query: Array<string>;
  lst_report: LstReport[];
}

export interface LstReport {
  id: string;
  slug: string;
  name: string;
  url_thumbnail: string;
  revenue_monthly: number;
  gr_quarter: number;
  shop: number;
  category_report_id: string;
  lst_category: LstCategory[];
  lst_brand: Array<string>;
}

export interface LstCategory {
  id: string;
  name: string;
  level: number;
  parent_id?: any;
  parent_name?: any;
  is_leaf: boolean;
}

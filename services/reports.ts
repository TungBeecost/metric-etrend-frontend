import {REPORT_ENDPOINTS} from "~/constant/endpoints";
import useBEEndpoint from "~/composables/useBEEndpoint";
import axios from "axios";

export const searchReport = async (body: SearchReportPayload) => {
    try {
        const {data} = await useFetch(useBEEndpoint(REPORT_ENDPOINTS.search.endpoint), {body,  method: REPORT_ENDPOINTS.search.method});
        const result = data.value as any as SearchReportRes;

        if (!result?.lst_report) {
            console.error("searchReport error: No reports found");
            console.error("searchReport body: ", result);
        }

        return result;
    } catch (error) {
        console.error("searchReport error: ", error);
        return null;
    }
};

export const fetchUnlockReport = async (slug: string) => {
  const { statusText, status } = await axios.get(useBEEndpoint(REPORT_ENDPOINTS.claim.endpoint), {
    method: REPORT_ENDPOINTS.claim.method,
    params: { slug: slug }
  });

  if (status !== 200) {
    throw new Error(`Something went wrong: ${statusText}`);
  }

  return true;
};

export const fetchListRecomendReport = async (categoryReportId: string, numberOfReports: number) => {
    if (!categoryReportId) {
        console.error("fetchListRecomendReport error: categoryReportId is null");
        return null;
    }
    try {
        const {data} = await useFetch(useBEEndpoint(REPORT_ENDPOINTS.list_recomend.endpoint), {
            params: {
                category_report_id: categoryReportId,
                number_of_reports: numberOfReports
            },
            headers: {
                'accept': 'application/json'
            },
            method: REPORT_ENDPOINTS.list_recomend.method
        });

        const result = data.value as any as LstRecommed[];

        if (!Array.isArray(result)) {
            console.error("fetchListRecomendReport error: Unexpected response format");
            return null;
        }

        return result;
    } catch (error) {
        console.error("fetchListRecomendReport error: ", error);
        return null;
    }
};

export interface SearchReportPayload {
    limit?: number;
    lst_category_report_id?: Array<string>;
    lst_field?: Array<string>;
    lst_query?: Array<string>;
    lst_year?: Array<string>;
    offset?: number;
    sort?: string;
}

export interface SearchReportRes {
    total?: number;
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

export interface LstRecommed {
    id: number;
    slug: string;
    name: string;
    category_report_name: string;
    url_thumbnail: string;
    claimed_at: string | null;
    expired_at: string | null;
    status: string | null;
    search_volume_shopee: number;
    start_date: string;
}

export interface ListCategory {
    value: string;
    label: string;
    level: number;
    is_leaf: string;
    parent?: string;
    parent_name?: string;
}

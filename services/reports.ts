import { REPORT_ENDPOINTS } from "~/constant/endpoints";
import axios from "./axios-wrapper";

export const searchReport = async (body: SearchReportPayload) => {
  try {
    const response = await axios.post(useBEEndpoint(REPORT_ENDPOINTS.search.endpoint), body);
    const result = response.data as SearchReportRes;

    if (!result?.lst_report) {
      console.error("searchReport error: No reports found");
      console.error("searchReport body: ", body);
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
  try {
    const response = await axios.get(useBEEndpoint(REPORT_ENDPOINTS.list_recomend.endpoint), {
      params: {
        category_report_id: categoryReportId,
        number_of_reports: numberOfReports
      },
      headers: {
        accept: "application/json"
      }
    });

    // Ensure the response data is in the expected format
    if (!Array.isArray(response.data)) {
      console.error("fetchListRecomendReport error: Unexpected response format");
      return null;
    }
    const data: LstRecommed[] = response.data.map((item) => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      url_thumbnail: item.url_thumbnail,
      category_report_name: item.category_report_name,
      claimed_at: item.claimed_at,
      expired_at: item.expired_at,
      status: item.status,
      search_volume_shopee: item.search_volume_shopee,
      start_date: item.start_date
    }));

    return data;
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
  order?: string;
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
  url_thumbnail: string;
  category_report_name: string;
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

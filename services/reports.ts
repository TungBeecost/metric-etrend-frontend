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


export const fetchPdfReport = async (slug: string) => {
  const { statusText, status } = await axios.get(useBEEndpoint(REPORT_ENDPOINTS.claim_pdf.endpoint), {
    method: REPORT_ENDPOINTS.claim_pdf.method,
    params: { slug: slug }
  });

  if (status !== 200) {
    throw new Error(`Something went wrong: ${statusText}`);
  }

  return true;
};


export const fetchListRecommendReport = async (categoryReportId: string, numberOfReports: number) => {
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

    if (!Array.isArray(response.data)) {
      console.error("fetchListRecommendReport error: Unexpected response format");
      return null;
    }
    const data: LstRecommed[] = response.data.map((item) => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      url_thumbnail: item.url_thumbnail,
      source: item.source,
      category_report_name: item.category_report_name,
      claimed_at: item.claimed_at,
      expired_at: item.expired_at,
      status: item.status,
      search_volume_shopee: item.search_volume_shopee,
      start_date: item.start_date
    }));

    return data;
  } catch (error) {
    console.error("fetchListRecommendReport error: ", error);
    return null;
  }
};

export const fetchListRecommendReportMarketing = async (numberOfReports: number, report_type: string) => {
  try {
    const response = await axios.get(useBEEndpoint(REPORT_ENDPOINTS.marketing_report_recommend.endpoint), {
      params: {
        number_of_reports: numberOfReports,
        report_type
      },
      headers: {
        accept: "application/json"
      }
    });

    if (!Array.isArray(response.data)) {
      console.error("fetchListRecommendReport error: Unexpected response format");
      return null;
    }
    const data: LstRecommed[] = response.data.map((item) => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      source: item.source,
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
    console.error("fetchListRecommendReport error: ", error);
    return null;
  }
};

export const fetchClaimedListReport = async (page: number = 0, limit: number = 10) => {
  try {
    const response = await axios.get(useBEEndpoint(REPORT_ENDPOINTS.list_claimed.endpoint), {
      params: {
        page,
        limit
      }
    });

    if (!response.data || !Array.isArray(response.data.reports)) {
      console.error("fetchClaimedListReport error: Unexpected response format");
      return null;
    }

    const data: ListClaimed[] = response.data.reports.map((item: any) => ({
      id: item.id,
      slug: item.slug,
      name: item.name,
      claimed_at: item.claimed_at,
      expired_at: item.expired_at,
      status: item.status,
      search_volume_shopee: item.search_volume_shopee,
      start_date: item.start_date,
      end_date: item.end_date,
      category_report_id: item.category_report_id,
      category_report_name: item.category_report_name,
      url_thumbnail: item.url_thumbnail,
      report_type: item.report_type,
      lst_brand: item.lst_brand,
      lst_category: item.lst_category
    }));

    return { total: response.data.total, reports: data };
  } catch (error) {
    console.error("fetchClaimedListReport error: ", error);
    return null;
  }
};

export const fetchClaimedPDFListReport = async (page: number = 0, limit: number = 10) => {
    try {
        const response = await axios.get(useBEEndpoint(REPORT_ENDPOINTS.list_claimed_pdf.endpoint), {
        params: {
            page,
            limit
        }
        });

        if (!response.data || !Array.isArray(response.data.reports)) {
        console.error("fetchClaimedPDFListReport error: Unexpected response format");
        return null;
        }

        const data: ListClaimed[] = response.data.reports.map((item: any) => ({
        id: item.id,
        slug: item.slug,
        name: item.name,
        claimed_at: item.claimed_at,
        expired_at: item.expired_at,
        status: item.status,
        search_volume_shopee: item.search_volume_shopee,
        start_date: item.start_date,
        end_date: item.end_date,
        category_report_id: item.category_report_id,
        category_report_name: item.category_report_name,
        url_thumbnail: item.url_thumbnail,
        report_type: item.report_type,
        lst_brand: item.lst_brand,
        lst_category: item.lst_category
        }));

        return { total: response.data.total, reports: data };
    } catch (error) {
        console.error("fetchClaimedPDFListReport error: ", error);
        return null;
    }
}


export interface SearchReportPayload {
  limit?: number;
  lst_category_report_id?: Array<string>;
  lst_field?: Array<string>;
  lst_query?: Array<string>;
  lst_year?: Array<string>;
  offset?: number;
  sort?: string;
  order?: string;
  source?: Array<string>;
  lst_report_type?: Array<string>;
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
  report_type: string;
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
  source: string;
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


export interface ListClaimed {
  "id": number,
  "slug": string,
  "name": string,
  "claimed_at": string,
  "expired_at": string,
  "status": string,
  "search_volume_shopee": string,
  "start_date": string,
  "end_date": string,
  "category_report_id": string,
  "category_report_name": string,
  "url_thumbnail": string,
  "report_type": string,
  "lst_brand": Array<string>
  "lst_category": Array<string>
}

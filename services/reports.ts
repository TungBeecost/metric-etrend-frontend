import { REPORT_ENDPOINTS } from "../constant/endpoints";

export interface SearchReportPayload {
  limit?: number;
  lst_category_report_id?: Array<string>;
  lst_field?: Array<string>;
  lst_query?: Array<string>;
  offset?: number;
  sort?: string;
}
interface SearchReportRes {
  lst_report: Array<{
    name: string;
  }>;
}

export const searchReport = async (body: SearchReportPayload) => {
  const { data, error } = await useFetch(REPORT_ENDPOINTS.search, { method: "post", body: body });
  const result = data.value as any as SearchReportRes;

  if (error.value || !result?.lst_report) {
    throw new Error(`Something went wrong: ${error.value}`);
  }

  return result;
};

import { searchReport, type SearchReportPayload } from "~/services/reports";

export default function useSearchReport() {
  const fetchSearch = async (value: string, options?: SearchReportPayload) => {
    try {
      const body: SearchReportPayload = {
        limit: 10,
        lst_field: ["name", "slug", "url_thumbnail", "revenue_monthly", "gr_quarter", "shop"],
        lst_query: [value],
        offset: 0,
        sort: "popularity",
        ...options
      };
      const data = await searchReport(body);

      return data;
    } catch (error) {
      console.error("fetchSearch error: ", error);
      return [];
    }
  };

  const fetchSuggest = async (value: string, options?: SearchReportPayload) => {
    try {
      const body: SearchReportPayload = {
        limit: 5,
        lst_field: ["name", "slug"],
        offset: 0,
        sort: "popularity",
        lst_query: [value],
        ...options
      };
      const data = await searchReport(body);

      return data.lst_report.map((item) => item.name);
    } catch (error) {
      console.error("fetchSuggest error: ", error);
      return [];
    }
  };

  return { fetchSearch, fetchSuggest };
}

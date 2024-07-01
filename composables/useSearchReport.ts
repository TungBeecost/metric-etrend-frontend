import { REPORT_ENDPOINTS } from "../constant/endpoints";

interface SearchReportPayload {
  limit?: number;
  lst_category_report_id?: Array<string>;
  lst_field?: Array<string>;
  lst_query?: Array<string>;
  offset?: number;
  sort?: string;
}
interface SuggestReportRes {
  lst_report: Array<{
    name: string;
  }>;
}

export default function useSearchReport() {
  const fetchSearch = async (value: string) => {
    console.log(`Searching ${value}...`);
  };

  const fetchSuggest = async (value: string) => {
    const body: SearchReportPayload = {
      limit: 5,
      lst_field: ["name", "slug"],
      lst_query: [value],
      offset: 0,
      sort: "popularity"
    };

    const { data, error } = await useFetch(REPORT_ENDPOINTS.suggestion, { method: "post", body: body });
    const suggestions = data.value as any as SuggestReportRes;
    console.log(error);

    if (error.value || !suggestions?.lst_report) {
      console.error(`Something went wrong: ${error.value}`);
      return [];
    }

    return suggestions.lst_report.map((item) => item.name);
  };

  return { fetchSearch, fetchSuggest };
}

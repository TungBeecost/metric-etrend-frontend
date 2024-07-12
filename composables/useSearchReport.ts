import {
    fetchClaimedListReport,
    fetchListRecommendReport,
    fetchListRecommendReportMarketing,
    searchReport,
    type SearchReportPayload
} from "~/services/reports";

export default function useSearchReport() {
    const fetchSearch = async (value: string | null, options?: SearchReportPayload) => {
        try {
            const body: SearchReportPayload = {
                limit: 10,
                lst_field: ["name", "slug", "url_thumbnail", "revenue_monthly", "gr_quarter", "shop"],
                lst_query: value ? [value] : [],
                offset: 0,
                sort: "popularity",
                ...options
            };

            const data = await searchReport(body);

            return data;
        } catch (error) {
            console.error("fetchSearch error: ", error);
            return null;
        }
    };

    const fetchSuggest = async (value: string | null, options?: SearchReportPayload) => {
        try {
            const body: SearchReportPayload = {
                limit: 5,
                lst_field: ["name", "slug"],
                offset: 0,
                sort: "popularity",
                lst_query: value ? [value] : [],
                ...options
            };
            const data = await searchReport(body);

            if (data && data.lst_report) {
                return data.lst_report.map((item) => item.name);
            } else {
                return [];
            }
        } catch (error) {
            console.error("fetchSuggest error: ", error);
            return [];
        }
    };

    const fetchListRecommend = async (categoryReportId: string, numberOfReports: number = 5) => {
        try {
            return await fetchListRecommendReport(categoryReportId, numberOfReports);
        } catch (error) {
            console.error("fetchListRecommend error: ", error);
            return null;
        }
    }

    const fetchClaimedList = async () => {
        try {
            return await fetchClaimedListReport();
        } catch (error) {
            console.error("fetchClaimedList error: ", error);
            return null;
        }
    }

    const fetchListRecommendMarketing = async (numberOfReports: number = 5, report_type: string = '') => {
        try {
            return await fetchListRecommendReportMarketing(numberOfReports, report_type);
        } catch (error) {
            console.error("fetchListRecommend error: ", error);
            return null;
        }
    }

    return {fetchSearch, fetchSuggest, fetchListRecommend, fetchListRecommendMarketing, fetchClaimedList};
}

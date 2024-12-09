import { getPlan } from "~/services/plan";

export default function usePlan() {
    const getPlanInfo = async (planCode: string) => {
        try {
            const response = await getPlan(planCode);
            return response;
        } catch (error) {
            console.error("getPlanInfo error: ", error);
            return null;
        }
    }

    return {
        getPlanInfo
    };
}
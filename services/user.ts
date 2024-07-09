import { USER_ENDPOINTS } from "../constant/endpoints";
import axios from "./axios-wrapper";

interface ProfileRes {
  id: number;
  email: string;
  display_name: string;
  first_name: string;
  last_name: string;
  avatar: string;
  current_plan: CurrentPlan;
}

interface CurrentPlan {
  plan_id: number;
  plan_name: string;
  plan_code: string;
  remain_claim: number;
  remain_claim_basic: number;
  remain_claim_pro: number;
  remain_claim_expert: number;
}

export const fetchUserProfile = async () => {
  try {
    const response = await axios.get(useBEEndpoint(USER_ENDPOINTS.profile.endpoint));
    const result = response.data as ProfileRes;

    if (!result?.id) {
      return;
    }

    return result;
  } catch (error) {
    console.error("fetchUserProfile error: ", error);
    return;
  }
};

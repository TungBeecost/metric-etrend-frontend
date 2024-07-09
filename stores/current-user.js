import {defineStore} from "pinia";
import {fetchUnlockReport} from "~/services/reports";
import useBEEndpoint from "~/composables/useBEEndpoint";
import {AUTH_ENDPOINTS} from "~/constant/endpoints";
import jwt_decode from "jwt-decode";
import {fetchUserProfile} from "~/services/user";

const googleCallback = async (body) => {
    const {data} = await useFetch(useBEEndpoint(AUTH_ENDPOINTS.googleCallback.endpoint), {
        method: AUTH_ENDPOINTS.googleCallback.method,
        body: body
    });

    return data;
};

export const useCurrentUser = defineStore("currentUserStore", {
    state: () => ({
        fetchedUser: false,
        showPopupLogin: false,
        userInfo: {
            id: undefined,
            email: undefined,
            display_name: undefined,
            first_name: undefined,
            last_name: undefined,
            avatar: undefined,
            current_plan: {
                plan_id: undefined,
                plan_name: undefined,
                plan_code: undefined,
                remain_claim: undefined,
                remain_claim_basic: undefined,
                remain_claim_pro: undefined,
                remain_claim_expert: undefined
            },
        },
    }),
    getters: {
        isShowPopupLogin: (state) => state.showPopupLogin,
        remainingUnlock: (state) => state.current_plan.remain_claim,
        authenticated: (state) => state.userInfo.id !== undefined,
    },
    actions: {
        setShowPopupLogin(value) {
            this.showPopupLogin = value
        },
        async fetchCurrentUser() {
            this.fetchedUser = false;
            const access_token = localStorage.getItem("access_token");
            if (!access_token) {
                this.fetchedUser = true;
                return
            }
            this.userInfo = jwt_decode(access_token);
            this.fetchedUser = true;
            const {currentPlan, ...userInfo} = await fetchUserProfile();
            if (!userInfo?.id) return;
            this.userInfo = {...userInfo, current_plan: currentPlan};
            this.fetchedUser = true;
            console.log(222, this.userInfo)
        },
        async unlockReport(slug) {
            // call BE to verify & update state
            await fetchUnlockReport(slug);
        },
        logOut() {
            console.log("Logging out");
            localStorage.removeItem("access_token");
            this.user = null;

            window.location.reload();
        },
        async handleGoogleCredentialResponse(response) {
            console.log("Handling Google Credential Response");
            const credential = response.credential;
            console.log("Credential: ", credential);
            try {
                const data = await googleCallback({credential});

                const access_token = data?.value?.access_token;
                if (access_token) {
                    localStorage.setItem("access_token", access_token);
                    // localStorage.setItem("refresh_token", refreshToken);
                    if (access_token && typeof access_token === "string" && access_token.length > 0) {
                        try {
                            this.userInfo = jwt_decode(access_token);
                        } catch (err) {
                            console.log("Invalid access token: ", err);
                        }
                    } else {
                        console.log("Invalid access token");
                    }
                    window.location.reload();
                }
            } catch (err) {
                console.log("Error: ", err);
            }
        }
    }
});

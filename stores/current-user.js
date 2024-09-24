import {defineStore} from "pinia";
import {fetchPdfReport, fetchUnlockReport} from "~/services/reports";
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
    state: () => {
        const isServerRender = process.env.SSR === 'true'

        console.log('isServerRender',isServerRender)

        return {
            fetchedUser: isServerRender,
            showPopupLogin: false,
            showPopupCampaign: true,
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
                    remain_claim_pdf: undefined,
                },
            },
        }
    },
    getters: {
        isShowPopupLogin: (state) => state.showPopupLogin,
        isShowPopupCampaign: (state) => state.showPopupCampaign,
        remainingUnlock: (state) => state.userInfo.current_plan.remain_claim,
        remainingUnlockPdf: (state) => state.userInfo.current_plan.remain_claim_pdf,
        authenticated: (state) => state.userInfo.id !== undefined,
    },
    actions: {
        setShowPopupLogin(value) {
            this.showPopupLogin = value
        },
        setShowPopupCampaign(value) {
            this.showPopupCampaign = value
        },
        async fetchCurrentUser() {
            if (typeof window === 'undefined') {
                return
            }

            const access_token = typeof window !== 'undefined' ? localStorage?.getItem("access_token") : "";
            if (!access_token) {
                this.fetchedUser = true;
                return
            }
            const isValidToken = access_token.split(".").length === 3;
            if (!isValidToken) {
                localStorage?.removeItem("access_token");
                this.fetchedUser = true;
                return;
            }

            const isExpired = jwt_decode(access_token).exp < Date.now() / 1000;
            if (isExpired) {
                localStorage?.removeItem("access_token");
                this.fetchedUser = true;
                return;
            }

            try {
                this.userInfo = {...this.userInfo, ...jwt_decode(access_token)};
                this.fetchedUser = true;
                const {current_plan, ...userInfo} = await fetchUserProfile();
                if (!userInfo?.id) return;
                this.userInfo = {...userInfo, current_plan};
                this.fetchedUser = true;
            } catch (err) {
                this.fetchedUser = true;
                console.log("Error: ", err);
            }
        },
        async unlockReport(slug) {
            // call BE to verify & update state
            await fetchUnlockReport(slug);
        },
        async viewPdfReport(slug) {
            // call BE to verify & update state
            await fetchPdfReport(slug);
        },
        logOut() {
            console.log("Logging out");
            if (typeof window !== 'undefined') {
                localStorage.removeItem("access_token");
            }
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
                    if (typeof window !== 'undefined') {
                        localStorage.setItem("access_token", access_token);
                    }
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

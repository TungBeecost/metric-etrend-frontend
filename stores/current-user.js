import {defineStore} from "pinia";
import {fetchUnlockReport} from "~/services/reports";
import useBEEndpoint from "~/composables/useBEEndpoint";
import {AUTH_ENDPOINTS} from "~/constant/endpoints";
import jwt_decode from "jwt-decode";

const googleCallback = async (body) => {
    const {
        data
    } = await useFetch(useBEEndpoint(AUTH_ENDPOINTS.googleCallback.endpoint), {
        method: AUTH_ENDPOINTS.googleCallback.method,
        body: body
    });

    return data
}

export const useCurrentUser = defineStore("currentUserStore", {
    state: () => ({
        userInfo: {},
        unlockInfo: {
            remainingUnlock: 1
        },
        authenticated: false,
    }),
    getters: {
        remainingUnlock: (state) => state.unlockInfo.remainingUnlock
    },
    actions: {
        async fetchCurrentUser() {
            // fetch data from API and update state
            //...
        },
        async unlockReport(slug) {
            // call BE to verify & update state
            await fetchUnlockReport(slug);
        },
        async handleGoogleCredentialResponse(response) {
            console.log("Handling Google Credential Response");
            const credential = response.credential;
            console.log("Credential: ", credential);
            try {
                const data = await googleCallback({credential});

                console.log("Data: ", data);
                if (data.status === "success") {
                    console.log("Successfully logged in");
                    // const {access_token: accessToken, refresh_token: refreshToken} = data;
                    localStorage.setItem("access_token", data.access_token);
                    // localStorage.setItem("refresh_token", refreshToken);
                    this.authenticated = true;
                    if (data.access_token && typeof data.access_token === 'string' && data.access_token.length > 0) {
                        try {
                            this.user = jwt_decode(data.access_token);
                        } catch (err) {
                            console.log("Invalid access token: ", err);
                        }
                    } else {
                        console.log("Invalid access token");
                    }
                    window.location.href = "/price-analytic";
                } else {
                    console.log(data.message);
                }
            } catch (err) {
                console.log("Error: ", err);
            }
        },
    }
});

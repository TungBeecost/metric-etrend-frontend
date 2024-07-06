import {defineStore} from "pinia";
import jwt_decode from "jwt-decode";
import { useCurrentUser } from "~/stores/current-user";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        authenticated: false,
        user: null,
        loading: false,
        showPopupLogin: false
    }),
    getters: {
        isShowPopupLogin: (state) => {
            return state.showPopupLogin
        },
        isLogin: (state) => {
            return state.authenticated
        },
    },
    actions: {
        async handleGoogleCredentialResponse(response) {
            console.log("Handling Google Credential Response");
            const credential = response.credential;
            console.log("Credential: ", credential);
            try {
                // Use googleCallback from useCurrentUser
                const data = await useCurrentUser().handleGoogleCredentialResponse({credential});
                console.log("Data: ", data.data.data.access_token);
                if (data.data.status === "success") {
                    console.log("Successfully logged in");
                    localStorage.setItem("access_token", data.data.data.access_token);
                    this.authenticated = true;
                    if (data.data.data.access_token && typeof data.data.data.access_token === 'string' && data.data.data.access_token.length > 0) {
                        try {
                            this.user = jwt_decode(data.data.data.access_token);
                        } catch (err) {
                            console.log("Invalid access token: ", err);
                        }
                    } else {
                        console.log("Invalid access token");
                    }
                    window.location.href = "/price-analytic";
                } else {
                    console.log(data.data.message);
                }
            } catch (err) {
                console.log("Error: ", err);
            }
        },
        logOut() {
            console.log("Logging out");
            localStorage.removeItem("access_token");
            this.authenticated = false;
            this.user = null;

            window.location.href = "/login";
        },
        checkAuth() {
            console.log("Checking authentication");
            const accessToken = localStorage.getItem("access_token");
            if (accessToken) {
                console.log("Access token found");
                this.authenticated = true;
                this.user = jwt_decode(accessToken);
            } else {
                console.log("No access token found");
                this.authenticated = false;
                this.user = null;
            }
        },
        setShowPopupLogin(value) {
            this.showPopupLogin = value
        }
    },
});

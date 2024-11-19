import {defineStore} from "pinia";
import {fetchPdfReport, fetchUnlockReport} from "~/services/reports";
import useBEEndpoint from "~/composables/useBEEndpoint";
import {AUTH_ENDPOINTS} from "~/constant/endpoints";
import jwt_decode from "jwt-decode";
import {fetchUserProfile} from "~/services/user";
import axios from "axios";
import {getIndexedDB, setIndexedDB} from "~/helpers/IndexedDBHelper.js";
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const googleCallback = async (body) => {
    const {data} = await useFetch(useBEEndpoint(AUTH_ENDPOINTS.googleCallback.endpoint), {
        method: AUTH_ENDPOINTS.googleCallback.method,
        body: body
    });
    console.log("Google Callback: ", body);
    return data;
};

export const apiGoogleAuthCallback = async (payload) => {
    const urlApi = `https://auth.metric.vn/v2/auth/google/callback`
    try {
        const response = await axios.post(urlApi, payload)
        if (response?.data != null) {
            return response.data
        }
    } catch (e) {
        return e.response.status
    }
    return null
}

export const getDeviceInformation = async () => {
    const fpPromise = FingerprintJS.load()
    const fp = await fpPromise
    return await fp.get()
}

export const useCurrentUser = defineStore("currentUserStore", {
    state: () => {
        const config = useRuntimeConfig();
        const isServerRender = config.public.SSR === 'true'

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
                list_personal_discount: [],
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
        authenticated: (state) => state.userInfo.email !== undefined,
    },
    actions: {
        setShowPopupLogin(value) {
            this.showPopupLogin = value
        },
        async fetchCurrentUser() {
            if (typeof window === 'undefined') {
                return;
            }
            const accessToken = await getIndexedDB("access_token") || "";
            const visitorId = await getIndexedDB("__visitor");

            // const access_token = typeof window !== 'undefined' ? localStorage?.getItem("access_token") : "";
            // console.log(111, accessToken)
            if (!accessToken) {
                this.fetchedUser = true;
                return;
            }
            const isValidToken = accessToken.split(".").length === 3;
            // console.log(222)
            if (!isValidToken) {
                // localStorage?.removeItem("access_token");
                await setIndexedDB('access_token', '');
                this.fetchedUser = true;
                return;
            }

            const isExpired = jwt_decode(accessToken).exp < Date.now() / 1000;
            // console.log(333)
            if (isExpired) {
                // localStorage?.removeItem("access_token");
                await setIndexedDB('access_token', '');
                this.fetchedUser = true;
                return;
            }

            try {
                this.userInfo = {...this.userInfo, ...jwt_decode(accessToken)};
                // console.log(777, this.userInfo)
                this.fetchedUser = true;

                // Retrieve visitorId from IndexedDB
                const headers = {
                    Authorization: accessToken,
                    VisitorId: visitorId?.visitor_id,
                    PlatformId: 1,
                };

                // console.log(444)
                const {current_plan, ...userInfo} = await fetchUserProfile(headers);
                // console.log(555, userInfo, !userInfo?.id)
                if (!userInfo?.id) {
                    this.userInfo = {};
                    return;
                }
                this.userInfo = {...userInfo, current_plan};
                // console.log(666, this.userInfo)
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
        async logOut() {
            console.log("Logging out");
            if (typeof window !== 'undefined') {
                await setIndexedDB('access_token', '');
                localStorage.removeItem("access_token");
            }
            this.user = null;

            window.location.reload();
        },
        async handleGoogleCredentialResponse(response) {
            console.log("Handling Google Credential Response");
            const credential = response.credential;
            getDeviceInformation().then(async result => {
                const visitorData = composeDeviceInformation(result);
                const visitorId = visitorData["visitor_id"];
                const payload = {
                    google_token: response.credential,
                    ...visitorData,
                };
                console.log("Credential: ", credential);
                try {
                    await googleCallback({credential});
                    await apiGoogleAuthCallback(payload).then(async res => {
                        if (res === 423) {
                            console.log("User is locked");
                        } else {
                            console.log("res: ", res);
                            await Promise.all([
                                setIndexedDB("__visitor", {
                                    ...visitorData,
                                    'visitor_id': `${res?.user?.id}__${visitorId}`
                                }),
                                setIndexedDB("__visitor_raw", result),
                                setIndexedDB('access_token', res['access_token']),
                                setIndexedDB('refresh_token', res['refresh_token']),
                                setIndexedDB('full_name', res?.user?.name),
                                setIndexedDB('email', res?.user?.email)
                            ]);
                            deleteCookie('session_id');
                            const trackingVisitorId = `${res?.user?.id}__${visitorId}`;
                            const headers = {
                                Authorization: res['access_token'],
                                VisitorId: trackingVisitorId,
                                PlatformId: 1,
                            };
                            const {current_plan, ...userInfo} = await fetchUserProfile(headers);
                            if (userInfo?.id) {
                                this.userInfo = {...userInfo, current_plan};
                                this.fetchedUser = true;
                                window.location.reload();
                            }
                        }
                    });
                } catch (err) {
                    console.log("Error: ", err);
                }
            });
        },
    }
});

onMounted(async () => {
    const currentUserStore = useCurrentUser();
    await currentUserStore.fetchCurrentUser();
});

export const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

const md5 = (inputString) => {
    var hc = "0123456789abcdef";

    function rh(n) {
        var j, s = "";
        for (j = 0; j <= 3; j++) s += hc.charAt((n >> (j * 8 + 4)) & 0x0F) + hc.charAt((n >> (j * 8)) & 0x0F);
        return s;
    }

    function ad(x, y) {
        var l = (x & 0xFFFF) + (y & 0xFFFF);
        var m = (x >> 16) + (y >> 16) + (l >> 16);
        return (m << 16) | (l & 0xFFFF);
    }

    function rl(n, c) {
        return (n << c) | (n >>> (32 - c));
    }

    function cm(q, a, b, x, s, t) {
        return ad(rl(ad(ad(a, q), ad(x, t)), s), b);
    }

    function ff(a, b, c, d, x, s, t) {
        return cm((b & c) | ((~b) & d), a, b, x, s, t);
    }

    function gg(a, b, c, d, x, s, t) {
        return cm((b & d) | (c & (~d)), a, b, x, s, t);
    }

    function hh(a, b, c, d, x, s, t) {
        return cm(b ^ c ^ d, a, b, x, s, t);
    }

    function ii(a, b, c, d, x, s, t) {
        return cm(c ^ (b | (~d)), a, b, x, s, t);
    }

    function sb(x) {
        var i;
        var nblk = ((x.length + 8) >> 6) + 1;
        var blks = new Array(nblk * 16);
        for (i = 0; i < nblk * 16; i++) blks[i] = 0;
        for (i = 0; i < x.length; i++) blks[i >> 2] |= x.charCodeAt(i) << ((i % 4) * 8);
        blks[i >> 2] |= 0x80 << ((i % 4) * 8);
        blks[nblk * 16 - 2] = x.length * 8;
        return blks;
    }

    if (inputString == null) {
        return ""
    }
    var i, x = sb(inputString), a = 1732584193, b = -271733879, c = -1732584194, d = 271733878, olda,
        oldb, oldc, oldd;
    for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
        a = ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = ff(c, d, a, b, x[i + 10], 17, -42063);
        b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = hh(a, b, c, d, x[i + 5], 4, -378558);
        d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = ad(a, olda);
        b = ad(b, oldb);
        c = ad(c, oldc);
        d = ad(d, oldd);
    }
    return rh(a) + rh(b) + rh(c) + rh(d);
}

class FingerPrintEncoder {
    dataSource = {}
    dataHash = {}

    constructor(canvas,
                platform,
                deviceMemory,
                vendor,
                vendorFlavors,
                audioContext,
                hardwareConcurrency,
                timezone,
                fontPreferences,
                fonts,
                userAgent) {
        this.dataSource = {
            canvas,
            platform,
            deviceMemory,
            vendor,
            vendorFlavors,
            audioContext,
            hardwareConcurrency,
            timezone,
            fontPreferences,
            fonts,
            userAgent
        }
    }

    _getDeviceCodeFromUserAgent() {
        const userAgent = this.dataSource.userAgent
        const start = userAgent.indexOf('(')
        const end = userAgent.indexOf(')')
        const deviceInfo = userAgent.slice(start + 1, end)
        const [devicePlatform, _, deviceCode] = deviceInfo.split('; ')
        if (!deviceCode) {
            const switcher = [
                ['Windows', 'Win'],
                ['Mac', 'Mac'],
                ['X11', 'Linux'],
                ['Linux', 'Linux'],
                ['iPhone', 'iPhone'],
                ['iPad', 'iPad']
            ]
            for (let matcher of switcher) {
                if (devicePlatform.includes(matcher[0])) {
                    return matcher[1]
                }
            }
        }
        return deviceCode
    }

    getCanvasHash() {
        const canvasString = JSON.stringify(this.dataSource.canvas)
        this.dataHash.canvas = md5(canvasString)
    }

    getPlatformHash() {
        this.dataHash.platform = md5(this.dataSource.platform)
    }

    getDeviceMemoryHash() {
        const deviceMemoryString = JSON.stringify(this.dataSource.deviceMemory)
        this.dataHash.deviceMemory = md5(deviceMemoryString)
    }

    getVendorHash() {
        this.dataHash.vendor = md5(this.dataSource.vendor)
    }

    getVendorFlavorsHash() {
        const vendorFlavorsString = JSON.stringify(this.dataSource.vendorFlavors)
        this.dataHash.vendorFlavors = md5(vendorFlavorsString)
    }

    getAudioContextHash() {
        this.dataHash.audioContext = md5(this.dataSource.audioContext)
    }

    getHardwareConcurrencyHash() {
        this.dataHash.hardwareConcurrency = md5(this.dataSource.hardwareConcurrency)
    }

    getTimezoneHash() {
        this.dataHash.timezone = md5(this.dataSource.timezone)
    }

    getFontPreferencesHash() {
        const fontPreferencesString = JSON.stringify(this.dataSource.fontPreferences)
        this.dataHash.fontPreferences = md5(fontPreferencesString)
    }

    getFontsHash() {
        const fontsString = JSON.stringify(this.dataSource.fonts)
        this.dataHash.fonts = md5(fontsString)
    }

    getDeviceCodeHash() {
        const deviceCode = this._getDeviceCodeFromUserAgent()
        this.dataHash.deviceCode = md5(deviceCode)
    }

    getHash() {
        this.getCanvasHash()
        this.getPlatformHash()
        this.getVendorHash()
        this.getVendorFlavorsHash()
        this.getAudioContextHash()
        this.getDeviceMemoryHash()
        this.getHardwareConcurrencyHash()
        this.getTimezoneHash()
        this.getFontPreferencesHash()
        this.getFontsHash()
        this.getDeviceCodeHash()

        const dataHashString = JSON.stringify(this.dataHash)
        return md5(dataHashString)
    }
}

export const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

export const composeDeviceInformation = (rawInformation) => {
    console.log("pre_compose:rawInformation::")
    const result = {}
    for (let key in rawInformation.components) {
        if (key === 'plugins') {
            result[key] = rawInformation.components[key].value.map(plugin => {
                return plugin.name;
            })
        } else if (key === 'languages') {
            result[key] = rawInformation.components[key].value.map(language => {
                return language[0];
            })
        } else if (key === 'domBlockers') {
            if (typeof rawInformation.components[key].value !== 'number') {
                result['dom_blockers'] = 0
            } else {
                result['dom_blockers'] = rawInformation.components[key].value
            }
        } else {
            result[camelToSnakeCase(key)] = rawInformation.components[key].value;
        }
    }
    const encoder = new FingerPrintEncoder(
        result['canvas'],
        result['platform'],
        result['device_memory'],
        result['vendor'],
        result['vendor_flavors'],
        result['audio'],
        result['hardware_concurrency'],
        result['timezone'],
        result['font_preferences'],
        result['fonts'],
        navigator.userAgent
    )
    rawInformation.oldVisitorId = rawInformation.visitorId;
    rawInformation.visitorId = encoder.getHash()
    result['visitor_id'] = rawInformation.visitorId;
    result['service'] = 'metric.vn';
    result['raw_data'] = rawInformation;
    console.log("post_compose:rawInformation::", result)
    return result;
}
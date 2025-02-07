import {getCookie} from "~/helpers/CookieHelper";
import {removeEmpty} from "~/helpers/ObjectHelper";
import {isMobileDevice} from "~/helpers/DeviceHelper";
import {getIndexedDB} from "~/helpers/IndexedDBHelper";

export async function generateHash(data) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}

const getGlobalVariable = async () => {
    let visitor_id = null
    let user_id = null
    let user_email = null
    let role = null
    let url_referrer = null
    let _fbc = null
    let _fbp = null
    let url = null
    let is_mobile = null
    let route_name = null
    let utm_source = null
    let utm_medium = null
    let utm_campaign = null
    let utm_term = null
    let utm_content = null
    let source_traffic = null
    let first_visit = null
    let pub = null
    if (process.env.SSR !== 'true') {
        // visitor_id = await getIndexedDB('__visitor')?.visitor_id
        visitor_id = getCookie('visitor_id')
        const user_store = useCurrentUser();
        user_id = user_store?.userInfo?.id
        user_email = user_store?.userInfo?.email
        role = window?.$nuxt?.$store.getters["user/userPlan"]
        first_visit = await getIndexedDB('first_visit')
        utm_source = getCookie('utm_source')
        utm_medium = getCookie('utm_medium')
        utm_campaign = getCookie('utm_campaign')
        utm_term = getCookie('utm_term')
        utm_content = getCookie('utm_content')
        source_traffic = getCookie('source_traffic')
        pub = getCookie('pub')
        url_referrer = getCookie('url_referrer')
        _fbc = getCookie('_fbc')
        _fbp = getCookie('_fbp')
        is_mobile = isMobileDevice()
        url = document.location.href
        route_name = window.location.pathname
    }
    return removeEmpty({
        visitor_id,
        user_id,
        user_email,
        role,
        url_referrer,
        url,
        route_name,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        source_traffic,
        pub,
        _fbc,
        _fbp,
        utm_content,
        is_mobile,
        first_visit,
    })
}
export {
    getGlobalVariable
}

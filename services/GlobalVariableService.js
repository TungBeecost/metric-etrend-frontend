import {getCookie} from "~/helpers/CookieHelper";
import {removeEmpty} from "~/helpers/ObjectHelper";
import {isMobileDevice} from "~/helpers/DeviceHelper";
import {getIndexedDB} from "~/helpers/IndexedDBHelper";

const getGlobalVariable = async () => {
    let visitor_id = null
    let user_id = null
    let user_email = null
    let role = null
    let url_referrer = null
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
        visitor_id = await getIndexedDB('__visitor')?.visitor_id
        user_id = window?.$nuxt?.$store.getters["user/userProfile"]?.id
        user_email = window?.$nuxt?.$store.getters["user/userProfile"]?.email
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
        is_mobile = isMobileDevice()
        // url_referrer = document.referrer
        url = document.location.href
        route_name = window.location.pathname
        // console.log('role', role)
    }
    return removeEmpty({
        visitor_id: visitor_id,
        user_id: user_id,
        user_email: user_email,
        role: role,
        url_referrer: url_referrer,
        url: url,
        route_name: route_name,
        utm_source: utm_source,
        utm_medium: utm_medium,
        utm_campaign: utm_campaign,
        utm_term: utm_term,
        source_traffic: source_traffic,
        pub: pub,
        utm_content: utm_content,
        is_mobile: is_mobile,
        first_visit: first_visit
    })
}
export {
    getGlobalVariable
}

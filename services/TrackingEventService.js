import {getGlobalVariable} from "~/services/GlobalVariableService";
import {extractDomain} from "~/helpers/UrlHelper";
import {isClient} from "~/helpers/BrowserHelper";
import mixpanel from 'mixpanel-browser'

const shouldTrack = () => {
    if (isClient) {
        // return true
        let domain = extractDomain(document.location.href)
        let variables = getGlobalVariable()
        if (domain !== 'localhost' && !variables?.user_email?.includes('@metric.vn')) {
            return true
        }
    }
    return false
}

const initTracking = () => {
    if (shouldTrack()) {
        let variables = getGlobalVariable()
        if (variables?.user_id) {
            // gtag('set', {'user_id': variables.user_id});
            mixpanel?.identify?.(variables.user_id);
            window?.clarity?.("identify", variables.user_id)
        }
        let optionsDefault = {
            visitor_id: variables?.visitor_id,
            user_id: variables?.user_id,
            user_email: variables?.user_email,
            role: variables?.role,
            // url_referrer: variables?.url_referrer,
            // url: variables?.url,
            // route_name: variables?.route_name,
            utm_source: variables?.utm_source,
            utm_medium: variables?.utm_medium,
            utm_campaign: variables?.utm_campaign,
            utm_term: variables?.utm_term,
            utm_content: variables?.utm_content,
            pub: variables?.pub,
            is_mobile: variables?.is_mobile,
            // first_visit: variables?.first_visit,
        }
        // gtag('set', 'user_properties', optionsDefault)
        mixpanel?.people?.set?.(optionsDefault)
        mixpanel?.people?.set_once?.({first_visit: variables?.first_visit})
    }
}

export {
    initTracking,
}

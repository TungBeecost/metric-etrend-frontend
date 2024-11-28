import mixpanel from 'mixpanel-browser'
import {getIndexedDB} from "~/helpers/IndexedDBHelper.js";
import {removeEmpty} from "~/helpers/ObjectHelper.js";
import {extractDomain} from "~/helpers/utils.js";
import {getGlobalVariable} from "~/services/GlobalVariableService.js";
import {apiSendTrackingData} from "~/services/tracking/ApiTrackingData.js";
import {isClient} from "~/helpers/BrowserHelper.ts";

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

// const initTracking = () => {
//   if (shouldTrack()) {
//     let variables = getGlobalVariable()
//     if (variables?.user_id) {
//       gtag('set', {'user_id': variables.user_id});
//       mixpanel?.identify?.(variables.user_id);
//       window?.clarity?.("identify", variables.user_id)
//     }
//     let optionsDefault = {
//       visitor_id: variables?.visitor_id,
//       user_id: variables?.user_id,
//       user_email: variables?.user_email,
//       role: variables?.role,
//       // url_referrer: variables?.url_referrer,
//       // url: variables?.url,
//       // route_name: variables?.route_name,
//       utm_source: variables?.utm_source,
//       utm_medium: variables?.utm_medium,
//       utm_campaign: variables?.utm_campaign,
//       utm_term: variables?.utm_term,
//       utm_content: variables?.utm_content,
//       pub: variables?.pub,
//       is_mobile: variables?.is_mobile,
//       // first_visit: variables?.first_visit,
//     }
//     gtag('set', 'user_properties', optionsDefault)
//     mixpanel?.people?.set?.(optionsDefault)
//     mixpanel?.people?.set_once?.({first_visit: variables?.first_visit})
//   }
// }

const setUserProperties = (options) => {
  if (shouldTrack()) {
    let optionsMerged = removeEmpty(options)
    gtag('set', 'user_properties', optionsMerged)
    mixpanel?.people?.set?.(optionsMerged)
  }
}

const trackEventCommon = async (eventName, eventCategory, eventLabel = '', value = 1, params = null, isStoreApi = true) => {
  if (shouldTrack()) {
    await trackEventCustom(eventName, {
      'event_category': eventCategory,
      'event_label': eventLabel,
      'value': value,
      ...params
    }, isStoreApi)
    mixpanel?.people?.increment({
      eventName: value
    });
  }
}

// const trackEventConversion = async (eventName, eventCategory, eventLabel = '', value = 1, params = null, isStoreApi = true) => {
//   if (shouldTrack()) {
//     await trackEventCommon(eventName, eventCategory, eventLabel, value, params, isStoreApi)
//     window?.clarity?.("upgrade", eventName)
//   }
// }

// const trackEventConversionPixel = async (eventName, content_category, content_ids, content_name, content_type, contents, currency, num_items, search_string, status, value = 1, phone = null, params = null, isStoreApi = true) => {
//   if (shouldTrack()) {
//     let trackParams = {}
//     if (content_category) {
//       trackParams.content_category = content_category
//     }
//     if (content_ids) {
//       trackParams.content_ids = content_ids
//     }
//     if (content_name) {
//       trackParams.content_name = content_name
//     }
//     if (content_type) {
//       trackParams.content_type = content_type
//     }
//     if (contents) {
//       trackParams.contents = contents
//     }
//     if (currency) {
//       trackParams.currency = currency
//     }
//     if (num_items) {
//       trackParams.num_items = num_items
//     }
//     if (search_string) {
//       trackParams.search_string = search_string
//     }
//     if (status) {
//       trackParams.status = status
//     }
//     if (value) {
//       trackParams.value = value
//     }
//     let variables = getGlobalVariable()
//     if (variables?.user_email) {
//       trackParams.em = variables.user_email
//     }
//     if (phone) {
//       trackParams.ph = formatPhoneVN(phone)
//     }
//     console.log('fbq: ', eventName, trackParams)
//
//     fbq?.('track', eventName, trackParams)
//   }
// }

const trackEventCustom = async (eventName, params, isStoreApi = true) => {
  if (shouldTrack()) {
    let variables = getGlobalVariable()
    const paramsEvent = {...params, ...variables}
    gtag?.('event', eventName, paramsEvent)
    mixpanel?.track?.(eventName, paramsEvent)
    window?.clarity?.("set", "event", eventName)
    if (isStoreApi) {
      await sendTrackingBehavior(paramsEvent, eventName)
    }
  } else {
    if (isClient) {
      let variables = getGlobalVariable()
      const paramsEvent = {...params, ...variables}
      console.log('[dev] event', eventName, paramsEvent)
    }
  }
}

const sendTrackingBehavior = async (dataTracking = {}, type = 'default') => {
  const timestamp = Date.now();
  const currentUserStore = useCurrentUser();
  const user = currentUserStore.userInfo;
  let userId;
  let userRole;

  if (!user || !user.id) {
    userId = 'guest';
    userRole = 'market_guest';
  } else {
    userId = user.id;
    userRole = currentUserStore.userInfo.current_plan.plan_id;
  }

  const visitor = await getIndexedDB('__visitor');
  const payload = {
    type,
    data: {
      timestamp,
      os_platform: visitor?.platform,
      user_agent: window.navigator.userAgent,
      user_id: userId,
      url: window.location.href,
      client_id: visitor?.visitor_id,
      plan_id: userRole,
      ...dataTracking
    }
  };

  const [_, err] = await apiSendTrackingData(payload);
  if (err) {
    console.warn("[TRACKING] sendTrackingBehavior::", err);
    return false;
  }
  return true;
};

// //mixpanel
// const trackUserUnionProperties = async (options) => {
//   mixpanel?.people?.union?.(options);
// }

export {
  // initTracking,
  trackEventCommon,
  setUserProperties,
  // trackUserUnionProperties,
  // trackEventConversion,
  // trackEventConversionPixel
}

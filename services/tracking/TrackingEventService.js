import mixpanel from 'mixpanel-browser';
import { getIndexedDB } from '~/helpers/IndexedDBHelper.js';
import { removeEmpty } from '~/helpers/ObjectHelper.js';
import { extractDomain } from '~/helpers/utils.js';
import { getGlobalVariable } from '~/services/GlobalVariableService.js';
import { apiSendTrackingData } from '~/services/tracking/ApiTrackingData.js';
import { isClient } from '~/helpers/BrowserHelper.ts';
import {formatPhoneVN} from "~/helpers/JsonHelper.js";
import gtag from "~/plugins/gtag.js";

const shouldTrack = async () => {
  if (isClient) {
    let domain = extractDomain(document.location.href);
    let variables = await getGlobalVariable();
    if (domain !== 'localhost' && !variables?.user_email?.includes('@metric.vn')) {
      return true; // Cho phép theo dõi sự kiện
    }
  }
  return false;  // Không theo dõi sự kiện
};

const setUserProperties = async (options) => {
  if (await shouldTrack()) {
    let optionsMerged = removeEmpty(options);
    // Cập nhật user_properties cho Google Analytics và Mixpanel
    gtag('set', 'user_properties', optionsMerged);
    // mixpanel?.people?.set?.(optionsMerged);
  }
};

const trackEventCommon = async (eventName, eventCategory, eventLabel = '', value = 1, params = null, isStoreApi = true) => {
  if (await shouldTrack()) {
    const eventDetails = {
      'event_category': eventCategory,
      'event_label': eventLabel,
      'value': value,
      ...params
    };
    trackEventCustom(eventName, eventDetails, isStoreApi);
    postHogTrackEvent(eventName, eventDetails, isStoreApi);
  } else {
    console.log('Tracking is disabled');
  }
};

const trackEventCustom = async (eventName, params, isStoreApi = true) => {
  console.log('trackEventCustom called with:', { eventName, params, isStoreApi });

  const currentUserStore = useCurrentUser();
  const user = currentUserStore.userInfo;

  if (user && user.id) {
    // Gửi user_id tới Google Analytics thông qua setUserId
    const setUserId = useNuxtApp().$setUserId;
    if (setUserId) {
      console.log('Setting user_id through setUserId...');
      setUserId(user.id);
    } else {
      console.warn('setUserId is not available');
    }
  } else {
    console.log('No user id found');
  }

  if (await shouldTrack()) {
    let variables = getGlobalVariable();

    // Thêm user_id vào paramsEvent
    const paramsEvent = {
      ...params,
      ...variables,
      user_id: user ? user.id : null
    };

    // Truyền event tới các công cụ theo dõi
    const trackEvent = useNuxtApp().$trackEvent;
    if (trackEvent) {
      trackEvent(eventName, paramsEvent);  // Gọi trackEvent từ plugin
    } else {
      console.warn('trackEvent function is not defined');
    }

    window?.clarity?.("set", "event", eventName);

    if (isStoreApi) {
      await sendTrackingBehavior(paramsEvent, eventName);
    }
  } else {
    console.log('Tracking is disabled');

    if (isClient) {
      let variables = getGlobalVariable();
      const paramsEvent = {
        ...params,
        ...variables,
        user_id: user ? user.id : null // Thêm user_id vào paramsEvent trong dev mode
      };
      console.log('[dev] event', eventName, paramsEvent);
    }
  }
};


const postHogTrackEvent = async (eventName, params, isStoreApi) => {
  console.log('postHogTrackEvent called with:', { eventName, params, isStoreApi });
  if (await shouldTrack()) {
    const posthog = useNuxtApp().$posthog;
    if (posthog) {
      const variables = await getGlobalVariable();
      const paramEvent = { ...params, ...variables };
      console.log('[posthog] event', eventName, paramEvent);
      posthog.capture(eventName, paramEvent);
    }
  }
}

const trackEventConversionPixel = async (eventName, content_category, content_ids, content_name, content_type, contents, currency, num_items, search_string, status, value, phone = null, params = null, isStoreApi = true) => {
  console.log('trackEventConversionPixel called with:', { eventName, content_category, content_ids, content_name, content_type, contents, currency, num_items, search_string, status, value, phone, params, isStoreApi });
  if (await shouldTrack()) {
    let trackParams = {}
    if (content_category) {
      trackParams.content_category = content_category
    }
    if (content_ids) {
      trackParams.content_ids = content_ids
    }
    if (content_name) {
      trackParams.content_name = content_name
    }
    if (content_type) {
      trackParams.content_type = content_type
    }
    if (contents) {
      trackParams.contents = contents
    }
    if (currency) {
      trackParams.currency = currency
    }
    if (num_items) {
      trackParams.num_items = num_items
    }
    if (search_string) {
      trackParams.search_string = search_string
    }
    if (status) {
      trackParams.status = status
    }
    if (value) {
      trackParams.value = value
    }
    let variables = getGlobalVariable()
    if (variables?.user_email) {
      trackParams.em = variables.user_email
    }
    if (phone) {
      trackParams.ph = formatPhoneVN(phone)
    }
    console.log('fbq: ', eventName, trackParams)

    if (typeof fbq !== 'undefined') {
      fbq('track', eventName, trackParams)
    } else {
      console.warn('fbq is not defined');
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
  console.log('Tracking payload:', payload);

  const [_, err] = await apiSendTrackingData(payload);
  if (err) {
    console.warn("[TRACKING] sendTrackingBehavior::", err);
    return false;
  }
  return true;
};

export {
  trackEventCommon,
  setUserProperties,
  trackEventConversionPixel,
  shouldTrack
};

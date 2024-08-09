import axios from "axios";
import {v4 as uuidV4} from "uuid"
import {getIndexedDB} from "~/helpers/IndexedDBHelper";

const TRACKING_ORIGIN = 'https://logv3.metric.vn'

const urlTrackingUserBehavior = _ => `${TRACKING_ORIGIN}/v1/collect_event`

const TrackingBehaviorType = {
  PROACTIVE: 'proactive',
  PASSIVE: 'passive',
  SEARCH_BODY: 'search_body'
}

const apiSendTrackingData = async payload => {
  try {
    const trackingEndpoint = urlTrackingUserBehavior()
    const response = await axios.post(trackingEndpoint, payload)
    return [response?.data, undefined]
  } catch (err) {
    return [undefined, err]
  }
}

const _getVisitorInformation = async key => {
  const visitor = await getIndexedDB('__visitor')
  return visitor?.[key]
}

async function sendTrackingBehavior(dataTracking={}, type=TrackingBehaviorType.PROACTIVE) {
  const timestamp = Date.now()
  const user = window.$nuxt.$store.getters['user/userProfile']
  let userId;
  let userRole;
  if (!user) {
    userId = 'guest'
    userRole = 'market_guest'
  }
  else {
    userId = user.id
    userRole = user['roles'] ? user['roles'][0] : 'market_default'
  }
  const payload = {
    type,
    data: {
      timestamp,
      os_platform: _getVisitorInformation('platform'),
      user_agent: window.navigator.userAgent,
      user_id: userId,
      url: window.location.href,
      client_id: _getVisitorInformation('visitor_id'),
      plan_id: userRole,
      ...dataTracking
    }
  }
  const [_, err] = await apiSendTrackingData(payload)
  if (err) {
    console.warn("[TRACKING] sendTrackingBehavior::", err)
    return false
  }
  return true
}

export const generateUUIDV4 = _ => {
  return uuidV4()
}

export default {
  type: TrackingBehaviorType,
  sendTrackingBehavior
}

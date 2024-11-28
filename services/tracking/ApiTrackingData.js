import axios from "axios";
import {urlTrackingUserBehavior} from "~/api/Endpoint.js";

const apiSendTrackingData = async (payload) => {
  try {
    const urlApi = urlTrackingUserBehavior()
    const response = await axios.post(urlApi, payload)
    return [response?.data, undefined]
  } catch (err) {
    return [undefined, err]
  }
}
export {
  apiSendTrackingData
}

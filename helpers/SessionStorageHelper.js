import {isJson} from '~/helpers/JsonHelper'

const sessionStorageGet = (key, defaultValue = null) => {
  let value = sessionStorage.getItem(key)
  if (value != null) {
    if (isJson(value)) {
      return JSON.parse(value)
    } else {
      return value
    }
  } else {
    return defaultValue
  }
}

const sessionStorageSet = (key, value) => {
  if (typeof value === 'object') {
    sessionStorage.setItem(key, JSON.stringify(value))
  } else {
    sessionStorage.setItem(key, value)
  }

}

export {
  sessionStorageGet,
  sessionStorageSet,
}

import { isJson } from '~/helpers/JsonHelper'

const localStorageGet = (key, defaultValue = null) => {
  let value = localStorage.getItem(key)
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

const localStorageSet = (key, value) => {
  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, value)
  }

}

export {
  localStorageGet,
  localStorageSet,
}

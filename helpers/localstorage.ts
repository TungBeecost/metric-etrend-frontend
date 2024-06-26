import { isJson } from "./json";

const localStorageGet = (key: string, defaultValue = null) => {
  const value = localStorage.getItem(key);
  if (value != null) {
    if (isJson(value)) {
      return JSON.parse(value);
    } else {
      return value;
    }
  } else {
    return defaultValue;
  }
};

const localStorageSet = (key: string, value: any) => {
  if (typeof value === "object") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};

export { localStorageGet, localStorageSet };

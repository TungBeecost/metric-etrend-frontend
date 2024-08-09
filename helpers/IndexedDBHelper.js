import localforage from "localforage";

const metricStore = localforage.createInstance({
  name: "metric_store"
});

export const setIndexedDB = async (key, value) => {
  await metricStore.setItem(key, value)
}

export const getIndexedDB = async (key) => {
  return await metricStore.getItem(key)
}

export const removeIndexedDB = async (key) => {
  return await metricStore.removeItem(key)
}

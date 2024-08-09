const removeEmpty = (obj) => {
  return Object.keys(obj)
    .filter((k) => obj[k] != null)
    .reduce((a, k) => ({...a, [k]: obj[k]}), {});
}

export {
  removeEmpty
}

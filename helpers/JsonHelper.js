const isJson = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const formatPhoneVN = (phone) => {
// format phone to 84xxxxxxxxx
  if (phone == null) {
    return phone
  }
  phone = phone.replace(/[^0-9]/g, '')
  if (phone.length === 10) {
    return '84' + phone.substring(1)
  }
  return phone
}

export {
  isJson,
  formatPhoneVN
}

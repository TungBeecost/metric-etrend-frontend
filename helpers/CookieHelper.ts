const parseCookieToObj = (cookieString: string | null) => {
  let cookieObj = null
  if (cookieString && cookieString.length > 0) {
    cookieObj = {}
    for (let e of cookieString.split('; ')) {
      let tuples = e.split('=')
      // @ts-ignore
      cookieObj[[tuples[0]]] = decodeURIComponent(tuples[1])
    }
  }

  return cookieObj
}

const getCookie = (name: string, defaultValue = null) => {
  // @ts-ignore
  if (process.env.SSR !== 'true') {
    let nameEQ = name + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return defaultValue
  }
}

const setCookie = (name: string, value: string, days = 30, path = '/') => {
  // @ts-ignore
  if (process.env.SSR !== 'true') {
    const domain = '.ereport.metric.vn';

    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    // document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
    // document.cookie = name + '=' + value + '; expires=' + expires + '; path=' + path
    document.cookie = name + '=' + value + '; expires=' + expires + '; path=' + path + '; domain=' + domain;
  }
}

const removeCookie = (name: string) => {
  if (process.env.SSR !== 'true') {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }
}

const getAllCookies = () => {
  if (process.env.SSR !== 'true') {
    let result = Object.fromEntries(document.cookie.split('; ').map(c => c.split('=')))
    return result
  }
  return null
}

const deleteCookieExpanded = (name: string, domain: string) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=' + domain + ';'
}

export {
  getCookie,
  setCookie,
  parseCookieToObj,
  getAllCookies,
  removeCookie,
  deleteCookieExpanded
}

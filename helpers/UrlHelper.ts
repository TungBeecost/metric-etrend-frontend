const getUrlCurrent = () => {
  let urlCurrent = normalizeUrl(window.location.href)
  return urlCurrent
}

const extractDomain = (url: string | null) => {
  if (url == null) {
    return null
  }
  let hostname

  // find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2]
  } else {
    hostname = url.split('/')[0]
  }

  // find & remove port number
  hostname = hostname.split(':')[0]
  // find & remove "?"
  hostname = hostname.split('?')[0]
  if (hostname.startsWith('www.')) {
    hostname = hostname.replace('www.', '')
  }
  return hostname
}

const normalizeUrl = (url: string) => {
  // loại bỏ ?, #
  let urlNormalization = url
  if (url != null) {
    // urlNormalization = url.split('?')[0].split('#')[0]

    urlNormalization = urlNormalization.replace('/#/', '')
      .replace('#/', '')
    if (urlNormalization[urlNormalization.length - 1] === '/') {
      urlNormalization = urlNormalization.substring(0, urlNormalization.length - 1)
    }
    // if (urlNormalization.substring(urlNormalization.length - 2, urlNormalization.length) === '#/') {
    //   urlNormalization = urlNormalization.substring(0, urlNormalization.length - 2)
    // }
  }
  return urlNormalization
}

const getParamsFromUrl = (url: string) => {
  if (url?.length > 0){
    const hashes = url.slice(url.indexOf('?') + 1)
      .split('&')
    return hashes.reduce((params, hash) => {
      const split = hash.indexOf('=')

      if (split < 0) {
        return Object.assign(params, {
          [hash]: null
        })
      }

      const key = hash.slice(0, split)
      const val = hash.slice(split + 1)

      return Object.assign(params, {[key]: decodeURIComponent(val)})
    }, {})
  }
  return null
}


const addParamFromUrl = (url: string, key: string, value: string) => {
  if (url == null || url.length === 0) {
    return url
  }
  if (value == null || value.length === 0) {
    return url
  }
  let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i")
  let separator = url.indexOf('?') !== -1 ? "&" : "?"
  let valueNormalize = encodeURIComponent(value)
  if (url.match(re)) {
    return url.replace(re, '$1' + key + "=" + valueNormalize + '$2')
  } else {
    return url + separator + key + "=" + valueNormalize
  }
}

const addParamsFromUrl = (url: string, params: any) => {
  let urlNew = url
  if (params === null || params.length === 0) {
    return urlNew
  }
  for (let param of params) {
    let key = param['key']
    let value = param['value']
    urlNew = addParamFromUrl(urlNew, key, value)
  }
  return urlNew
}

const addParamsObjFromUrl = (url: string, params: any) => {
  let urlNew = url
  if (params === null) {
    return urlNew
  }
  for (let key in params) {
    let value = params[key]
    urlNew = addParamFromUrl(urlNew, key, value)
  }
  return urlNew
}

const addLocationBrandtoUrl = (relativePath: string, object: {key: string, path: string}) => {
  if (relativePath.includes(object.key)) {
    let parts = relativePath.split('/');
    if (object.path) {
      parts[parts.indexOf(object.key) + 1] = object.path.substring(1)
    } else {
      parts.splice(parts.indexOf(object.key), 2);
    }
    return parts.join('/');
  }
  return object.path ? '/' + object.key  + object.path + relativePath : relativePath;
}

export {
  extractDomain,
  normalizeUrl,
  getParamsFromUrl,
  getUrlCurrent,
  addParamsFromUrl,
  addParamFromUrl,
  addParamsObjFromUrl,
  addLocationBrandtoUrl
}

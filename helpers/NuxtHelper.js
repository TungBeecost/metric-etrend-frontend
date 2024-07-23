const getIpClient = (req) => {
  let ip = null
  if (req?.headers?.['x-forwarded-for']?.length > 0) {
    ip = req?.headers?.['x-forwarded-for'].split(',').pop()
    let ipConnecting = req?.headers?.['cf-connecting-ip']
    if (ipConnecting?.length > 0) {
      ip = ipConnecting
    }

    // console.log('req?.headers:', req?.headers, ip)

    // if request.environ.get('HTTP_X_FORWARDED_FOR') is None:
    //     return jsonify({'ip': request.environ['REMOTE_ADDR']}), 200
    // else:
    //   return jsonify({'ip': request.environ['HTTP_X_FORWARDED_FOR']}), 200
    //  todo update

    // cf-connecting-ip

  } else {
    ip = req?.connection?.remoteAddress || req?.socket?.remoteAddress || req?.connection?.socket?.remoteAddress
  }

  return ip
}

const redirectNuxt = (context, url, statusCode = 301) => {
  if (url?.length > 0) {
    if (context?.req && context?.redirect) {
      return context?.redirect(statusCode, url)
    } else {
      if (process.env.SSR !== 'true') {
        window.location.href = url
        return
      }
    }
  }
  return
}

const getUrlCurrent = (context) => {
  return context?.req?.originalUrl || window?.location?.href
}

const getUrlReferrer = (context) => {
  let urlRefererBrowser = null
  if (process.env.SSR !== 'true') {
    urlRefererBrowser = window.document.referrer
  }
  // let referer = context?.from?.fullPath || context?.req?.referer || urlRefererBrowser
  let referer = urlRefererBrowser || context?.from?.fullPath || context?.req?.referer
  return referer
}


const setCookieNuxt = (context, name, value, days = 30, path = '/') => {
  if (context?.res) {
    let now = Date.now()
    context?.res?.setHeader("Set-Cookie", [`${name}=${value}; path=${path}; expires=${new Date(now + days * 1000 * 3600 * 24).toUTCString()};`])
  } else {
    if (process.env.SSR !== 'true') {
      const expires = new Date(Date.now() + days * 864e5).toUTCString()
      document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
    }
  }
}

export {
  getIpClient,
  redirectNuxt,
  getUrlCurrent,
  setCookieNuxt,
  getUrlReferrer
}

const getUrlAnalyticShop = (urlShop) => {
  return `${process.env.BASE_URL}/analytics/?shop_url=${urlShop}&utm_content=growth`
}

const getUrlSearchReport = (query) => {
  return `${process.env.BASE_URL}/search?search=${query?.toLowerCase()}`
}

export {
  getUrlAnalyticShop,
  getUrlSearchReport
}

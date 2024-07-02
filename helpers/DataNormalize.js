import {toSeoName} from "~/helpers/StringHelper.js";

const extractProductBaseId = (product_base_id) => {
    let platform_id = null
    let product_id = null
    let product_seller_id = null

    if (product_base_id == null || product_base_id.length === 0) {
        return {
            'platform_id': platform_id,
            'product_id': product_id,
            'product_seller_id': product_seller_id,
        }
    }
    let splits = product_base_id.split('__')
    platform_id = splits[0]
    product_id = splits[1]
    if (splits.length >= 3) {
        product_seller_id = splits[2]
    }
    return {
        'platform_id': String(platform_id),
        'product_id': product_id,
        'product_seller_id': product_seller_id,
    }
}

export const getUrlProductDirect = (productBaseId, productName = 'san-pham') => {
    let {platform_id, product_id, product_seller_id} = extractProductBaseId(productBaseId)
    let urlDirect = null
    switch (platform_id) {
        case '1':
            urlDirect = `https://shopee.vn/${toSeoName(productName)}-i.${product_seller_id}.${product_id}`
            break
        case '2':
            urlDirect = `https://lazada.vn/${toSeoName(productName)}-i${product_id}${product_seller_id ? `-s${product_seller_id}` : ''}.html`
            break
        case '3':
            urlDirect = `https://tiki.vn/${toSeoName(productName)}-p${product_id}.html?spid=${product_seller_id}`
            break
        case '4':
            urlDirect = `https://sendo.vn/${toSeoName(productName)}-${product_id}.html`
            break
        case '5':
            urlDirect = `https://detail.1688.com/offer/${product_id}.html`
            break
        case '6':
            urlDirect = `https://item.taobao.com/item.htm?id=${product_id}`
            break
        case '7':
            urlDirect = `https://detail.tmall.com/item.htm?id=${product_id}`
            break
        case '8':
            urlDirect = `https://www.tiktok.com/view/product/${product_id}`
            break
        default:
            break
    }
    return urlDirect
}

export const openProductUrl = (product) => {
    if (!product.product_base_id) {
        return
    }
    const url = getUrlProductDirect(product.product_base_id, product.product_name);
    window.open(url, '_blank')
}

export const openShopProductUrl = (product) => {
    const url = product.shop_url;
    window.open(url, '_blank')
}
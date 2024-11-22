const getUrlImageThumbnail = (urlImage: string) => {
    if (urlImage?.length > 0 && urlImage.includes('cf.shopee.vn') && !urlImage.endsWith('_tn')) {
        return `${urlImage}_tn`
    }
    return urlImage
}

export {
    getUrlImageThumbnail
}

import {formatNumber} from "~/helpers/FormatHelper.js";

export const extractDomain = (url) => {
    if (url == null) {
        return null;
    }
    let hostname;

    if (url.indexOf("//") > -1) {
        hostname = url.split("/")[2];
    } else {
        hostname = url.split("/")[0];
    }

    // find & remove port number
    hostname = hostname.split(":")[0];
    // find & remove "?"
    hostname = hostname.split("?")[0];
    if (hostname.startsWith("www.")) {
        hostname = hostname.replace("www.", "");
    }
    return hostname;
};

export const formatSortTextCurrencyWithMinValue = (
    price,
    isShortest = false,
    min = 1000
) => {
    if (!!+price === false) {
        return price;
    }
    price = +price;
    if (price - (price % 1000000000) !== 0) {
        if (price % 1000000000 !== 0) {
            price = parseFloat(price / 1000000000).toFixed(1);
        } else {
            price = parseInt(price / 1000000000);
        }
        return `${formatNumber(price)}${isShortest ? " tỷ" : " tỷ"}`;
    }
    if (price - (price % 1000000) !== 0 && price >= min) {
        if (price % 1000000 !== 0) {
            price = parseFloat(price / 1000000).toFixed(1);
        } else {
            price = parseInt(price / 1000000);
        }
        // price = Math.round(price / 1000000) * 1000000;
        return `${formatNumber(price)}${isShortest ? " tr" : " triệu"}`;
    }
    if (price - (price % 1000) !== 0 && price >= min) {
        if (price % 1000 !== 0) {
            price = parseFloat(price / 1000).toFixed(1);
        } else {
            price = parseInt(price / 1000);
        }
        // price = Math.round(price / 1000) * 1000;
        return `${formatNumber(price)}${isShortest ? " ng" : " nghìn"}`;
    }
    return formatNumber(price);
};

export const formatSortTextCurrency = (price, isShortest = false) => {
    if (!!+price === false) {
        return price;
    }
    return formatSortTextCurrencyWithMinValue(price, isShortest)
};

export const getUrlImageOption = (urlImage, type = "thumbnail") => {
    if (
        urlImage?.length > 0 &&
        urlImage.includes("cf.shopee") &&
        urlImage.includes("/file/")
    ) {
        let imageFile = urlImage.split("/file/")[1];
        let imageFileOrigin = imageFile;
        let domain = extractDomain(urlImage);

        if (imageFile.endsWith("_tn")) {
            imageFileOrigin = imageFile.substring(0, imageFile.length - 3);
        }
        if (type === "thumbnail") {
            return `https://${domain}/file/${imageFileOrigin}_tn`;
        }
    }

    return urlImage;
};

export const goToUrl = (url, mode = "_self") => {
    if (url?.length > 0) {
        window.open(url, mode);
    }
};
import {formatNumber} from "~/helpers/FormatHelper.js";

export const goToUrl = (url, mode = "_self") => {
    if (url?.length > 0) {
        window.open(url, mode);
    }
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
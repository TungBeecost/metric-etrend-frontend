
export const formatNumber = (number) => {
    if (number == null || isNaN(number)) {
        return '';
    }
    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    if (parts[1]) {
        parts[1] = parts[1].replace('.', ',');
    }

    return parts.join(',');
};

// eslint-disable-next-line import/no-mutable-exports
let formatNumberHuman = (number) => {
    if (number == null || number === '' || number === '0' || number === 0) {
        return ''
    }
    let priceNormalize = String(number)
    return formatNumber(priceNormalize)
}

export const formatDate = (date) => {
    if (date == null || date === '') {
        return '';
    }
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    return `${day}/${month}/${year}`;
};

const formatCurrency = (price) => {
    if (price == null || price === '') {
        return '';
    }
    if (price === '0' || price === 'None' || price === 0) {
        return '0₫';
    }
    let priceNormalize = String(Number.parseInt(price));
    return formatNumber(priceNormalize) + '₫';
};

const roundAndFormat = (price, divisor, unit, $t) => {
    price = Math.floor(price / divisor);
    if (price >= 1000) {
        price = Math.floor(price / 1000) * 1000;
    } else if (price >= 100) {
        price = Math.floor(price / 100) * 100;
    } else if (price >= 10) {
        price = Math.floor(price / 10) * 10;
    }
    return `${formatNumberRound(price)}+ ${$t(unit)}`;
};

const formatAndRoundSortTextCurrencyWithMinValue = (
    price,
    isShortest = false,
    min = 1000,
    $t = (text) => text
) => {
    if (!!+price === false) {
        return price;
    }
    price = +price;
    if (price - (price % 1000000000) !== 0) {
        return roundAndFormat(price, 1000000000, isShortest ? " tỷ" : " tỷ", $t);
    }
    if (price - (price % 1000000) !== 0 && price >= min) {
        return roundAndFormat(price, 1000000, isShortest ? " tr" : "triệu", $t);
    }
    if (price - (price % 1000) !== 0 && price >= min) {
        return roundAndFormat(price, 1000, isShortest ? " ng" : "nghìn", $t);
    }
    return roundAndFormat(price, 1, "", $t);
};

const formatNumberRound = (number) => {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
};

export {
    formatNumberHuman, formatCurrency, formatAndRoundSortTextCurrencyWithMinValue
}



export const formatNumber = (number) => {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
};

// eslint-disable-next-line import/no-mutable-exports
let formatNumberHuman = (number) => {
    if (number == null || number === '' || number === '0' || number === 0) {
        return ''
    }
    let priceNormalize = String(number)
    return formatNumber(priceNormalize)
}

const formatCurrency = (price) => {
    if (price == null || price === '' || price === '0' || price === 0) {
        return ''
    }
    let priceNormalize = String(Number.parseInt(price))
    return formatNumber(priceNormalize) + '₫'
}

export {
    formatNumberHuman, formatCurrency
}


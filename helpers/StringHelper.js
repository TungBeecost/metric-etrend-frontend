const toSeoName = (name, defaultValue = 'product', maxLength = 100) => {
    if (name == null) {
        return defaultValue
    }
    name = name.toLowerCase().normalize('NFD')
        // .replace(/[^A-Za-z0-9 -]/g, '')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/([^0-9A-Za-z-\s])/g, '')
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace('%', '')
        .replace('+', '')
        .replace(/\(+/g, '')
        .replace(/\)+/g, '')
    if (name.length === 0) {
        return encodeURIComponent(defaultValue)
    } else if (name.length > maxLength) {
        return encodeURIComponent(name.substring(0, maxLength))
    }
    return encodeURIComponent(name)
}

export {
    toSeoName
}
// import {process} from "../type/environment";
const isInt = (n: number) => {
  return Number(n) === n && n % 1 === 0;
}

const isFloat = (n: number) => {
  return Number(n) === n && n % 1 !== 0;
}

// @ts-ignore
const roundFloat = (number: null | number | string, fractionDigits: number = 1) => {
  if (number == null) {
    return number
  }
  let numberRound = number
  if (typeof numberRound == "string") {
    numberRound = parseFloat(numberRound)
  }
  if (isFloat(numberRound)) {
    // @ts-ignore
    return numberRound.toFixed(fractionDigits).toLocaleString('vi', {
      useGrouping: false,
      minimumFractionDigits: fractionDigits
    })
  }
  return numberRound
  // return Number((numberRound).toFixed(fractionDigits))
}

// @ts-ignore
const formatNumberLocale = (number: null | number | string, locale: string = 'vi') => {
  if (number == null) {
    return number
  }
  let numberNormalize = number
  if (typeof numberNormalize == "string") {
    numberNormalize = parseFloat(numberNormalize)
  }
  return new Intl.NumberFormat(locale).format(numberNormalize)
}

// @ts-ignore
const formatCurrencyLocale = (number: null | number | string, locale: string = 'vi', currency = 'VND') => {
  if (number == null) {
    return number
  }
  let numberNormalize = number
  if (typeof numberNormalize == "string") {
    numberNormalize = parseFloat(numberNormalize)
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(numberNormalize)
}

// @ts-ignore
const formatNumberHumanize = (number: null | number | string, locale: string = 'vi', fractionDigits = 1) => {
  if (number == null) {
    return number
  }
  let numberNormalize = number
  if (typeof numberNormalize == "string") {
    numberNormalize = parseFloat(numberNormalize)
  }
  // @ts-ignore
  return Math.abs(numberNormalize) > 999 ? Math.sign(numberNormalize) * ((Math.abs(numberNormalize) / 1000).toFixed(fractionDigits)) + 'k' : Math.sign(numberNormalize) * Math.abs(numberNormalize)
}

const formatApproximately = (number: number, locale: string = 'vi') => {
  if (number == null || !Number.isInteger(number)) {
    return number
  }
  let numberNormalize = parseInt(String(number))
  let numberApproximately = `${numberNormalize}`
  if (numberNormalize< 10) {
    // 8
  } else if (numberNormalize< 100) {
    // 98
    numberApproximately = `${new Intl.NumberFormat(locale).format((numberNormalize/ 10 | 0) * 10)}`
  } else if (numberNormalize< 1000) {
    // 980
    numberApproximately = `${new Intl.NumberFormat(locale).format((numberNormalize/ 100 | 0) * 100)}`
  } else if (numberNormalize< 10000) {
    // 9,800
    numberApproximately = `${new Intl.NumberFormat(locale).format((numberNormalize/ 1000 | 0) * 1000)}`
  } else if (numberNormalize< 100000) {
    // 98,000
    numberApproximately = `${new Intl.NumberFormat(locale).format((numberNormalize/ 10000 | 0) * 10000)}`
  } else if (numberNormalize< 1000000) {
    // 980,000
    numberApproximately = `${new Intl.NumberFormat(locale).format((numberNormalize/ 100000 | 0) * 100000)}`
  } else {
    numberApproximately = `${new Intl.NumberFormat(locale).format((numberNormalize/ 100000 | 0) * 100000)}`
  }
  return numberApproximately
}

const roundPrice = (price: any) => {
  if (price == null || price === '' || price === '0' || price === 0) {
    return ''
  }

  return Math.round(parseFloat(price))
}

const numberFormatReadable = (number: number, locale = 'vi') => {
  if (number == null || !Number.isInteger(number)) {
    return number
  }
  return new Intl.NumberFormat(locale).format(number)
}

const durationReadable = (duration: number) => {
  if (duration == null || !Number.isInteger(duration)) {
    return duration
  }

  let hours = Math.floor(duration / 3600);
  let minutes = Math.floor((duration - (hours * 3600)) / 60);
  let seconds = duration - (hours * 3600) - (minutes * 60);
  let strHours = ''
  let strMinutes = ''
  let strSeconds = ''
  if (hours < 10) {
    strHours = "0" + hours;
  }
  if (minutes < 10 && hours > 0) {
    strMinutes = "0" + minutes;
  }
  if (seconds < 10) {
    strSeconds = "0" + seconds;
  }

  if (hours > 0) {
    return `${strHours} : ${strMinutes} : ${strSeconds}`
  }
  return `${strMinutes} : ${strSeconds}`
}

const numberWithCommas = (number: number, commas = ".") => {
  //todo: change this function, do not use regex \?<!\ => bug with safari
  // return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, commas);
  return formatNumberLocale(number)
}

export {
  isInt,
  roundFloat,
  formatNumberLocale,
  formatCurrencyLocale,
  formatNumberHumanize,
  roundPrice,
  numberFormatReadable,
  durationReadable,
  numberWithCommas,
  formatApproximately
}

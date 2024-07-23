// const isClient = typeof window !== 'undefined'
const isClient = typeof window !== 'undefined' && window != null
export {
  isClient
}

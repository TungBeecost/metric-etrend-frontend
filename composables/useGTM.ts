import { useGtm as useVueGtm } from '@gtm-support/vue-gtm'

export const useGTM = () => {
    const gtm = useVueGtm()
    return gtm
}
import useStorage from "../hooks/useStorage"

const KEY_STORE = {
    cashCurrent: 'CASH_CURRENT',
    priceType: 'PRICE_TYPE'
}

export const cashCurrentStorage = () => {
    const { setItem, getItem, removeItem } = useStorage()

    const getCash = () => getItem(KEY_STORE.cashCurrent)
    const setCash = (value: any) => setItem(KEY_STORE.cashCurrent , value)
    const removeCash = () => removeItem(KEY_STORE.cashCurrent)

    return {
        getCash,
        setCash,
        removeCash
    }
}

export const salesPriceTypeStorage = () => {
    const { setItem, getItem, removeItem } = useStorage()

    const getPriceType = () => getItem(KEY_STORE.priceType)
    const setPriceType = (value: any) => setItem(KEY_STORE.priceType , value)
    const removePriceType = () => removeItem(KEY_STORE.priceType)

    return {
        getPriceType,
        setPriceType,
        removePriceType
    }
}

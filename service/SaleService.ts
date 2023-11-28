import { Api } from "./Api"

const getInformationForSale = async () => {
    const response = await Api.Get(`information/sale`)
    let data: IInformation = {
        paymentMethods: [],
        vouchersSeries: []
    }

    if (response.success) {
       data = response.data
    }
    
    return {
        success: response.success,
        data: data,
        message: response.message
    }
}

const getSaveSale = async (params: IRequestSale) => {
    const response = await Api.Post(`sales`, params)

    return {
        success: response.success,
        data: null,
        message: response.message
    }
}

const SaleService = {
    getInformationForSale,
    getSaveSale
}

export default SaleService
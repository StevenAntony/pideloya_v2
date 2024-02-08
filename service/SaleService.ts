import { Api } from "./Api"

const getInformationForSale = async () => {
    const response = await Api.Get(`information/sale`)
    let data: IInformation = {
        paymentMethods: [],
        vouchersSeries: [],
        cashCompany: []
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

const saveSale = async (params: IRequestSale) => {
    const response = await Api.Post(`sales`, params)

    return {
        success: response.success,
        data: null,
        message: response.message
    }
}

const list = async (params: IRequestList) => {
    const response = await Api.Get(`sales`, params)

    return {
        success: response.success,
        data: null,
        message: response.message
    }
}

const SaleService = {
    getInformationForSale,
    saveSale
}

export default SaleService
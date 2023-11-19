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

const SaleService = {
    getInformationForSale
}

export default SaleService
import { Api } from "./Api"

const getInformationForSale = async () => {
    const response = await Api.Get(`information/sale`)
    let data = {
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

const saveSale = async (params) => {
    const response = await Api.Post(`sales`, params)

    return {
        success: response.success,
        data: response.data,
        message: response.message
    }
}

const listOrdinary = async (cashID) => await Api.Get(`sales?filter=sale-ordinary&cashID=${cashID}`)

const listTable = async (cashID) => await Api.Get(`sales?filter=sale-table&cashID=${cashID}`)

const listDebit = async () => await Api.Get(`sales?filter=to_collect`)

const payDebt = async (params, saleID) =>  await Api.Post(`sales/${saleID}/payments`, params)

const listCancel = async () =>  await Api.Get(`sales?filter=to_delete`)

const cancelSale = async (saleID) =>  await Api.Delete(`sales/${saleID}`)

const checkRequirements = async () => await Api.Post('sales/check-requirements', {})

const SaleService = {
    getInformationForSale,
    saveSale,
    listOrdinary,
    listDebit,
    payDebt,
    listCancel,
    cancelSale,
    checkRequirements,
    listTable
}

export default SaleService

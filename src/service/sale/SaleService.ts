import { ResponseModel } from "@models/ResponseModel"
import { BodySaleCreateModel, ResponseInformationSaleModel, ResponseSaleListModel } from "@models/sale/SaleModel"
import { Api } from "@services/Api"

const listToOrdinary = async (cashID: number) : Promise<ResponseModel<ResponseSaleListModel>> => {
    return await Api.Get(`sales?filter=to_ordinary&cashID=${cashID}`)
}

const getInformationToSale = async () : Promise<ResponseModel<ResponseInformationSaleModel>> => {
    return await Api.Get(`information/sale`)
}

const create = async (body: BodySaleCreateModel): Promise<ResponseModel<null>> =>  {
    return await Api.Post(`sales`, body)
}

export const SaleService = {
    create,
    listToOrdinary,
    getInformationToSale
}

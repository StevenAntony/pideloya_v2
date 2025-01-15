import { BodyReconciliationModel, ResponseCashListToManegmentModel, ResponseCashListToMovementsModel } from "@models/managment/CashModel"
import { ResponseModel } from "@models/ResponseModel"
import { Api } from "@services/Api"

const listToManagement = async () : Promise<ResponseModel<ResponseCashListToManegmentModel>> => await Api.Get(`cashs`)
const listToMovements = async () : Promise<ResponseModel<ResponseCashListToMovementsModel>> => await Api.Get(`cashs?filter=to_movements`)
const open = async (body: { amount: number}): Promise<ResponseModel<null>> => await Api.Post('cashs', body)
const close = async (id: number): Promise<ResponseModel<null>> => await Api.Delete(`cashs/${id}`)

const saveReconciliation = async (body: BodyReconciliationModel): Promise<ResponseModel<null>> =>
{
    return await Api.Post('cashs/reconciliation', body)
}

export const CashService = {
    open,
    close,
    listToMovements,
    listToManagement,
    saveReconciliation
}

import { MovementFormModel, ResponseMovementListToManegmentModel } from "@models/managment/MovementModel";
import { ResponseModel } from "@models/ResponseModel";
import { Api } from "@services/Api";

const listToManagement = async (cashID: number): Promise<ResponseModel<ResponseMovementListToManegmentModel>> => await Api.Get(`movements?cashID=${cashID}`)
const store = async (body: MovementFormModel): Promise<ResponseModel<null>> => await Api.Post('movements', body)
const changeStatus = async (id: number): Promise<ResponseModel<null>> => await Api.Delete(`movements/${id}`)

export const MovementService = {
    store,
    changeStatus,
    listToManagement
}

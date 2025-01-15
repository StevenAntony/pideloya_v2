import { Api } from "./Api"

const list = async () => await Api.Get(`cashs`) // no usado

const listToReport = async () => await Api.Get(`cashs?filter=to_reports`)

const listToMovements = async () => await Api.Get(`cashs?filter=to_movements`) // no usado

const listToCurrent = async () => await Api.Get(`cashs?filter=cashs-current`)

const close = async (id: any) => await Api.Delete(`cashs/${id}`)

const opening = async (params: any) => await Api.Post(`cashs`,params)

const CashService = {
    list,
    close,
    opening,
    listToMovements,
    listToCurrent,
    listToReport
}

export default CashService

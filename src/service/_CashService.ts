import { CashSummaryModel } from "../models/CashModel"
import { Api } from "./Api"
import { ResponseService } from "./ResponseService"

export default class _CashService extends ResponseService {
    private summary: CashSummaryModel|null = null

    constructor(){
        super()
    }

    getSummary():CashSummaryModel|null  {
        return this.summary
    }

    async listSummary(cashID: number) {
        this.response = await Api.Post(`reports/cash/summary`, {cashID})
        if (this.response.success) {
            this.summary = this.response.data
        }
    }
}

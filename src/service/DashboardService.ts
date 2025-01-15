import { Api } from "./Api"
import { ResponseService } from "./ResponseService"

class _DashboardService extends ResponseService {
    private summary: any = []

    constructor(){
        super()
    }

    getSummary(): any {
        return this.summary
    }

    async listSummarySalesAndBuys(year: string){
        this.response = await Api.Post(`dashboard/summary/sale_and_buy/year_by_month`, { year })
        if (this.response.success) {
            this.summary = this.response.data
        }
    }
}

export const DashboardService = new _DashboardService()

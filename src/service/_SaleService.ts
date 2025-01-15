import { Api } from "./Api";
import { ResponseService } from "./ResponseService";

export class _SaleService extends ResponseService {

    constructor(){
        super()
    }

    async listSalesToSunat(){
        this.response = await Api.Get(`sales?filter=send-sales-receipt`)
        if (this.response.success) {

        }
    }

    async listSalesSentSunat(month: string, year: number){
        this.response = await Api.Get(`sales?filter=sales-receipt-sent&month=${month}&year=${year}`)
        if (this.response.success) {

        }
    }

    async sendSalesToSunat(id: number){
        this.response = await Api.Post(`emit/sales-receipt`,{
            id: id
        })
    }

    async findSaleToRemission(nroDocument: string) {
        this.response = await Api.Post(`find/sale-to-remission`, {nroDocument})
    }

    async filters(filters: any) {
        this.response = await Api.Post(`sale/filters`, filters)
    }

    async viewPaymentHistory(saleID: number){
        this.response = await Api.Get(`sales/${saleID}/payments`)
    }
}

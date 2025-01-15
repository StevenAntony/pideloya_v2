import { BuyModel, BuyPaymentStoreModel, BuyStoreModel } from "../models/BuyModel";
import { Api } from "./Api";
import { ResponseService } from "./ResponseService";

class _BuyService extends ResponseService {
    private buys: BuyModel[] = []
    private total: number = 0

    constructor(){
        super()
    }

    getBuys():BuyModel[]  {
        return this.buys
    }

    getTotal():number  {
        return this.total
    }

    async list() {
        this.response = await Api.Get(`buys`)
        if (this.response.success) {
            this.buys = this.response.data.list
            this.total = this.response.data.total
        }
    }

    async listToPay() {
        this.response = await Api.Get(`buys?filter=buy-debit`)
        if (this.response.success) {
            this.buys = this.response.data.list
            this.total = this.response.data.total
        }
    }

    async payDebt(params: BuyPaymentStoreModel, id: number) {
        this.response = await Api.Post(`buys/${id}/payments`, params)
    }

    async listToCancel() {
        this.response = await Api.Get(`buys?filter=buy-cancel`)
        if (this.response.success) {
            this.buys = this.response.data.list
            this.total = this.response.data.total
        }
    }

    async store(params: BuyStoreModel) {
        this.response = await Api.Post(`buys`, params)
    }

    async delete(id: number) {
        this.response = await Api.Delete(`buys/${id}`)
    }
}

export const BuyService = new _BuyService()

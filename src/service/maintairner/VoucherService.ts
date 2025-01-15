import { VoucherModel } from "../../models/VoucherModel"
import { Api } from "../Api"
import { ResponseService } from "./../ResponseService"

export default class VoucherService extends ResponseService {
    private vouchers: VoucherModel[] = []

    constructor(){
        super()
    }

    getVouchers ():VoucherModel[]  {
        return this.vouchers
    }

    async list() {
        this.response = await Api.Get(`vouchers`)
        if (this.response.success) {
            this.vouchers = this.response.data
        }
    }

}

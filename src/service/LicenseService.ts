import { LicenseModel, LicenseStoreModel } from "../models/LicenseModel"
import { typeUser } from "../models/UserModel"
import { Api } from "./Api"
import { ResponseService } from "./ResponseService"

class _LicenseService extends ResponseService {
    private licenses: LicenseModel[] = []

    constructor(){
        super()
    }

    getLicenses(): LicenseModel[] {
        return this.licenses
    }

    async list(){
        this.response = await Api.Get(`licenses`)
        if (this.response.success) {
            this.licenses = this.response.data
        }
    }

    async listMaster(id: number){
        this.response = await Api.Get(`licenses?companyID=${id}`)
        if (this.response.success) {
            this.licenses = this.response.data
        }
    }

    async update(id: number){
        this.response = await Api.Put(`licenses/${id}`)
    }

    async store(params: LicenseStoreModel) {
        this.response = await Api.Post(`licenses`, params)
    }
}

export const LicenseService = new _LicenseService()

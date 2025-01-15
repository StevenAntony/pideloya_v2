import { AccessModel } from "../models/AccessModel"
import { typeUser } from "../models/UserModel"
import { Api } from "./Api"
import { ResponseService } from "./ResponseService"

class _AccessService extends ResponseService {
    private access: AccessModel[] = []

    constructor(){
        super()
    }

    getAccess(): AccessModel[] {
        return this.access
    }

    async list(type: typeUser){
        this.response = await Api.Get(`access?type=${type}`)
        if (this.response.success) {
            this.access = this.response.data
        }
    }
}

export const AccessService = new _AccessService()

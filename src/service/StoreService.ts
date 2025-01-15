import { StoreModel, StoreRequestModel } from "../models/StoreModel";
import { Api } from "./Api";
import { ResponseService } from "./ResponseService";

class _StoreService extends ResponseService {
    private stores: StoreModel[] = []

    constructor(){
        super()
    }

    getStores ():StoreModel[]  {
        return this.stores
    }

    async list() {
        this.response = await Api.Get(`stores`)
        if (this.response.success) {
            this.stores = this.response.data
        }
    }

    async listAvailable() {
        this.response = await Api.Get(`stores?filter=available`)
        if (this.response.success) {
            this.stores = this.response.data
        }
    }

    async store(params: StoreRequestModel) {
        this.response = await Api.Post(`stores`, params)
    }

    async edit(id:number, params: StoreRequestModel) {
        this.response = await Api.Put(`stores/${id}`, params)
    }

    async status(id:number) {
        this.response = await Api.Delete(`stores/${id}`)
    }
}

export const StoreService = new _StoreService()

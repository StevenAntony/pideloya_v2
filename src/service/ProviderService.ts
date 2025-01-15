import { ProviderModel, ProviderStoreModal } from "../models/ProviderModel";
import { Api } from "./Api";
import { ResponseService } from "./ResponseService";

class _ProviderService extends ResponseService {
    private providers: ProviderModel[] = []

    constructor(){
        super()
    }

    getProviders ():ProviderModel[]  {
        return this.providers
    }

    async list() {
        this.response = await Api.Get(`providers?filter=maintainer`)
        if (this.response.success) {
            this.providers = this.response.data.list
        }
    }

    async listToBuy(search: string) {
        this.response = await Api.Get(`providers?search=${search}`)
        if (this.response.success) {
            this.providers = this.response.data
        }
    }

    async store(params: ProviderStoreModal) {
        this.response = await Api.Post(`providers`, params)
    }

    async edit(params: ProviderStoreModal, id: number) {
        this.response = await Api.Put(`providers/${id}`, params)
    }

    async changeStatus(id: number) {
        this.response = await Api.Delete(`providers/${id}`)
    }
}

export const ProviderService = new _ProviderService()

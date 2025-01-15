import { CategoryStoreModel } from "../models/CategoryModel"
import { GroupAllModel, GroupStoreModel } from "../models/GroupModel"
import { Api } from "./Api"
import { ResponseService } from "./ResponseService"

export class _GroupService extends ResponseService {
    private groups: GroupAllModel[] = []

    constructor(){
        super()
    }

    getGroups ():GroupAllModel[]  {
        return this.groups
    }

    async listAll() {
        this.response = await Api.Get(`group-all`)
        if (this.response.success) {
            this.groups = this.response.data
        }
    }

    async store(params: GroupStoreModel) {
        this.response = await Api.Post(`groups`, params)
    }

    async edit(id:number, params: GroupStoreModel) {
        this.response = await Api.Put(`groups/${id}`, params)
    }

    async status(id:number) {
        this.response = await Api.Delete(`groups/${id}`)
    }

    async storeCaregory(id:number, params: CategoryStoreModel) {
        this.response = await Api.Post(`groups/${id}/categories`, params)
    }

    async editCategory(id:number, params: GroupStoreModel) {
        this.response = await Api.Put(`categories/${id}`, params)
    }

    async statusCategory(id:number) {
        this.response = await Api.Delete(`categories/${id}`)
    }
}

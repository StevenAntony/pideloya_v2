import { UserEditModel, UserModel, UserStoreModel } from "../models/UserModel"
import { Api } from "./Api"
import { ResponseService } from "./ResponseService"

class _UserService extends ResponseService {
    private users: UserModel[]

    constructor(){
        super()
    }

    getUsers(): UserModel[] {
        return this.users
    }

    async list(){
        this.response = await Api.Get(`users`)
        if (this.response.success) {
            this.users = this.response.data.list
        }
    }

    async all(){
        this.response = await Api.Get(`users?filter=all`)
        if (this.response.success) {
            this.users = this.response.data
        }
    }

    async store(params: UserStoreModel){
        this.response = await Api.Post(`users`,params)
    }

    async edit(id: number ,params: UserEditModel){
        this.response = await Api.Put(`users/${id}`,params)
    }

    async editAccess(id: number ,params: {
        access: Array<number>
    }){
        this.response = await Api.Put(`users/access/${id}`,params)
    }

    async status(id: number){
        this.response = await Api.Delete(`users/${id}`)
    }
}

export const UserService = new _UserService()

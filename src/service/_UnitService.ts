import { CategoryModel, CategoryStoreModel } from "../models/CategoryModel";
import { UnitModel, UnitStoreModel } from "../models/UnitModel";
import { Api } from "./Api";
import { ResponseService } from "./ResponseService";

export class _UnitService extends ResponseService {
    private units: UnitModel[] = []

    constructor(){
        super()
    }

    getUnits ():UnitModel[]  {
        return this.units
    }

    async list() {
        this.response = await Api.Get(`units?all=true`)
        if (this.response.success) {
            this.units = this.response.data
        }
    }

    async store(params: UnitStoreModel) {
        this.response = await Api.Post(`units`, params)
    }

    async edit(id:number, params: UnitStoreModel) {
        this.response = await Api.Put(`units/${id}`, params)
    }

    async status(id:number) {
        this.response = await Api.Delete(`units/${id}`)
    }
}

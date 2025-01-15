import { CategoryModel } from "../models/CategoryModel";
import { Api } from "./Api";
import { ResponseService } from "./ResponseService";

export class _CategorySevice extends ResponseService {
    public isCategories: CategoryModel[] = []

    constructor(){
        super()
    }

    public async index() {
        this.response = await Api.Get('categories')
        if (this.response.success) {
            this.isCategories = this.response.data
        }
    }
}

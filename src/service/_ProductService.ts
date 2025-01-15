import { ProductModel } from "../models/ProductModel";
import { Api } from "./Api";
import { ResponseService } from "./ResponseService";

export class _ProductService extends ResponseService {
    public isProducts: ProductModel[] = []

    constructor(){
        super()
    }

    async getToSale(){
        this.response = await Api.Get(`products?filter=sale`)
        if (this.response.success) {
            this.isProducts = this.response.data.map(element => {
                const presentations = element.presentation.split('|').map((obj) => {return JSON.parse(obj)} )
                const printers = element.printers ? element.printers.split('|').map((obj) => {return JSON.parse(obj)}) : null

                return {
                    ...element,
                    presentations: presentations,
                    printers: printers
                }
            })
        }
    }


}

import { PrinterModel, PrinterStoreOrUpdatedRequest, PrinterToProductModel } from "../models/PrinterModel";
import { Api } from "./Api";
import { ResponseService } from "./ResponseService";

export default class PrinterService extends ResponseService {
    private printersToProduct: PrinterToProductModel[] = []
    private printers: PrinterModel[] = []

    constructor(){
        super()
    }

    getPrintersToProduct ():PrinterToProductModel[]  {
        return this.printersToProduct
    }

    getPrinters ():PrinterModel[]  {
        return this.printers
    }

    async available() {
        this.response = await Api.Get(`printers?filter=available`)
        if (this.response.success) {
            this.printersToProduct = this.response.data
        }
    }

    async list() {
        this.response = await Api.Get(`printers`)
        if (this.response.success) {
            this.printers = this.response.data
        }
    }

    async store(params: PrinterStoreOrUpdatedRequest) {
        this.response = await Api.Post(`printers`, params)
    }

    async updated(params: PrinterStoreOrUpdatedRequest, id: number) {
        this.response = await Api.Put(`printers/${id}`, params)
    }

    async changeActive(id: number) {
        this.response = await Api.Delete(`printers/${id}`)
    }
}

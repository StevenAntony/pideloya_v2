import { ProductStockToTransferModel, StockModel, StockStoreModel, TransferStockRequest } from "../models/StockModel";
import { Api } from "./Api";
import { ResponseService } from "./ResponseService";

class _StockService extends ResponseService {
    private stocks: StockModel[] = []
    private stocksToTransfer: ProductStockToTransferModel[] = []

    constructor(){
        super()
    }

    getStocks ():StockModel[]  {
        return this.stocks
    }

    getStocksToTransfer ():ProductStockToTransferModel[]  {
        return this.stocksToTransfer
    }

    async list(id: number) {
        this.response = await Api.Get(`stocks/${id}`)
        if (this.response.success) {
            this.stocks = this.response.data
        }
    }

    async multipleList(id: number) {
        this.response = await Api.Post(`multiple/${id}?multiple=true`)
        if (this.response.success) {
            this.stocks = this.response.data
        }
    }

    async store(params: StockStoreModel) {
        this.response = await Api.Post(`stocks`, params)
    }

    /**
     * Listar stock de los productos para transferir
     * @param page
     * @param pageSize
     */
    async listStockToTransfer(page: number, pageSize: number) {
        this.response = await Api.Get(`stocks`, {
            list: 'inventory_transfer',
            page: page,
            pageSize: pageSize
        })
        if (this.response.success) {
            this.stocksToTransfer = this.response.data.list
        }
    }

    /**
     *  Transferir stock
     * @param params - TransferStockRequest
     */
    async transferStock(params: TransferStockRequest) {
        this.response = await Api.Post(`stocks/transfers`, params)
    }
}

export const StockService = new _StockService()

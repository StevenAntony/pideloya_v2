import { ResponseProductListToQuotationModel, ResponseProductListToSaleModel } from "@models/managment/ProductModel";
import { ResponseModel } from "@models/ResponseModel";
import { Api } from "@services/Api";

export class ProductService {

    static async listToSale (page: number, pageSize: number): Promise<ResponseModel<ResponseProductListToSaleModel>>
    {
        return await Api.Get(`products?filter=to_sale&page=${page}&pageSize=${pageSize}`)
    }

    static async listToQuotation (search: string): Promise<ResponseModel<ResponseProductListToQuotationModel>>
    {
        return await Api.Get(`products?filter=to_quotation&search=${search}`)
    }

}

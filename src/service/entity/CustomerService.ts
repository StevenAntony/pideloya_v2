import { ResponseCustomerListToQuotationModel, ResponseCustomerListToSaleModel } from "@models/entity/CustomerModel"
import { ResponseModel } from "@models/ResponseModel"
import { Api } from "@services/Api"

export class CustomerService {

    static listToSale = async (search: string) : Promise<ResponseModel<ResponseCustomerListToSaleModel>> => {
        return await Api.Get(`customers?search=${search}&filter=to_sale`)
    }

    static listToQuotation = async () : Promise<ResponseModel<ResponseCustomerListToQuotationModel>> => {
        return await Api.Get(`customers?filter=to_quotation`)
    }

}

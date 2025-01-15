export interface ResponseCustomerListToSaleModel extends Array<CustomerListToSaleModel> {

}

export interface ResponseCustomerListToQuotationModel extends Array<CustomerListToQuotationModel> {

}

/**
 * Modelo para la lista de clientes para la venta
 */
export interface CustomerListToSaleModel extends BaseCustomerList{

}

/**
 * modelos para la lista de clientes para la cotizacion
 */
export interface CustomerListToQuotationModel extends BaseCustomerList{

}

interface BaseCustomerList {
    customerID: number
    document: string
    documentType: string
    address: string
    phone: string
    email: string
    birth: string
    image: any
    name: string
    sex: string
}

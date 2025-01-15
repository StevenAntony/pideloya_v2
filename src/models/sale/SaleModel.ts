/**
 * Respuesta al listado de ventas
 */
export interface ResponseSaleListModel {
    list: SaleListModel[]
    total: number
}

export interface SaleListModel {
    saleID: number
    customer: string
    userName: string
    active: number
    voucherToCancel: any
    methodPaymentSunat: string
    document: string
    issue: string
    totalAmount: string
    modePayment: string
    companyID: number
}

/**
 * Respuesta al listado de la Información para poder generar una venta
 */

export interface ResponseInformationSaleModel {
    vouchersSeries: VouchersSeries[]
    paymentMethods: PaymentMethod[]
}

interface VouchersSeries {
    id: number
    type: string
    destination: string
    series: Series[]
}

interface Series {
    id: number
    name: string
    correlative: number
}

interface PaymentMethod {
    name: string
    abbreviation: string
    type: string
    paymentMethodID: number
}

/**
 * Body para crear una nueva venta
 */

export interface BodySaleCreateModel {
    sale: {
        customerID: number
        cashID: number
        seriesID: number
        type: string
        tableID: number | null
        issue: string
        voucherToCancel: string | null
        additional: number
    }
    payments: Array<{
        paymentMethodID: number
        amount: number
    }>
    detail: Array<{
        presentationID: number
        quantity: number
        orderDescription: string
        note: string
        price: number
        id: string
    }>
}


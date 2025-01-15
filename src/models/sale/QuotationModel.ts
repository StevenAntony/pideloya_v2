export interface ResponseQuotationListModel extends Array<QuotationListModel> {}

export interface ResponseQuotationFindModel {
    quotationID: number
    customerID: number
    issue: string
    expire: string
    withIGV: boolean
    details: Array<{
        price: number
        quantity: number
        presentationID: number
        name: string
        unitName: string
        brand: string
    }>

}

export interface QuotationListModel {
  quotationID: number
  customerName: string
  customerDocument: string
  userName: string
  code: string
  issue: string
  expire: string
  withIGV: number
  status: string
  urlPDF: string
  details: DetailQuotationModel[]
}

export interface DetailQuotationModel {
  price: string
  quantity: string
  name: string
  unitName: string
  unitAbbreviation: string
}


/**
 * Body para crear una nueva cotización
 */
export interface BodyQuotationCreateModel {
    customerID: number
    issue: string
    expire: string
    withIgv: boolean
    details: Detail[]
}

interface Detail {
    presentationID: number
    quantity: number
    price: number
  }

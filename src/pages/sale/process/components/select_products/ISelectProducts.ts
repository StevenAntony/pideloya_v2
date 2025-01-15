export interface IProductInSale {
    id: string
    action: 'new' | 'edit' | 'save'
    description: string
    note: string
    presentations: Presentations[]
    presentationID: number
    price: number
    quantity: number
    storeID: number

    [key: string]: string | number | Presentations[];
}

interface Presentations {
    salePrice: number
    dealerPrice: number
    purchasePrice: number
    unitName: string
    unitSunat: string
    presentationID: number
}

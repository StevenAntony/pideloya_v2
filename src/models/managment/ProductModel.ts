import { CategoryListToSaleModel } from "./CategoryModel"

/**
 * Respuesta al listado de productos en el modulo de ventas
 */
export interface ResponseProductListToSaleModel {
    products: {
        total: number
        list: ProductListToSaleModel[]
    }
    categories: CategoryListToSaleModel[]
}

export interface ResponseProductListToQuotationModel extends Array<ProductListToQuotationModel> {

}

/**
 * Modelo de listado de productos en el modulo de ventas
 */
export interface ProductListToSaleModel extends BaseProductList {

}

export interface ProductListToQuotationModel extends Pick<BaseProductList,
    'barcode' | 'brand' | 'image' | 'presentations' | 'name' | 'service' | 'productID'
> {
    unitID: number
    unitName: string
    unitAbbreviation: string
    salePrice: number
    presentationID: number
}

/** ================================================ */

interface BaseProductList {
    groupName: string
    categoryName: string
    barcode: string
    name: string
    brand: string
    service: number
    image: any
    type: string
    typeAfeIgv: string
    printer: any
    active: number
    includeIgv: number
    presentations: Presentations[]
    productID: number
    categoryID: number
}

interface Presentations {
    salePrice: number
    dealerPrice: number
    purchasePrice: number
    unitName: string
    unitSunat: string
    presentationID: number
}

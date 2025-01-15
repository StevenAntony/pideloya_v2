export interface StockModel {
    id: number;
    productID: number;
    unitID: number;
    name: string;
    brand: string;
    type: string;
    quantity: string;
    nameCategorie: string;
    abbreviation: string;
    nameUnit: string;
    totalUnit: string;
}

export interface ProductStockToTransferModel {
    groupName: string
    categoryName: string
    productBarCode: any
    productID: number
    productName: string
    productBrand: string
    unitName: string
    unitAbbreviation: string
    unitID: number
    warehouses: Warehouse[]
}

interface Warehouse {
    warehouseID: number
    warehouseName: string
    stock: any
}

export interface StockStoreModel {
    productID: number;
    unitID: number;
    storeID: number;
    quantity: number;
    type: 'output'|'input'
}

export interface TransferStockRequest {
    productID: number,
    unitID: number,
    quantity: number,
    fromWarehouseID: number,
    toWarehouseID: number
}

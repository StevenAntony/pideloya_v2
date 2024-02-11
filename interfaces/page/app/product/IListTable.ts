interface IProductTable {
    key: string;
    category: string;
    barcode: string;
    name: string;
    brand: string;
    service: boolean;
    prices: string[];
    active: boolean;
    type: ITypeProduct;
    idCategory: string;
    idGroup: string;
}
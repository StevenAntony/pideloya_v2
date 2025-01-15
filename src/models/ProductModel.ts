export interface Presentation {
    salePrice: number;
    dealerPrice: number;
    purchasePrice: number;
    unit: string;
    id: number;
    unitSunat: string;
}

export interface ProductModel {
    id: number;
    barcode: string;
    name: string;
    brand: string;
    service: boolean;
    image: any;
    type: string;
    typeAfeIgv: string;
    nameCategory: string;
    printer: any;
    presentations: Presentation[];
    printers: any;
  }

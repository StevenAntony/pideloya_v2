interface IRequestProduct {
    barcode?: string;
    name: string;
    brand?: string;
    service: boolean;
    image?: string;
    categoryID: number;
    type: 'product'|'food'|'supply';
    printer?: string;
    presentations: Array<any>
}
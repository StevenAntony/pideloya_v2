interface IProductForSale {
    id: string;
    description: string;
    brand: string;
    category: ICategory;
    presentations?: Array<IPresentation>;
}

interface IPresentation {
    id: number;
    salePrice: number;
    unitName: string;
}
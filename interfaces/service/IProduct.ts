interface IProductForSale {
    id: string;
    description: string;
    brand: string;
    price: number;
    unitDescription: string;
    category: ICategory;
}
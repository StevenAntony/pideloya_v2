interface ITable {
    id: number;
    nameUser: string;
    state: 'Libre'|'Ocupado';
    description: string;
    time: number|null;
}

interface IOrder {
    id: number;
    quantity: number;
    amount: number;
    idProduct: string;
    idStore: number;
    description: string;
}

interface ITableOrder {
    id: number;
    description: string;
    state: 'Libre'|'Ocupado';
    order: Array<IOrder>
}
type TActionOrder = 'new'|'save'|'delete'|'edit'

interface IOrder {
    id: number;
    quantity: number;
    amount: number;
    idProduct: string;
    idStore: number;
    description: string;
    action: TActionOrder;
    originalQuantity: number;
    note?: string;
}

interface ITableOrder {
    id: number;
    description: string;
    state: 'Libre'|'Ocupado';
    order: Array<IOrder>
}
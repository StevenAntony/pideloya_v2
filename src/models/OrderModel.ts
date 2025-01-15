export interface OrderModel {
    id: number;
    orderDescription: string;
    note: string;
    quantity: number;
    price: number;
    state: 'pending' | 'printed' | 'prepared' | 'served';
    nameTable: string;
    issue: string;
}

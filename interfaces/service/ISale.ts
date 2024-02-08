type TActionOrder = 'new'|'save'|'delete'|'edit'

interface IOrder {
    id: number;
    quantity: number;
    amount: number;
    idPresentation: string;
    idStore?: number;
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

interface ISale {
    id: string;
    serie: string;
    number: number,
    issue: string,
    customer: string,
    seller: string,
    state: string;
}

interface ICash {
    id: string;
    openingDate: string;
}

interface IInformation {
    vouchersSeries: Array<IVoucher>,
    paymentMethods: Array<IPaymentMethods>,
    cashCompany: Array<ICash>
}
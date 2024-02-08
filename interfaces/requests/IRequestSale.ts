interface ISendOrder {
    idPresentation: string;
    quantity: number;
    price: number;
    note: string,
    description: string;
}

interface IRequestSendOrder {
    orders: Array<ISendOrder>
}

interface IRequestSale {
    sale: ISaleCreate;
    detail: IDetail[];
    payments: IPayment[];
}
  
interface ISaleCreate {
    customerID: string;
    tableID: string;
    cashID: string;
    seriesID: string;
    type: string;
    issue: string|null;
}
  
interface IDetail {
    presentationID: string;
    quantity: number;
    orderDescription: string;
    note: string;
    price: number;
}
  
interface IPayment {
    amount: number;
    paymentMethodID: string;
}

interface IRequestList {
    filter: {
        type: string;
    };
}
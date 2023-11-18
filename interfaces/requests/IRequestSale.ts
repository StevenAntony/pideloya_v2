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

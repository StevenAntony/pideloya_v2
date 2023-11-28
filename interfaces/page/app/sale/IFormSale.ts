interface IModalSelectProduct {
    idProduct: string;
    idPresentation: string;
    quantity: number;
    amount: number;
    note: string;
}

interface IModalGenerateDocument {
    seriesID : string|null;
    customerID: string|null;
    paymentMethodID: string|null;
    amountPayment: number;
}
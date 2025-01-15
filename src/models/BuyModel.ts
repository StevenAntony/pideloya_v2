export interface BuyModel {
    id: number;
    provider: string;
    userName: string;
    status: number;
    companyID: number;
    document: string;
    issue: string;
    totalAmount: number;
    modePayment: string;

    hasDebit?: boolean;
    amountPaid?: number;
    amountDebit?: number;
}

export interface BuyStoreModel {
    providerID: number;
    cashID?: any;
    providerRuc: string;
    providerName: string;
    providerAddress: string;
    issue: string;
    typeDocument: string;
    serieName: string;
    correlative: number;
    details: Detail[];
    payments: Payment[];
}

export interface BuyPaymentStoreModel {
    payments: {
        amount: number;
        methodID: number;
        cashID: number;
    }[]
}

interface Payment {
cashID?: any;
paymentMethodID: number;
amount: number;
}

interface Detail {
presentationID: number;
typeAfeIgv: string;
quantity: number;
price: number;
description: string;
note?: any;
}

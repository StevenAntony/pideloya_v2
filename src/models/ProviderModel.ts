export interface ProviderModel {
    id: number;
    ruc: string;
    businessName: string;
    tradename: string;
    phone?: any;
    email?: any;
    address: string;
    status: boolean;
}

export interface ProviderStoreModal {
    ruc: string;
    businessName: string;
    tradename: string;
    address: string;
    email: string|null;
    phone: string|null;
}

export interface CompanyModel {
    ruc: string;
    businessName: string;
    logo?: any;
    address: string;
    phone: string;
    email: string;
    user_sol: string;
    key_sol: string;
    demo: boolean;
    betaBilling: boolean;
    plan?: string;
    url?: string;
    activity?: 'store'|'restaurant'|'distributor'
    status?: boolean;
    id?: number;
    tradename?: string;
    ubigeo?: string;
    departament?: string;
    province?: string;
    district?: string;
}

export interface ConfigUpdateModel {
    searchByBarCode: boolean;
    notificationsStockMinimun: number;
    showWithZeroStock: boolean;
    printOrders: boolean;
    sendMail: boolean;
}

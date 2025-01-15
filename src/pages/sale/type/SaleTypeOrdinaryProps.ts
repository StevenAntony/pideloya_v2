export interface SaleTypeOrdinaryProps {
    isCheckRequirements: string[];
    setOpenModal: (e: boolean) => void;
    isSales: SalesTable[];
    loadingList: boolean;
}

interface SalesTable {
    key: number;
    customer: string;
    userName: string;
    status: number;
    companyID: number;
    document: string;
    issue: string;
    totalAmount: string;
    modePayment: string;
}

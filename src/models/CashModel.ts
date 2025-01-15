export interface CashModel {
    id: number;
    key: number;
    userID: number;
    amount: number,
    user: string,
    status: "APERTURADO" | "CERRADO";
    openingDate: string;
    closingDate: string;
    code: string;
}

interface saleSummary {
    name: string;
    abbreviation: string;
    totalAmount: number;
}

interface BuySummary {
    name: string;
    abbreviation: string;
    totalAmount: number;
}

export interface CashSummaryModel {
    sale: saleSummary[];
    buy: BuySummary[];
    movement: {
        ingress: number;
        egress: number;
    }
}

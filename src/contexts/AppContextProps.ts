import { ResponseQueueProgress } from "@hooks/useQueueProgress";

export interface AppContextProps {
    cashSelectedApp: ICashSelectedStore|null;
    updatedCashSelectedApp: (e: ICashSelectedStore|null) => void;
    priceTypeApp: 'public' | 'distributor';
    updatedPriceTypeApp: (e: 'public' | 'distributor') => void;

    queueProgressApp: ResponseQueueProgress;
}

export interface AppContextProviderProps {
    children: React.ReactNode
}

export interface ICashSelectedStore {
    id: number;
    key: number;
    userID: number;
    amount: number;
    user: string;
    status: string;
    openingDate: string;
    closingDate: string;
    code: string;
}

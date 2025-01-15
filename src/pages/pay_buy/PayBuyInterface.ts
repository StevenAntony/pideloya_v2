import { BuyModel } from "../../models/BuyModel";

export interface PayListTableInterface {
    dataSource: BuyModel[];
    loading: boolean;
    setBuySelected: (e: BuyModel) => void;
    setOpenModal: (e: boolean) => void;
}

export interface PayModelInterface {
    open: boolean;
    setOpen: (e: boolean) => void;
    buySelected: BuyModel;
    information: any;
    payments: any[];
    setPayments: (e: any[]) => void;
    reload: () => void;
}

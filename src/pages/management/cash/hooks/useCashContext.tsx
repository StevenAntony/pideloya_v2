
import { useContext } from "react";
import { CashContext } from "../context/CashContext";
import { CashContextProps } from "../context/CashContextProps";

export const useCashContext = () : CashContextProps => {
    const context = useContext(CashContext);
    if (!context) {
        throw new Error('useSaleContext must be used within a SaleProvider');
    }
    return context;
}

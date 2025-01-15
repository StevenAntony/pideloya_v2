import { SaleContext } from "@pages/sale/process/contexts/SaleContext";
import { SaleContextProps } from "@pages/sale/process/contexts/SaleContextProps";
import { useContext } from "react";

export const useSaleContext = (): SaleContextProps => {
    const context = useContext(SaleContext);
    if (!context) {
        throw new Error('useSaleContext must be used within a SaleProvider');
    }
    return context;
}

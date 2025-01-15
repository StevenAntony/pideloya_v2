import { useContext } from "react";
import { QuotationContext } from "../context/QuotationContext";

export const useQuotationContext = () => {
    const context = useContext(QuotationContext);
    if (!context) {
        throw new Error('useQuotationContext must be used within a QuotationContext');
    }
    return context;
}

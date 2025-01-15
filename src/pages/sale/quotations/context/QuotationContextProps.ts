import { useTransactionItemsProps } from "@hooks/useTransactionItems";
import { CustomerListToQuotationModel } from "@models/entity/CustomerModel";
import { ProductListToQuotationModel } from "@models/managment/ProductModel";
import { BodyQuotationCreateModel, QuotationListModel, ResponseQuotationFindModel } from "@models/sale/QuotationModel";

export interface QuotationContextProps {
    openLateral: boolean
    setOpenLateral: React.Dispatch<React.SetStateAction<boolean>>
    selectedQuotation: QuotationListModel|null
    setSelectedQuotation: React.Dispatch<React.SetStateAction<QuotationListModel|null>>

    isCustomers: CustomerListToQuotationModel[]
    isProducts: ProductListToQuotationModel[]
    isQuotations: QuotationListModel[]
    isQuotationFind: ResponseQuotationFindModel|null

    loadingProducts: boolean
    loadingSave: boolean
    loadingQuotations: boolean
    loadingOption: boolean
    loadingQuotationFind: boolean

    isProductInQuotation: useTransactionItemsProps

    listProducts: (search: string) => void
    store: (body: BodyQuotationCreateModel) => void
    deleteQuotation: () => void
    changeStatus: (status: string) => void
    update: (body: BodyQuotationCreateModel) => void
    showQuotation: () => void
    sendMail: () => void
}

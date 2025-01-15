import { BodyReconciliationModel, CashListToManegmentModel } from "@models/managment/CashModel";

export interface CashContextProps {
    isCashes: CashListToManegmentModel[]
    isGroupCash: any[]
    selectedCash: CashListToManegmentModel|null
    setSelectedCash: React.Dispatch<React.SetStateAction<CashListToManegmentModel|null>>
    openFormModal: boolean
    openSquareModal: boolean
    setOpenSquareModal: React.Dispatch<React.SetStateAction<boolean>>
    setOpenFormModal: React.Dispatch<React.SetStateAction<boolean>>
    loadingListCashes: boolean
    loadingForm: boolean
    openCash: (amount: number) => void
    closeCash: (id: number) => void,
    saveReconciliation: (body: BodyReconciliationModel) => void
    listCashes: () => void
}

export interface CashContextProviderProps {
    children: React.ReactNode
}

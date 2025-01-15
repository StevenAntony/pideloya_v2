import { CashListToMovementsModel } from "@models/managment/CashModel"
import { MovementFormModel, MovementListToManegmentModel } from "@models/managment/MovementModel"

export interface MovementContextProviderProps {
    children: React.ReactNode
}

export interface MovementContextProps {
    isMovements: MovementListToManegmentModel[]
    isCashes: CashListToMovementsModel[]
    selectedCash: CashListToMovementsModel|null
    setSelectedCash: React.Dispatch<React.SetStateAction<CashListToMovementsModel|null>>

    openFormModal: boolean
    setOpenFormModal: React.Dispatch<React.SetStateAction<boolean>>

    loadingListMovements: boolean
    loadingListCashes: boolean
    loadingForm: boolean

    createMovement: (form: MovementFormModel) => void
    changeStatusMovement: (id: number) => void
}

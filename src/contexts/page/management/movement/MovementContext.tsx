import { createContext, useEffect, useState } from "react";
import { MovementContextProps, MovementContextProviderProps } from "./MovementContextProps";
import responseApi from "@components/responseApi";
import { MovementService } from "@services/management/MovementService";
import { MovementFormModel, MovementListToManegmentModel } from "@models/managment/MovementModel";
import { CashService } from "@services/management/CashService";
import { CashListToMovementsModel } from "@models/managment/CashModel";
import { useAuthContext } from "@contexts/auth/AuthContext";
import { MOVEMENT_ACTIONS } from "@constants/authorized";

export const MovementContext = createContext<MovementContextProps>({
    isCashes: [],
    isMovements: [],
    selectedCash: null,
    setSelectedCash: () => {},
    openFormModal: false,
    setOpenFormModal: () => {},
    loadingListCashes: false,
    loadingForm: false,
    loadingListMovements: false,
    changeStatusMovement: () => {},
    createMovement: () => {}
})

export const MovementContextProvider = ({ children } : MovementContextProviderProps) => {

    const [isMovements, setMovements] = useState<MovementListToManegmentModel[]>([])
    const [isCashes, setCashes] = useState<CashListToMovementsModel[]>([])
    const [selectedCash, setSelectedCash] = useState<CashListToMovementsModel|null>(null)

    const [openFormModal, setOpenFormModal] = useState<boolean>(false)
    const [loadingListMovements, setLoadingListMovements] = useState<boolean>(false)
    const [loadingListCashes, setLoadingListCashes] = useState<boolean>(false)
    const [loadingForm, setLoadingForm] = useState<boolean>(false)

    const { authorizedAction } = useAuthContext()

    const listMovements =async () => {
        if(selectedCash == null || !authorizedAction(MOVEMENT_ACTIONS.list)) return
        setLoadingListMovements(true)
        const response =await MovementService.listToManagement(selectedCash.cashID)
        setMovements(response.data.list)
        setLoadingListMovements(false)
    }

    const listCashsToMovement =async () => {
        setLoadingListCashes(true)
        const response =await CashService.listToMovements()

        setCashes(response.data)
        setLoadingListCashes(false)
    }

    const createMovement = async ( form: MovementFormModel ) => {
        setLoadingForm(true)
        const response = await MovementService.store(form)

        responseApi(response)
        if (response.success) {
            listMovements()
            setOpenFormModal(false)
        }
        setLoadingForm(false)
    }

    const changeStatusMovement =async (id: number) => {
        const response =await MovementService.changeStatus(id)
        if (response.success) {
            listMovements()
        }
    }

    useEffect(() => {
        listCashsToMovement()
    }, [])

    useEffect(() => {
        if (isCashes.length > 0) {
            setSelectedCash(isCashes[0])
        }
    }, [isCashes])

    useEffect(() => {
        if (selectedCash) {
            listMovements()
        }
    }, [selectedCash])

    return (
        <MovementContext.Provider value={{
            isCashes,
            isMovements,
            selectedCash,
            setSelectedCash,
            openFormModal,
            setOpenFormModal,
            loadingForm,
            loadingListCashes,
            loadingListMovements,
            changeStatusMovement,
            createMovement
        }}>
            { children }
        </MovementContext.Provider>
    )
}

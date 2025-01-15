import { BodyReconciliationModel, CashListToManegmentModel } from "@models/managment/CashModel";
import { createContext, useEffect, useState } from "react";
import { CashContextProps, CashContextProviderProps } from "./CashContextProps";
import { useAuthContext } from "@contexts/auth/AuthContext";
import { CASH_ACTIONS } from "@constants/authorized";
import responseApi from "@components/responseApi";
import { CashModuleService } from "../service/CashModuleService";

export const CashContext = createContext<CashContextProps|undefined>(undefined)

export const CashContextProvider = ({ children }: CashContextProviderProps) => {

    const [isCashes, setCashes] = useState<CashListToManegmentModel[]>([])
    const [selectedCash, setSelectedCash] = useState<CashListToManegmentModel|null>(null)

    const [openFormModal, setOpenFormModal] = useState<boolean>(false)
    const [openSquareModal, setOpenSquareModal] = useState<boolean>(false)

    const [loadingListCashes, setLoadingListCashes] = useState<boolean>(false)
    const [loadingListGroupCash, setLoadingListGroupCash] = useState<boolean>(false)
    const [loadingForm, setLoadingForm] = useState<boolean>(false)

    const [isGroupCash, setGroupCash] = useState<any[]>([])

    const { authorizedAction, user } = useAuthContext()

    const openCash = async (amount: number) => {
        setLoadingForm(true)
        const response = await CashModuleService.open({ amount })
        responseApi(response)
        if (response.success) {
            window.location.reload()
        }
        setLoadingForm(false)
    }

    const saveReconciliation = async (body: BodyReconciliationModel) => {
        const response = await CashModuleService.saveReconciliation(body)
        if (response.success) {
            listCashes()
        }
        responseApi(response)
    }

    const closeCash = async (id: number) => {
        const response = await CashModuleService.close(id)
        if (response.success) {
            window.location.reload()
        }
    }

    const listCashes = async () => {
        const authorized = authorizedAction(CASH_ACTIONS.list)
        if (!authorized) return
        setLoadingListCashes(true)
        const response = await CashModuleService.list()
        setCashes(response.data.list)
        setLoadingListCashes(false)
    }

    const listGroupCash = async () => {
        // const authorized = authorizedAction(CASH_ACTIONS.list)
        // if (!authorized) return
        setLoadingListGroupCash(true)
        const response = await CashModuleService.listGroupCash()
        setGroupCash(response.data)
        setLoadingListGroupCash(false)
    }

    useEffect(() => {
        if (user.type.name == 'Administrador' ) {
            listGroupCash()
        }else{
            listCashes()
        }
    }, [])

    return (
        <CashContext.Provider value={{
            isCashes,
            isGroupCash,
            selectedCash,
            setSelectedCash,
            loadingListCashes,
            loadingForm,
            openFormModal,
            openSquareModal,
            setOpenSquareModal,
            setOpenFormModal,
            openCash,
            closeCash,
            saveReconciliation,
            listCashes
        }}>
            {children}
        </CashContext.Provider>
    )
}

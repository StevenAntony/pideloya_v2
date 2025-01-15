import { useTransactionItems } from "@hooks/useTransactionItems";
import React, { createContext, useEffect, useState } from "react";
import { QuotationContextProps } from "./QuotationContextProps";
import { QuotationModuleService } from "../service/QuotationModuleService";
import { CustomerListToQuotationModel } from "@models/entity/CustomerModel";
import { ProductListToQuotationModel } from "@models/managment/ProductModel";
import { BodyQuotationCreateModel, QuotationListModel, ResponseQuotationFindModel } from "@models/sale/QuotationModel";
import responseApi from "@components/responseApi";
import { useAuthContext } from "@contexts/auth/AuthContext";
import { QUOTATION_ACTIONS } from "@constants/authorized";

export const QuotationContext = createContext<undefined|QuotationContextProps>(undefined)

export const QuotationContextProvider = ({ children } : { children: React.ReactNode }) => {
    const isProductInQuotation = useTransactionItems()
    const [openLateral, setOpenLateral] = useState<boolean>(false)
    const [isCustomers, setCustomers] = useState<CustomerListToQuotationModel[]>([])
    const [isProducts, setProducts] = useState<ProductListToQuotationModel[]>([])
    const [isQuotations, setQuotations] = useState<QuotationListModel[]>([])
    const [isQuotationFind, setQuotationsFind] = useState<ResponseQuotationFindModel|null>(null)
    const [loadingProducts, setLoadingProducts] = useState<boolean>(false)
    const [loadingQuotations, setLoadingQuotations] = useState<boolean>(false)
    const [loadingQuotationFind, setLoadingQuotationFind] = useState<boolean>(false)
    const [loadingSave, setLoadingSave] = useState<boolean>(false)
    const [loadingOption, setLoadingOption] = useState<boolean>(false)
    const [selectedQuotation, setSelectedQuotation] = useState<QuotationListModel|null>(null)

    const { authorizedAction  } = useAuthContext()

    const authorizedList = authorizedAction(QUOTATION_ACTIONS.list)
    const authorizedCreate = authorizedAction(QUOTATION_ACTIONS.create)

    const listQuotations = async () => {
        if(!authorizedList) return
        setLoadingQuotations(true)
        const response = await QuotationModuleService.index()
        setQuotations(response.data)
        setLoadingQuotations(false)
    }

    const showQuotation = async () => {
        // if(!authorizedList){
       //     return
       // }
    //    setQuotationsFind(null)
       setLoadingQuotationFind(true)
       const response = await QuotationModuleService.show(selectedQuotation?.quotationID ?? 0)
       setQuotationsFind(response.data)
       setLoadingQuotationFind(false)
   }

    const deleteQuotation = async () => {
        setLoadingOption(true)
        const response = await QuotationModuleService.delete(selectedQuotation?.quotationID ?? 0)
        if (response.success) {
            listQuotations()
        }
        responseApi(response)
        setLoadingOption(false)
    }

    const update = async (body: BodyQuotationCreateModel) => {
        setLoadingSave(true)
        const response = await QuotationModuleService.update(selectedQuotation?.quotationID ?? 0, body)
        if (response.success) {
            listQuotations()
            setSelectedQuotation(null)
            setQuotationsFind(null)
            setOpenLateral(false)
            isProductInQuotation.removeAll()
        }
        responseApi(response)
        setLoadingSave(false)
    }

    const changeStatus = async (status: string) => {
        setLoadingOption(true)
        const response = await QuotationModuleService.changeStatus(selectedQuotation?.quotationID ?? 0, status)
        if (response.success) {
            listQuotations()
        }
        responseApi(response)
        setLoadingOption(false)
    }

    const sendMail = async () => {
        setLoadingOption(true)
        const response = await QuotationModuleService.mail(selectedQuotation?.code ?? '')
        responseApi(response)
        setLoadingOption(false)
    }

    const listCustomers = async () => {
        if(!authorizedCreate) return
        const response = await QuotationModuleService.listCustomers()
        setCustomers(response.data)
    }

    const listProducts = async (search: string) => {
        // if(!authorizedCreate){
        //     return
        // }
        setLoadingProducts(true)
        const response = await QuotationModuleService.listProducts(search)
        setProducts(response.data)
        setLoadingProducts(false)
    }

    const store = async (body: BodyQuotationCreateModel) => {
        setLoadingSave(true)
        const response = await QuotationModuleService.store(body)
        if (response.success) {
            listQuotations()
            setOpenLateral(false)
            isProductInQuotation.removeAll()
        }
        responseApi(response)
        setLoadingSave(false)
    }

    useEffect(() => {
        listQuotations()
        listCustomers()
    }, [])

    return (
        <QuotationContext.Provider value={{
            openLateral,
            setOpenLateral,
            selectedQuotation,
            setSelectedQuotation,
            isCustomers,
            isProducts,
            isQuotations,
            isQuotationFind,
            loadingProducts,
            loadingQuotations,
            loadingSave,
            loadingOption,
            loadingQuotationFind,
            listProducts,
            store,
            isProductInQuotation,
            deleteQuotation,
            changeStatus,
            sendMail,
            update,
            showQuotation,
        }}>
            {children}
        </QuotationContext.Provider>
    )
}

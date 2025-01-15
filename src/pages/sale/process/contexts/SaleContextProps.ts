import { CustomerListToSaleModel } from "@models/entity/CustomerModel"
import { CategoryListToSaleModel } from "@models/managment/CategoryModel"
import { ProductListToSaleModel } from "@models/managment/ProductModel"
import { ResponseInformationSaleModel, SaleListModel } from "@models/sale/SaleModel"
import { IProductInSale } from "@pages/sale/process/components/select_products/ISelectProducts"
import React from "react"

export interface SaleContextProps {
    isSales: SaleListModel[]
    isCategories: CategoryListToSaleModel[]
    isProducts: ProductListToSaleModel[]
    isInformation: ResponseInformationSaleModel
    isCustomers: CustomerListToSaleModel[]
    setCustomers: React.Dispatch<React.SetStateAction<CustomerListToSaleModel[]>>

    productsInSale: IProductInSale[]
    setProductsInSale: React.Dispatch<React.SetStateAction<IProductInSale[]>>
    informationInSale: IInformationInSale
    setInformationInSale: (key: keyof IInformationInSale, value: IInformationInSale[keyof IInformationInSale]) => void

    listCustomers: (search: string) => void
    handleEmitSale: (typeSale: string, selectedTable: any) => void
    resetProcess: () => void

    loadingSaleList: boolean
    loadingCustomerList: boolean
    loadingForm: boolean

    totalPayment: number
    totalProductsInSale: number
    availableEmitSale: boolean

    openModalEmit: boolean
    setOpenModalEmit: React.Dispatch<React.SetStateAction<boolean>>
}

export interface SaleContextProviderProps {
    children: React.ReactNode
}

export interface IInformationInSale {
    serieID: number|null
    customerID: number|null
    additionalAmount: number
    payments: IPaymentInSale[]
    generateVoucherOnCancel: boolean
    voucherToCancel: 'BOLETA' | 'FACTURA' | null
}

interface IPaymentInSale {
    paymentID: string
    amount: number
    abbreviation: string
    name: string
    paymentMethodID: number
}

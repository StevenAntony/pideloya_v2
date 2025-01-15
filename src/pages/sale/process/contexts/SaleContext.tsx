import { createContext, useEffect, useState } from "react";
import { IInformationInSale, SaleContextProps, SaleContextProviderProps } from "./SaleContextProps";
import { BodySaleCreateModel, ResponseInformationSaleModel, SaleListModel } from "@models/sale/SaleModel";
import { SaleService } from "@pages/sale/process/services/SaleService";
import { cashCurrentStorage } from "@helpers/LocalStorage";
import { ProductListToSaleModel } from "@models/managment/ProductModel";
import { CategoryListToSaleModel } from "@models/managment/CategoryModel";
import { IProductInSale } from "@pages/sale/process/components/select_products/ISelectProducts";
import { CustomerListToSaleModel } from "@models/entity/CustomerModel";
import { message } from "antd";
import { useAuthContext } from "@contexts/auth/AuthContext";
import { SALE_ACTIONS } from "@constants/authorized";

export const SaleContext = createContext<SaleContextProps | undefined>(undefined)

export const SaleContextProvider = ({ children } : SaleContextProviderProps) => {
    const initialInformationInSale = {
        additionalAmount: 0,
        customerID: null,
        serieID: null,
        payments: [],
        generateVoucherOnCancel: false,
        voucherToCancel: null,
    }

    const [isSales, setSales] = useState<SaleListModel[]>([])
    const [isProducts, setProducts] = useState<ProductListToSaleModel[]>([])
    const [isCategories, setCategories] = useState<CategoryListToSaleModel[]>([])
    const [isCustomers, setCustomers] = useState<CustomerListToSaleModel[]>([])
    const [isInformation, setInformation] = useState<ResponseInformationSaleModel>({
        paymentMethods: [],
        vouchersSeries: [],
    })

    const [productsInSale, setProductsInSale] = useState<IProductInSale[]>([])
    const [informationInSale, setInformationInSale] = useState<IInformationInSale>(initialInformationInSale)

    const [loadingSaleList, setLoadingSaleList] = useState<boolean>(false)
    const [loadingCustomerList, setLoadingCustomerList] = useState<boolean>(false)
    const [loadingForm, setLoadingForm] = useState<boolean>(false)

    const [ openModalEmit, setOpenModalEmit ] = useState<boolean>(false)

    const { getCash } = cashCurrentStorage()
    const { authorizedAction } = useAuthContext()

    const authorizedList = authorizedAction(SALE_ACTIONS.listOrdinary)
    const authorizedCreate = authorizedAction(SALE_ACTIONS.createOrdinary)

    const listSales =async () => {
        if (getCash() && authorizedList) {
            setLoadingSaleList(true)
            const response =await SaleService.listOrdinary(getCash().id)
            setSales(response.data.list)
            setLoadingSaleList(false)
        }
    }

    const listProducts = async (page: number) => {
        if(!authorizedCreate){
            return
        }
        const response = await SaleService.listProducts(page, 20)
        setProducts(response.data.products.list)
        setCategories(response.data.categories)
    }

    const listCustomers = async (search: string) => {
        if(!authorizedCreate){
            return
        }
        setLoadingCustomerList(true)
        const response = await SaleService.listCustomers(search)
        setCustomers(response.data)
        if (response.data.length === 1) {
            setInformationInSale((prev) => ({
                ...prev,
                customerID: response.data[0].customerID
            }))
        }
        setLoadingCustomerList(false)
    }

    const getInformation = async () => {
        if(!authorizedCreate){
            return
        }
        const { data } = await SaleService.information()
        setInformation(data)
    }

    const resetProcess = () => {
        setProductsInSale([])
        setInformationInSale(initialInformationInSale)
    }

    const handleEmitSale = async (typeSale: string, tableSelected: any = null) => {
        if (!informationInSale.customerID) return
        if (!informationInSale.serieID) return
        if (!authorizedCreate) {
            return
        }
        setLoadingForm(true)
        const params: BodySaleCreateModel = {
            sale : {
                customerID: informationInSale.customerID,
                cashID: getCash().id,
                seriesID: informationInSale.serieID,
                type: typeSale,
                tableID: tableSelected ? tableSelected.id : null,
                issue: "",
                voucherToCancel: informationInSale.generateVoucherOnCancel ? informationInSale.voucherToCancel : null,
                additional: informationInSale.additionalAmount
            },
            payments: informationInSale.payments,
            detail: productsInSale.map(obj => {
                return {
                    presentationID: obj.presentationID,
                    quantity: obj.quantity,
                    orderDescription: obj.description,
                    note: obj.note,
                    price: obj.price,
                    id: obj.id
                }
            })
        }

        const response = await SaleService.create(params);

        if (response.success) {
            message.open({
                type: 'success',
                content: response.message,
            })
            // setShowListOrder(false)
            listSales()
            setOpenModalEmit(false)
            resetProcess()
            // setOpen()
            // const printServe = auth.config.printOrders != '0' ? auth.config.serverPrint : false
            // try {
            //     data.printers.forEach(element => {
            //         printer.ticket(
            //             data.companyID,
            //             data.id,
            //             element,
            //             printServe
            //         )
            //     });
            // } catch (error) {

            // }
        } else {
            message.open({
                type: 'error',
                content: response.message,
            })
        }
        setLoadingForm(false)
    }

    const availableEmitSale = isProducts.length > 0 && isInformation.paymentMethods.length > 0 && isInformation.vouchersSeries.length > 0

    const updateInoformationInSale = (key: keyof IInformationInSale, value: IInformationInSale[keyof IInformationInSale]) => {
        setInformationInSale((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const totalPayment = informationInSale.payments.reduce((a, b) => a + b.amount, 0)

    const totalProductsInSale = productsInSale.reduce((a, b) => (a + (b.quantity * b.price)), 0)  + informationInSale.additionalAmount

    useEffect(() => {
        listSales()
        listProducts(0)
        getInformation()
    }, [])

    return (
        <SaleContext.Provider value={{
            isSales,
            isCategories,
            isProducts,
            isInformation,
            isCustomers,
            setCustomers,

            productsInSale,
            setProductsInSale,
            informationInSale,
            setInformationInSale: updateInoformationInSale,

            loadingSaleList,
            loadingCustomerList,
            loadingForm,
            openModalEmit,
            setOpenModalEmit,

            listCustomers,
            handleEmitSale,
            availableEmitSale,
            totalPayment,
            totalProductsInSale,
            resetProcess
        }}>
            {children}
        </SaleContext.Provider>
    )
}

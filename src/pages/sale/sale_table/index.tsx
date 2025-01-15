import React, { useEffect, useState } from 'react'
import EmitSaleDrawer from '../EmitSaleDrawer'
import SaleTypeTable from '../type/SaleTypeTable'
import { Alert } from 'antd'
import { cashCurrentStorage } from '../../../../helpers/LocalStorage'
import SaleService from '../../../service/SaleService'
import ProductService from '../../../service/ProductService'
import { _ProductService } from '../../../service/_ProductService'
import { _CategorySevice } from '../../../service/_CategoryService'
import { CategoryModel } from '../../../models/CategoryModel'

export default function SaleTablePage() {
    const [isSales, setSales] = useState([])
    const [isInformation, setInformation] = useState<any>(null)
    const [isProducts, setProducts] = useState<any[]>([])
    const [isCategories, setCategories] = useState<CategoryModel[]>([])

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [loadingList, setLoadingList] = useState<boolean>(false)

    const [showListOrder, setShowListOrder] = useState<boolean>(false)

    // Para tipo de venta con mesas
    const [ordersToDetails, setOrdersToDetails] = useState<any[]>([])
    const [tableSelected, setTableSelected] = useState<any>(null)

    const [isCheckRequirements, setCheckRequirements] = useState<any>(null)

    const { getCash } = cashCurrentStorage()

    const getSales =async () => {
        if (getCash()) {
            setLoadingList(true)
            const response =await SaleService.listTable(getCash().id)
            setSales(response.data)
            setLoadingList(false)
        }
    }

    const getProducts = async () => {
        const service = new _ProductService()
        await service.getToSale()
        setProducts(service.isProducts)
        // const { data } = await ProductService.getProductForSale()
        // setProducts(data)
    }

    const getCategories = async () => {
        const service = new _CategorySevice()
        await service.index()
        setCategories(service.isCategories)
    }

    const getInformation = async () => {
        const { data } = await SaleService.getInformationForSale()
        setInformation(data)
    }

    const getCheckRequirements = async () => {
        const response = await SaleService.checkRequirements()
        const { data } = response
        if (!getCash()) {
            data.push('Se requiere que seleccione una caja')
        }
        setCheckRequirements(response.data)
    }

    useEffect(() => {
        getSales()
        getProducts()
        getCategories()
        getInformation()
        getCheckRequirements()
    }, [])

    return (
        <div className="mx-8 my-8 shadow-md bg-white">
            <div className="px-8 pt-4">
                {
                    isCheckRequirements && isCheckRequirements.map((obj, index) => <Alert key={index} message={obj} className="my-1" type="warning" showIcon />)
                }
            </div>
            <SaleTypeTable
                isProducts={isProducts}
                setOpenModal={setOpenModal}
                setOrdersToDetails={setOrdersToDetails}
                setTableSelected={setTableSelected}
                tableSelected={tableSelected}
                isSales={isSales}
                setShowListOrder={setShowListOrder}
                showListOrder={showListOrder}
                isCategories={isCategories}
            />
            { openModal && <EmitSaleDrawer
                open={openModal}
                products={isProducts}
                information={isInformation}
                setOpen={setOpenModal}
                getSales={getSales}
                typeSale={'Table'}
                ordersToDetails={ordersToDetails}
                tableSelected={tableSelected}
                setShowListOrder={setShowListOrder}
            /> }
        </div>
    )
}

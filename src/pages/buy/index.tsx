import React, { useEffect, useState } from 'react'
import BuyHead from './BuyHead'
import BuyListTable from './BuyListTable'
import { BuyModel } from '../../models/BuyModel'
import { BuyService } from '../../service/BuyService'
import EmitBuyDrawer from './EmitBuyDrawer'
import ProductService from '../../service/ProductService'
import SaleService from '../../service/SaleService'

export default function BuyPage() {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [loadingList, setLoadingList] = useState<boolean>(false)
    const [isBuys, setBuys] = useState<BuyModel[]>([])
    const [isProducts, setProducts] = useState<any[]>([])
    const [isInformation, setInformation] = useState<any>(null)

    const getBuys = async () => {
        setLoadingList(true)
        const service = BuyService
        await service.list()
        setBuys(service.getBuys())
        setLoadingList(false)
    }

    const getProducts = async () => {
        const { data } = await ProductService.getProductForSale()
        setProducts(data)
    }

    const getInformation = async () => {
        const { data } = await SaleService.getInformationForSale()
        setInformation(data)
    }

    useEffect(() => {
        getBuys()
        getProducts()
        getInformation()
    }, [])

    return (
        <div className="mx-20 my-8 shadow-md bg-white">
            <div>
                <BuyHead
                    setOpen={setOpenModal}
                />
            </div>
            <BuyListTable
                loadingList={loadingList}
                buys={isBuys}
            />
            <EmitBuyDrawer
                getBuys={getBuys}
                information={isInformation}
                open={openModal}
                products={isProducts}
                setOpen={setOpenModal}
            />
        </div>
    )
}

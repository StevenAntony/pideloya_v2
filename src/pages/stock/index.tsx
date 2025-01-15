import React, { useEffect, useState } from 'react'
import StockListTable from './StockListTable'
import { StockModel } from '../../models/StockModel'
import { StockService } from '../../service/StockService'
import StockHead from './StockHead'
import { StoreModel } from '../../models/StoreModel'
import { StoreService } from '../../service/StoreService'

export default function StockPage() {
    const [isStocks, setStocks] = useState<StockModel[]>([])
    const [isStores, setStores] = useState<StoreModel[]>([])
    const [storeSelected, setStoreSelected] = useState<StoreModel|null>(null)
    const [filter, setFilter] = useState<string>('')
    const [loadingList, setLoadingList] = useState<boolean>(false)

    const getStocks = async (id: number) => {
        setLoadingList(true)
        const service = StockService
        await service.list(id)
        setStocks(service.getStocks())
        setLoadingList(false)
    }

    const getStores = async () => {
        setLoadingList(true)
        const service = StoreService
        await service.listAvailable()
        setStores(service.getStores())
    }

    useEffect(() => {
        if (storeSelected != null) {
            getStocks(storeSelected.id)
        }
    }, [storeSelected])

    useEffect(() => {
        if (isStores.length > 0) {
            setStoreSelected(isStores[0])
        }
    }, [isStores])

    useEffect(() => {
        getStores()
    }, [])

    return (
        <div className="mx-20 my-8 shadow-md bg-white">
            <div className='pt-10 py-4 px-8'>
                <StockHead
                    isStores={isStores}
                    storeSelected={storeSelected}
                    setStoreSelected={setStoreSelected}
                    setFilter={setFilter}
                />
            </div>
            <StockListTable
                dataSource={
                    filter
                    ? isStocks.filter(obj => obj.name.toLowerCase().includes(filter.toLowerCase()))
                    : isStocks
                }
                setDataSource={setStocks}
                storeSelected={storeSelected}
                loadingList={loadingList}
            />
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { Select, Typography } from 'antd'
import { PlusOutlined, EllipsisOutlined, DoubleRightOutlined, SyncOutlined } from '@ant-design/icons'
import { StoreModel } from '../../models/StoreModel'
import { StoreService } from '../../service/StoreService'
import StockListTable from './StockListTable'
import { StockService } from '../../service/StockService'
import { ProductStockToTransferModel } from '../../models/StockModel'

const { Title } = Typography

export default function TransferPage() {
    const [storeOrigin, setStoreOrigin] = useState<StoreModel|null>(null)
    const [storeDestination, setStoreDestination] = useState<StoreModel|null>(null)
    const [selectedRow, setSelectedRow] = useState<StoreModel|null>(null)
    const [isStores, setStores] = useState<StoreModel[]>([])
    const [isProductsStocks, setProductsStocks] = useState<ProductStockToTransferModel[]>([])
    const [totalProducts, setTotalProducts] = useState<number>(0)
    const [loadingList, setLoadingList] = useState<boolean>(false)

    const getStores = async () => {
        setLoadingList(true)
        const service = StoreService
        await service.list()
        setStores(service.getStores())
        if (service.getStores().length > 0) {
            setStoreOrigin(service.getStores()[0])
        }
        setLoadingList(false)
    }

    const getStocks = async (page = 1, pageSize = 20) => {
        setLoadingList(true)
        const service = StockService
        await service.listStockToTransfer(page, pageSize)
        setProductsStocks(service.getStocksToTransfer())
        setTotalProducts(service.getResponse().data.total)
        setLoadingList(false)
    }

    useEffect(() => {
        getStores()
        getStocks()
    } , [])

    return (
        <div className="mx-8 my-8 shadow-md bg-white">
            <div className="p-8 flex justify-between items-center">
                <Title level={3} className='!m-0'>Transferir Stock</Title>
                <div className='flex gap-4 items-center'>
                    <div className='flex flex-col'>
                        <label htmlFor="origin">Origen</label>
                        <Select
                            className='w-40'
                            value={storeOrigin?.id}
                            onChange={(value: number) => {
                                setStoreOrigin(isStores.find((obj) => obj.id == value) ?? null)
                                setStoreDestination(null)
                            }}
                            options={isStores.map((value) => {
                                return {
                                    value: value.id,
                                    label: value.name
                                }
                            })}
                        />
                    </div>
                    <div>
                        <DoubleRightOutlined />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="destination">Destino</label>
                        <Select
                            className='w-40'
                            placeholder="Seleccione almacen destino"
                            value={storeDestination ? storeDestination.id : null}
                            onChange={(value: number) => {
                                setStoreDestination(isStores.find((obj) => obj.id == value) ?? null)
                            }}
                            options={isStores.filter((value) => value.id != storeOrigin?.id).map((value) => {
                                return {
                                    value: value.id,
                                    label: value.name
                                }
                            })}
                        />
                    </div>
                </div>
            </div>
            <div className="px-8 pb-20">
                <StockListTable
                    dataSource={isProductsStocks}
                    loadingList={loadingList}
                    setDataSource={getStocks}
                    warehousesSelected={{
                        origin: storeOrigin,
                        destination: storeDestination
                    }}
                    total={totalProducts}
                />
            </div>
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import ReportList from '../../../components/table/ReportList'
import { StoreModel } from '../../../models/StoreModel'
import { StoreService } from '../../../service/StoreService'
import { Select } from 'antd'
import LabelStoreOption from '../../../components/app/select/LabelStoreOption'
import { useAuthContext } from '@contexts/auth/AuthContext'

export default function ReportStockPage() {
    const [isStores, setStores] = useState<StoreModel[]>([])
    const [storeSelected, setStoreSelected] = useState<StoreModel|null>(null)

    const { user } = useAuthContext()

    const getStores = async () => {
        const service = StoreService
        await service.listAvailable()
        setStores(service.getStores())
    }

    const filterStores = () => {
        return (
            <div>
                <Select
                    className='w-80'
                    value={storeSelected?.id}
                    onChange={(value: number) => {
                        setStoreSelected(isStores.find(store => store.id == value) ?? null)
                    }}
                    placeholder={'Seleccione una caja'}
                    options={isStores.map(store => {
                        return {
                            label: <LabelStoreOption value={store} />,
                            value: store.id
                        }
                    })}
                />
            </div>
        )
    }

    useEffect(() => {
        getStores()
    }, [])

    return (
        <div className="mx-8 my-8 shadow-md rounded bg-white">
            <div className='grid gap-3 p-4'>
                <ReportList
                    key={1}
                    title='Listado de stock'
                    description='Obtener el stock de los productos segun el almacen seleccionado.'
                    resource={['excel']}
                    renderFilters={filterStores()}
                    actions={
                        {
                            excel: {
                                'type': 'url',
                                'url': (
                                    storeSelected
                                    ? `/excel/report/stock-store/${user.id}/${storeSelected.id}`
                                    : '#'
                                ),
                            }
                        }
                    }
                />
                <ReportList
                    key={2}
                    title='Movimientos por almacen'
                    description='Obtener los movimientos de un producto segun el almacen seleccionado.'
                    resource={['excel']}
                    renderFilters={filterStores()}
                    actions={
                        {
                            excel: {
                                'type': 'url',
                                'url': (
                                    storeSelected
                                    ? `/excel/report/movement-stock-store/${user.id}/${storeSelected.id}`
                                    : '#'
                                ),
                            }
                        }
                    }
                />
                <ReportList
                    key={3}
                    title='Movimientos por producto ("No disponible por el momento")'
                    description='Obtener los movimientos de un producto.'
                    resource={['pdf', 'excel', 'graphic']}
                />
            </div>
        </div>
    )
}

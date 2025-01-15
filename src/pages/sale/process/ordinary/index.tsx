import { SaleContextProvider } from '@pages/sale/process/contexts/SaleContext'
import React, { useState } from 'react'
import SaleHead from './SaleHead'
import SaleListTable from './SaleListTable'
import SalesProcess from '@pages/sale/process/components/SalesProcess'
import { useSaleContext } from '@pages/sale/process/hooks/useSaleContext'
import Authorized from '@components/Authorized'
import { SALE_ACTIONS } from '@constants/authorized'

type Props = {}

export default function SaleOrdinary({ }: Props) {
    const { openModalEmit, setOpenModalEmit } = useSaleContext()

    return (
        <div>
            <div className="mx-8 my-8 shadow-md bg-white">
                <SaleHead
                    setOpenModalEmit={setOpenModalEmit}
                />
                <div className='px-8'>
                    <Authorized title='Lista de ventas' action={SALE_ACTIONS.listOrdinary}>
                        <SaleListTable />
                    </Authorized>
                </div>
            </div>
            <SalesProcess
                onClose={() => setOpenModalEmit(false)}
                openModalSale={openModalEmit}
                typeSale='Ordinary'
            />
        </div>
    )
}

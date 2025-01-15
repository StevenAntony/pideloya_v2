import React from 'react'
import SaleHead from '../SaleHead'
import SaleListTable from '../SaleListTable'
import { Alert } from 'antd'
import { SaleTypeOrdinaryProps } from './SaleTypeOrdinaryProps'

export default function SaleTypeOrdinary({
    isCheckRequirements,
    setOpenModal,
    isSales,
    loadingList
}: SaleTypeOrdinaryProps) {


    return (
        <>
            <div>
                <SaleHead
                    setOpen={setOpenModal}
                    disabled={isCheckRequirements ? isCheckRequirements.length != 0 : true}
                />
            </div>
            <div>
                <SaleListTable
                    sales={isSales}
                    loadingList={loadingList}
                />
            </div>
        </>
    )
}

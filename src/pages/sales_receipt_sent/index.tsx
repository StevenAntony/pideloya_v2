import { Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import SalesReceiptSentTable from './SalesReceiptSentTable'
import { _SaleService } from '../../service/_SaleService'
import { current } from '../../../helpers/date'

export default function SalesReceiptSentPage() {

    const { month, year } = current()

    const [loadingList, setLoadingList] = useState<boolean>(false)
    const [isSales, setSales] = useState([])
    const [yearSelected, setYearSelected] = useState<number>(year)
    const [monthSelected, setMonthSelected] = useState<string>(month)

    const getListSale = async () => {
        setLoadingList(true)
        const service = new _SaleService
        await service.listSalesSentSunat(monthSelected, yearSelected)
        setSales(service.getResponse().data)
        setLoadingList(false)
    }

    useEffect(() => {
        getListSale()
    }, [yearSelected, monthSelected])

    return (
        <div className="mx-20 my-8 shadow-md bg-white">
            <div className="p-8 pb-0 flex justify-between ">
                <Typography.Title level={3}>Comprobante enviados</Typography.Title>
            </div>
            <SalesReceiptSentTable
                loadingList={loadingList}
                sales={isSales}
                yearSelected={yearSelected}
                setYearSelected={setYearSelected}
                monthSelected={monthSelected}
                setMonthSelected={setMonthSelected}
            />
        </div>
    )
}

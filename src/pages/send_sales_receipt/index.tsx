import React, { useEffect, useState } from 'react'
import SendSalesReceiptHead from './SendSalesReceiptHead'
import SendSalesReceiptTable from './SendSalesReceiptTable'
import { _SaleService } from '../../service/_SaleService'
import { Alert } from 'antd'
import { useAuthContext } from '../../contexts/AuthContext'

export default function SendSalesReceiptPage() {

    const [loadingList, setLoadingList] = useState<boolean>(false)
    const [isSales, setSales] = useState([])

    const { auth } = useAuthContext()

    const getListSale = async () => {
        setLoadingList(true)
        const service = new _SaleService
        await service.listSalesToSunat()
        setSales(service.getResponse().data)
        setLoadingList(false)
    }

    useEffect(() => {
        getListSale()
    }, [])


    return (
        <div className="mx-8 my-8 shadow-md bg-white">
            <div className="px-8 pt-4">
                { auth?.company?.billingToken == null || auth?.company?.billingToken == "" && <Alert key={0} message={'Deberia solicitar token de facturación'} className="my-1" type="warning" showIcon />}
            </div>
            <SendSalesReceiptHead beta={auth?.company?.betaBilling == 1} />
            <SendSalesReceiptTable
                loadingList={loadingList}
                sales={isSales}
                getListSale={getListSale}
            />
        </div>
    )
}

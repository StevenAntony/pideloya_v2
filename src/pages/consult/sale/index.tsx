import { FilterAltOutlined } from '@mui/icons-material'
import { Button, DatePicker, Input, message, Select, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import ListSaleInTable from './ListSaleInTable'
import { _SaleService } from '../../../service/_SaleService'
import ViewPaymentHistory from './ViewPaymentHistory'
import { SalePaymentModel } from '../../../models/SalePaymentModel'

const { Title } = Typography

type Props = {}

export default function ConsultSalePage({ }: Props) {
    const [issue, setIssue] = useState<string>('')
    const [nroDocument, setNroDocument] = useState<string>('')
    const [isSales, setSales] = useState<any[]>([])
    const [isPayments, setPayments] = useState<SalePaymentModel[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [openPaymentHistory, setOpenPaymentHistory] = useState<boolean>(false)
    const [saleSelected, setSaleSelected] = useState<any|null>(null)
    const [loadingPayments, setLoadingPayments] = useState<boolean>(false)

    const TitleFilter = ({ name }) => {
        return (
            <label htmlFor="" className='text-sm font-bold'>{name}</label>
        )
    }

    const handleFilter = async () => {
        if (issue == '' && nroDocument == '') {
            message.warning('Al menos un filtro seleccionar')
            return
        }

        setLoading(true)
        const service = new _SaleService()
        await service.filters({
            issue, nroDocument
        })
        setSales(service.getResponse().data)
        setLoading(false)
    }

    const getPaymentHistory = async () =>{
        setLoadingPayments(true)
        const service = new _SaleService()
        await service.viewPaymentHistory(saleSelected.key)
        setPayments(service.getResponse().data)
        setOpenPaymentHistory(true)
        setLoadingPayments(false)
    }

    useEffect(() => {
        if(openPaymentHistory) getPaymentHistory()
    }, [openPaymentHistory])

    return (
        <div className="mx-8 my-8 rounded-md shadow-md bg-white">
            <div className="p-8">
                <Title level={3}>Consultar Ventas</Title>
                <div className='flex flex-wrap'>
                    <div className='grid px-1'>
                        <TitleFilter name='Fecha Emisión' />
                        <DatePicker placeholder='Seleccionar fecha' value={issue} onChange={(value) => setIssue(value ?? '')} />
                    </div>
                    <div className='grid px-1'>
                        <TitleFilter name='Comprobante' />
                        <Input
                            placeholder='B001-000001'
                            value={nroDocument}
                            onChange={(e) => setNroDocument(e.target.value ?? '')}
                            allowClear
                        />
                    </div>
                    <div className='grid px-1'>
                        <Button
                            type='primary'
                            className='mt-5'
                            icon={<FilterAltOutlined />}
                            onClick={handleFilter}
                        >Filtrar</Button>
                    </div>
                </div>
                <div className='my-4'>
                    <ListSaleInTable
                        sales={isSales}
                        loading={loading}
                        saleSelected={saleSelected}
                        setSaleSelected={setSaleSelected}
                        setOpenViewPaymentHistory={setOpenPaymentHistory}
                    />
                </div>
            </div>
            <ViewPaymentHistory
                open={openPaymentHistory}
                setOpen={setOpenPaymentHistory}
                saleSelected={saleSelected}
                payments={isPayments}
                loading={loadingPayments}
            />
        </div>
    )
}

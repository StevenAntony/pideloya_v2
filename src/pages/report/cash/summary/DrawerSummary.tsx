import { Alert, Drawer, Popover, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { CashModel, CashSummaryModel } from '../../../../models/CashModel'
import { ArrowDownwardOutlined, ArrowUpwardOutlined, CloseFullscreen, ContactSupportOutlined, OpenInFull } from '@mui/icons-material'
import FormatCurrency from '../../../../../helpers/FormatCurrency'
import _CashService from '../../../../service/_CashService'
import SalePaymentSummary from './SalePaymentSummary'
import BuyPaymentSummary from './BuyPaymentSummary'

type Props = {
    open: boolean;
    handleClose: () => void;
    cashSelected: CashModel;
}

export default function DrawerSummary({
    open,
    cashSelected,
    handleClose
}: Props) {
    const [isSummary, setSummary] = useState<CashSummaryModel|null>(null)
    const [loadingSummary, setLoadingSummary] = useState<boolean>(false)

    const getSummary = async () => {
        setLoadingSummary(true)
        const service = new _CashService()
        await service.listSummary(cashSelected.id)
        setSummary(service.getSummary())

        setLoadingSummary(false)
    }

    const totalCash = () => {
        let total = 0
        if (isSummary) {
            const ingress = Number(cashSelected.amount) + isSummary.sale.reduce((total:number, obj) => total + Number(obj.totalAmount), 0) + Number(isSummary.movement.ingress)
            const egress = isSummary.buy.reduce((total:number, obj) => total + Number(obj.totalAmount), 0) + Number(isSummary.movement.egress)
            total = ingress - egress
        }

        return <span className={`${total < 0 ? 'text-red-700' : 'text-green-700'}`}>{FormatCurrency.formatCurrency(total)}</span>
    }

    useEffect(() => {
        getSummary()
    }, [])

    return (
        <Drawer
            title={(
                <div className='flex justify-between'>
                    <div>
                        { cashSelected.status === 'APERTURADO' ? <OpenInFull sx={{ color: 'green' }} /> : <CloseFullscreen sx={{ color: 'red' }} />}
                        <span className='ml-2'>{cashSelected.code} - {cashSelected.openingDate} : {cashSelected.user}</span>
                    </div>
                    <div>
                        <span>
                            <Popover
                                placement='bottomLeft'
                                content={
                                    <p>
                                        (<span className='text-green-700'>Apertura Caja</span> +
                                        <span className='text-green-700'>Ventas</span> +
                                        <span className='text-green-700'>Ingresos</span>) -
                                        (<span className='text-red-700'>Compras</span> +
                                        <span className='text-red-700'>Egresos</span>)

                                    </p>
                                }
                                title="Total Caja"
                            >
                                <ContactSupportOutlined sx={{ color: 'blue' }} />
                            </Popover>
                            <span className='ml-2 text-xl font-black'>{totalCash()}</span>
                        </span>
                    </div>
                </div>
            )}
            size='large'
            onClose={handleClose}
            open={open}
        >
            <div className='grid gap-4'>
                <div className='flex justify-between border-b py-2'>
                    <span><ArrowUpwardOutlined sx={{ color: 'green' }} /> Apertura Caja</span>
                    <span className='font-black text-lg text-green-700'>{FormatCurrency.formatCurrency(cashSelected.amount)}</span>
                </div>
                <Skeleton loading={loadingSummary}>
                    {
                        isSummary
                        ? <SalePaymentSummary isSummary={isSummary} />
                        : <Alert message="Error al cargar el resumen de venta" type='error' />
                    }
                </Skeleton>
                <Skeleton loading={loadingSummary}>
                    {
                        isSummary
                        ? (
                            <div className='flex justify-between border-b py-2'>
                                <span><ArrowUpwardOutlined sx={{ color: 'green' }} /> Ingresos Movimientos</span>
                                <span className='font-black text-lg text-green-700'>{FormatCurrency.formatCurrency(isSummary.movement.ingress)}</span>
                            </div>
                        )
                        : <Alert message="Error al cargar el resumen de ingreso" type='error' />
                    }
                </Skeleton>
                <Skeleton loading={loadingSummary}>
                    {
                        isSummary
                        ? <BuyPaymentSummary isSummary={isSummary} />
                        : <Alert message="Error al cargar el resumen de compra" type='error' />
                    }
                </Skeleton>
                <Skeleton loading={loadingSummary}>
                    {
                        isSummary
                        ? (
                            <div className='flex justify-between border-b py-2'>
                                <span><ArrowDownwardOutlined sx={{ color: 'red' }} /> Egreso Movimientos</span>
                                <span className='font-black text-lg text-red-700'>{FormatCurrency.formatCurrency(isSummary.movement.egress)}</span>
                            </div>
                        )
                        : <Alert message="Error al cargar el resumen de ingreso" type='error' />
                    }
                </Skeleton>
            </div>
        </Drawer>
    )
}

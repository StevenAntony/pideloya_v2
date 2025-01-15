import { ArrowUpwardOutlined } from '@mui/icons-material'
import React from 'react'
import FormatCurrency from '../../../../../helpers/FormatCurrency'
import PaymentMethodSummary from './PaymentMethodSummary'
import { CashSummaryModel } from '../../../../models/CashModel'

type Props = {
    isSummary: CashSummaryModel;
}

export default function SalePaymentSummary({
    isSummary
}: Props) {
    return (
        <div className='border-b py-2'>
            <div className='flex justify-between'>
                <span><ArrowUpwardOutlined sx={{ color: 'green' }} /> Ventas</span>
                <span className='font-black text-lg text-green-700'>{FormatCurrency.formatCurrency(isSummary.sale.reduce((total:number, obj) => total + Number(obj.totalAmount), 0))}</span>
            </div>
            { isSummary.sale.map(obj => <PaymentMethodSummary key={obj.name} type={obj.name} amount={obj.totalAmount} />) }
        </div>
    )
}

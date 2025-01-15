import { ArrowDownwardOutlined } from '@mui/icons-material'
import React from 'react'
import FormatCurrency from '../../../../../helpers/FormatCurrency'
import { CashSummaryModel } from '../../../../models/CashModel';
import PaymentMethodSummary from './PaymentMethodSummary';

type Props = {
    isSummary: CashSummaryModel;
}

export default function BuyPaymentSummary({
    isSummary
}: Props) {
    return (
        <div className='border-b py-2'>
            <div className='flex justify-between'>
                <span><ArrowDownwardOutlined sx={{ color: 'red' }} /> Compras</span>
                <span className='font-black text-lg text-red-700'>{FormatCurrency.formatCurrency(isSummary.buy.reduce((total:number, obj) => total + Number(obj.totalAmount), 0))}</span>
            </div>
            { isSummary.buy.map(obj => <PaymentMethodSummary key={obj.name} type={obj.name} amount={obj.totalAmount} />) }
        </div>
    )
}

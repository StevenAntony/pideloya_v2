import React from 'react'
import FormatCurrency from '../../../../../helpers/FormatCurrency';
import { Payments } from '@mui/icons-material';

type Props = {
    type: string;
    amount: number;
}

export default function PaymentMethodSummary({
    type,
    amount
}: Props) {
    return (
        <div className='flex justify-between py-1 pl-10'>
            <span><Payments /> {type}</span>
            <span className='font-bold text-base'>{FormatCurrency.formatCurrency(amount)}</span>
        </div>
    )
}

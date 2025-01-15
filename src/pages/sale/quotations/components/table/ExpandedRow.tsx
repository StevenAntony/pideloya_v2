import FormatCurrency from '@helpers/FormatCurrency'
import { DetailQuotationModel } from '@models/sale/QuotationModel'
import React from 'react'
import productImg from '@/img/product.svg'

type Props = {
    detail: DetailQuotationModel
}

export default function ExpandedRow({ detail }: Props) {
    return (
        <div className='px-8 flex justify-between'>
            <div className='flex'>
                <div className='px-2'>
                    <img className='w-[60px]' src={productImg} alt="" />
                </div>
                <div>
                    <p className='text-[16px] font-semibold'>{detail.name}</p>
                    <p className='text-[13px] text-[#747483]'>{detail.unitName} / {detail.unitAbbreviation}</p>
                </div>
            </div>
            <div className='text-right'>
                <p className='text-[16px] font-semibold'>{FormatCurrency.formatCurrency(detail.price)}</p>
                <p className='text-[14px] text-[#747483]'>{detail.quantity}</p>
            </div>
        </div>
    )
}

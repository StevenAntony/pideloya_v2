import { Paid, Payments } from '@mui/icons-material'
import { InputNumber } from 'antd'
import React from 'react'
import { Square } from '../../model/CashModuleModel'
import FormatCurrency from '@helpers/FormatCurrency'

type Props = {
    square: Square
    handleSquareChange: (name: string, value: number) => void
}

export default function CurrencyItem({
    square,
    handleSquareChange
}: Props) {
    return (
        <div className='grid grid-cols-3 text-center py-1'>
            <div className='flex justify-center w-32'>
                <div>{square.type == 'money' ? <Paid sx={{ color: '#b89902' }} /> : <Payments sx={{ color: '#00804d' }} />}</div>
                <div className='text-right w-14 font-semibold'>{square.name}</div>
            </div>
            <div>
                <InputNumber addonBefore="S/" onChange={value => handleSquareChange(square.name, value ?? 0)}  min={0} value={square.current} />
            </div>
            <div className='text-right font-bold text-slate-700'>{FormatCurrency.formatCurrency(square.current * square.value)}</div>
        </div>
    )
}

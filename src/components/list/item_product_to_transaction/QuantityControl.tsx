import { Add, Minimize } from '@mui/icons-material'
import React from 'react'

type Props = {
    increase: () => void
    decrease: () => void
    change: (value: number) => void
    value: number
}

export default function QuantityControl({
    increase,
    decrease,
    change,
    value
}: Props) {
    return (
        <div className='bg-[#F7F7F8] rounded-lg w-fit'>
            <button onClick={decrease}><Minimize sx={{ marginTop: '-20px' }} /></button>
            <input
                type="number"
                value={value}
                className='font-bold text-center appearance-none text-[16px] text-[#26262C] outline-0 bg-transparent w-[60px]'
                onChange={(e) => change(Number(e.target.value))}
            />
            <button onClick={increase}><Add /></button>
        </div>
    )
}

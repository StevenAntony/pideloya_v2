import React from 'react'
import { Props } from './Props'
import QuantityControl from './QuantityControl'
import productImg from './product.svg'
import { Delete } from '@mui/icons-material'
import { InputNumber } from 'antd'

export default function ItemProductToTransaction({
    item,
    changeQuantity,
    decreaseQuantity,
    increaseQuantity,
    changePrice,
    removeItem
}: Props) {
    return (
        <div className='flex p-2 border-b border-slate-300'>
            <div className='w-[80px] px-2 flex items-center'>
                <img src={productImg} alt="" />
            </div>
            <div className='flex flex-col justify-between flex-1'>
                <div className='w-full'>
                    <p className='text-[16px] text-[#26262C] font-semibold'>{item.name}</p>
                    <p className='text-[14px] text-[#747483]'>{item.unitName} / {item.brand}</p>
                </div>
                <QuantityControl
                    value={item.quantity}
                    change={changeQuantity}
                    decrease={decreaseQuantity}
                    increase={increaseQuantity}
                />
            </div>
            <div className='flex flex-col justify-between w-[120px] items-end'>
                <InputNumber min={0} onChange={(value) => changePrice(value ?? 0)} value={item.price} addonBefore="S/" />
                <button onClick={removeItem}><Delete sx={{ color: 'red' }} /></button>
            </div>
        </div>
    )
}

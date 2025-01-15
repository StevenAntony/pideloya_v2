import FormatCurrency from '@helpers/FormatCurrency'
import React from 'react'

type Props = {
    name: string
}

type WidgetProps = {
    amount: number
    type: 'Ingreso' | 'Egreso' | 'Inicial'
}

const Widget = ( props : WidgetProps ) => {

    const color = props.type == 'Ingreso' ? 'green' : props.type == 'Egreso' ? 'red' : 'gray'

    return (
        <div className={`flex justify-between text-${color}-600`}>
            <div>
                <i className={`pi pi-money-bill`}></i>
                <span className='ml-2'>{props.type}</span>
            </div>
            <span className='font-bold text-sm'>{FormatCurrency.formatCurrency(props.amount)}</span>
        </div>
    )
}

export default function GroupCashItem(props: Props) {
    return (
        <div className='p-1 w-3/12 cursor-pointer' title='ir a la caja'>
            <div className=''>
                <div className='bg-white border w-36 rounded-t-md px-2 py-1'>
                    S/ 9,999,999.99
                </div>
                <div className='bg-white border p-3 rounded-tr-md'>
                    <div className='text-center font-bold text-2xl'>{props.name}</div>
                    <Widget amount={1000} type='Inicial' key={1} />
                    <Widget amount={1000} type='Ingreso' key={2} />
                    <Widget amount={1000} type='Egreso' key={3} />
                </div>
            </div>
        </div>
    )
}

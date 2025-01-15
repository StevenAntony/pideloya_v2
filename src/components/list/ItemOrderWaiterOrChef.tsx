import React, { useEffect, useState } from 'react'
import { OrderModel } from '../../models/OrderModel'
import { Button, Popconfirm, Select, Tag } from 'antd'
import FormatCurrency from '../../../helpers/FormatCurrency'
import { STATE_ORDER } from '../../../helpers/Init'

type Props = {
    order: OrderModel;
    typeUser?: 'waiter'|'chef';
    onConfirmState?: (order: OrderModel, newState: string) => void;
}

export default function ItemOrderWaiterOrChef({
    order,
    typeUser = 'waiter',
    onConfirmState
}: Props) {
    const [state, setState] = useState<any>(STATE_ORDER.find(s => s.state == order.state) ?? STATE_ORDER[0])
    const nextState = (state: string) => {
        if (state == 'pending' || state == 'printed') {
            return STATE_ORDER.find(s => s.state == 'prepared')
        }

        if (state == 'prepared') {
            return STATE_ORDER.find(s => s.state == 'served')
        }
    }

    useEffect(() => {
        setState(STATE_ORDER.find(s => s.state == order.state) ?? STATE_ORDER[0])
    }, [order])

    return (
        <div className='bg-white shadow rounded p-2 py-3 relative'>
            <p className='font-bold text-sm'>{order.orderDescription}</p>
            <p className='text-xs'><Tag>Nota</Tag> {order.note}</p>
            <div className='flex justify-between items-center'>
                <div>
                    <Tag color='red' className='text-xs font-bold'>Mesa: {order.nameTable}</Tag>
                    <Tag color='blue' className='text-xs font-bold'>Cant: {order.quantity}</Tag>
                    <Tag color='blue-inverse' className='text-xs font-bold'>{FormatCurrency.formatCurrency(order.price)}</Tag>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <Tag color={state.color} className='text-xs font-bold'>Estado: {state.name}</Tag>
                { nextState(order.state)?.user == typeUser && (
                      <Popconfirm
                      title="Estado a cambiar"
                      description={<div className='w-48'>¿Esta seguro de cambiar el estado a {nextState(order.state)?.name} de la orden?</div>}
                      onConfirm={() => {
                        onConfirmState && onConfirmState(order, nextState(order.state)?.state ?? '')
                      }}
                      okText="Si, cambiar"
                      cancelText="Cancelar"
                    >
                        <Button
                            type='primary'
                        >
                            {nextState(order.state)?.name}
                        </Button>
                    </Popconfirm>
                )}
            </div>
            <span className='absolute top-2 right-0'>
                <Tag className='font-bold'>{order.issue}</Tag>
            </span>
        </div>
    )
}

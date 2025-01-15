import React, { useEffect, useState } from 'react'
import { OrderModel } from '../../../models/OrderModel'
import { Spin, Typography } from 'antd'
import OrderService from '../../../service/restaurant/OrderService'
import ItemOrderWaiterOrChef from '../../../components/list/ItemOrderWaiterOrChef'

type Props = {
}

const { Title } = Typography

export default function OrderList({}: Props) {
    const [isOrders, setOrders] = useState<OrderModel[]>([])
    const [loadingOrders, setLoadingOrders] = useState<boolean>(false)

    const getOrders = async () => {
        setLoadingOrders(true)
        const service = new OrderService
        await service.list()
        setOrders(service.getOrders())
        setLoadingOrders(false)
    }

    const updatedState = async (order: OrderModel, state: string) => {
        const service = new OrderService
        await service.updateState(order.id, state)
        getOrders()
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <div>
            <div className='bg-white p-3 py-1'><Title level={4}>Mis Ordenes</Title></div>
            <Spin spinning={loadingOrders} className='h-full' tip="Cargando ordenes...">
                <div className='flex px-3 py-3 gap-2 flex-col'>
                    {
                        isOrders.map((order, index) => {
                            return <ItemOrderWaiterOrChef  key={index} order={order} onConfirmState={updatedState} />
                        })
                    }
                </div>
            </Spin>
        </div>
    )
}

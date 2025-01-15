import { Empty, message, Spin, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { OrderModel } from '../../../models/OrderModel'
import OrderService from '../../../service/restaurant/OrderService'
import ItemOrderWaiterOrChef from '../../../components/list/ItemOrderWaiterOrChef'
import { useSocketIO } from '../../../contexts/SocketContext'
import { useAuthContext } from '../../../contexts/AuthContext'

type Props = {}

const { Title } = Typography

export default function KitchenPage({}: Props) {
    const [isOrders, setOrders] = useState<OrderModel[]>([])
    const [loadingOrders, setLoadingOrders] = useState<boolean>(false)

    const { socketIO, waitEvent } = useSocketIO()
    const { auth } = useAuthContext()

    const getOrders = async () => {
        setLoadingOrders(true)
        const service = new OrderService
        await service.listKichen()
        setOrders(service.getOrders())
        setLoadingOrders(false)
    }

    const updatedState = async (order: OrderModel, state: string) => {
        const service = new OrderService
        await service.updateState(order.id, state)
        getOrders()
    }

    useEffect(() => {
        if (socketIO && auth?.company?.id) {
            waitEvent(`send_new_order_${auth?.company?.id}`, (body) => {
                message.info('Tiene nueva orden')
                getOrders()
            })
        }
    }, [socketIO])

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <div className="mx-8 my-8 shadow-md bg-white min-h-80">
            <Title level={3} className='p-3 !m-0'>Ordenes de cocina</Title>
            <Spin spinning={loadingOrders} className='h-full' tip="Cargando ordenes...">
                <div className='h-full'>
                    {
                        isOrders.length === 0
                        ? <Empty description={<div className='text-[--color-app]'>No hay ordenes</div>} />
                        : (
                            <div className='flex px-3 py-3 gap-2 flex-col'>
                                {
                                    isOrders.map((order, index) => {
                                        return <ItemOrderWaiterOrChef  key={index} order={order} typeUser='chef' onConfirmState={updatedState} />
                                    })
                                }
                            </div>
                        )
                    }
                </div>
            </Spin>
        </div>
    )
}

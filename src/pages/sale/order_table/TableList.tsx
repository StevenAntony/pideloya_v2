import React, { useEffect, useState } from 'react'
import TableService from '../../../service/TableService'
import { Button, Spin, Tabs } from 'antd'
import OrderList from './OrderList'
import LevelTable from '../../../components/list/LevelTable'
import type { TabsProps } from 'antd'
import { useAuthContext } from '../../../contexts/AuthContext'
import tableToSaleAdapter from '../../../adapters/tableToSaleAdapter'
import { useSocketIO } from '../../../contexts/SocketContext'
import { CategoryModel } from '../../../models/CategoryModel'

export default function TableList({
    isProducts,
    setOpenModal,
    setOrdersToDetails,
    setTableSelected,
    tableSelected,
    showListOrder,
    setShowListOrder,
    isCategories
}:{
    isProducts: any[];
    setOpenModal: (e: boolean) => void;
    setOrdersToDetails: (e: any[]) => void;
    setTableSelected: (e: any) => void;
    tableSelected: any;
    showListOrder: boolean;
    setShowListOrder: (e: boolean) => void;
    isCategories: CategoryModel[];
}) {
    const [isTables, setTables] = useState<any[]>([])
    const [isOrders, setOrders] = useState<any[]>([])
    const [loadingTables, setLoadingTables] = useState<boolean>(false)
    const [loadingOrders, setLoadingOrders] = useState<boolean>(false)
    const { auth } = useAuthContext()

    const { socketIO, waitEvent } = useSocketIO()

    const getTables = async () => {
        setLoadingTables(true)
        const response = await TableService.list()
        setTables(response.data)
        setLoadingTables(false)
    }


    const getOrderByTable = async (id: number) => {
        setShowListOrder(true)
        setLoadingOrders(true)
        const response = await TableService.getTableOrders(id)
        setOrders(response?.data?.order ?? [])
        setTableSelected({
            id: response?.data?.id,
            name: response?.data?.description
        })

        setLoadingOrders(false)
    }


    const itemsLevel:TabsProps['items'] = [
        {
            key: `level-1`,
            label: `Piso N° 01`,
            children: <LevelTable
                getOrderByTable={getOrderByTable}
                isTables={isTables.filter(table => table.level === 1 )}
            />,
            // icon: <TableChartOutlined />
        },
        {
            key: `level-2`,
            label: `Piso N° 02`,
            children: <LevelTable
                getOrderByTable={getOrderByTable}
                isTables={isTables.filter(table => table.level === 2 )}
            />,
            // icon: <TableChartOutlined />
        },
        {
            key: `level-3`,
            label: `Piso N° 03`,
            children: <LevelTable
                getOrderByTable={getOrderByTable}
                isTables={isTables.filter(table => table.level === 3 )}
            />,
            // icon: <TableChartOutlined />
        },
        {
            key: `level-4`,
            label: `Piso N° 04`,
            children: <LevelTable
                getOrderByTable={getOrderByTable}
                isTables={isTables.filter(table => table.level === 4 )}
            />,
            // icon: <TableChartOutlined />
        }
    ]

    useEffect(() => {
        if(!showListOrder) getTables()
    },[showListOrder])

    useEffect(() => {
        if (socketIO && auth?.company?.id) {
            waitEvent(`send_change_status_table_${auth?.company?.id}`, (body) => {
                setTables([...tableToSaleAdapter(body.data)])
            })
        }
    }, [socketIO]);

    return (
        <Spin tip="Cargando mesas..." spinning={loadingTables}>
            <div className='h-full'>
                <div className='w-full flex flex-wrap'>
                    {
                        showListOrder && <OrderList
                            isProducts={isProducts}
                            orders={isOrders}
                            setOrders={setOrders}
                            table={tableSelected}
                            reload={getOrderByTable}
                            loading={loadingOrders}
                            setTable={setTableSelected}
                            setShowListOrder={setShowListOrder}
                            setOpenFinishModal={setOpenModal}
                            setOrdersToDetails={setOrdersToDetails}
                            isCategories={isCategories}
                        />
                    }
                    {
                        !showListOrder && <>
                            <Tabs defaultActiveKey="level-1" tabBarStyle={{ paddingLeft: '10px' }} className='w-full flex' items={itemsLevel} />
                        </>
                    }
                </div>
            </div>
        </Spin>
    )
}

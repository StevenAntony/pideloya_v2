import { Tabs } from 'antd'
import React from 'react'
import type { TabsProps } from 'antd'
import { ListAltOutlined, TableChartOutlined } from '@mui/icons-material'
import TableList from '../order_table/TableList'
import SaleListTable from '../SaleListTable'

export default function SaleTypeTable({
    isProducts,
    setOpenModal,
    setOrdersToDetails,
    setTableSelected,
    tableSelected,
    isSales,
    showListOrder,
    setShowListOrder,
    isCategories
}) {

    const items: TabsProps['items'] = [
        {
            key: 'tables',
            label: 'Mesas',
            children: <TableList
                isProducts={isProducts}
                setOrdersToDetails={setOrdersToDetails}
                setOpenModal={setOpenModal}
                setTableSelected={setTableSelected}
                tableSelected={tableSelected}
                setShowListOrder={setShowListOrder}
                showListOrder={showListOrder}
                isCategories={isCategories}
            />,
            icon: <TableChartOutlined />
        },
        {
            key: 'list',
            label: 'Listar Ventas',
            children: <SaleListTable
                loadingList={false}
                sales={isSales}
                type='Table'
            />,
            icon: <ListAltOutlined />
        }
      ]

    return (
        <div >
            <Tabs defaultActiveKey="1" tabBarStyle={{ paddingLeft: '10px', margin: 0 }} items={items} />
        </div>
    )
}

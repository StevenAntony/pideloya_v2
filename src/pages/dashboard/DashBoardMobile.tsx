import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import { AddShoppingCart, Home, Leaderboard } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import TableList from '../sale/order_table/TableList'
import ProductService from '../../service/ProductService'
import OrderList from './restaurant/OrderList'

export default function DashBoardMobile() {
    const [value, setValue] = useState<number>(0)
    const [isProducts, setProducts] = useState<any[]>([])
    const [tableSelected, setTableSelected] = useState<any>(null)
    const [showListOrder, setShowListOrder] = useState<boolean>(false)

    const getProducts = async () => {
        const { data } = await ProductService.getProductForSale()
        setProducts(data)
    }

    const contentBottomNavigation = [
        <h1 className='text-center mt-20 text-4xl font-black'>Bienvenido!</h1>,
        <TableList
            isProducts={isProducts}
            setTableSelected={setTableSelected}
            tableSelected={tableSelected}
            setOpenModal={() => {}}
            setOrdersToDetails={() => {}}
            setShowListOrder={setShowListOrder}
            showListOrder={showListOrder}
        />,
        <OrderList />
    ]

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            <div className='pb-[60px]'>
                {
                    contentBottomNavigation[value]
                }
            </div>
            <Paper
                sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Inicio" icon={<Home />} />
                    <BottomNavigationAction label="Ordenar" icon={<AddShoppingCart />} />
                    <BottomNavigationAction label="Mis Ordenes" icon={<Leaderboard />} />
                </BottomNavigation>
            </Paper>
        </div>
    )
}

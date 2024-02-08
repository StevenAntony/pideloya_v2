'use client'
import { Tabs } from 'antd'
import OrdinarySale from './OrdinarySale'
import TableSale from './TableSale'
import DeliverySale from './DeliverySale'
import { useEffect, useState } from 'react'
import TableService from '@/service/TableService'
import ProductService from '@/service/ProductService'

const Sale = () => {
    const [isTables, setTables] = useState<Array<ITable>>([])
    const [isProducts, setProducts] = useState<Array<IProductForSale>>([])
    const [isOpenModalSelectProduct, setOpenModalSelectProduct] = useState<boolean>(false)
    const [isOpenModalGenerateDocument, setOpenModalGenerateDocument] = useState<boolean>(false)

    const getTables =async () => {
        const response =await TableService.list()

        if (response.success) {
            setTables(response.data)
        }
    }

    const getProducts =async () => {
        const response = await ProductService.getProductForSale()

        if (response.success) {
            setProducts(response.data)
        }
    }

    const showOpenModalSelectProduct = () => {
        setOpenModalSelectProduct(true)
    }

    const closeOpenModalSelectProduct = () => {
        setOpenModalSelectProduct(false)
    }

    const showOpenModalGenerateDocument = () => {
        setOpenModalGenerateDocument(true)
    }

    const closeOpenModalGenerateDocument = () => {
        setOpenModalGenerateDocument(false)
    }

    const typeSale = [
        {
            label: `Normal`,
            key: 'normal',
            children: <OrdinarySale />
        },
        {
            label: 'Mesas',
            key: 'table',
            children: <TableSale 
                showOpenModalSelectProduct={showOpenModalSelectProduct}
                closeOpenModalSelectProduct={closeOpenModalSelectProduct}
                isOpenModalSelectProduct={isOpenModalSelectProduct}
                isOpenModalGenerateDocument={isOpenModalGenerateDocument}
                showOpenModalGenerateDocument={showOpenModalGenerateDocument}
                closeOpenModalGenerateDocument={closeOpenModalGenerateDocument}
                isTables={isTables}
                isProducts={isProducts}
            />
        },
        {
            label: 'Delivery',
            key: 'delivery',
            children: <DeliverySale />
        }
    ]

    const onChange = (key: string) => {
        
    }

    useEffect(() => {
        getTables()
        getProducts()
        return () => {
        }
    }, [])

    return (
        <div>
            <Tabs
                onChange={onChange}
                type="card"
                items={typeSale}
            />
        </div>
    )
}

export default Sale
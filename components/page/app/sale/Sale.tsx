'use client'
import { Tabs } from 'antd'
import OrdinarySale from './OrdinarySale';
import TableSale from './TableSale';
import DeliverySale from './DeliverySale'
import { useEffect, useState } from 'react';
import TableService from '@/service/TableService';

const Sale = () => {
    const [isTables, setTables] = useState<Array<ITable>>([])

    const getTables =async () => {
        const response =await TableService.list()

        if (response.success) {
            setTables(response.data)
        }
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
                isTables={isTables}
            />
        },
        {
            label: 'Delivery',
            key: 'delivery',
            children: <DeliverySale />
        }
    ]

    const onChange = (key: string) => {
        console.log(key);
    }

    useEffect(() => {
        getTables()

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
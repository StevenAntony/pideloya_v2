import { Input, Select, Tooltip, Typography } from 'antd';
import React from 'react'
import { StoreModel } from '../../models/StoreModel'
import { QuestionCircleOutlined } from '@ant-design/icons'

const { Search } = Input
const { Title } = Typography

export default function StockHead({
    isStores,
    storeSelected,
    setStoreSelected,
    setFilter
}: {
    isStores: StoreModel[];
    storeSelected: StoreModel|null;
    setStoreSelected: (e: StoreModel|null) => void;
    setFilter: (e: string) => void;
}) {
    return (
        <div className='flex justify-between'>
            <Title level={3} className='flex'>Stocks
                <Tooltip title="Se muestra los productos de tipo Producto & Insumo" color={'blue'}>
                    <div className='px-2 cursor-pointer'><QuestionCircleOutlined className='text-base text-blue-800' /></div>
                </Tooltip>
            </Title>
            <div className='flex'>
                <Select
                    className='w-40'
                    placeholder='Seleccione un almacén'
                    value={storeSelected?.id}
                    onChange={(value) => {
                        const store = isStores.find(obj => obj.id == value)
                        setStoreSelected(store ?? null)
                    }}
                    options={isStores.map(obj => {
                        return {
                            value: obj.id,
                            label: obj.name
                        }
                    })}
                />
                <Search
                    placeholder="Buscar producto"
                    allowClear
                    enterButton
                    className='w-80'
                    size="middle"
                    onSearch={(value) => {
                        setFilter(value)
                    }}
                />
            </div>
        </div>
    )
}

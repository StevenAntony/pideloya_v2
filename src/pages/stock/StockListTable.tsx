import { message, Table, Tag } from 'antd'
import React from 'react'
import { StockModel } from '../../models/StockModel'
import type { TableProps } from 'antd'
import InputMovementStore from './components/InputMovementStore';
import { StockService } from '../../service/StockService';
import { StoreModel } from '../../models/StoreModel';

export default function StockListTable({
    dataSource,
    loadingList,
    storeSelected,
    setDataSource
}: {
    dataSource: StockModel[];
    loadingList: boolean;
    storeSelected: StoreModel|null;
    setDataSource: (e: StockModel[]) => void;
}) {

    const registerMovement =async (type: 'output'|'input', quantity: number, storeID: number, record: StockModel) => {
        const service = StockService
        const params = {
            productID: record.productID,
            quantity: Math.abs(quantity),
            storeID: storeID,
            type: type,
            unitID: record.unitID
        }
        await service.store(params)

        if (service.getResponse().success) {
            message.success('Stock actualizado correctamente')
            const dataDraft = [...dataSource]
            const index = dataDraft.findIndex(obj => obj.productID == record.productID && obj.unitID == record.unitID)

            if (index >= 0) {
                dataDraft[index].quantity = `${Number(dataDraft[index].quantity) + Number(quantity)}`
                setDataSource([...dataDraft])
            }
        }else{
            message.error('Problema al actualizar')
        }

    }

    const columns: TableProps<StockModel>['columns'] = [
        {
            title: 'Categoría',
            dataIndex: 'nameCategorie',
            key: 'nameCategorie'
        },
        {
            title: 'Producto',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Marca',
            dataIndex: 'brand',
            key: 'brand'
        },
        {
            title: 'Unidad',
            dataIndex: 'nameUnit',
            key: 'nameUnit'
        },
        {
            title: 'Stock',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (value, _) => {
                return (
                    <Tag color={value <= 0 ? 'red' : ( value <= 10 ? 'gold' : 'cyan' )}>
                        {Number(value).toFixed(2)}
                    </Tag>
                )
            }
        },
        {
            title: 'Movimiento',
            dataIndex: 'movement',
            key: 'movement',
            render: (value, record) => {
                return (
                    <InputMovementStore
                        record={record}
                        store={storeSelected}
                        registerMovement={registerMovement}
                    />
                )
            }
        }
    ]

    return (
        <div className="px-8 pb-8">
            <Table
                loading={loadingList}
                bordered={true}
                columns={columns}
                dataSource={dataSource}
                rowKey={(record) => {
                    return `${record.productID}-${record.unitID}`
                }}
            />
        </div>
    )
}

import { message, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { ProductStockToTransferModel } from '../../models/StockModel'
import type { TableProps } from 'antd'
import { StoreModel } from '../../models/StoreModel';
import { uuid } from '../../helpers/util';
import InputTransferStock from './components/InputTransferStock';
import { StockService } from '../../service/StockService';

export default function StockListTable({
    dataSource,
    loadingList,
    warehousesSelected,
    setDataSource,
    total
}: {
    dataSource: ProductStockToTransferModel[];
    loadingList: boolean;
    warehousesSelected: {
        origin: StoreModel | null;
        destination: StoreModel | null;
    };
    setDataSource: (page: number, pageSize: number) => void;
    total: number;
}) {
    //pagination
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(20)
    const [pageSizes, setPageSizes] = useState<number[]>([20, 25, 50, 100])
    const [searchClicked, setSearchClicked] = useState<boolean>(false)

    const registerTransfer =async (quantity: number, record: ProductStockToTransferModel) => {
        const service = StockService
        const params = {
            productID: record.productID,
            quantity: Math.abs(quantity),
            unitID: record.unitID,
            fromWarehouseID: warehousesSelected.origin?.id ?? 0,
            toWarehouseID: warehousesSelected.destination?.id ?? 0
        }
        await service.transferStock(params)

        if (service.getResponse().success) {
            message.success('Stock transferido correctamente')
            setDataSource(page, pageSize)
        }else{
            message.error(service.getResponse().message)
        }

    }

    const renderStock = (stock: number) => {
        return (
            <Tag color={stock <= 0 ? 'red' : (stock <= 10 ? 'gold' : 'cyan')}>
                {Number(stock).toFixed(2)}
            </Tag>
        )
    }

    const columns: TableProps<ProductStockToTransferModel>['columns'] = [
        {
            title: 'Grupo',
            dataIndex: 'groupName',
            key: 'groupName'
        },
        {
            title: 'Categoría',
            dataIndex: 'categoryName',
            key: 'categoryName'
        },
        {
            title: 'Producto',
            dataIndex: 'productName',
            key: 'productName'
        },
        {
            title: 'Marca',
            dataIndex: 'productBrand',
            key: 'productBrand'
        },
        {
            title: 'Unidad',
            dataIndex: 'unitName',
            key: 'unitName'
        }
    ]

    if (warehousesSelected.origin !== null) {
        columns.push({
            title: warehousesSelected.origin.name,
            dataIndex: 'warehousesOrigin',
            key: 'warehousesOrigin',
            render: (_, record) => {
                const warehouse = record.warehouses.find((warehouse) => warehouse.warehouseID === warehousesSelected.origin?.id)

                return renderStock(warehouse?.stock ?? 0)
            }
        })
    }

    if (warehousesSelected.destination !== null) {
        columns.push({
            title: warehousesSelected.destination.name,
            dataIndex: 'warehousesDestination',
            key: 'warehousesDestination',
            render: (_, record) => {
                const warehouse = record.warehouses.find((warehouse) => warehouse.warehouseID === warehousesSelected.destination?.id)

                return renderStock(warehouse?.stock ?? 0)
            }
        })
    }

    if (warehousesSelected.origin !== null && warehousesSelected.destination !== null) {
        columns.push({
            title: 'Transferir',
            dataIndex: 'transfer',
            key: 'transfer',
            render: (value, record) => {
                const warehouse = record.warehouses.find((warehouse) => warehouse.warehouseID === warehousesSelected.origin?.id)

                return warehouse?.stock <= 0 ? null : (
                    <InputTransferStock
                        record={record}
                        registerTransfer={registerTransfer}
                    />
                )
            }
        })
    }

    useEffect(() => {
        if (searchClicked) {
            setDataSource(page, pageSize)
            setSearchClicked(false)
        }
    }, [searchClicked])

    return (
        <div className="pb-8">
            <Table
                loading={loadingList}
                bordered={true}
                columns={columns}
                dataSource={dataSource}
                rowKey={(record) => {
                    return `${uuid()}`
                }}
                pagination={{
                    pageSizeOptions: pageSizes,
                    showSizeChanger: true,
                    size: 'default',
                    defaultPageSize: pageSizes[0],
                    locale: { items_per_page: '/ página' },
                    defaultCurrent: page,
                    showTotal: (total) => `Total: ${total}`,
                    onShowSizeChange: (current, size) => {
                        setPageSize(size)
                        setSearchClicked(true)
                    },
                    current: page,
                    onChange: (page, pageSize) => {
                        setPage(page)
                        setSearchClicked(true)
                    },
                    total: total,
                }}
            />
        </div>
    )
}

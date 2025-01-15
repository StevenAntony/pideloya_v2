import React, { useEffect, useState } from 'react'
import { Table, Tag, Dropdown, Button } from 'antd'
import { EditOutlined, DollarOutlined, ApartmentOutlined, EllipsisOutlined, SyncOutlined } from '@ant-design/icons'
import FormatCurrency from '../../../helpers/FormatCurrency'
import ProductService from '../../service/ProductService'

const ProductListTable = ({
    products,
    setEdit,
    setSelectProduct,
    setOpenRegisterDrawer,
    setOpenPresentationModal,
    loadingListProduct,
    product,
    getProducts,
    checkRequirements
}) => {

    const updatedStatus = async () => {
        const response = await ProductService.updateActive(product?.key)
        if (response.success) {
            getProducts()
        }
    }

    const onClick = (props) => {
        if (props.key === 'edit') {
            setEdit(true)
            setOpenRegisterDrawer(true)
        } else if (props.key === 'presentation') {
            setOpenPresentationModal(true)
        } else if (props.key === 'status') {
            updatedStatus()
        }
    }

    const items = (row) => [
        {
            key: 'edit',
            label: <><EditOutlined /> Editar</>,
            disabled: !checkRequirements
        },
        {
            key: 'presentation',
            label: <><DollarOutlined /> Presentación</>,
            disabled: !checkRequirements
        },
        {
            key: 'status',
            label: <><SyncOutlined /> {row.active ? 'Desactivar' : 'Activar'}</>,
        }
    ]

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            ellipsis: true,
            width: '200px',
            fixed: 'left',
            // sorter: (a, b) => a.name - b.name,
            // sortDirections: ['descend', 'ascend'],
            // showSorterTooltip: false
        },
        {
            title: 'Categoría',
            dataIndex: 'category',
            width: '150px',
            ellipsis: true,
            key: 'category'
        },
        {
            title: 'Cod. Barra',
            dataIndex: 'barcode',
            width: '150px',
            key: 'barcode',
        },
        {
            title: 'Marca',
            dataIndex: 'brand',
            width: '130px',
            ellipsis: true,
            key: 'brand',
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            width: '100px',
            key: 'type',
            render: (_, { type }) => (
                <>
                    <Tag color={type === 'product' ? 'blue' : (type === 'food' ? 'red' : 'gold')} >
                        {type === 'product' ? 'Producto' : (type === 'food' ? 'Comida' : 'Insumo')}
                    </Tag>
                </>
            )
        },
        {
            title: 'Unidad',
            key: 'units',
            dataIndex: 'units',
            width: '200px',
            render: (_, { units }) => (
                <>
                    {units.map((unit, index) => {
                        return (
                            <Tag color={'default'} key={index}>
                                {unit}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Venta',
            key: 'prices',
            width: '200px',
            dataIndex: 'prices',
            render: (_, { prices }) => (
                <>
                    {prices.map((price, index) => {
                        return (
                            <Tag color={'green'} key={index}>
                                {FormatCurrency.formatCurrency(Number(price))}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Distribuidor',
            key: 'dealers',
            width: '200px',
            dataIndex: 'dealers',
            render: (_, { dealers }) => (
                <>
                    {dealers.map((dealer, index) => {
                        return (
                            <Tag color={'warning'} key={index}>
                                {FormatCurrency.formatCurrency(Number(dealer))}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Compra',
            key: 'purchases',
            width: '200px',
            dataIndex: 'purchases',
            render: (_, { purchases }) => (
                <>
                    {purchases.map((purchase, index) => {
                        return (
                            <Tag color={'blue'} key={index}>
                                {FormatCurrency.formatCurrency(Number(purchase))}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Acción',
            key: 'action',
            fixed: 'right',
            width: '80px',
            render: (_, record) => (
                <Dropdown trigger={['click']} menu={{ items: items(record), onClick }} placement="bottomLeft" arrow>
                    <Button onClick={() => setSelectProduct(record)} ><EllipsisOutlined /></Button>
                </Dropdown>
            ),
        },
    ]

    return (
        <div className="p-8 pt-0">
            <Table
                loading={loadingListProduct}
                bordered={true}
                columns={columns}
                dataSource={products}
                rowClassName={(record, index) => {
                    return record.active ? 'row-active' : '!bg-rose-100 !text-rose-700'
                }}
                scroll={{
                    x: 1444
                }}
            />
        </div>
    )
}

export default ProductListTable

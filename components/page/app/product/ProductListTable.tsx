'use client'
import React, { useState } from 'react'
import { Table, Tag, Dropdown, Button } from 'antd'
import type { TableProps, MenuProps } from 'antd'
import { EditOutlined, DollarOutlined, ApartmentOutlined, EllipsisOutlined, SyncOutlined } from '@ant-design/icons'
import FormatCurrency from '@/helpers/FormatCurrency'

const ProductListTable = ({
  products,
  setEdit,
  setSelectProduct,
  setOpen
} : {
  products: IProductTable[],
  setEdit: (c: boolean) => void,
  setSelectProduct: (c: IProductTable|null) => void,
  setOpen: (c: boolean) => void,
}) => {

  const onClick: MenuProps['onClick'] = (props) => {
    if (props.key === 'edit') {
      setEdit(true)
      setOpen(true)
    }
  }

  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: <><EditOutlined /> Editar</>
    },
    {
      key: 'price',
      label: <><DollarOutlined /> Precios</>,
    },
    {
      key: 'unit',
      label: <><ApartmentOutlined /> Unidades</>,
    },
    {
        key: 'status',
        label: <><SyncOutlined /> Estado</>,
    }
  ]

  const columns: TableProps<IProductTable>['columns'] = [
    {
      title: 'Categoría',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Cod. Barra',
      dataIndex: 'barcode',
      key: 'barcode',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Precio Venta',
      key: 'prices',
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
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Dropdown trigger={['click']} menu={{ items, onClick }} placement="bottomLeft" arrow>
            <Button onClick={() => setSelectProduct(record)} ><EllipsisOutlined /></Button>
        </Dropdown>
      ),
    },
  ]

  return (
      <div className="p-8">
          <Table bordered={true} columns={columns} dataSource={products} />
      </div>
  )
}

export default ProductListTable
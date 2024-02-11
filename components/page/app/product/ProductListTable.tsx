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
  setOpenRegisterDrawer,
  setOpenPresentationModal,
  loadingListProduct
} : {
  products: IProductTable[],
  setEdit: (c: boolean) => void,
  setSelectProduct: (c: IProductTable|null) => void,
  setOpenRegisterDrawer: (c: boolean) => void,
  setOpenPresentationModal: (c: boolean) => void,
  loadingListProduct: boolean
}) => {

  const onClick: MenuProps['onClick'] = (props) => {
    if (props.key === 'edit') {
      setEdit(true)
      setOpenRegisterDrawer(true)
    }else if(props.key === 'presentation'){
      setOpenPresentationModal(true)
    }
  }

  const items: MenuProps['items'] = [
    {
      key: 'edit',
      label: <><EditOutlined /> Editar</>
    },
    {
      key: 'presentation',
      label: <><DollarOutlined /> Presentación</>,
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
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      render: (_, { type }) => (
        <>
          <Tag color={type === 'product' ? 'blue' : ( type === 'food' ? 'red' : 'gold' )} >
            {type === 'product' ? 'Producto' : ( type === 'food' ? 'Comida' : 'Insumo' )}
          </Tag>
        </>
      )
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
          <Table loading={loadingListProduct}  bordered={true} columns={columns} dataSource={products} />
      </div>
  )
}

export default ProductListTable
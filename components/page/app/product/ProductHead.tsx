'use client'
import React from 'react'
import type { MenuProps } from 'antd'
import { Typography , Dropdown } from 'antd'
import { CloudDownloadOutlined, CloudUploadOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons'

const { Title } = Typography

const items = [
    {
      key: 'import',
      label:  <><CloudUploadOutlined /> Importar</>,
    },
    {
      key: 'export',
      label: <><CloudDownloadOutlined /> Exportar</>,
    },
    {
      key: 'download',
      label: <><DownloadOutlined /> Plantilla</>,
    }
]
  

const ProductHead = ({
    setOpen,
    setEditMaintainerDrawer
  } : {
    setOpen: (c: boolean) => void,
    setEditMaintainerDrawer: (c: boolean) => void
  }) => {
    const onMenuClick: MenuProps['onClick'] = (e) => {
        console.log('click', e.key);
    }

    return (
        <div className="p-8 flex justify-between">
            <Title level={3}>Productos</Title>
            <div>
                <Dropdown.Button
                    menu={{ items, onClick: onMenuClick }}
                    onClick={() => {
                        setOpen(true)
                        setEditMaintainerDrawer(false)
                    }}
                    type='primary'
                >
                    <PlusOutlined /> Nuevo
                </Dropdown.Button>
            </div>
        </div>
    )
}

export default ProductHead
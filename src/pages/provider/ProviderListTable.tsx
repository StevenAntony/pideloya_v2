import React from 'react'
import ProviderTable from '../../components/table/ProviderTable'
import { ProviderListTableProps } from './ProviderProps'
import { Button, Dropdown, message } from 'antd'
import {
    EditOutlined,
    SyncOutlined,
    EllipsisOutlined
} from '@ant-design/icons'
import { ProviderService } from '../../service/ProviderService'

export default function ProviderListTable({
    loading,
    dataSource,
    setProviderSelected,
    setOpen,
    providerSelected,
    reload
}: ProviderListTableProps) {

    const items = (row) => [
        {
            key: 'edit',
            label: <><EditOutlined /> Editar</>
        },
        {
            key: 'status',
            label: <><SyncOutlined /> {row.status ? 'Desactivar' : 'Activar'}</>,
        }
    ]

    const updatedStatus =async (id) => {
        const service = ProviderService
        await service.changeStatus(id)
        const response = service.getResponse()
        if (response.success) {
            reload()
            message.success('Dado de baja correctamente')
        }else{
            message.error(response.message)
        }
    }

    const onClick = (props) => {
        if (props.key === 'edit') {
            setOpen(true)
        } else if (props.key === 'status') {
            updatedStatus(providerSelected?.id)
        }
    }

    return (
        <ProviderTable
            actionRender={(_, record) => (
                <Dropdown trigger={['click']} menu={{ items: items(record), onClick }} placement="bottomLeft" arrow>
                    <Button onClick={() => setProviderSelected(record)} ><EllipsisOutlined /></Button>
                </Dropdown>
            )}
            dataSource={dataSource}
            loading={loading}
            view='maintainer'
        />
    )
}

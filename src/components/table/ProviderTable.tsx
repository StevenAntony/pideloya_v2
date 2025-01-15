import { Table, Tag } from 'antd'
import React from 'react'
import { ProviderModel } from '../../models/ProviderModel'
import type { TableProps } from 'antd'

interface ProviderTableInterface {
    loading: boolean;
    dataSource: ProviderModel[];
    props?: any;
    view: 'maintainer';
    actionRender: any;
}

export default function ProviderTable({
    loading,
    dataSource,
    props,
    view,
    actionRender = null
}: ProviderTableInterface) {

    const columns:TableProps<ProviderModel>['columns'] = [
        {
            title: 'Ruc',
            dataIndex: 'ruc',
            key: 'ruc'
        },
        {
            title: 'Razon Social',
            dataIndex: 'businessName',
            key: 'businessName'
        },
        {
            title: 'Nombre comercial',
            dataIndex: 'tradename',
            key: 'tradename'
        },
        {
            title: 'Dirección',
            dataIndex: 'address',
            key: 'address'
        }
    ]

    if (view === 'maintainer') {
        columns.push({
            title: 'Telefono',
            dataIndex: 'phone',
            key: 'phone'
        })

        columns.push({
            title: 'Correo',
            dataIndex: 'email',
            key: 'email'
        })

        columns.push({
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: (_, { status }) => (
                <>
                    <Tag color={status ? 'geekblue' : 'red'} >
                        {status ? 'Disponible' : 'Anulado'}
                    </Tag>
                </>
            )
        })
    }

    if (actionRender) {
        columns.push({
            title: 'Acción',
            key: 'action',
            render: actionRender
        })
    }

    return (
        <div className="px-8 pb-8">
            <Table
                loading={loading}
                bordered={true}
                columns={columns}
                dataSource={dataSource}
                {...props}
                rowKey={'id'}
            />
        </div>
    )
}

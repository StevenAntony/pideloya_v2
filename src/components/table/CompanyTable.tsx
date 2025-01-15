import { Table, Tag } from 'antd'
import React from 'react'
import type { TableProps } from 'antd'
import { CompanyModel } from '../../models/CompanyModel';
import TagActivity from '../app/tag/TagActivity';

interface CompanyTableInterface {
    loading: boolean;
    dataSource: CompanyModel[];
    props?: any;
    view: 'maintainer';
    actionRender: any;
}

export default function CompanyTable({
    loading,
    dataSource,
    props,
    view,
    actionRender = null
}: CompanyTableInterface) {

    const columns:TableProps<CompanyModel>['columns'] = [
        {
            title: 'Ruc',
            dataIndex: 'ruc',
            key: 'ruc',
            width: 120,
            fixed: 'left'
        },
        {
            title: 'Razon Social',
            dataIndex: 'businessName',
            key: 'businessName',
            fixed: 'left',
            width: 150,
            ellipsis: true
        },
        {
            title: 'Nombre comercial',
            dataIndex: 'tradename',
            key: 'tradename',
            hidden: true
        },
        {
            title: 'Dirección',
            dataIndex: 'address',
            key: 'address',
            width: 120,
            ellipsis: true,
            hidden: true
        }
    ]

    if (view === 'maintainer') {
        columns.push({
            title: 'Actividad',
            dataIndex: 'activity',
            key: 'activity',
            width: 100,
            render: (_, { activity }) => <TagActivity activity={activity ?? '--'} />
        })

        columns.push({
            title: 'Telefono',
            dataIndex: 'phone',
            key: 'phone',
            width: 120,
            hidden: true
        })

        columns.push({
            title: 'Correo',
            dataIndex: 'email',
            ellipsis: true,
            key: 'email'
        })

        columns.push({
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
            render: (_, { url }) => <a href={url} target='_blank'>{url}</a>
        })

        columns.push({
            title: 'Demo',
            dataIndex: 'demo',
            key: 'demo',
            width: 110,
            render: (_, { demo }) => (
                <>
                    <Tag color={demo ? 'volcano-inverse' : 'cyan-inverse'} >
                        {demo ? 'Demo' : 'Producción'}
                    </Tag>
                </>
            )
        })

        columns.push({
            title: 'Facturación',
            dataIndex: 'betaBilling',
            key: 'betaBilling',
            width: 110,
            render: (_, { betaBilling }) => (
                <>
                    <Tag color={betaBilling ? 'volcano-inverse' : 'cyan-inverse'} >
                        {betaBilling ? 'Beta' : 'Producción'}
                    </Tag>
                </>
            )
        })

        columns.push({
            title: 'Plan',
            dataIndex: 'plan',
            key: 'plan',
            width: 90,
            render: (_, { plan }) => (
                <>
                    <Tag color={plan == 'basic' ? 'default' : ( plan == 'normal' ? 'blue-inverse' : 'gold-inverse' )} >
                        {plan == 'basic' ? 'Basico' : ( plan == 'normal' ? 'Normal' : 'Pro')}
                    </Tag>
                </>
            )
        })

        columns.push({
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (_, { status }) => (
                <>
                    <Tag color={status ? 'geekblue-inverse' : 'red-inverse'} >
                        {status ? 'Habilitado' : 'Anulado'}
                    </Tag>
                </>
            )
        })
    }

    if (actionRender) {
        columns.push({
            title: 'Acción',
            key: 'action',
            render: actionRender,
            fixed: 'right',
            width: 80
        })
    }

    return (
        <div className="px-8 pb-8">
            <Table
                loading={loading}
                bordered={true}
                columns={columns}
                dataSource={dataSource}
                scroll={{
                    x: 1244
                }}
                {...props}
                rowKey={'id'}
            />
        </div>
    )
}

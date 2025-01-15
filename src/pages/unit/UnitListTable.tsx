import React from 'react'
import { Table, Tag, Button, Popconfirm, Dropdown } from 'antd'
import { useAuthContext } from '../../contexts/AuthContext'
import type { TableProps } from 'antd'
import {
    EditOutlined,
    EllipsisOutlined,
    SyncOutlined } from '@ant-design/icons'
import { UnitModel } from '../../models/UnitModel'

const UnitListTable = ({
    dataSource,
    loadingList,
    setSelectedRow,
    setOpen,
    changeStatus
}: {
    dataSource: UnitModel[];
    loadingList: boolean;
    setSelectedRow: (e: UnitModel|null) => void;
    setOpen: (e: boolean) => void;
    changeStatus: () => void;
}) => {

    const { auth } = useAuthContext()

    const items = (row: UnitModel) => [
        {
            key: 'edit',
            label: <><EditOutlined /> Editar</>
        },
        {
            key: 'status',
            label: <><SyncOutlined /> {row.status ? 'Desactivar' : 'Activar'}</>,
        }
    ]

    const onClick = (props) => {
        if (props.key === 'edit') {
            setOpen(true)
        } else if (props.key === 'status') {
            changeStatus()
        }
    }

    const columns: TableProps<UnitModel>['columns'] = [
        {
            title: 'N°',
            dataIndex: 'abbreviation',
            key: 'abbreviation'
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Unidad',
            dataIndex: 'valueInUnit',
            className: 'text-right',
            key: 'valueInUnit'
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: (_, { status }) => (
                <>
                    <Tag color={status ? 'geekblue' : 'red'} >
                        {status ? 'Activo' : 'Desactivado'}
                    </Tag>
                </>
            )
        },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) =>(
                <Dropdown trigger={['click']} menu={{ items: items(record), onClick }} placement="bottomLeft" arrow>
                    <Button onClick={() => setSelectedRow(record)} ><EllipsisOutlined /></Button>
                </Dropdown>
            )
        },
    ]

    return (
        <div className="px-8 pb-8">
            <Table
                loading={loadingList}
                bordered={true}
                columns={columns}
                dataSource={dataSource}
                rowKey={'id'}
            />
        </div>
    )
}

export default UnitListTable

import React from 'react'
import { Table, Tag, Button, Popconfirm } from 'antd'
import type { TableProps } from 'antd'
import { useAuthContext } from '@contexts/auth/AuthContext'
import { useMovementContext } from '@hooks/page/management/useMovementContext'
import { MovementListToManegmentModel } from '@models/managment/MovementModel'
import FormatCurrency from '@helpers/FormatCurrency'
import AuthorizedButton from '@components/app/button/AuthorizedButton'
import { MOVEMENT_ACTIONS } from '@constants/authorized'

const MovementListTable = () => {
    const { loadingListMovements, isMovements, changeStatusMovement } = useMovementContext()
    const { user } = useAuthContext()

    const columns: TableProps<MovementListToManegmentModel>['columns'] = [
        {
            title: 'Emisión',
            dataIndex: 'issue',
            key: 'issue'
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
            render: (_, { type }) => (
                <>
                    <Tag color={type === 'Ingreso' ? 'geekblue' : 'red'} >
                        {type}
                    </Tag>
                </>
            )
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Monto',
            dataIndex: 'amount',
            className: 'text-right',
            key: 'amount',
            render: (_, { amount }) => <h4 className='font-bold text-base'>{FormatCurrency.formatCurrency(Number(amount))}</h4>
        },
        {
            title: 'Usuario',
            dataIndex: 'userName',
            key: 'userName'
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: (_, { status }) => (
                <>
                    <Tag color={status ? 'geekblue' : 'red'} >
                        {status ? 'Realizado' : 'Anulado'}
                    </Tag>
                </>
            )
        },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) =>record.status && user.id == record.userID  ? (
                <Popconfirm
                    title="Anular Movimiento"
                    description="Este proceso no se podra revertir."
                    onConfirm={() => changeStatusMovement(record.movementID)}
                    onCancel={() => {}}
                    okText="SI"
                    cancelText="No"
                >
                    <AuthorizedButton action={MOVEMENT_ACTIONS.changeStatus} danger>
                        Anular
                    </AuthorizedButton>
                </Popconfirm>
            ) : ''
        },
    ]

    return (
        <div className="px-8 pb-8">
            <Table
                loading={loadingListMovements}
                bordered={true}
                columns={columns}
                dataSource={isMovements}
                rowKey={(record) => {
                    return record.movementID
                }}
            />
        </div>
    )
}

export default MovementListTable

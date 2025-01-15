import React from 'react'
import { Table, Tag, Popconfirm, Tooltip } from 'antd'
import type { TableProps } from 'antd'
import FormatCurrency from '@helpers/FormatCurrency'
import { useAuthContext } from '@contexts/auth/AuthContext'
import { CASH_ACTIONS } from '@constants/authorized'
import AuthorizedButton from '@components/app/button/AuthorizedButton'
import { CashListToManegmentModel } from '@models/managment/CashModel'
import { useCashContext } from '../hooks/useCashContext'
import { CheckBox, CloseFullscreen, Paid } from '@mui/icons-material'
import { QuestionCircleOutlined } from '@ant-design/icons'

const CashListTable = () => {
    const { user } = useAuthContext()
    const {
        isCashes,
        loadingListCashes,
        closeCash,
        setOpenSquareModal,
        setSelectedCash
    } = useCashContext()

    const ButtonActionsRender = ({ record }: { record: CashListToManegmentModel }) => {

        const correct = record.totalCash == record.totalReconciliation

        return (
            <>
                {record.status === 'APERTURADO' && user.id == record.userID &&
                    <Popconfirm
                        title="Cerrar Caja"
                        description={correct ? "Cerrar caja y sus operaciones." : "¿Estas seguro de cerrar esta caja, el total del sistema y el conteo no coinciden?"}
                        onConfirm={() => closeCash(record.cashID)}
                        onCancel={() => { }}
                        okText="SI"
                        cancelText="No"
                    >
                        <AuthorizedButton
                            action={CASH_ACTIONS.close}
                            className='!bg-red-500'
                            size='small'
                            title='Cerrar Caja'
                        >
                            <CloseFullscreen sx={{ color: 'white', fontSize: 16, marginTop: '-5px' }} />
                        </AuthorizedButton>
                    </Popconfirm>}
                {
                    (user.type.value == 'admin' || user.id == record.userID) && (
                        <AuthorizedButton
                            action={CASH_ACTIONS.close}
                            className='!bg-cyan-700'
                            size='small'
                            title='Cuadrar Caja'
                            onClick={() => {
                                setSelectedCash(record)
                                setOpenSquareModal(true)
                            }}
                        >
                            <Paid sx={{ color: 'white', fontSize: 16, marginTop: '-5px' }} />
                        </AuthorizedButton>
                    )
                }
            </>
        )
    }

    const columns: TableProps<CashListToManegmentModel>['columns'] = [
        {
            title: 'Apertura',
            dataIndex: 'openingDate',
            key: 'openingDate',
            width: 120,
        },
        {
            title: 'Cierre',
            dataIndex: 'closingDate',
            key: 'closingDate',
            width: 120,
            render: (row, record) => record.status === 'APERTURADO' ? '-' : row
        },
        {
            title: 'Monto Apertura',
            dataIndex: 'openingAmount',
            className: 'text-right',
            key: 'openingAmount',
            width: 200,
            render: (_, { openingAmount }) => <h4 className='font-bold text-base'>{FormatCurrency.formatCurrency(Number(openingAmount))}</h4>
        },
        {
            title: 'Usuario',
            dataIndex: 'userName',
            key: 'userName'
        },
        {
            title: (
                <div>
                    <span>Comparación</span>
                    <Tooltip
                        title="Compara lo que se registra en el sistema con el conteo realizado en la caja."
                        overlayClassName='tooltip-white'
                    >
                        <QuestionCircleOutlined className='ml-2' />
                    </Tooltip>
                </div>
            ),
            className: 'text-center',
            dataIndex: 'totalReconciliation',
            key: 'totalReconciliation',
            width: 160,
            render: (value, record, index) => {
                const correct = record.totalCash == record.totalReconciliation
                return (
                    correct
                    ? <CheckBox sx={{ color: 'green', fontSize: 22 }} />
                    : <Tag color={'red-inverse'}>Inconsistencia</Tag>
                )
            }
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (_, { status }) => (
                <>
                    <Tag color={status === 'APERTURADO' ? 'geekblue' : 'red'} >
                        {status === 'APERTURADO' ? 'Aperturado' : 'Cerrado'}
                    </Tag>
                </>
            )
        },
        {
            title: 'Acción',
            key: 'action',
            className: 'text-center',
            width: 100,
            render: (_, record) => (
                <ButtonActionsRender record={record} />
            )
        },
    ]

    return (
        <div className="px-4 pb-8">
            <Table
                loading={loadingListCashes}
                bordered={true}
                columns={columns}
                dataSource={isCashes}
                rowKey={(record) => {
                    return record.cashID
                }}
            />
        </div>
    )
}

export default CashListTable

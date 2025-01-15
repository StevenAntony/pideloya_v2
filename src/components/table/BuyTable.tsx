import React from "react"
import { Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import FormatCurrency from '../../../helpers/FormatCurrency'
import { BuyModel } from "../../models/BuyModel"

const BuyTable = ({
    loading,
    data,
    view,
    actionRender
} : {
    loading: boolean;
    data: BuyModel[];
    view: 'module'|'pay'|'cancel';
    actionRender: any;
}) => {
    const columns:TableProps<BuyModel>['columns'] = [
        {
            title: 'Documento',
            dataIndex: 'document',
            key: 'document'
        },
        {
            title: 'Emisión',
            dataIndex: 'issue',
            key: 'issue'
        },
        {
            title: 'Proveedor',
            dataIndex: 'provider',
            key: 'provider'
        },
        {
            title: 'Usuario',
            dataIndex: 'userName',
            key: 'userName'
        },
        {
            title: 'Monto',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (_, { totalAmount }) => <h4 className='font-bold text-base'>{FormatCurrency.formatCurrency(Number(totalAmount))}</h4>
        }
    ]

    if (view === 'module') {
        columns.push({
            title: 'Modo Pago',
            dataIndex: 'modePayment',
            key: 'modePayment',
            render: (_, { modePayment }) => {
                const arrayMode = modePayment ? modePayment.split(',') : []
                return (
                    <>
                        {arrayMode.map((mode, index) => {
                            return (
                                <Tag color={['Crédito','Credito'].includes(mode) ? 'red' : 'green'} key={index}>
                                    {mode}
                                </Tag>
                            );
                        })}
                    </>
                )
            }
        })

        columns.push({
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
        })
    }

    if (view === 'pay') {
        columns.push({
            title: 'Pagado',
            dataIndex: 'amountPaid',
            key: 'amountPaid',
            render: (_, { amountPaid }) => (
                <Tag color='green' className='font-bold text-base'>
                    {FormatCurrency.formatCurrency(Number(amountPaid))}
                </Tag>
            )
        })

        columns.push({
            title: 'Debe',
            dataIndex: 'amountDebit',
            key: 'amountDebit',
            render: (_, { amountDebit }) => (
                <Tag color='red' className='font-bold text-base'>
                    {FormatCurrency.formatCurrency(Number(amountDebit))}
                </Tag>
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
        <Table
            loading={loading}
            bordered={true}
            columns={columns}
            dataSource={data}
            rowKey={'id'}
        />
    )
}

export default BuyTable

import { Table } from 'antd'
import type { TableColumnsType } from 'antd'
import React from 'react'
import { useQuotationContext } from '../hooks/useQuotationContext'
import { QuotationListModel } from '@models/sale/QuotationModel'
import ExpandedRow from './table/ExpandedRow'
import StatusColumn from './table/StatusColumn'
import OptionsColumn from './table/OptionsColumn'
import { Tag } from 'primereact/tag'
import { ConfirmDialog } from 'primereact/confirmdialog'
import Authorized from '@components/Authorized'
import { QUOTATION_ACTIONS } from '@constants/authorized'

type Props = {}

export default function QuotationTable({ }: Props) {
    const {
        isQuotations,
        loadingQuotations,
        setSelectedQuotation,
        loadingOption,
        deleteQuotation,
        changeStatus,
        setOpenLateral,
        showQuotation,
        sendMail
    } = useQuotationContext()

    const columns: TableColumnsType<QuotationListModel> = [
        Table.EXPAND_COLUMN,
        { title: 'Codigo', width: 140, dataIndex: 'code', key: 'code' },
        { title: 'Cliente', dataIndex: 'customerName', key: 'customerName' },
        { title: 'Usuario', dataIndex: 'userName', key: 'userName' },
        { title: 'Emisión', width: 100, dataIndex: 'issue', key: 'issue' },
        { title: 'Expira', width: 100, dataIndex: 'expire', key: 'expire' },
        {
            title: 'Igv',
            width: 50,
            dataIndex: 'withIGV',
            key: 'withIGV',
            render: (_, record) => (
                <Tag value={record.withIGV ? 'SI' : 'NO'} style={{ backgroundColor: record.withIGV ? 'green' : 'gray' }} />
            )
        },
        {
            title: 'Estado',
            width: 120,
            dataIndex: 'status',
            key: 'status',
            render: (_, { status }) => <StatusColumn status={status.toUpperCase()} />
        },
        {
            title: 'Opción',
            width: 80,
            dataIndex: 'option',
            key: 'option',
            className: 'text-center',
            render: (_, record) => (
                <OptionsColumn
                    setSelectedQuotation={setSelectedQuotation}
                    loadingOption={loadingOption}
                    deleteQuotation={deleteQuotation}
                    changeStatus={changeStatus}
                    setOpenLateral={setOpenLateral}
                    showQuotation={showQuotation}
                    sendMail={sendMail}
                    record={record}
                />
            )
        },
    ]

    return (
        <div className='px-6'>
            <ConfirmDialog />
            <Authorized title="Listar cotizaciones" action={QUOTATION_ACTIONS.list}>
                <Table
                    columns={columns}
                    loading={loadingQuotations}
                    expandable={{
                        expandedRowRender: (record) => {
                            return (
                                <div>
                                    {
                                        record.details.map((detail, index) => <ExpandedRow key={index} detail={detail} />)
                                    }
                                </div>
                            )
                        },
                    }}
                    rowKey={record => record.quotationID}
                    dataSource={isQuotations}
                />
            </Authorized>
        </div>
    )
}

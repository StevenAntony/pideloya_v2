import SaleTable from '@components/table/SaleTable'
import { PrinterOutlined, FilePdfOutlined } from '@ant-design/icons'
import { useSaleContext } from '@pages/sale/process/hooks/useSaleContext'
import { SaleListModel } from '@models/sale/SaleModel'
import { Button } from 'antd'
import React from 'react'

type Props = {}

export default function SaleListTable({ }: Props) {
    const { isSales, loadingSaleList } = useSaleContext()

    return (
        <SaleTable
            loading={loadingSaleList}
            data={isSales}
            view={'Ordinary'}
            actionRender={(_: any, record: SaleListModel) => (
                <div className='flex gap-2'>
                    <a href={`/pdf/sale_ticket/${record.companyID}/${record.saleID}`} target='_black'><Button type="primary" icon={<PrinterOutlined />} size={'small'} /></a>
                    <a href={`/pdf/saleA4/${record.companyID}/${record.saleID}`} target='_black'><Button type="primary" danger icon={<FilePdfOutlined />} size={'small'} /></a>
                </div>
            )}
            rowKey={(record: SaleListModel) => record.saleID}
        />
    )
}

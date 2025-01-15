import React from 'react'
import { Tag, Button  } from 'antd'
import FormatCurrency from '../../../helpers/FormatCurrency'
import {
    PrinterOutlined,
    FilePdfOutlined
} from '@ant-design/icons'
import SaleTable from '../../components/table/SaleTable'

const SaleListTable = ({
    sales,
    loadingList,
    type= 'Ordinary'
}) => {

    return (
        <div className="px-8 pb-8">
            <SaleTable
                loading={loadingList}
                data={sales}
                view={type}
                actionRender={(_, record) => (
                    <div className='flex gap-2'>
                      <a href={`/pdf/sale_ticket/${record.companyID}/${record.key}`} target='_black'><Button type="primary" icon={<PrinterOutlined />} size={'lage'} /></a>
                      <a href={`/pdf/saleA4/${record.companyID}/${record.key}`} target='_black'><Button type="primary" danger icon={<FilePdfOutlined />} size={'lage'} /></a>
                    </div>
                )}
            />
        </div>
    )
}

export default SaleListTable

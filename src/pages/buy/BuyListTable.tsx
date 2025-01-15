import React from 'react'
import { Button  } from 'antd'
import {
    PrinterOutlined,
    FilePdfOutlined
} from '@ant-design/icons'
import BuyTable from '../../components/table/BuyTable'
import { BuyModel } from '../../models/BuyModel'

const BuyListTable = ({
    buys,
    loadingList
}: {
    buys: BuyModel[];
    loadingList: boolean
}) => {

    return (
        <div className="px-8 pb-8">
            <BuyTable
                loading={loadingList}
                data={buys}
                view={'module'}
                actionRender={(_, record: BuyModel) => (
                    <div className='flex gap-2'>
                        <a href={`/pdf/buyA4/${record.companyID}/${record.id}`} target='_black'>
                            <Button type="primary" danger icon={<FilePdfOutlined />} size={'middle'} />
                        </a>
                    </div>
                )}
            />
        </div>
    )
}

export default BuyListTable

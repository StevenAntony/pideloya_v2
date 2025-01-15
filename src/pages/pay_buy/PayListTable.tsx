import React from 'react'
import BuyTable from '../../components/table/BuyTable'
import { Button } from 'antd'
import { PayListTableInterface } from './PayBuyInterface'
import { DollarOutlined } from '@ant-design/icons'

export default function PayListTable({
    dataSource,
    loading,
    setBuySelected,
    setOpenModal
}: PayListTableInterface) {
    return (
        <BuyTable
            data={dataSource}
            loading={loading}
            view='pay'
            actionRender={(_, record) => (
                <div className='flex gap-2'>
                    <Button
                        type="primary"
                        onClick={() => {
                            setOpenModal(true)
                            setBuySelected(record)
                        }}
                        icon={<DollarOutlined />}
                    />
                </div>
            )}
        />
    )
}

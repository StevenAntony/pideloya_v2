import React, { useEffect, useState } from 'react'
import { Typography } from 'antd'
import { BuyModel } from '../../models/BuyModel'
import { BuyService } from '../../service/BuyService'
import CancelListTable from './CancelListTable'

const { Title } = Typography

export default function CancelBuyPage() {
    const [isBuys, setBuys] = useState<BuyModel[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const getBuysToCancel = async () => {
        setLoading(true)
        const service = BuyService
        await service.listToCancel()
        setBuys(service.getBuys())
        setLoading(false)
    }

    useEffect(() => {
        getBuysToCancel()
    }, [])

    return (
        <div className="mx-20 my-8 shadow-md bg-white">
            <div className="p-8 flex justify-between ">
                <Title level={3}>Dar de baja Compra</Title>
            </div>

            <CancelListTable
                dataSource={isBuys}
                loading={loading}
                reload={getBuysToCancel}
            />
        </div>
    )
}

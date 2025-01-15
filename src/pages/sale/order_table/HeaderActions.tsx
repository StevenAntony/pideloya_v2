import { Button } from 'antd'
import React from 'react'
import { ShoppingCartOutlined, DollarOutlined, SendOutlined, ArrowLeftOutlined } from '@ant-design/icons'

type Props = {
    handleCharge: () => void;
    disabledCharge: boolean;

    handleSendOrder: () => void;
    disabledSendOrder: boolean;
    loadingSendOrder: boolean;
}

export default function HeaderActions({
    handleCharge,
    disabledCharge,
    handleSendOrder,
    disabledSendOrder,
    loadingSendOrder
}: Props) {
    return (
        <div className='flex gap-2'>
            <Button
                className="bg-teal-600 border-0 !text-white hover:!bg-teal-500 hidden sm:block"
                onClick={handleCharge}
                disabled={disabledCharge}
                icon={<DollarOutlined /> }
            >
                Cobrar
            </Button>
            <Button
                type='primary'
                className='disabled:border-slate-400'
                disabled={disabledSendOrder}
                onClick={handleSendOrder}
                loading={loadingSendOrder}
                icon={<SendOutlined />}
            >
                Ordenar
            </Button>
        </div>
    )
}

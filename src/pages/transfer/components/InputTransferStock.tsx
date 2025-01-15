import { Button, InputNumber, Popconfirm, Space } from 'antd'
import React, { useState } from 'react'
import { ProductStockToTransferModel } from '../../../models/StockModel';

export default function InputTransferStock({
    record,
    registerTransfer
} : {
    record: ProductStockToTransferModel;
    registerTransfer: (quantity: number, record: ProductStockToTransferModel) => void
}) {
    const [quantity, setQuantity] = useState<number>(0)

    return (
        <Space.Compact style={{ width: '100%' }}>
            <InputNumber
                value={quantity}
                precision={2}
                min={0}
                // max={record.warehouses}
                onChange={(value) => {
                    setQuantity(value ?? 0)
                }}
            />
            <Popconfirm
                title="¿Quiere realizar la transferencia?"
                description="Se guardara un registro de la transferencia para un mayor control."
                okText="Realizar"
                cancelText="Cancelar"
                onConfirm={() => {
                    setQuantity(0)
                    registerTransfer(quantity, record)
                }}
            >
                <Button
                    disabled={quantity == 0}
                    type="default"
                    className={ quantity >= 0 ? 'bg-cyan-600 hover:!bg-cyan-500 !text-white' : 'bg-rose-600 hover:!bg-rose-500 !text-white' }
                >
                    {quantity >= 0 ? '+' : '-'}
                </Button>
            </Popconfirm>
        </Space.Compact>
    )
}

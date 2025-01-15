import { Button, InputNumber, Popconfirm, Space } from 'antd'
import React, { useState } from 'react'
import { StockModel } from '../../../models/StockModel';
import { StoreModel } from '../../../models/StoreModel';

export default function InputMovementStore({
    registerMovement,
    record,
    store
} : {
    registerMovement: (type: 'output'|'input', quantity: number, storeID: number, record: StockModel) => void;
    record: StockModel;
    store: StoreModel|null;
}) {
    const [quantity, setQuantity] = useState<number>(0)

    return (
        <Space.Compact style={{ width: '100%' }}>
            <InputNumber
                value={quantity}
                precision={2}
                onChange={(value) => {
                    setQuantity(value ?? 0)
                }}
            />
            <Popconfirm
                title="¿Quiere realizar el movimiento en el almacén?"
                description="Se guardara un registro del movimiento para un mayor control."
                okText="Realizar"
                cancelText="Cancelar"
                onConfirm={() => {
                    setQuantity(0)
                    registerMovement(quantity >= 0 ? 'input' : 'output', quantity, store?.id ?? 0, record)
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

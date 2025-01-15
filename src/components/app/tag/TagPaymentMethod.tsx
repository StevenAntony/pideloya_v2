import { Tag } from 'antd'
import React from 'react'

export default function TagPaymentMethod({
    method
}: {
    method: string
}) {
    const color = {
        'Efectivo': 'green',
        'Yape': 'magenta',
        'Tarjeta': 'blue',
        'Otro': 'default',
        'Crédito': 'red'
    }

    return <Tag color={color[method] ?? 'default'}>{method}</Tag>
}

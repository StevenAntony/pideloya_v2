import { Tag } from 'antd'
import React from 'react'

export default function TagActivity({
    activity
}: {
    activity: string
}) {
    const color = {
        'store': 'green',
        'distributor': 'blue',
        'restaurant': 'red'
    }

    return <Tag color={color[activity]}>{activity}</Tag>
}

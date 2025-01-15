import React from 'react'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

type Props = {
    title: string;
    description: string;
    color?: string;
}

export default function TitleTable({
    title,
    description,
    color
}: Props) {
    return (
        <Tooltip
            title={description}
            color={ color ?? 'blue' }
        >
            <span className='mr-2'>{title}</span>
            <QuestionCircleOutlined />
        </Tooltip>
    )
}

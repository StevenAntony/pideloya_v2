import React from 'react'
import { Typography , Button, Row, Col, Card, Statistic, Select } from 'antd'
import { ArrowUpOutlined, PlusOutlined } from '@ant-design/icons'

const { Title } = Typography

const CollectHead = () => {

    return (
        <>
            <div className="p-8 pb-0 flex justify-between ">
                <Title level={3}>Cobrar Ventas</Title>
            </div>
        </>
    )
}

export default CollectHead

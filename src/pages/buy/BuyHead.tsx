import { Button, Col, Row, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import React from 'react'

const { Title } = Typography

export default function BuyHead({
    setOpen
}) {
    return (
        <>
            <div className="p-8 flex justify-between ">
                <Title level={3}>Compras</Title>
                <div>
                    <Button
                        onClick={() => {
                            setOpen(true)
                        }}
                        type='primary'
                    >
                        <PlusOutlined /> Emitir Compra
                    </Button>
                </div>
            </div>
        </>
    )
}

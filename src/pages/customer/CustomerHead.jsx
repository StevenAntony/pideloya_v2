import React from 'react'
import { Typography, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const { Title } = Typography

const CustomerHead = ({
    setOpen
}) => {

    return (
        <>
            <div className="p-8 flex justify-between ">
                <Title level={3}>Clientes</Title>
                <div>
                    <Button
                        onClick={() => {
                            setOpen(true)
                        }}
                        type='primary'
                    >
                        <PlusOutlined /> Nuevo Cliente
                    </Button>
                </div>
            </div>
        </>
    )
}

export default CustomerHead

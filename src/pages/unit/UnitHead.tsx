import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Typography, Button } from 'antd'
import { UnitModel } from '../../models/UnitModel'

const { Title } = Typography

const UnitHead = ({
    setOpen,
    setSelectedRow
}: {
    setOpen: (e: boolean) => void;
    setSelectedRow: (e: UnitModel|null) => void;
}) => {
    return (
        <>
            <div className="p-8 flex justify-between ">
                <Title level={3}>Unidades Productos</Title>
                <div>
                    <Button
                        onClick={() => {
                            setOpen(true)
                            setSelectedRow(null)
                        }}
                        type='primary'
                    >
                        <PlusOutlined /> Nueva Unidad
                    </Button>
                </div>
            </div>
        </>
    )
}

export default UnitHead

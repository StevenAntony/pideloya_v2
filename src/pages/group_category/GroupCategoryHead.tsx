import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Typography, Button } from 'antd'
import { ISelectedRow } from '.';

const { Title } = Typography

const GroupCategoryHead = ({
    setOpen,
    setSelectedRow
}: {
    setOpen: (e: boolean) => void;
    setSelectedRow: (e: ISelectedRow|null) => void;
}) => {
    return (
        <>
            <div className="p-8 flex justify-between ">
                <Title level={3}>Grupo & Categoria</Title>
                <div>
                    <Button
                        onClick={() => {
                            setOpen(true)
                            setSelectedRow(null)
                        }}
                        type='primary'
                    >
                        <PlusOutlined /> Nuevo Grupo
                    </Button>
                </div>
            </div>
        </>
    )
}

export default GroupCategoryHead

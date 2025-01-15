import { Button, Input, InputNumber, message, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import NewOrder from '../../../components/app/NewOrder'

export default function NewOrderModal({
    isProducts,
    detailsSale,
    setDetailsSale,
    open,
    setOpen,
    table
}: {
    isProducts: any[];
    open: boolean;
    detailsSale: any[];
    setDetailsSale: (e: any[]) => void;
    setOpen: (e: boolean) => void;
    table: any;
}) {

    return (
        <Modal
            open={open}
            footer={null}
            onCancel={() => setOpen(false)}
        >
            <NewOrder
                isProducts={isProducts}
                detailsSale={detailsSale}
                setDetailsSale={setDetailsSale}
            />
        </Modal>
    )
}

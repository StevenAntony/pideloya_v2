import { useCashContext } from '../hooks/useCashContext'
import { InputNumber, Modal } from 'antd'
import React, { useState } from 'react'

type Props = {}

export default function CashFormModal({ }: Props) {
    const { openFormModal, setOpenFormModal, loadingForm, openCash } = useCashContext()

    const [amount, setAmount] = useState<number>(0)

    return (
        <Modal
            title="Aperturar Caja"
            open={openFormModal}
            onOk={() => {
                openCash(amount)
            }}
            onCancel={() => setOpenFormModal(false)}
            confirmLoading={loadingForm}
        >
            <InputNumber className="w-full" value={amount} onChange={(value: number | null) => setAmount(value ?? 0)} />
        </Modal>
    )
}

import { useMovementContext } from '@hooks/page/management/useMovementContext'
import { Input, InputNumber, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'

const { Option } = Select

type Props = {}

export default function MovementFormModel({ }: Props) {
    const { openFormModal, createMovement, loadingForm, setOpenFormModal, selectedCash } = useMovementContext()

    const [amount, setAmount] = useState<number>(0)
    const [type, setType] = useState<'Ingress'|'Egress'>('Ingress')
    const [description, setDescription] = useState<string>('')

    const onOk = () => {
        if(selectedCash){
            createMovement({
                amount,
                cashID: selectedCash.cashID,
                description,
                type
            })
        }
    }

    useEffect(() => {
        if (openFormModal) {
            setAmount(0)
            setType('Ingress')
            setDescription('')
        }
    }, [openFormModal])

    return (
        <Modal
            title="Aperturar Caja"
            open={openFormModal}
            onOk={onOk}
            onCancel={() => setOpenFormModal(false)}
            confirmLoading={loadingForm}
            destroyOnClose
        >
            <div className="flex flex-col gap-4">
                <div>
                    <label htmlFor="">Tipo</label>
                    <Select
                        value={type}
                        onChange={(value) => setType(value)}
                        placeholder="Seleccione Tipo"
                        className='w-full'
                    >
                        <Option key={'Ingress'} value={'Ingress'}>Ingreso</Option>
                        <Option key={'Egress'} value={'Egress'}>Egreso</Option>
                    </Select>
                </div>
                <div>
                    <label htmlFor="">Descripción</label>
                    <Input className="w-full" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="">Monto</label>
                    <InputNumber className="w-full" precision={4} value={amount} onChange={(value) => setAmount(value ?? 0)} />
                </div>
            </div>
        </Modal>
    )
}

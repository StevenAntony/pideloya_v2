import { Button, Input, InputNumber, Modal, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import unitSunat from '../../service/data/UnitSunat.json'
import { _UnitService } from '../../service/_UnitService';
import { UnitModel } from '../../models/UnitModel';

export default function UnitModal({
    open,
    closeModal,
    getData,
    selectedRow
}: {
    open: boolean;
    closeModal: () => void;
    getData: () => void;
    selectedRow: UnitModel|null;
}) {
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
    const [type, setType] = useState<string>('NIU')
    const [name, setName] = useState<string>('')
    const [valueUnit, setValueUnit] = useState<number>(1)

    const onSend =async () => {
        setConfirmLoading(true)
        const service = new _UnitService()
        const params = {
            name: name,
            abbreviation: type,
            valueInUnit: valueUnit
        }
        if(selectedRow){
            await service.edit(selectedRow.id, params)
        }else{
            await service.store(params)
        }

        if (service.getResponse().success) {
            getData()
            message.success(service.getResponse().message)
            closeModal()
        }else{
            message.error(service.getResponse().message)
        }
        setConfirmLoading(false)
    }

    useEffect(() => {
        setName('')
        setType('NIU')
        setValueUnit(1)
        if (selectedRow) {
            setName(selectedRow.name)
            setType(selectedRow.abbreviation)
            setValueUnit(selectedRow.valueInUnit)
        }
    }, [open])

    return (
        <Modal
            title={selectedRow ? 'Editar Unidad' : 'Registrar Unidad'}
            open={open}
            confirmLoading={confirmLoading}
            onCancel={closeModal}
            footer={
                <>
                    <Button onClick={closeModal}>Cancelar</Button>
                    <Button onClick={onSend} type="primary">
                        {selectedRow ? 'Editar' : 'Registrar' }
                    </Button>
                </>
            }
        >
            <div className='flex flex-wrap '>
                <div className="w-full p-2">
                    <label htmlFor="">Tipo</label>
                    <Select
                        disabled={selectedRow ? true : false}
                        value={type}
                        onChange={(value) => setType(value)}
                        placeholder="Seleccione Tipo"
                        className='w-full'
                    >
                        {
                            unitSunat.map(obj => <Select.Option key={obj.key} value={obj.abbreviation}>{obj.abbreviation} - {obj.name}</Select.Option>)
                        }
                    </Select>
                </div>
                <div className='w-8/12 p-2'>
                    <label htmlFor="name">Nombre</label>
                    <Input
                        placeholder=""
                        name={'name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='w-4/12 p-2'>
                    <label htmlFor="value">Valor Unidad</label>
                    <InputNumber
                        className='w-full'
                        placeholder=""
                        min={1}
                        name={'value'}
                        value={valueUnit}
                        onChange={(value) =>setValueUnit(value ?? 1)}
                    />
                </div>
            </div>
        </Modal>
    )
}

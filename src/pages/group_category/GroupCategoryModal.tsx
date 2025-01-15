import React, { useEffect, useState } from 'react'
import {Modal, Button, Input, message} from 'antd'
import { ISelectedRow } from '.';
import { _GroupService } from '../../service/_GroupService';

export default function GroupCategoryModal({
    open,
    closeModal,
    selectedRow,
    getData,
    edit
}: {
    open: boolean;
    closeModal: () => void;
    selectedRow: ISelectedRow|null;
    getData: () => void;
    edit: boolean
}) {

    const [name, setName] = useState<string>('')
    const [titleModal, setTitleModal] = useState<string>('')
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

    const onSend =async () => {
        const service = new _GroupService()
        setConfirmLoading(true)
        if (selectedRow) {
            if(edit){
                if (selectedRow.type === 'Grupo') {
                    await service.edit(selectedRow.id, {
                        name: name
                    })
                }else{
                    await service.editCategory(selectedRow.id, {
                        name: name
                    })
                }
            }else{
                await service.storeCaregory(selectedRow.id, {
                    name: name
                })
            }
        }else{
            await service.store({
                name: name
            })
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
        if (selectedRow) {
            if(edit) {
                if (selectedRow.type === 'Grupo') {
                    setTitleModal(`Editar Grupo: ${selectedRow.name}`)
                }else{
                    setTitleModal(`Editar Categoria: ${selectedRow.name}`)
                }
                setName(selectedRow.name)
            }else{
                if (selectedRow.type === 'Grupo') {
                    setTitleModal(`${selectedRow.name}: Nueva Categoria`)
                }
            }
        }else{
            setTitleModal('Nuevo Grupo')
        }
    }, [selectedRow])

    useEffect(() => {
        if(open && !edit){
            setName('')
        }
    }, [open])

    return (
        <Modal
            title={titleModal}
            open={open}
            confirmLoading={confirmLoading}
            onCancel={closeModal}
            footer={
                <>
                    <Button onClick={closeModal}>Cancelar</Button>
                    <Button onClick={onSend} type="primary">
                        Registrar
                    </Button>
                </>
            }
        >
            <div className='flex flex-wrap '>
                <div className='w-full p-2'>
                    <label htmlFor="name">Nombre</label>
                    <Input
                        placeholder=""
                        name={'name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>
        </Modal>
    )
}

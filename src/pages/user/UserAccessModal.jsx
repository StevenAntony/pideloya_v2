import React, { useEffect, useState } from 'react'
import { Spin, message, Modal, Button, Collapse, Checkbox } from 'antd'
import { AccessService } from '../../service/AccessService'
import { UserService } from '../../service/UserService'

const UserAccessModal = ({
    open,
    confirmLoading,
    setOpen,
    selectedRow,
    getData
}) => {
    const [optionAccess, setOptionAccess] = useState([])
    const [loadingAccess, setLoadingAcces] = useState(false)
    const [valueAccess, setValueAccess] = useState([])

    const checkValue = (id) => {
        const findId = valueAccess.filter(obj => obj == id)
        return findId.length > 0 ? true : false
    }

    const onChange = (e, id) => {
        const status = e.target.checked
        if (status) {
            setValueAccess([...valueAccess, id])
        }else{
            const valueAccessDraft = [...valueAccess]
            const index = valueAccessDraft.findIndex(obj => obj == id)
            if (index != -1) {
                valueAccessDraft.splice(index, 1)
                setValueAccess([...valueAccessDraft])
            }
        }
    }

    const getAllAccess = async () => {
        setOptionAccess([])
        setLoadingAcces(true)
        const service = AccessService
        await service.list(selectedRow.typeOrigin)
        const optionDraft = []
        service.getAccess().forEach(acces => {
            const childrenDraft = []
            acces.children.forEach(child => {
                childrenDraft.push({
                    value: child.id,
                    label: child.name,
                })
            })
            optionDraft.push({
                value: acces.id,
                label: acces.name,
                children: childrenDraft
            })
        })

        setLoadingAcces(false)
        setOptionAccess(optionDraft)
    }

    const ItemAcces = ({ obj }) => {
        return (
            <div key={obj.value} className='w-full bg-blue-100 border border-blue-500 px-4 py-2 my-1 rounded shadow-sm'>
                <Checkbox checked={checkValue(obj.value)} onChange={(e) => onChange(e, obj.value)}><strong>{obj.label}</strong></Checkbox>
            </div>
        )
    }

    const onSend =async () => {
        const service = UserService
        await service.editAccess(selectedRow.id, {
            access: valueAccess
        })

        if (service.getResponse().success) {
            getData()
            message.success('Accesos Actualizados')
            setOpen(false)
        }else{
            message.error(service.getResponse().message)
        }
    }

    useEffect(() => {
        setValueAccess(selectedRow?.access)
    }, [optionAccess])

    useEffect(() => {
        if (open) {
            getAllAccess()
        }
    }, [open])

    return (
        <Modal
            title={'Acceso Usuario'}
            open={open}
            confirmLoading={confirmLoading}
            onCancel={() => {
                setOpen(false)
            }}
            footer={
                <>
                    <Button onClick={() => {
                        setOpen(false)
                    }}>Cancelar</Button>
                    <Button onClick={onSend} type="primary">
                        Actualizar
                    </Button>
                </>
            }
        >
            <Spin tip="Cargando..." spinning={loadingAccess}>
                <div className='flex flex-col gap-2 justify-center'>
                    {
                        optionAccess.map(obj => {
                            if (obj.children.length == 0) {
                                return <ItemAcces key={obj.value} obj={obj} />
                            }else{
                                return <Collapse
                                    key={obj.value}
                                    className='bg-blue-600 group-access'
                                    defaultActiveKey={[obj.value]}
                                    items={[
                                        {
                                            key: obj.value,
                                            label: obj.label,
                                            children: obj.children.map(item =>  <ItemAcces key={item.value} obj={item} />),
                                        }
                                    ]}
                                />
                            }
                        })
                    }
                </div>
            </Spin>
        </Modal>
    )
}

export default UserAccessModal

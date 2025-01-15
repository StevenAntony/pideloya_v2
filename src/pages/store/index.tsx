import React, { useEffect, useState } from 'react'
import { Typography, Button, Modal, Input, Table, Tag, Dropdown, message } from 'antd'
import { PlusOutlined, EllipsisOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons'
import { StoreModel } from '../../models/StoreModel'
import { StoreService } from '../../service/StoreService'
import TryValidationRequest from '../../components/validations/TryValidationRequest'

const { Title } = Typography

export default function StorePage() {
    const [open, setOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [selectedRow, setSelectedRow] = useState<StoreModel|null>(null)
    const [isStores, setStores] = useState<StoreModel[]>([])
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
    const [loadingList, setLoadingList] = useState<boolean>(false)

    const items = (row: StoreModel) => [
        {
            key: 'edit',
            label: <><EditOutlined /> Editar</>
        },
        {
            key: 'status',
            label: <><SyncOutlined /> {row.status ? 'Desactivar' : 'Activar'}</>,
        }
    ]

    const closeModal = () => {
        setOpen(false)
        setSelectedRow(null)
        setName('')
    }

    const getStores = async () => {
        setLoadingList(true)
        const service = StoreService
        await service.list()
        setStores(service.getStores())
        setLoadingList(false)
    }

    const send = async () => {
        setConfirmLoading(true)
        const service = StoreService
        const params = {
            name: name
        }
        if (selectedRow) {
            await service.edit(selectedRow.id, params)
        }else{
            await service.store(params)
        }

        if (service.getResponse().success) {
            getStores()
            closeModal()
            message.success(service.getResponse().message)
        }else{
            if (service.getResponse().code == 422) {
                message.warning(<TryValidationRequest validations={service.getResponse().data} />)
            }else{
                message.error(service.getResponse().message)
            }
        }

        setConfirmLoading(false)
    }

    const changeStatus = async () => {
        const service = StoreService
        await service.status(selectedRow?.id ?? 0)
        getStores()
    }

    const onClick = (props) => {
        if (props.key === 'edit') {
            setName(selectedRow?.name ?? '')
            setOpen(true)
        } else if (props.key === 'status') {
            changeStatus()
        }
    }

    useEffect(() => {
        getStores()
    } , [])

    return (
        <div className="mx-20 my-8 shadow-md bg-white">
            <div className="p-8 flex justify-between ">
                <Title level={3}>Almacenes</Title>
                <div>
                    <Button
                        onClick={() => {
                            setOpen(true)
                            setSelectedRow(null)
                        }}
                        type='primary'
                    >
                        <PlusOutlined /> Nuevo Almacén
                    </Button>
                </div>
            </div>
            <div className="px-8 pb-20">
                <Table
                    loading={loadingList}
                    bordered={true}
                    columns={[
                        {
                            title: 'Nombre',
                            dataIndex: 'name',
                            key: 'name'
                        },
                        {
                            title: 'Estado',
                            dataIndex: 'status',
                            key: 'status',
                            render: (_, { status }) => (
                                <>
                                    <Tag color={status ? 'geekblue' : 'red'} >
                                        {status ? 'Activo' : 'Desactivado'}
                                    </Tag>
                                </>
                            )
                        },
                        {
                            title: 'Acción',
                            key: 'action',
                            className: 'text-center',
                            render: (_, record) =>(
                                <Dropdown trigger={['click']} menu={{ items: items(record), onClick }} placement="bottomLeft" arrow>
                                    <Button onClick={() => setSelectedRow(record)} ><EllipsisOutlined /></Button>
                                </Dropdown>
                            )
                        },
                    ]}
                    dataSource={isStores}
                    rowKey={'id'}
                />
            </div>
            <Modal
                title={selectedRow ? 'Editar Almacén' : 'Registrar Almacén'}
                open={open}
                onCancel={closeModal}
                footer={
                    <>
                        <Button onClick={closeModal}>Cancelar</Button>
                        <Button onClick={send} loading={confirmLoading} type="primary">
                            {selectedRow ? 'Editar' : 'Registrar' }
                        </Button>
                    </>
                }
            >
                <div className='flex flex-wrap '>
                    <div className='w-full p-2'>
                        <label htmlFor="name">Nombre</label>
                        <Input
                            placeholder="Nombre del almacen"
                            name={'name'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

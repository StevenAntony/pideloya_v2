import React, { useEffect, useState } from 'react'
import { Typography, Button, Modal, Input, Table, Tag, Dropdown, message, Select, Slider } from 'antd'
import { PlusOutlined, EllipsisOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons'
import { StoreModel } from '../../models/StoreModel'
import { StoreService } from '../../service/StoreService'
import TryValidationRequest from '../../components/validations/tryValidationRequest'
import TableService from '../../service/TableService'
import { TableModel } from '../../models/Table'

const { Title } = Typography

export default function TablePage() {
    const [open, setOpen] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [level, setLevel] = useState<number>(1)
    const [selectedRow, setSelectedRow] = useState<TableModel|null>(null)
    const [isTables, setTables] = useState<TableModel[]>([])
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
    const [loadingList, setLoadingList] = useState<boolean>(false)
    const [mode, setMode] = useState<'individual'|'massive'>('individual')
    const [quantity, setQuantity] = useState<number>(1)

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

    const getTables = async () => {
        setLoadingList(true)
        const response = await TableService.all()
        setTables(response.data)
        setLoadingList(false)
    }

    const send = async () => {
        setConfirmLoading(true)
        let response
        const params = {
            name: name,
            level: level,
            mode: mode,
            quantity: quantity
        }
        if (selectedRow) {
            response = await TableService.update(selectedRow.id, params)
        }else{
            response = await TableService.store(params)
        }

        if (response.success) {
            getTables()
            closeModal()
            message.success(response.message)
        }else{
            if (response.code == 422) {
                message.warning(<TryValidationRequest validations={response.data} />)
            }else{
                message.error(response.message)
            }
        }

        setConfirmLoading(false)
    }

    const changeStatus = async () => {
        const response = TableService.changeStatus(selectedRow?.id ?? 0)
        getTables()
    }

    const onClick = (props) => {
        if (props.key === 'edit') {
            setName(selectedRow?.name ?? '')
            setLevel(selectedRow?.level ?? 1)
            setOpen(true)
        } else if (props.key === 'status') {
            changeStatus()
        }
    }

    const handleOpenModal = (mode: 'individual'|'massive') => {
        setOpen(true)
        setSelectedRow(null)
        setMode(mode)
    }

    useEffect(() => {
        getTables()
    } , [])

    return (
        <div className="mx-20 my-8 shadow-md bg-white">
            <div className="p-8 pb-2 flex justify-between ">
                <Title level={3}>Mesas</Title>
                <div>
                    <Button
                        onClick={() => handleOpenModal('massive')}
                        className='bg-sky-600 hover:!bg-sky-500 !text-white'
                    >
                        <PlusOutlined /> Mesas masiva
                    </Button>
                    <Button
                        onClick={() => handleOpenModal('individual')}
                        type='primary'
                    >
                        <PlusOutlined /> Mesa Individual
                    </Button>
                </div>
            </div>
            <div className="px-8 pb-20">
                <Table
                    loading={loadingList}
                    bordered={true}
                    columns={[
                        {
                            title: 'Piso',
                            dataIndex: 'level',
                            key: 'level',
                            render: (row, _) => <span>Piso N° 0{row}</span>
                        },
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
                    dataSource={isTables}
                    rowKey={'id'}
                />
            </div>
            <Modal
                title={selectedRow ? 'Editar Mesa' : 'Registrar Mesa'}
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
                    <div className='w-2/12 p-2'>
                        <label htmlFor="level">Piso</label>
                        <Select
                            value={level}
                            onChange={(value) => setLevel(value)}
                            className='w-full'
                            options={[1,2,3,4].map((value) => {
                                return {
                                    label: value,
                                    value: value
                                }
                            })}
                        />
                    </div>
                    <div className={`${mode === 'massive' ? 'w-4/12' : 'w-10/12'} p-2`}>
                        <label htmlFor="name">Nombre</label>
                        <Input
                            placeholder="Nombre de la mesa"
                            autoComplete='off'
                            name={'name'}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    {
                        mode === 'massive' && (
                            <div className='w-6/12 p-2'>
                                <label htmlFor="quantity">Cantidad</label>
                                <Slider value={quantity} onChange={(value) => setQuantity(value)} />
                            </div>
                        )
                    }
                </div>
            </Modal>
        </div>
    )
}

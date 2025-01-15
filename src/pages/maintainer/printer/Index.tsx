import React, { useEffect, useState } from 'react'
import { Typography, Button, Modal, Input, Table, Tag, Dropdown, message } from 'antd'
import { PlusOutlined, EllipsisOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons'
import { PrinterModel } from '../../../models/PrinterModel'
import PrinterService from '../../../service/PrinterService'
import TitleTable from '../../../components/app/title/TitleTable'
import PrinterForm from './PrinterForm'

const { Title } = Typography

export default function MaintainerPrinterPage() {
    const [open, setOpen] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState<PrinterModel|null>(null)
    const [isPrinters, setPrinters] = useState<PrinterModel[]>([])
    const [loadingList, setLoadingList] = useState<boolean>(false)

    const items = (row: PrinterModel) => [
        {
            key: 'edit',
            label: <><EditOutlined /> Editar</>
        },
        {
            key: 'status',
            label: <><SyncOutlined /> {row.active ? 'Desactivar' : 'Activar'}</>,
        }
    ]

    const closeModal = () => {
        setOpen(false)
        setSelectedRow(null)
    }

    const getPrinters = async () => {
        setLoadingList(true)
        const service = new PrinterService()
        await service.list()
        setPrinters(service.getPrinters())
        setLoadingList(false)
    }

    const changeStatus = async () => {
        const service = new PrinterService()
        await service.changeActive(selectedRow?.id ?? 0)
        if (service.getResponse().success) {
            message.success(service.getResponse().message)
        }else{
            message.error(service.getResponse().message)
        }
        getPrinters()
    }

    const onClick = (props) => {
        if (props.key === 'edit') {
            setOpen(true)
        } else if (props.key === 'status') {
            changeStatus()
        }
    }

    useEffect(() => {
        getPrinters()
    } , [])

    return (
        <div className="mx-20 my-8 shadow-md bg-white">
            <div className="p-8 flex justify-between ">
                <Title level={3}>Impresoras</Title>
                <div>
                    <Button
                        onClick={() => {
                            setOpen(true)
                            setSelectedRow(null)
                        }}
                        type='primary'
                    >
                        <PlusOutlined /> Nuevo Impresora
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
                            title: <TitleTable title='Impresora' description='Nombre de la impresora instalada en su dispositivo' />,
                            dataIndex: 'printer',
                            key: 'printer'
                        },
                        {
                            title: 'Conexión',
                            dataIndex: 'controller',
                            key: 'controller',
                            render: (_, { controller }) => (
                                <Tag color={controller == 'usb' ? 'cyan' : 'gold'} >
                                    {controller.toUpperCase()}
                                </Tag>
                            )
                        },
                        {
                            title: <TitleTable title='Recursos' description='Que cosa va a imprimir: Todo, Ordenes y Comprobantes' />,
                            dataIndex: 'resource',
                            key: 'resource',
                            render: (_, { resource }) => (
                                <Tag>
                                    {resource == 'ALL' ? 'Todo' : ( resource == 'COMMAND' ? 'Ordenes' : 'Comprobantes' )}
                                </Tag>
                            )
                        },
                        {
                            title: 'Estado',
                            dataIndex: 'active',
                            key: 'active',
                            render: (_, { active }) => (
                                <Tag color={active ? 'geekblue-inverse' : 'red-inverse'} >
                                    {active ? 'Activo' : 'Desactivado'}
                                </Tag>
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
                    dataSource={isPrinters}
                    rowKey={'id'}
                />
            </div>
            { open && <Modal
                    title={selectedRow ? 'Editar Impresora' : 'Registrar Impresora'}
                    open={open}
                    onCancel={closeModal}
                    footer={null}
                >
                    <PrinterForm
                        printerSelected={selectedRow}
                        triggerToSuccess={() => {
                            closeModal()
                            getPrinters()
                        }}
                    />
                </Modal>
            }
        </div>
    )
}

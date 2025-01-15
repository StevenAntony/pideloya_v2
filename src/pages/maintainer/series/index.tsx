import React, { useEffect, useState } from 'react'
import { Typography, Button, Modal, Input, Table, Tag, Dropdown, message } from 'antd'
import { PlusOutlined, EllipsisOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons'
import PrinterService from '../../../service/PrinterService'
import TitleTable from '../../../components/app/title/TitleTable'
import { SeriesModel } from '../../../models/SeriesModel'
import SeriesService from '../../../service/maintairner/SeriesService'
import SeriesForm from './SeriesForm'
import { VoucherModel } from '../../../models/VoucherModel'
import VoucherService from '../../../service/maintairner/VoucherService'

const { Title } = Typography

export default function MaintainerSeriesPage() {
    const [open, setOpen] = useState<boolean>(false)
    const [selectedRow, setSelectedRow] = useState<SeriesModel|null>(null)
    const [isSeries, setSeries] = useState<SeriesModel[]>([])
    const [isVouchers, setVouchers] = useState<VoucherModel[]>([])
    const [loadingList, setLoadingList] = useState<boolean>(false)

    const items = (row: SeriesModel) => [
        {
            key: 'edit',
            label: <><EditOutlined /> Editar</>,
            disabled: true
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

    const getSeries = async () => {
        setLoadingList(true)
        const service = new SeriesService()
        await service.listSeries()
        setSeries(service.getSeries())
        setLoadingList(false)
    }

    const getVouchers = async () => {
        const service = new VoucherService()
        await service.list()
        setVouchers(service.getVouchers())
    }

    const changeStatus = async () => {
        const service = new SeriesService()
        await service.changeStatus(selectedRow?.id ?? 0)
        if (service.getResponse().success) {
            message.success(service.getResponse().message)
        }else{
            message.error(service.getResponse().message)
        }
        getSeries()
    }

    const onClick = (props) => {
        if (props.key === 'edit') {
            setOpen(true)
        } else if (props.key === 'status') {
            changeStatus()
        }
    }

    useEffect(() => {
        getSeries()
        getVouchers()
    } , [])

    return (
        <div className="mx-20 my-8 shadow-md bg-white">
            <div className="p-8 flex justify-between ">
                <Title level={3}>Series</Title>
                <div>
                    <Button
                        onClick={() => {
                            setOpen(true)
                            setSelectedRow(null)
                        }}
                        type='primary'
                    >
                        <PlusOutlined /> Nueva Serie
                    </Button>
                </div>
            </div>
            <div className="px-8 pb-20">
                <Table
                    loading={loadingList}
                    bordered={true}
                    columns={[
                        {
                            title: 'Comprobante',
                            dataIndex: 'nameVaucher',
                            key: 'nameVaucher'
                        },
                        {
                            title: <TitleTable title='Destino' description='Proceso donde se usa el comprobante' />,
                            dataIndex: 'destination',
                            key: 'destination',
                            render: (_, { destination }) => {
                                const destinationArray = destination.split('|')
                                return (
                                    destinationArray.map(obj => <Tag key={obj}>{obj == 'Sale' ? 'Ventas' : ( obj == 'Buys' ? 'Compras' : obj )}</Tag>)
                                )
                            }
                        },
                        {
                            title: 'Series',
                            dataIndex: 'nameSeries',
                            key: 'nameSeries'
                        },
                        {
                            title: 'Correlativo',
                            dataIndex: 'correlative',
                            key: 'correlative'
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
                    dataSource={isSeries}
                    rowKey={'id'}
                />
            </div>
            { open && <Modal
                    title={selectedRow ? 'Editar Serie' : 'Registrar Serie'}
                    open={open}
                    onCancel={closeModal}
                    footer={null}
                >
                    <SeriesForm
                        seriesSelected={selectedRow}
                        triggerToSuccess={() => {
                            getSeries()
                            closeModal()
                        }}
                        vouchers={isVouchers}
                    />
                </Modal>
            }
        </div>
    )
}

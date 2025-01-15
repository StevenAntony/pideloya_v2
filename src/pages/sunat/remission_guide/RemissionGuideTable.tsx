import React from 'react'
import { DriverModel, RemissionGuideModel, VehiclePlate } from '../../../models/RemissionGuideModel'
import { Button, Divider, Dropdown, message, Popover, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import reasonsTransfer from '../../../service/data/sunat/ReasonsTransfer.json'
import transferMode from '../../../service/data/sunat/TransferMode.json'
import ubigeoDepartament from '../../../service/data/ubigeoDepartament.json'
import ubigeoDistric from '../../../service/data/ubigeoDistric.json'
import ubigeoProvince from '../../../service/data/ubigeoProvince.json'
import { EllipsisOutlined, EditOutlined, SyncOutlined, FilePdfOutlined, FolderOutlined, FileExcelOutlined } from '@ant-design/icons'
import { RemissionGuideService } from '../../../service/sunat/RemissionGuideService'
import { useAuthContext } from '../../../contexts/AuthContext'
import { ErrorOutline, InfoOutlined } from '@mui/icons-material'

type Props = {
    remissionGuides: RemissionGuideModel[];
    loadingGetRemission: boolean;
    remissionGuideSelected: RemissionGuideModel|null;
    setRemissionGuideSelected: (e: RemissionGuideModel|null) => void;
    getRemissionGuides: () => void;
    setOpenDrawer: (e: boolean) => void;
}

export default function RemissionGuideTable({
    remissionGuides,
    loadingGetRemission,
    remissionGuideSelected,
    setRemissionGuideSelected,
    getRemissionGuides,
    setOpenDrawer
}: Props) {
    const { auth } = useAuthContext()
    const items = (row: RemissionGuideModel) => {
        const answerSunatLast = row.answersSunat.length > 0 ? row.answersSunat[0] : null
        const okSunat = answerSunatLast ? answerSunatLast.code == 0 : false

        const options = [
            {
                key: 'emitSunat',
                label: <><SyncOutlined /> Enviar Sunat</>,
                disabled: okSunat
            },
            {
                key: 'pdf',
                label: <a href={`/pdf/remission_guide_a4/${auth.company.id}/${row.id}`} target='_black'><FilePdfOutlined /> Pdf</a>
            },
            {
                key: 'edit',
                label: <><EditOutlined /> Editar</>,
                disabled: okSunat
            },
            {
                key: 'status',
                label: <><SyncOutlined /> {row.active ? 'Desactivar' : 'Activar'}</>,
                disabled: okSunat
            }
        ]

        if(answerSunatLast && answerSunatLast.code == 0) {
            options.push({
                key: 'cdr',
                label: <a href={`${answerSunatLast.CDR}`} target='_black'><FolderOutlined /> CDR</a>
            })

            options.push({
                key: 'xml',
                label: <a href={`${answerSunatLast.XML}`} target='_black'><FileExcelOutlined /> XML</a>
            })
        }


        return options
    }

    const changeStatus = async () => {
        const service = new RemissionGuideService
        await service.changeStatus(remissionGuideSelected?.id ?? 0)
        if (service.getResponse().success) {
            getRemissionGuides()
            message.success(service.getResponse().message)
        }else{
            message.error(service.getResponse().message)
        }
    }

    const emitSunat = async () => {
        message.open({
            type: 'loading',
            content: 'Enviando a sunat..',
            duration: 0,
        })
        if(remissionGuideSelected == null) return ;
        const service = new RemissionGuideService
        await service.emitSunat(remissionGuideSelected.id)
        message.destroy()
        if (service.getResponse().success) {
            getRemissionGuides()
            message.success(service.getResponse().message)
        }else{
            message.error(service.getResponse().message)
        }
    }

    const onClick = (props) => {
        if (props.key === 'edit') {
            setOpenDrawer(true)
        } else if (props.key === 'status') {
            changeStatus()
        } else if (props.key === 'emitSunat') {
            emitSunat()
        }
    }

    const columns:TableProps<RemissionGuideModel>['columns'] = [
        {
            title: 'Documento',
            dataIndex: 'document',
            key: 'document'
        },
        {
            title: 'Emisión',
            dataIndex: 'issue',
            key: 'issue'
        },
        {
            title: 'Fecha Traslado',
            dataIndex: 'transferDate',
            key: 'transferDate'
        },
        {
            title: 'Doc. Cliente',
            dataIndex: 'customerDocument',
            key: 'customerDocument'
        },
        {
            title: 'Cliente',
            dataIndex: 'customerName',
            key: 'customerName'
        },
        {
            title: 'Sunat',
            dataIndex: 'codeSunat',
            key: 'codeSunat',
            render: (_, record) => {
                console.log(record.answersSunat);

                const answerSunatLast = record.answersSunat.length > 0 ? record.answersSunat[0] : null

                if (answerSunatLast == null) return '-'

                const observations = answerSunatLast.observations ? JSON.parse(answerSunatLast.observations) : []

                const ok = <Tag color='green'>Aceptado</Tag>
                const refused = <Tag color='red'>Rechazado</Tag>
                const exception = <Tag color='orange'>Excepcional</Tag>

                const observationRender = (
                    observations.map((observation, index) => <li key={index} >{observation}</li>)
                )

                return (
                    <>
                        {answerSunatLast.code == 0 ? ok : (answerSunatLast.code >= 2000 && answerSunatLast.code <= 3999 ? refused : exception)}
                        {
                            observations.length > 0 && (
                                <Popover content={observationRender} title="Observaciones">
                                    <InfoOutlined sx={{color: 'blue'}} />
                                </Popover>
                            )
                        }
                        {
                            answerSunatLast.code != 0 && (
                                <Popover content={answerSunatLast.description} title="Error">
                                    <ErrorOutline sx={{color: 'red'}} />
                                </Popover>
                            )
                        }
                    </>
                )
            }
        },
        {
            title: 'Estado',
            dataIndex: 'active',
            key: 'active',
            render: (_, { active }) => (
                <>
                    <Tag color={active ? 'geekblue' : 'red'} >
                        {active ? 'Realizado' : 'Anulado'}
                    </Tag>
                </>
            )
        },
        {
            title: 'Acción',
            key: 'action',
            render: (_, record) => (
                <Dropdown trigger={['click']} menu={{ items: items(record), onClick }} placement="bottomLeft" arrow>
                    <Button onClick={() => setRemissionGuideSelected(record)} ><EllipsisOutlined /></Button>
                </Dropdown>
            )
        }
    ]

    const expandableBuild = (record: RemissionGuideModel) => {
        const transferModeName = transferMode.find(obj => obj.id === record.transferMode)?.name
        const transferReasonNam = reasonsTransfer.find(obj => obj.id === record.transferReason)?.name

        const renderDrives = (driver: DriverModel) => {
            return (
                <>
                    <div className='w-2/12'>
                        <p className='font-bold'>Documento </p>
                        <p>{driver.document}</p>
                    </div>
                    <div className='w-4/12'>
                        <p className='font-bold'>Nombres </p>
                        <p>{driver.name} {driver.lastName}</p>
                    </div>
                    <div className='w-2/12'>
                        <p className='font-bold'>Licencia </p>
                        <p>{driver.license}</p>
                    </div>
                    <div className='w-2/12'>
                        <p className='font-bold'>Principal </p>
                        <p>{driver.principal ? 'SI' : 'NO'}</p>
                    </div>
                </>
            )
        }

        const renderVehicle = (vehicle: VehiclePlate) => {
            return (
                <div className='w-2/12' key={vehicle.plate}>
                    <p className='font-bold'>Placa </p>
                    <p>{vehicle.plate} - {vehicle.principal ? 'PRINCIPAL' : 'SECUNDARIO'}</p>
                </div>
            )
        }

        const renderLocation = (ubigeo: string, address: string, zone: string) => {
            const departament = ubigeoDepartament.find(obj => obj.id === ubigeo.substring(0, 2))
            const province = ubigeoProvince.find(obj => obj.id === ubigeo.substring(0, 4))
            const dristric = ubigeoDistric.find(obj => obj.id === ubigeo)
            return (
                <>
                    <div className='w-3/12'>
                        <p className='font-bold'>Departamento {zone} </p>
                        <p>{departament?.id} - {departament?.name}</p>
                    </div>
                    <div className='w-3/12'>
                        <p className='font-bold'>Provincia {zone} </p>
                        <p>{province?.id} - {province?.name}</p>
                    </div>
                    <div className='w-3/12'>
                        <p className='font-bold'>Distrito {zone} </p>
                        <p>{dristric?.id} - {dristric?.name}</p>
                    </div>
                    <div className='w-3/12'>
                        <p className='font-bold'>Dirección {zone} </p>
                        <p>{address}</p>
                    </div>
                </>
            )
        }

        return (
            <div className='flex flex-wrap'>
                <div className='w-2/12'>
                    <p className='font-bold'>Modo Traslado </p>
                    <p>{transferModeName}</p>
                </div>
                <div className='w-2/12'>
                    <p className='font-bold'>Motivo Traslado </p>
                    <p>{transferReasonNam}</p>
                </div>
                <div className='w-2/12'>
                    <p className='font-bold'>Peso Total </p>
                    <p>{record.pesoTotal}</p>
                </div>
                {
                    record.transferMode == '01' && (
                        <>
                            <Divider orientation="left" orientationMargin="0">Transportista</Divider>
                            <div className='w-2/12'>
                                <p className='font-bold'>Documento </p>
                                <p>{record.transportistDocument}</p>
                            </div>
                            <div className='w-4/12'>
                                <p className='font-bold'>Razón social </p>
                                <p>{record.transportistName}</p>
                            </div>
                            <div className='w-2/12'>
                                <p className='font-bold'>Matricula </p>
                                <p>{record.transportistRegistrationNumber}</p>
                            </div>
                        </>
                    )
                }
                {
                    record.transferMode == '02' && (
                        <>
                            <Divider orientation="left" key={'driver'} orientationMargin="0">Chofer</Divider>
                            {record.drivers.map((driver) => renderDrives(driver))}
                            <Divider orientation="left" key={'vehicle'} orientationMargin="0">Vehículo</Divider>
                            {record.vehiclePlates.map((vehicle) => renderVehicle(vehicle))}
                        </>
                    )
                }
                <Divider orientation="left" orientationMargin="0">Ubicación</Divider>
                {renderLocation(record.ubigeoDeparture, record.addressDeparture, 'Partida')}
                {renderLocation(record.ubigeoArrival, record.addressArrival, 'Llegada')}
            </div>
        )
    }

    return (
        <div>
            <Table
                loading={loadingGetRemission}
                bordered={true}
                columns={columns}
                dataSource={remissionGuides}
                expandable={{
                    expandedRowRender: (record) => expandableBuild(record),
                    rowExpandable: (record) => true,
                }}
                rowKey={'id'}
            />
        </div>
    )
}

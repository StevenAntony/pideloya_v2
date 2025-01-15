import React, { useEffect, useState } from 'react'
import { Button, Divider, Form, message, Row, Space} from 'antd'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import ubigeoDepartament from '../../../service/data/ubigeoDepartament.json'
import ubigeoDistric from '../../../service/data/ubigeoDistric.json'
import ubigeoProvince from '../../../service/data/ubigeoProvince.json'
import { SeriesModel } from '../../../models/SeriesModel'
import Transportist from './components/Transportist'
import PrivateTransport from './components/PrivateTransport'
import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined, SaveOutlined } from '@mui/icons-material'
import Locations from './components/Locations'
import Despatch from './components/Despatch'
import DetailsDespatch from './components/DetailsDespatch'
import { RemissionGuideModel, RemissionGuideStoreModel } from '../../../models/RemissionGuideModel'
import { RemissionGuideService } from '../../../service/sunat/RemissionGuideService'
import responseApi from '../../../components/responseApi'

dayjs.extend(customParseFormat)

type Props = {
    customers: any[];
    series: SeriesModel[];
    products: any[];
    triggerFinish: () => void;
    remissionGuideEdit: RemissionGuideModel|null;
}

const filterProvince = (departamentID: string) => ubigeoProvince.filter(value => value.department_id == departamentID)
const filterDistric = (provinceID: string) => ubigeoDistric.filter(value => value.province_id == provinceID)

export default function RemissionGuideForm({
    customers,
    series,
    products,
    triggerFinish,
    remissionGuideEdit
}: Props) {
    const [transferModeRender, setTransferModeRender] = useState<string>('01')

    const [provincesDeparture, setProvincesDeparture] = useState(filterProvince(ubigeoDepartament[0].id))
    const [districtsDeparture, setDistrictsDeparture] = useState(filterDistric(ubigeoProvince[0].id))
    const [provincesArrival, setProvincesArrival] = useState(filterProvince(ubigeoDepartament[0].id))
    const [districtsArrival, setDistrictsArrival] = useState(filterDistric(ubigeoProvince[0].id))

    const [detailsDespatch, setDetailsDespatch] = useState<any[]>([])

    const [showProducts, setShowProducts] = useState<boolean>(false)
    const [loadingSend, setLoadingSend] = useState<boolean>(false)

    const [form] = Form.useForm()

    const buildOptionsSelec = (data: any[]) => data.map(obj => {
        return { value:obj.id, label: `${obj.id} - ${obj.name}` }
    })

    const renderTransport = {
        '01': <Transportist />,
        '02': <PrivateTransport />
    }

    const changeDepartamentDeparture = (value: string) => {
        const listProvince = filterProvince(value)
        const listDistric = filterDistric(listProvince[0].id)
        setDistrictsDeparture(listDistric)
        setProvincesDeparture(listProvince)
        form.setFieldsValue({
            'departure-province': listProvince[0].id,
            'departure-district': listDistric[0].id
        })
    }

    const changeDepartamentArrival = (value: string) => {
        const listProvince = filterProvince(value)
        const listDistric = filterDistric(listProvince[0].id)
        setDistrictsArrival(listDistric)
        setProvincesArrival(listProvince)
        form.setFieldsValue({
            'arrival-province': listProvince[0].id,
            'arrival-district': listDistric[0].id
        })
    }

    const changeProvinceDeparture = (value: string) => {
        const listDistric = filterDistric(value)
        setDistrictsDeparture(listDistric)
        form.setFieldsValue({
            'departure-district': listDistric[0].id
        })
    }

    const changeProvinceArrival = (value: string) => {
        const listDistric = filterDistric(value)
        setDistrictsArrival(listDistric)
        form.setFieldsValue({
            'arrival-district': listDistric[0].id
        })
    }

    const handleValueForm = (changedValues: any, _) => {
        if ('transfer-mode' in changedValues ) setTransferModeRender(changedValues['transfer-mode'])

        if ('departure-department' in changedValues ) changeDepartamentDeparture(changedValues['departure-department'])
        if ('departure-province' in changedValues ) changeProvinceDeparture(changedValues['departure-province'])

        if ('arrival-department' in changedValues ) changeDepartamentArrival(changedValues['arrival-department'])
        if ('arrival-province' in changedValues ) changeProvinceArrival(changedValues['arrival-province'])
    }

    const handleFinish = async (values: any) => {
        setLoadingSend(true)
        const params: RemissionGuideStoreModel = {
            customerID: values.customer,
            serieID: values.serie,
            transferReason: values['reasons-transfer'],
            transferMode: values['transfer-mode'],
            issue: values['issue-date'],
            transferDate: values['transfer-date'],
            pesoTotal: values['total-peso'],
            ubigeoDeparture: values['departure-district'],
            ubigeoArrival: values['arrival-district'],
            addressDeparture: values['departure-address'],
            addressArrival: values['arrival-address'],
            drivers: [
                {
                    documentType: `${values['driver-principal-document-type']}`,
                    document: values['driver-principal-document'],
                    name: values['driver-principal-name'],
                    lastName: values['driver-principal-last-name'],
                    license: values['driver-principal-license'],
                    principal: true
                }
            ],
            vehiclePlates: [
                {plate: values['vehicle-principal-plate'], principal: true},
                {plate: values['vehicle-secundary-plate'], principal: false}
            ],
            transportistDocument: values['transportist-document'],
            transportistDocumentType: `${values['transportist-document-type']}`,
            transportistName: values['transportist-business-name'],
            transportistRegistrationNumber: values['transportist-registration-number'],
            details: detailsDespatch.map(detail => {
                return {
                    presentationID: detail.idPresentation,
                    description: detail.description,
                    note: detail.note,
                    quantity: detail.quantity,
                    unit: detail.unitSunat
                }
            }),
            saleID: null
        }

        const service = new RemissionGuideService()
        if(remissionGuideEdit){
            await service.edit(remissionGuideEdit.id, params)
        }else{
            await service.store(params)
        }

        responseApi(service.getResponse())
        if (service.getResponse().success) triggerFinish()
        setLoadingSend(false)
    }

    useEffect(() =>{
        if (remissionGuideEdit) {
            const transportistDocumentSplit = remissionGuideEdit.transportistDocument ? remissionGuideEdit.transportistDocument.split('-') : []
            const transportistDocument = transportistDocumentSplit.length > 0
                ? ( transportistDocumentSplit.length > 1 ? transportistDocumentSplit[1].trim() : transportistDocumentSplit[0] )
                : ''
            setTransferModeRender(remissionGuideEdit.transferMode)
            form.setFieldsValue({
                'transfer-mode': remissionGuideEdit.transferMode,
                'reasons-transfer': remissionGuideEdit.transferReason,
                'transfer-date': dayjs(remissionGuideEdit.transferDate, 'DD/MM/YYYY'),
                'issue-date': dayjs(remissionGuideEdit.issue, 'DD/MM/YYYY'),
                'total-peso': remissionGuideEdit.pesoTotal,
                'customer': remissionGuideEdit.customerID,

                'departure-department': remissionGuideEdit.ubigeoDeparture.substring(0, 2),
                'departure-address': remissionGuideEdit.addressDeparture,
                'arrival-department': remissionGuideEdit.ubigeoArrival.substring(0, 2),
                'arrival-address': remissionGuideEdit.addressArrival,
                'transportist-business-name': remissionGuideEdit.transportistName,
                'transportist-document': transportistDocument,
                'transportist-registration-number': remissionGuideEdit.transportistRegistrationNumber
            })

            if (remissionGuideEdit.transferMode === '02') {
                form.setFieldsValue({
                    'driver-principal-document': remissionGuideEdit.drivers[0].document,
                    'driver-principal-name': remissionGuideEdit.drivers[0].name,
                    'driver-principal-last-name': remissionGuideEdit.drivers[0].lastName,
                    'driver-principal-license': remissionGuideEdit.drivers[0].license,
                    'vehicle-principal-plate': remissionGuideEdit.vehiclePlates[0].plate,
                    'vehicle-secundary-plate': remissionGuideEdit.vehiclePlates[1].plate
                })
            }

            remissionGuideEdit.details.forEach(element => {
                setDetailsDespatch((prev) => [...prev, {
                    action: 'new',
                    amount: 0,
                    description: element.description,
                    id: 0,
                    idPresentation: element.presentationID,
                    idStore: 1,
                    originalQuantity: Number(element.quantity),
                    quantity: Number(element.quantity),
                    note: element.note,
                    unitSunat: element.unit
                }])
            });

            changeDepartamentDeparture(remissionGuideEdit.ubigeoDeparture.substring(0, 2))
            changeProvinceDeparture(remissionGuideEdit.ubigeoDeparture.substring(0, 4))

            changeDepartamentArrival(remissionGuideEdit.ubigeoArrival.substring(0, 2))
            changeProvinceArrival(remissionGuideEdit.ubigeoArrival.substring(0, 4))
        }
    }, [remissionGuideEdit])

    return (
        <Form
            form={form}
            layout='vertical'
            onValuesChange={handleValueForm}
            onFinish={handleFinish}
            onFinishFailed={(errorInfo) => {
                message.warning('Por favor complete todos los campos obligatorios')
            }}
            initialValues={{
                'transfer-mode': '01',
                'reasons-transfer': '01',
                'transfer-date': dayjs(),
                'issue-date': dayjs(),
                'total-peso': 0.1,
                'serie': series[0].id,
                'customer': customers[0].id,

                'departure-department': ubigeoDepartament[0].id,
                'departure-province': ubigeoProvince[0].id,
                'departure-district': ubigeoDistric[0].id,
                'arrival-department': ubigeoDepartament[0].id,
                'arrival-province': ubigeoProvince[0].id,
                'arrival-district': ubigeoDistric[0].id,

                'transportist-document-type': 6,

                'driver-principal-document-type': 1,
                'driver-secundary-document-type': 1
            }}
        >
            <Row gutter={[24,8]} className={showProducts ? 'hidden' : ''}>
                <Despatch
                    buildOptionsSelec={buildOptionsSelec}
                    customers={customers}
                    series={series}
                    form={form}
                    setDetailsDespatch={setDetailsDespatch}
                />
                <Divider orientation="left" orientationMargin="0">Direcciones</Divider>
                <Locations
                    buildOptionsSelec={buildOptionsSelec}
                    districtsArrival={districtsArrival}
                    districtsDeparture={districtsDeparture}
                    provincesArrival={provincesArrival}
                    provincesDeparture={provincesDeparture}
                    ubigeoDepartament={ubigeoDepartament}
                />
                <Divider orientation="left" orientationMargin="0">{transferModeRender == '01' ? 'Transportista' : 'Choferes'}</Divider>
                {renderTransport[transferModeRender]}
            </Row>
            {
                showProducts && (
                    <DetailsDespatch
                        products={products}
                        details={{
                            detailsDespatch,
                            setDetailsDespatch
                        }}
                    />
                )
            }
            <div className='flex justify-end py-3'>
                {
                    !showProducts && (
                        <Button disabled={loadingSend} type='default' onClick={() => setShowProducts(true)} className='!bg-emerald-600 !text-white'>
                            <ArrowCircleRightOutlined /> <span className='ml-2'>Ir Productos</span>
                        </Button>
                    )
                }
                {
                    showProducts && (
                        <Space>
                            <Button disabled={loadingSend} type='default' onClick={() => setShowProducts(false)} className='!bg-emerald-600 !text-white'>
                                <ArrowCircleLeftOutlined /> <span className='ml-2'>Ir Información</span>
                            </Button>
                            <Button type="primary" loading={loadingSend} htmlType="submit">
                                <SaveOutlined /> <span className='ml-2'>Guardar</span>
                            </Button>
                        </Space>
                    )
                }
            </div>
        </Form>
    )
}

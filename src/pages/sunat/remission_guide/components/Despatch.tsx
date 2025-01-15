import { Col, DatePicker, Form, Input, InputNumber, message, Select } from 'antd'
import React, { useState } from 'react'
import { RULE_REMISSION_GUIDE } from '../RemissionGuideRulesType'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { SeriesModel } from '../../../../models/SeriesModel'
import reasonsTransfer from '../../../../service/data/sunat/ReasonsTransfer.json'
import transferMode from '../../../../service/data/sunat/TransferMode.json'
import { _SaleService } from '../../../../service/_SaleService'
import type { FormInstance } from 'antd'

dayjs.extend(customParseFormat)

type Props = {
    buildOptionsSelec: (e: any[]) => any[];
    customers: any[];
    series: SeriesModel[];
    form: FormInstance<any>;
    setDetailsDespatch: (e: any) => void
}

const { Search } = Input

export default function Despatch({
    buildOptionsSelec,
    customers,
    series,
    form,
    setDetailsDespatch
}: Props) {
    const [nroDocument, setNroDocument] = useState<string>('')
    const [loadingSearch, setLoadingSearch] = useState<boolean>(false)

    const findSale =async () => {
        setLoadingSearch(true)
        const service = new _SaleService
        await service.findSaleToRemission(nroDocument)

        if (service.getResponse().success) {
            const { data } = service.getResponse()
            message.success(service.getResponse().message)
            form.setFieldsValue({
                customer: data.customer_id
            })


            data.details.forEach(element => {
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
                    unitSunat: 'NIU'
                }])
            });
        }else{
            message.warning(service.getResponse().message)
        }
        setLoadingSearch(false)
    }

    return (
        <>
            <Col span={5}>
                <label>Buscar Comprobante</label>
                <Search
                    className='mt-2'
                    placeholder="Ingrese comprobante..."
                    onSearch={() => findSale()}
                    loading={loadingSearch}
                    onChange={e => setNroDocument(e.target.value)} enterButton
                />
            </Col>
            <Col span={10}>
                <Form.Item
                    name={'customer'}
                    label={'Cliente'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                    rules={RULE_REMISSION_GUIDE.customer}
                >
                    <Select
                        showSearch
                        placeholder="Elegir un cliente"
                        //loading={false}
                        //optionFilterProp="children"
                        //filterOption={false}
                        //onSearch={() => { }}
                        options={customers.map(obj => {
                            return {
                                value: obj.key,
                                label: `${obj.document} - ${obj.firstName} ${obj.lastName}`
                            }
                        })}
                    />
                </Form.Item>
            </Col>
            <Col span={3}>
                <Form.Item
                    name={'serie'}
                    label={'Serie'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                >
                    <Select
                        options={series.map(obj => {
                            return {
                                value: obj.id,
                                label: obj.nameSeries
                            }
                        })}
                    />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                    name={'reasons-transfer'}
                    label={'Motivos de Traslado'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                >
                    <Select
                        options={buildOptionsSelec(reasonsTransfer)}
                    />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                    name={'transfer-mode'}
                    label={'Modo de transferencia'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                >
                    <Select
                        options={buildOptionsSelec(transferMode)}
                    />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    name={'issue-date'}
                    label={'Fecha Emisión'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                    rules={RULE_REMISSION_GUIDE.transferDate}
                >
                    <DatePicker className='w-full' minDate={dayjs()} />
                </Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item
                    name={'transfer-date'}
                    label={'Fecha de Traslado'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                    rules={RULE_REMISSION_GUIDE.transferDate}
                >
                    <DatePicker className='w-full' minDate={dayjs()} />
                </Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item
                    name={'total-peso'}
                    label={'Peso Total'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                    rules={RULE_REMISSION_GUIDE.totalPeso}
                >
                    <InputNumber
                        className='w-full'
                        addonAfter='KGM'
                        min={0.1}
                    />
                </Form.Item>
            </Col>
        </>
    )
}

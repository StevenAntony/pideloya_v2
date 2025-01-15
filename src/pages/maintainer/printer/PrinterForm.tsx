import { Alert, Button, Col, Form, Input, Row, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { PrinterModel, PrinterStoreOrUpdatedRequest } from '../../../models/PrinterModel'
import PrinterService from '../../../service/PrinterService'
import responseApi from '../../../components/responseApi'

type Props = {
    printerSelected: PrinterModel|null;
    triggerToSuccess: () => void;
}

export default function PrinterForm({
    printerSelected,
    triggerToSuccess
}: Props) {
    const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false)
    const [form] = Form.useForm()

    const onFinish = async (values: any) => {
        setLoadingConfirm(true)
        const service = new PrinterService
        const params: PrinterStoreOrUpdatedRequest = {
            name: values.name,
            controller: values.controller,
            printer: values.printer,
            resource: values.resource
        }
        if (printerSelected) {
            await service.updated(params, printerSelected.id)
        }else{
            await service.store(params)
        }
        const response = service.getResponse()
        responseApi(response)
        if(response.success){
            form.resetFields()
            triggerToSuccess()
        }
        setLoadingConfirm(false)
    }

    return (
        <div>
            <Alert  message="Permitira realizar impresiones termicas." type="info" showIcon />
            <Form
                form={form}
                className='pt-4'
                name="control-hooks"
                onFinish={onFinish}
                autoComplete='off'
                initialValues={{
                    name: printerSelected?.name ?? '',
                    controller: printerSelected?.controller ?? 'usb',
                    printer: printerSelected?.printer ?? '',
                    resource: printerSelected?.resource ?? 'COMMAND'
                }}
                layout='vertical'
            >
                <Row gutter={[24,8]}>
                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            label="Nombre"
                            className='m-0'
                            name="name"
                            validateFirst
                            rules={[{
                                required: true, message: 'Nombre requerido'
                            }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            label="Conexión"
                            className='m-0'
                            name="controller"
                            validateFirst
                            rules={[{required:true, message: 'Conexión requerida'}]}
                        >
                            <Select>
                                <Select.Option value="usb" key={'usb'}>USB</Select.Option>
                                <Select.Option value="network" key={'network'}>Network</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            label="Impresora"
                            className='m-0'
                            name="printer"
                            validateFirst
                            rules={[
                                {required: true, message: 'Impresora requerida'}
                            ]}
                        >
                            <Input  />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            label="Recurso"
                            className='m-0'
                            name="resource"
                            rules={[{required: true, message: 'Recurso requerido'}]}
                            validateFirst
                        >
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Seleccione Recursos"
                                options={[
                                    {label: 'Orden', value: 'COMMAND'},
                                    {label: 'Comprobante', value: 'VOUCHER'},
                                    {label: 'Todos', value: 'ALL'}
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item className='text-right'>
                    <Button type="primary" className='text-right mt-4' htmlType="submit" loading={loadingConfirm}>
                        {!printerSelected ? 'Registrar' : 'Editar'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

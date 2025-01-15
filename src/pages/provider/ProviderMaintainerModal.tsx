import { Alert, Button, Col, Form, Input, message, Modal, Row, Space } from 'antd'
import React from 'react'
import { ProviderMaintainerModalProps } from './ProviderProps'
import { providerRules } from './ProviderRules'
import { ProviderService } from '../../service/ProviderService'
import responseApi from '../../components/responseApi'
import { ProviderStoreModal } from '../../models/ProviderModel'

export default function ProviderMaintainerModal({
    open,
    setOpen,
    providerSelected,
    getProviderToBuy
}: ProviderMaintainerModalProps) {

    const [form] = Form.useForm()

    const onFinish = async (values: any) => {
        const service = ProviderService
        const params: ProviderStoreModal = {
            address: values.address,
            businessName: values.business_name,
            email: values.email ?? null,
            phone: values.phone,
            ruc: values.ruc,
            tradename: values.tradename
        }
        if (providerSelected) {
            await service.edit(params, providerSelected.id)
        }else{
            await service.store(params)
        }
        const response = service.getResponse()
        responseApi(response)
        if(response.success){
            getProviderToBuy(values.ruc)
            handleCancel()
        }
    }

    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <Modal
            title={providerSelected ? `Editar Proveedor: ${providerSelected.businessName}` : 'Registrar Proveedor'}
            open={open}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose={true}
        >
            <Alert  message="Permitira registrar sus compras y realizar orden de compra." type="info" showIcon />
            <Form
                form={form}
                className='pt-4'
                name="control-hooks"
                onFinish={onFinish}
                initialValues={{
                    ruc: providerSelected?.ruc,
                    business_name: providerSelected?.businessName,
                    tradename: providerSelected?.tradename,
                    address: providerSelected?.address,
                    email: providerSelected?.email,
                    phone: providerSelected?.phone
                }}
                layout='vertical'
            >
                <Row gutter={[24,8]}>
                    <Col span={8}>
                        <Form.Item
                            hasFeedback
                            label="Ruc"
                            className='m-0'
                            name="ruc"
                            validateFirst
                            rules={providerRules.ruc}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item
                            hasFeedback
                            label="Razón social"
                            className='m-0'
                            name="business_name"
                            validateFirst
                            rules={providerRules.businessName}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            hasFeedback
                            label="Nombre Comercial"
                            className='m-0'
                            name="tradename"
                            validateFirst
                            rules={providerRules.tradename}
                        >
                            <Input  />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            hasFeedback
                            label="Dirección"
                            className='m-0'
                            name="address"
                            validateFirst
                            rules={providerRules.address}
                        >
                            <Input  />
                        </Form.Item>
                    </Col>
                    <Col span={14}>
                        <Form.Item
                            hasFeedback
                            label="Correo"
                            className='m-0'
                            name="email"
                            validateFirst
                            rules={providerRules.email}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            hasFeedback
                            label="Telefono/Celular"
                            className='m-0'
                            name="phone"
                            validateFirst
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item className='text-right'>
                    <Button type="primary" className='text-right mt-4' htmlType="submit">
                        {!providerSelected ? 'Registrar' : 'Editar'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

import { Button, Col, Divider, Form, Input, Row, Select } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { RULE_REMISSION_GUIDE } from '../RemissionGuideRulesType'

type Props = {}

const FormDrivers = ({
    type
}) => {
    return (
        <>
            <Col span={4}>
                <Form.Item
                    label="Tipo de Documento"
                    name={`driver-${type}-document-type`}
                    className='m-0'
                    hasFeedback
                    validateFirst
                >
                    <Select
                        className='w-full'
                        options={[{value: 1, label: 'DNI'}]}
                    />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    label="Documento"
                    name={`driver-${type}-document`}
                    className='m-0'
                    hasFeedback
                    validateFirst
                    rules={type == 'principal' ? RULE_REMISSION_GUIDE.driverPrincipalDocument : []}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                    label="Nombre"
                    name={`driver-${type}-name`}
                    className='m-0'
                    hasFeedback
                    validateFirst
                    rules={type == 'principal' ? RULE_REMISSION_GUIDE.driverPrincipalName : []}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                    label="Apellidos"
                    name={`driver-${type}-last-name`}
                    className='m-0'
                    hasFeedback
                    validateFirst
                    rules={type == 'principal' ? RULE_REMISSION_GUIDE.driverPrincipalLastName : []}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    label="Licencia"
                    name={`driver-${type}-license`}
                    className='m-0'
                    hasFeedback
                    validateFirst
                    rules={type == 'principal' ? RULE_REMISSION_GUIDE.driverPrincipalLicense : []}
                >
                    <Input />
                </Form.Item>
            </Col>
        </>
    )
}

export default function PrivateTransport({ }: Props) {
    return (
        <>
            <Divider orientation="left" className='!m-0'>Chofer Principal</Divider>
            <FormDrivers key={1} type={'principal'} />
            <Divider orientation="left" className='!m-0'>Chofer Secundario</Divider>
            <FormDrivers key={2} type={'secundary'} />
            <Divider orientation="left" className='!m-0'>Vehiculos</Divider>
            <Col span={5}>
                <Form.Item
                    label="Placa Principal"
                    name={`vehicle-principal-plate`}
                    className='m-0'
                    hasFeedback
                    validateFirst
                    rules={RULE_REMISSION_GUIDE.vehiclePrincipalPlate}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item
                    label="Placa Secundaria"
                    name={`vehicle-secundary-plate`}
                    className='m-0'
                    hasFeedback
                    validateFirst
                >
                    <Input />
                </Form.Item>
            </Col>
        </>
    )
}

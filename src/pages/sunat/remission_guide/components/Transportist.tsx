import { Col, Form, Input, Row, Select } from 'antd'
import React from 'react'
import { RULE_REMISSION_GUIDE } from '../RemissionGuideRulesType'

type Props = {}

export default function Transportist({ }: Props) {
    return (
        <>
            <Col span={4}>
                <Form.Item
                    name={'transportist-document-type'}
                    label={'Tipo de Documento'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                >
                    <Select
                        className='w-full'
                        options={[{value: 6, label: 'RUC'}]}
                    />
                </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    name={'transportist-document'}
                    label={'Documento'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                    rules={RULE_REMISSION_GUIDE.transportistDocument}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col span={10}>
                <Form.Item
                    name={'transportist-business-name'}
                    label={'Razón Social'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                    rules={RULE_REMISSION_GUIDE.transportistBusinessName}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                    name={'transportist-registration-number'}
                    label={'Número matricula'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                    rules={RULE_REMISSION_GUIDE.transportistRegistrationNumber}
                >
                    <Input />
                </Form.Item>
            </Col>
        </>
    )
}

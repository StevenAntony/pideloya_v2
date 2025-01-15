import { Col, Form, Input, Select } from 'antd'
import React from 'react'
import { RULE_REMISSION_GUIDE } from '../RemissionGuideRulesType'

type Props = {
    buildOptionsSelec: (e: any[]) => any[];
    ubigeoDepartament: any[];
    provincesDeparture: any[];
    districtsDeparture: any[];
    provincesArrival: any[];
    districtsArrival: any[];
}

export default function Locations({
    buildOptionsSelec,
    ubigeoDepartament,
    provincesDeparture,
    districtsDeparture,
    provincesArrival,
    districtsArrival,
}: Props) {
    return (
        <>
            <Col span={5}>
                <Form.Item
                    name={'departure-department'}
                    label={'Departamento Partida'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                >
                    <Select
                        options={buildOptionsSelec(ubigeoDepartament)}
                    />
                </Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item
                    name={'departure-province'}
                    label={'Provincia Partida'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                >
                    <Select
                        options={buildOptionsSelec(provincesDeparture)}
                    />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                    name={'departure-district'}
                    label={'Distrito Partida'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                >
                    <Select
                        options={buildOptionsSelec(districtsDeparture)}
                    />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    name={'departure-address'}
                    label={'Dirección Partida'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                    rules={RULE_REMISSION_GUIDE.departureAddress}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item
                    name={'arrival-department'}
                    label={'Departamento Llegada'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                >
                    <Select
                        options={buildOptionsSelec(ubigeoDepartament)}
                    />
                </Form.Item>
            </Col>
            <Col span={5}>
                <Form.Item
                    name={'arrival-province'}
                    label={'Provincia Llegada'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                >
                    <Select
                        options={buildOptionsSelec(provincesArrival)}
                    />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item
                    name={'arrival-district'}
                    label={'Distrito Llegada'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                >
                    <Select
                        options={buildOptionsSelec(districtsArrival)}
                    />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item
                    name={'arrival-address'}
                    label={'Dirección Llegada'}
                    className='m-0'
                    hasFeedback
                    validateFirst
                    rules={RULE_REMISSION_GUIDE.departureAddress}
                >
                    <Input />
                </Form.Item>
            </Col>
        </>
    )
}

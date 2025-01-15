import { Alert, Button, Col, Form, Input, Modal, Row, Select, Switch } from 'antd'
import React, { useState } from 'react'
import { CompaniesMaintainerModalProps } from './CompaniesProps'
import { companiesRules } from './CompaniesRules'
import { CompanyService } from '../../../service/CompanyService'
import { CompanyModel } from '../../../models/CompanyModel'
import ubigeoDepartament from '../../../service/data/ubigeoDepartament.json'
import ubigeoProvince from '../../../service/data/ubigeoProvince.json'
import ubigeoDistric from '../../../service/data/ubigeoDistric.json'
import responseApi from '../../../components/responseApi'

const filterProvince = (departamentID: string) => ubigeoProvince.filter(value => value.department_id == departamentID)
const filterDistric = (provinceID: string) => ubigeoDistric.filter(value => value.province_id == provinceID)

export default function CompaniesMaintainerModal({
    companySelected,
    open,
    reload,
    setCompanySelected,
    setOpen
}: CompaniesMaintainerModalProps) {
    const [confirmFinish, setConfirmFinish] = useState<boolean>(false)
    const [provinces, setProvinces] = useState<any[]>(filterProvince(
        companySelected
        ? companySelected.ubigeo?.substring(0, 2) ?? ''
        : ubigeoDepartament[0].id
    ))
    const [districs, setDistrics] = useState<any[]>(filterDistric(
        companySelected
        ? companySelected.ubigeo?.substring(0, 4) ?? ''
        : ubigeoProvince[0].id
    ))
    const [form] = Form.useForm()

    const onFinish = async (values: any) => {
        setConfirmFinish(true)
        const service = CompanyService
        const params: CompanyModel = {
            address: values.address,
            betaBilling: values.betaBilling,
            businessName: values.businessName,
            demo: values.demo,
            email: values.email,
            key_sol: values.keySol,
            phone: values.phone,
            ruc: values.ruc,
            user_sol: values.userSol,
            plan: values.plan,
            url: values.url,
            activity: values.activity,
            tradename: values.tradename,
            departament: ubigeoDepartament.find(value => value.id == values.departament)?.name,
            province: ubigeoProvince.find(value => value.id == values.province)?.name,
            district: ubigeoDistric.find(value => value.id == values.distric)?.name,
            ubigeo: values.distric
        }
        if (companySelected) {
            await service.update(params, companySelected.id)
        }else{
            await service.store(params)
        }

        const response = service.getResponse()
        responseApi(response)
        if(response.success){
            reload()
            handleCancel()
        }
        setConfirmFinish(false)
    }


    const handleCancel = () => {
        setOpen(false)
    }

    return (
        <Modal
            title={companySelected ? `Editar Compañia: ${companySelected.businessName}` : 'Registrar Compañia'}
            open={open}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose={true}
            centered={true}
            width={900}

        >
            {/* <Alert  message="Permitira registrar sus compras y realizar orden de compra." type="info" showIcon /> */}
            <Form
                form={form}
                className='pt-4'
                name="control-hooks"
                autoComplete='off'
                onFinish={onFinish}
                initialValues={{
                    ruc: companySelected?.ruc ?? '',
                    businessName: companySelected?.businessName ?? '',
                    address: companySelected?.address ?? '',
                    url: companySelected?.url ?? '',
                    email: companySelected?.email ?? '',
                    phone: companySelected?.phone ?? '',
                    userSol: companySelected?.user_sol ?? '',
                    keySol: companySelected?.key_sol ?? '',
                    demo: companySelected?.demo ?? true,
                    betaBilling: companySelected?.betaBilling ?? true,
                    plan: companySelected ? companySelected.plan : 'pro',
                    activity: companySelected ? companySelected.activity : 'store',
                    departament: companySelected ? companySelected.ubigeo?.substring(0, 2) : ubigeoDepartament[0].id,
                    province: companySelected ? companySelected.ubigeo?.substring(0, 4) : provinces[0].id,
                    distric: companySelected ? companySelected.ubigeo : districs[0].id,
                    tradename: companySelected ? companySelected.tradename : ''
                }}
                onValuesChange={(changedValues, _) => {
                    if ('departament' in changedValues ) {
                        const listProvince = filterProvince(changedValues.departament)
                        const listDistric = filterDistric(listProvince[0].id)
                        setDistrics(listDistric)
                        setProvinces(listProvince)
                        form.setFieldsValue({
                            province: listProvince[0].id,
                            distric: listDistric[0].id
                        })
                    }

                    if ('province' in changedValues) {
                        const listDistric = filterDistric(changedValues.province)
                        setDistrics(listDistric)
                        form.setFieldsValue({
                            distric: listDistric[0].id
                        })

                    }
                }}
                layout='vertical'
            >
                <Row gutter={[24,8]}>
                    <Col span={4}>
                        <Form.Item
                            hasFeedback
                            label="Ruc"
                            className='m-0'
                            name="ruc"
                            validateFirst
                            rules={companiesRules.ruc}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            hasFeedback
                            label="Razón social"
                            className='m-0'
                            name="businessName"
                            validateFirst
                            rules={companiesRules.businessName}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            hasFeedback
                            label="Nombre Comercial"
                            className='m-0'
                            name="tradename"
                        >
                            <Input  />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            label="Departamento"
                            className='m-0'
                            name="departament"
                        >
                            <Select
                                options={ubigeoDepartament.map((value) => {
                                    return {
                                        value: value.id,
                                        label: value.name
                                    }
                                })}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            label="Provincia"
                            className='m-0'
                            name="province"
                        >
                            <Select
                                options={provinces.map((value) => {
                                    return {
                                        value: value.id,
                                        label: value.name
                                    }
                                })}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            label="Distrito"
                            className='m-0'
                            name="distric"
                        >
                            <Select
                                options={districs.map((value) => {
                                    return {
                                        value: value.id,
                                        label: value.name
                                    }
                                })}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Form.Item
                            hasFeedback
                            label="Dirección"
                            className='m-0'
                            name="address"
                            validateFirst
                            rules={companiesRules.address}
                        >
                            <Input  />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            hasFeedback
                            label="Url"
                            className='m-0'
                            name="url"
                            rules={[{required: true,type: 'url', message:'Url invalida, ejemplo https://ant.design' }]}
                            validateFirst
                        >
                            <Input  />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            hasFeedback
                            label="Correo"
                            className='m-0'
                            name="email"
                            validateFirst
                            rules={companiesRules.email}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
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
                    <Col span={4}>
                        <Form.Item
                            hasFeedback
                            label="Usuario Sol"
                            className='m-0'
                            name="userSol"
                            validateFirst
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            hasFeedback
                            label="Clave Sol"
                            className='m-0'
                            name="keySol"
                            validateFirst
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={3}>
                        <Form.Item
                            hasFeedback
                            label="App Demo"
                            className='m-0'
                            name="demo"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            hasFeedback
                            label="Facturación Beta"
                            className='m-0'
                            name="betaBilling"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            label="Plan"
                            name="plan"
                        >
                            <Select>
                                <Select.Option value="basic">Basico</Select.Option>
                                <Select.Option value="normal">Normal</Select.Option>
                                <Select.Option value="pro">Profesional</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                            label="Actividad"
                            name="activity"
                        >
                            <Select>
                                <Select.Option value="store" >Tienda</Select.Option>
                                <Select.Option value="restaurant">Restaurante</Select.Option>
                                <Select.Option value="distributor">Distribuidores</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item className='text-right'>
                    <Button type="primary" loading={confirmFinish} className='text-right mt-4' htmlType="submit">
                        {!companySelected ? 'Registrar' : 'Editar'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

import React, { useEffect, useState } from 'react'
import { SeriesModel, SeriesStoreOrUpdatedRequest } from '../../../models/SeriesModel';
import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import { VoucherModel } from '../../../models/VoucherModel';
import SeriesService from '../../../service/maintairner/SeriesService';
import responseApi from '../../../components/responseApi';

type Props = {
    seriesSelected: SeriesModel|null;
    triggerToSuccess: () => void;
    vouchers: VoucherModel[];
}

export default function SeriesForm({
    seriesSelected,
    triggerToSuccess,
    vouchers
}: Props) {
    const [loadingConfirm, setLoadingConfirm] = useState<boolean>(false)
    const [serie, setSerie] = useState<string>('1')
    const [form] = Form.useForm()
    const [pattern, setPattern] = useState<any>(/^B[A-Za-z0-9]{3}$/)
    const [patternMessage, setPatternMessage] = useState<string>('La serie debe iniciar con B y tener 3 carácter')

    const onFinish = async (values: any) => {
        setLoadingConfirm(true)
        const service = new SeriesService
        const params: SeriesStoreOrUpdatedRequest = {
            nameSeries: values.series,
            correlative: values.correlative
        }
        if (seriesSelected) {
        }else{
            await service.store(params, values.voucherID)
        }
        const response = service.getResponse()
        responseApi(response)
        if(response.success){
            form.resetFields()
            triggerToSuccess()
        }
        setLoadingConfirm(false)
    }

    useEffect(() => {
        form.resetFields(['series'])
        if (serie == '1') {
            setPattern(/^B[A-Za-z0-9]{3}$/)
            setPatternMessage('La serie debe iniciar con B y tener 3 carácter más')
        }

        if (serie == '2') {
            setPattern(/^F[A-Za-z0-9]{3}$/)
            setPatternMessage('La serie debe iniciar con F y tener 3 carácter más')
        }

        if (serie == '3') {
            setPattern(/^0[A-Za-z0-9]{3}$/)
            setPatternMessage('La serie debe iniciar con 0 y tener 3 carácter más')
        }

        if (serie == '4') {
            setPattern(/^T[A-Za-z0-9]{3}$/)
            setPatternMessage('La serie debe iniciar con T y tener 3 carácter más')
        }

        if (serie == '5') {
            setPattern(/^[BF][A-Za-z0-9]{3}$/)
            setPatternMessage('La serie debe iniciar con F o B y tener 3 carácter más')
        }
    }, [serie])

    return (
        <div>
            <Form
                form={form}
                className='pt-4'
                name="control-hooks"
                onFinish={onFinish}
                autoComplete='off'
                initialValues={{
                }}
                layout='vertical'
            >
                <Row gutter={[24,8]}>
                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            label="Comprobante"
                            className='m-0'
                            name="voucherID"
                            validateFirst
                            rules={[{required:true, message: 'Comprobante requerida'}]}
                        >
                            <Select placeholder="Seleccione Comprobante"  onChange={(value) => setSerie(value)}>
                                {
                                    vouchers.map((voucher) => (
                                        <Select.Option value={voucher.id} disabled={!voucher.active} key={voucher.id}>{voucher.name}</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            label="Serie"
                            className='m-0'
                            name="series"
                            validateFirst
                            rules={[
                                {required: true, message: 'Nombre requerido'},
                                {
                                    pattern: new RegExp(pattern),
                                    message: patternMessage,
                                  },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            hasFeedback
                            label="Correlativo"
                            className='m-0'
                            name="correlative"
                            validateFirst
                            rules={[
                                {required: true, message: 'Correlativo requerida'}
                            ]}
                        >
                            <InputNumber className='w-full' min={1} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item className='text-right'>
                    <Button type="primary" className='text-right mt-4' htmlType="submit" loading={loadingConfirm}>
                        {!seriesSelected ? 'Registrar' : 'Editar'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

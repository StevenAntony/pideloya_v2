import React, { useEffect, useState } from 'react'
import { Typography, Button, Row, Col, Card, Statistic, Select } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons'
import { useMovementContext } from '@hooks/page/management/useMovementContext'
import FormatCurrency from '@helpers/FormatCurrency'
import Authorized from '@components/Authorized'
import { MOVEMENT_ACTIONS } from '@constants/authorized'
import AuthorizedButton from '@components/app/button/AuthorizedButton'

const { Title } = Typography
const { Option } = Select

const MovementHead = () => {
    const { isMovements, isCashes, selectedCash, setSelectedCash, setOpenFormModal } = useMovementContext()

    const [totalIngress, setTotalIngress] = useState(FormatCurrency.formatCurrency(0))
    const [totalEgress, setTotalEgress] = useState(FormatCurrency.formatCurrency(0))

    const getTotalIngress = () => {
        const draft = isMovements
            .filter(obj => obj.type == 'Ingreso' && obj.status === 1)
            .reduce((acumulador, obj) => acumulador + Number(obj.amount), 0)
        return FormatCurrency.formatCurrency(draft)
    }

    const getTotalEgress = () => {
        const draft = isMovements
            .filter(obj => obj.type == 'Egreso' && obj.status === 1)
            .reduce((acumulador, obj) => acumulador + Number(obj.amount), 0)
        return FormatCurrency.formatCurrency(draft)
    }

    useEffect(() => {
        setTotalIngress(getTotalIngress())
        setTotalEgress(getTotalEgress())
    }, [isMovements])

    return (
        <>
            <div className='w-full px-20 py-8 bg-[#f0f2f5]'>
                <Authorized title="Resultado Ingreso & Egreso" action={MOVEMENT_ACTIONS.list}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card bordered={false}>
                                <Statistic
                                    title={<Title level={3}>Ingresos</Title>}
                                    value={totalIngress}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600', fontWeight: 'bold' }}
                                    prefix={<><ArrowUpOutlined /></>}
                                />
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card bordered={false}>
                                <Statistic
                                    title={<Title level={3}>Egresos</Title>}
                                    value={totalEgress}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322', fontWeight: 'bold' }}
                                    prefix={<><ArrowDownOutlined /></>}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Authorized>
            </div>
            <div className="p-8 flex justify-between ">
                <Title level={3}>Movimientos</Title>
                <Select
                    value={selectedCash?.cashID}
                    disabled={!(isCashes.length > 0)}
                    onChange={(value) => {
                        setSelectedCash(isCashes.find(obj => obj.cashID == value) ?? null)
                    }}
                    placeholder="Seleccione Caja"
                >
                    {
                        isCashes.map(obj => <Option key={obj.cashID} value={obj.cashID}>{obj.cashCode} - {obj.openingDate} : {obj.userName}</Option>)
                    }
                </Select>
                <div>
                    <AuthorizedButton
                        action={MOVEMENT_ACTIONS.create}
                        onClick={() => setOpenFormModal(true)}
                        type='primary'
                        disabled={isCashes.length === 0}
                    >
                        <PlusOutlined /> Agregra
                    </AuthorizedButton>
                </div>
            </div>
        </>
    )
}

export default MovementHead

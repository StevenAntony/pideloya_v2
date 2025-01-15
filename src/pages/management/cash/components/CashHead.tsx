import React from 'react'
import { Typography , Row, Col, Card, Statistic } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined, PlusOutlined } from '@ant-design/icons'
import { CASH_ACTIONS, } from '@constants/authorized'
import AuthorizedButton from '@components/app/button/AuthorizedButton'
import { useCashContext } from '../hooks/useCashContext'

const { Title } = Typography

const CashHead = () => {

    const { setOpenFormModal } = useCashContext()

    return (
        <>
            <div className='w-full bg-[#f0f2f5]'>
                <Row gutter={16} className='hidden'>
                    <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title={<Title level={3}>Ingresos</Title>}
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: '#3f8600', fontWeight: 'bold' }}
                            prefix={<><ArrowUpOutlined /> S/</>}
                        />
                    </Card>
                    </Col>
                    <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title={<Title level={3}>Egresos</Title>}
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: '#cf1322', fontWeight: 'bold' }}
                            prefix={<><ArrowDownOutlined /> S/</>}
                        />
                    </Card>
                    </Col>
                </Row>
            </div>
            <div className="px-4 pb-1 flex justify-between ">
                {/* <Title level={3}>Caja</Title> */}
                <div></div>
                <div>
                    <AuthorizedButton
                        action={CASH_ACTIONS.open}
                        onClick={() => setOpenFormModal(true)}
                        type='primary'
                    >
                        <PlusOutlined /> Aperturar
                    </AuthorizedButton>
                </div>
            </div>
        </>
    )
}

export default CashHead

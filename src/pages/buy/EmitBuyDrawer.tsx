import React, { useEffect, useState } from 'react'
import { Drawer, message, Steps, Button } from 'antd'
import { cashCurrentStorage } from '../../../helpers/LocalStorage'
import SaleService from '../../service/SaleService'
import DetailBuy from './step/DetailBuy'
import DocumentBuy from './step/DocumentBuy'
import { BuyStoreModel } from '../../models/BuyModel'
import { FORM_TYPE } from './BuyInterface'
import { ProviderModel } from '../../models/ProviderModel'
import { BuyService } from '../../service/BuyService'
import TryValidationRequest from '../../components/validations/TryValidationRequest'

const EmitBuyDrawer = ({
    open,
    setOpen,
    products,
    information,
    getBuys
}) => {
    const [messageApi, contextHolder] = message.useMessage()
    const [detailsBuy, setDetailsBuy] = useState([])
    const [payments, setPayments] = useState([])
    const [disabledEmit, setDisabledEmit] = useState(true)
    const [providerSelected, setProviderSelected] = useState<ProviderModel|null>(null)
    const [ isForm, setForm ] = useState<FORM_TYPE|null>(null)
    const [current, setCurrent] = useState(0)

    const { getCash } = cashCurrentStorage()

    const steps = [
        {
            title: 'Detalle',
            content: <DetailBuy
                detailsBuy={detailsBuy}
                setDetailsBuy={setDetailsBuy}
                isProducts={products}
            />,
        },
        {
            title: 'Documento',
            content: <DocumentBuy
                detailsBuy={detailsBuy}
                information={information}
                payments={payments}
                setDisabledEmit={setDisabledEmit}
                setFormSend={setForm}
                setPayments={setPayments}
                setProviderSelected={setProviderSelected}
                providerSelected={providerSelected}
            /> ,
        }
    ]

    const next = () => {
        if(!(current + 1 == 1 && detailsBuy.length > 0)){
            message.info('Minimo debe agregar un producto!')
            return;
        }
        setCurrent(current + 1)
    }

    const prev = () => {
        setCurrent(current - 1)
    }

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }))

    const onClose = () => {

        setCurrent(0)
        setDetailsBuy([])
        setPayments([])
        setOpen(false)
    }

    const onClickEmit = async () => {

        const params: BuyStoreModel = {
            correlative: isForm?.correlative ?? 0,
            issue: isForm?.issue,
            providerAddress: providerSelected?.address ?? '',
            providerID: providerSelected?.id ?? 0,
            providerName: providerSelected?.businessName ?? '',
            providerRuc: providerSelected?.ruc ?? '',
            serieName: isForm?.serie ?? '',
            typeDocument: isForm?.typeDocument ?? '',
            cashID: getCash().id,
            payments: payments.map((obj: any) => {
                return {
                    amount: obj.amount,
                    paymentMethodID: obj.paymentMethodID,
                    cashID: getCash().id
                }
            }) ,
            details: detailsBuy.map((obj: any) => {
                return {
                    description: obj.description,
                    presentationID: obj.idPresentation,
                    price: obj.amount,
                    quantity: obj.quantity,
                    typeAfeIgv: 'Gravado',
                    note: obj.note
                }
            })
        }

        const service = BuyService
        await service.store(params)
        const response = service.getResponse()

        if (response.success) {
            messageApi.open({
                type: 'success',
                content: response.message,
            })
            getBuys()
            onClose()
        } else {
            messageApi.open({
                type: 'error',
                content: response.code == 422 ? <TryValidationRequest  validations={response.data} /> : response.message,
            })
        }
    }

    return (
        <Drawer
            title={'Registrar Compra'}
            className='!w-[1300px]'
            onClose={onClose}
            destroyOnClose={true}
            maskClosable={false}
            open={open}
            styles={{
                body: {
                    paddingBottom: 80
                },
            }}
            placement='left'
        >
            {contextHolder}
            <Steps current={current} items={items} />
            <div className='min-h-[260px] bg-[--bg-app-50] border-dashed border mt-4 rounded-md'>{steps[current].content}</div>
            <div
                style={{
                marginTop: 24,
                }}
            >
                {current > 0 && (
                    <Button
                        style={{
                        margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        Anterior
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Siguiente
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" disabled={disabledEmit} onClick={onClickEmit}>
                        Emitir Compra
                    </Button>
                )}
            </div>
        </Drawer>
    )
}

export default EmitBuyDrawer

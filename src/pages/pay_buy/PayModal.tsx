import { Button, InputNumber, message, Modal, Select } from 'antd'
import React, { useState } from 'react'
import { PayModelInterface } from './PayBuyInterface'
import ItemPaymentSale from '../../components/list/ItemPaymentSale'
import { BuyService } from '../../service/BuyService'
import { cashCurrentStorage } from '../../../helpers/LocalStorage'
import responseApi from '../../components/responseApi'

export default function PayModal({
    open,
    setOpen,
    buySelected,
    information,
    payments,
    setPayments,
    reload
}: PayModelInterface) {
    const [methodsID, setMethodsID] = useState<number>(information?.paymentMethods ? information?.paymentMethods[0].paymentMethodID : null)
    const [amount, setAmount] = useState<number>(1)

    const { getCash } = cashCurrentStorage()

    const totalAmountDraft = payments.reduce(function (total, payment) {
        return total + payment.amount
    }, 0)

    const handleAddPaymentToSale = () => {
        if (amount <= 0) return;
        const amountDebit = buySelected.amountDebit ?? 0
        if ((amountDebit  - totalAmountDraft) <= 0) return;
        const modePayment = information?.paymentMethods.find(obj => obj.paymentMethodID === methodsID)

        const draftPayments = [...payments]

        const posMethodExists = draftPayments.findIndex(obj => obj.paymentMethodID == methodsID)

        if (posMethodExists > -1) {
            draftPayments[posMethodExists].amount += amount
        } else {
            draftPayments.push({
                paymentMethodID: methodsID,
                amount: amount,
                ...modePayment
            })
        }

        setPayments(draftPayments)
    }

    const removeToPayment = (index) => {
        const draftPayments = [...payments]
        draftPayments.splice(index, 1)
        setPayments(draftPayments)
    }

    const onSendPayment =async () => {
        const service = BuyService
        await service.payDebt({
            payments : payments.map(obj => {
                return {
                    amount: obj.amount,
                    methodID: obj.paymentMethodID,
                    cashID: getCash().id
                }
            })
        }, buySelected.id)
        const response = service.getResponse()
        responseApi(response)
        if (response.success) {
            setOpen(false)
            setPayments([])
            reload()
        }
    }

    return (
        <Modal
            title={`Realizar pago: ${buySelected.document}`}
            open={open}
            onOk={onSendPayment}
            onCancel={() => setOpen(false)}
            confirmLoading={false}
        >
            <div>
                <div className="flex flex-wrap gap-y-4">
                    <div className="w-full">
                        <Select
                            className="w-full"
                            placeholder="Elegir medio de pago"
                            onChange={(value) => setMethodsID(value)}
                            options={information?.paymentMethods.filter(item => item.type != 'Cre').map(obj => {
                                return {
                                    value: obj.paymentMethodID,
                                    label: obj.name
                                }
                            })}
                            value={methodsID}
                        />
                    </div>
                    <div className="w-6/12" >
                        <InputNumber
                            addonBefore={<span className="px-1">S/</span>}
                            value={amount}
                            onChange={(value) => setAmount(value ?? 0)}
                            min={1}
                            max={buySelected.amountDebit}
                        />
                    </div>
                    <div className="w-6/12">
                        <Button
                            onClick={handleAddPaymentToSale}
                            className="bg-blue-600 !text-white w-full">
                            Agregar Pago
                        </Button>
                    </div>
                </div>
                <div className="w-full">
                    {
                        payments.map((obj, index) => (
                            <ItemPaymentSale
                                payment={obj}
                                index={index}
                                key={index}
                                removeToPayment={removeToPayment}
                            />
                        ))
                    }
                </div>
            </div>
        </Modal>
    )
}

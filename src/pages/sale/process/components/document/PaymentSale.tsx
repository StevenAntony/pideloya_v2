import { uuid } from '@helpers/uuid'
import { useSaleContext } from '@pages/sale/process/hooks/useSaleContext'
import { Button, Divider, InputNumber, Select } from 'antd'
import React, { useEffect, useState } from 'react'

type Props = {}

export default function PaymentSale({ }: Props) {

    const {
        informationInSale,
        isInformation,
        totalPayment,
        totalProductsInSale,
        setInformationInSale,
        productsInSale
    } = useSaleContext()

    const [disabledAmountPayment, setDisabledAmountPayment] = useState<boolean>(false)
    const [paymentMethodID, setPaymentMethodID] = useState<number|null>(null)
    const [amountPayment, setAmountPayment] = useState<number>(0)

    const onChangePeymentMethods = (value: any) => {
        const paymentMethod = isInformation.paymentMethods.find(obj => obj.paymentMethodID == value)
        if (paymentMethod) {
            setDisabledAmountPayment(['Crédito', 'Credito'].includes(paymentMethod.name))
            setPaymentMethodID(value)
        }
    }

    const handleAddPaymentInSale = () => {
        const creditExists = informationInSale.payments.find(obj => ['Crédito', 'Credito'].includes(obj.name))

        if (creditExists) return;
        if (amountPayment <= 0) return;
        if (!paymentMethodID) return
        if ((totalProductsInSale - totalPayment) <= 0) return;

        const modePayment = isInformation.paymentMethods.find(obj => obj.paymentMethodID === paymentMethodID)
        if (!modePayment) return

        const draftPayments = [...informationInSale.payments]

        const posMethodExists = draftPayments.findIndex(obj => obj.paymentMethodID == paymentMethodID)

        if (posMethodExists > -1) {
            draftPayments[posMethodExists].amount += amountPayment
        } else {
            draftPayments.push({
                paymentMethodID: paymentMethodID,
                amount: amountPayment,
                abbreviation: modePayment.abbreviation,
                paymentID: uuid(),
                name: modePayment.name
            })
        }

        setInformationInSale('payments', draftPayments)
    }

    useEffect(() => {
        setAmountPayment(Number(Number(totalProductsInSale - totalPayment).toFixed(2)))
    }, [productsInSale, informationInSale])

    useEffect(() => {
        setPaymentMethodID(isInformation.paymentMethods[0].paymentMethodID)
    }, [])

    return (
        <div>
            <div className="flex flex-wrap">
                <Divider orientation="left" orientationMargin="0">Pagos</Divider>
                <div className="w-4/12 pr-2">
                    <Select
                        className="w-full"
                        placeholder="Elegir medio de pago"
                        onChange={onChangePeymentMethods}
                        options={isInformation.paymentMethods.map(obj => {
                            return {
                                value: obj.paymentMethodID,
                                label: obj.name
                            }
                        })}
                        value={paymentMethodID}
                    />
                </div>
                <div className="w-4/12 pr-2" >
                    <InputNumber
                        addonBefore={<span className="px-1">S/</span>}
                        value={amountPayment}
                        disabled={disabledAmountPayment}
                        onChange={(value) => setAmountPayment(value ?? 0)}
                        min={0}
                    />
                </div>
                <div className="w-4/12">
                    <Button
                        onClick={handleAddPaymentInSale}
                        className="bg-blue-600 !text-white w-full">
                        Agregar Pago
                    </Button>
                </div>
            </div>
        </div>
    )
}

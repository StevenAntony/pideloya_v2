import { Modal, InputNumber, Select, Button, message } from 'antd'
import { useEffect, useState } from 'react'
import ItemPaymentSale from '@components/list/ItemPaymentSale'
import SaleService from '@services/SaleService'
import { cashCurrentStorage } from '@helpers/LocalStorage'

const CollectModal = ({
    openModal,
    setOpenModal,
    confirmLoading,
    setConfirmLoading,
    information,
    payments,
    setPayments,
    dataSale,
    getSales
}) => {

    const [methodsID, setMethodsID] = useState(information?.paymentMethods ? information?.paymentMethods[0].id : null)
    const [amount, setAmount] = useState(1)
    const [serieID, setSerieID] = useState(null)

    const [series, setSeries] = useState([])

    const { getCash } = cashCurrentStorage()

    const totalAmountDraft = payments.reduce(function (total, payment) {
        return total + payment.amount
    }, 0)

    const removeToPayment = (index) => {
        const draftPayments = [...payments]
        draftPayments.splice(index, 1)
        setPayments(draftPayments)
    }

    const handleAddPaymentToSale = () => {
        if (amount <= 0) return;
        if ((dataSale?.amountDebit - totalAmountDraft) <= 0) return;
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

    const onSendPayment =async () => {
        setConfirmLoading(true)
        const response = await SaleService.payDebt({
            payments : payments.map(obj => {
                return {
                    amount: obj.amount,
                    methodID: obj.paymentMethodID,
                    cashID: getCash().id
                }
            }),
            serieID: serieID
        }, dataSale?.saleID)
        if (response.success) {
            message.success(response.message)
            setOpenModal(false)
            setPayments([])
            getSales()
        }else{
            message.error(response.message)
        }
        setConfirmLoading(false)
    }

    useEffect(() => {
        if (dataSale) {
            setAmount(dataSale.amountDebit)
        }
    }, [dataSale])

    useEffect(() => {
        if (information) {
            const seriesDraft = information?.vouchersSeries.find(item => item.type.toUpperCase() == dataSale.voucherToCancel)
            setSeries(seriesDraft ? seriesDraft.series : [])
            setSerieID(seriesDraft ? seriesDraft.series[0].id : null)
            setMethodsID(information?.paymentMethods[0].paymentMethodID)
        }
    }, [information])

    return (
        <Modal
            title={`Realizar pago: ${dataSale?.document}`}
            open={openModal}
            onOk={onSendPayment}
            onCancel={() => setOpenModal(false)}
            confirmLoading={confirmLoading}
        >
            <div>
                <div className="flex flex-wrap gap-y-4">
                    {
                        dataSale?.voucherToCancel && dataSale?.amountDebit == amount && (
                            <div className="w-full border-b pb-4">
                                <div>Comprobante a generar</div>
                                <Select
                                    className="w-full"
                                    placeholder="Seleccione la serie a generar"
                                    onChange={(value) => setSerieID(value)}
                                    options={series.map(obj => {
                                        return {
                                            value: obj.id,
                                            label: obj.name
                                        }
                                    })}
                                    value={serieID}
                                />
                            </div>
                        )
                    }
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
                            max={dataSale?.amountDebit}
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

export default CollectModal

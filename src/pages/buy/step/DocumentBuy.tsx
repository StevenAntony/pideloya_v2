import React from "react"
import FormatCurrency from "../../../../helpers/FormatCurrency"
import { Button, Divider, InputNumber, Dropdown, Select, message, Input, DatePicker } from "antd"
import { useEffect, useState } from "react"
import ItemPaymentSale from "../../../components/list/ItemPaymentSale"
import { PlusOutlined, EditOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { ProviderService } from "../../../service/ProviderService"
import { ProviderModel } from "../../../models/ProviderModel"
import ProviderMaintainerModal from "../../provider/ProviderMaintainerModal"
import dayjs from 'dayjs'
import { FORM_TYPE } from "../BuyInterface"

const dateFormat = 'YYYY/MM/DD'

const DocumentBuy = ({
    information,
    payments,
    setPayments,
    detailsBuy,
    setFormSend,
    setDisabledEmit,
    setProviderSelected,
    providerSelected
}) => {
    const currentDate = new Date()

    const INIT_FORM = {
        amountPayment: 0,
        providerID: null,
        paymentMethodID: information.paymentMethods ? information.paymentMethods[0].paymentMethodID : null,
        serie: '',
        correlative: 1,
        typeDocument: 'Factura',
        issue: currentDate.toISOString().split('T')[0]
    }

    const [openModalProvider, setOpenModalProvider] = useState(false)
    const [isProviders, setProviders] = useState<ProviderModel[]>([])
    const [isLoadingSearch, setLoadingSearch] = useState(false)
    const [isForm, setForm] = useState<FORM_TYPE>(INIT_FORM)
    const [totalDetail, setTotalDetails] = useState(0)
    const [disabledAmountPayment, setDisabledAmountPayment] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()

    const items = [
        {
            label: 'Editar',
            key: '1',
            icon: <EditOutlined />,
        }
    ]

    const menuProps = {
        items,
        onClick: (key) => {
            setOpenModalProvider(true)
        },
    };

    const totalAmountDraft = payments.reduce(function (total, payment) {
        return total + payment.amount
    }, 0)

    const totalDetailDraft = detailsBuy.reduce(function (total, detail) {
        return total + (detail.quantity * detail.amount)
    }, 0)

    const getProviderToBuy = async (search) => {
        setLoadingSearch(true)
        const service = ProviderService
        await service.listToBuy(search)
        const providersDraft = service.getProviders()

        setProviders(providersDraft)
        if (providersDraft.length === 1) {
            setForm({
                ...isForm,
                providerID: providersDraft[0].id,
                amountPayment: totalDetailDraft - totalAmountDraft
            })

            setProviderSelected(providersDraft[0])
        }
        setLoadingSearch(false)
    }

    const onSearchProviders = (value) => {
        if (value.length > 4) {
            const searchLocal = isProviders.filter(obj =>
                obj.businessName.toLowerCase().includes(value.toLowerCase()) ||
                obj.ruc.toLowerCase() == value.toLowerCase()
            )

            if (isProviders.length === 0 || searchLocal.length === 0) {
                getProviderToBuy(value)
            } else {
                setProviders(searchLocal)
            }
        }
    }

    const handleAddPaymentToSale = () => {
        const creditExists = payments.find(obj => ['Crédito', 'Credito'].includes(obj.name))
        if (creditExists) return;
        if (isForm.amountPayment <= 0) return;
        if ((totalDetailDraft - totalAmountDraft) <= 0) return;
        const modePayment = information.paymentMethods.find(obj => obj.paymentMethodID === isForm.paymentMethodID)

        const draftPayments = [...payments]

        const posMethodExists = draftPayments.findIndex(obj => obj.paymentMethodID == isForm.paymentMethodID)

        if (posMethodExists > -1) {
            draftPayments[posMethodExists].amount += isForm.amountPayment
        } else {
            draftPayments.push({
                paymentMethodID: isForm.paymentMethodID,
                amount: isForm.amountPayment,
                ...modePayment
            })
        }

        setPayments(draftPayments)
    }

    const onChangePeymentMethods = (value) => {
        const paymentMethod = information.paymentMethods.find(obj => obj.paymentMethodID == value)
        setDisabledAmountPayment(['Crédito', 'Credito'].includes(paymentMethod.name))
        setForm({
            ...isForm,
            paymentMethodID: value
        })
    }

    const removeToPayment = (index) => {
        const draftPayments = [...payments]
        draftPayments.splice(index, 1)
        setPayments(draftPayments)
    }

    useEffect(() => {
        setForm({
            ...isForm,
            amountPayment: totalDetailDraft - totalAmountDraft
        })

        getProviderToBuy('P0000000001')
        setTotalDetails(totalDetailDraft)
    }, [])

    useEffect(() => {
        const pending = totalDetailDraft - totalAmountDraft

        setDisabledEmit(pending > 0)
        setForm({
            ...isForm,
            amountPayment: pending <= 0 ? 0 : pending
        })
    }, [payments])

    useEffect(() => {
        setFormSend({ ...isForm })
    }, [isForm])

    return (
        <>
            {contextHolder}
            <div className="flex flex-wrap pb-10">
                <div className="w-full text-center py-5">
                    <p className="text-4xl font-black">{FormatCurrency.formatCurrency(totalDetail)}</p>
                </div>
                <div className="w-6/12 px-10 modal-select-product">
                    <div className="bg-white p-5 h-full">
                        <Divider orientation="left" orientationMargin="0">Documento</Divider>
                        <div className="flex flex-wrap gap-y-4 justify-between">
                            <div className="w-6/12 pr-1">
                                <label htmlFor="serie">Documento</label>
                                <Select
                                    options={[
                                        {
                                            label: 'Boleta',
                                            value: 'Boleta'
                                        },
                                        {
                                            label: 'Factura',
                                            value: 'Factura'
                                        }
                                    ]}
                                    className="w-full"
                                    value={isForm.typeDocument}
                                    onChange={(value) => setForm({
                                        ...isForm,
                                        typeDocument: value
                                    })}
                                />
                            </div>
                            <div className="w-6/12">
                                <label htmlFor="serie">Serie</label>
                                <Input
                                    maxLength={4}
                                    value={isForm.serie}
                                    onChange={(e) => setForm({
                                        ...isForm,
                                        serie: e.target.value
                                    })}
                                    placeholder="F001"
                                />
                            </div>
                            <div className="w-6/12 pr-1">
                                <label htmlFor="correlative" className="w-full">Correlativo</label>
                                <InputNumber
                                    className="w-full"
                                    value={isForm.correlative}
                                    min={1}
                                    onChange={(value) => setForm({
                                        ...isForm,
                                        correlative: Number(value)
                                    })}
                                    placeholder="1"
                                />
                            </div>
                            <div className="w-6/12">
                                <label htmlFor="correlative" className="w-full">Fecha</label>
                                <DatePicker
                                    className="w-full"
                                    onChange={(value, dateString) => setForm({
                                        ...isForm,
                                        issue: dateString
                                    })}
                                    value={dayjs(isForm.issue, dateFormat)}
                                    placeholder="1"
                                />
                            </div>
                            <div className="flex flex-wrap w-full">
                                <Select
                                    className="flex-1"
                                    showSearch
                                    placeholder="Elegir un proveedor"
                                    loading={isLoadingSearch}
                                    optionFilterProp="children"
                                    onChange={(value) => {
                                        const provider = isProviders.find(obj => obj.id == value)
                                        setProviderSelected(provider)
                                        setForm({
                                            ...isForm,
                                            providerID: value
                                        })
                                    }}
                                    filterOption={false}
                                    onSearch={onSearchProviders}
                                    options={isProviders.map(obj => {
                                        return {
                                            value: obj.id,
                                            label: `${obj.ruc} - ${obj.businessName} : ${obj.address}`
                                        }
                                    })}
                                    value={isForm.providerID == null ? null : isForm.providerID}
                                />
                                <Dropdown.Button
                                    className="w-auto"
                                    type="primary"
                                    menu={menuProps}
                                    onClick={() => {
                                        setForm({
                                            ...isForm,
                                            providerID: null
                                        })
                                        setProviderSelected(null)
                                        setOpenModalProvider(true)
                                    }}
                                >
                                    <PlusOutlined />
                                </Dropdown.Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-6/12 px-10">
                    <div className="flex flex-wrap gap-y-4">
                        <div className="w-full flex flex-wrap p-5 gap-y-4 bg-white">
                            <Divider orientation="left" orientationMargin="0">Pagos</Divider>
                            <div className="w-full">
                                <Select
                                    className="w-full"
                                    placeholder="Elegir medio de pago"
                                    onChange={onChangePeymentMethods}
                                    options={information.paymentMethods.map(obj => {
                                        return {
                                            value: obj.paymentMethodID,
                                            label: obj.name
                                        }
                                    })}
                                    value={isForm.paymentMethodID}
                                />
                            </div>
                            <div className="w-6/12" >
                                <InputNumber
                                    addonBefore={<span className="px-1">S/</span>}
                                    value={isForm.amountPayment}
                                    disabled={disabledAmountPayment}
                                    onChange={(value) => setForm({
                                        ...isForm,
                                        amountPayment: value ?? 0
                                    })}
                                    min={0}
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
                        <div className={`
                            ${totalAmountDraft - totalDetailDraft < 0 ? 'bg-rose-500' : (
                                totalAmountDraft - totalDetailDraft == 0 ? 'bg-blue-600' : 'bg-emerald-600'
                            )}
                            px-4 py-1 w-full flex rounded text-white font-bold justify-between
                        `}>
                            <span>Debo:</span> <span>{FormatCurrency.formatCurrency(totalDetailDraft - totalAmountDraft)}</span>
                        </div>
                    </div>
                </div>
            </div>
            {
                openModalProvider
                ? <ProviderMaintainerModal
                    providerSelected={providerSelected}
                    open={openModalProvider}
                    setOpen={setOpenModalProvider}
                    setProviderSelected={setProviderSelected}
                    getProviderToBuy={getProviderToBuy}
                /> : null
            }
        </>
    )
}

export default DocumentBuy

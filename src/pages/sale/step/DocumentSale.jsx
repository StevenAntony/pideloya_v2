import FormatCurrency from "../../../../helpers/FormatCurrency"
import { Button, Divider, InputNumber, Dropdown, Select, message, Switch, Tooltip } from "antd"
import { useEffect, useState } from "react"
import CustomerService from "../../../service/CustomerService"
import ItemPaymentSale from "../../../components/list/ItemPaymentSale"
import { PlusOutlined, EditOutlined, UserSwitchOutlined } from '@ant-design/icons'
import CustomerMaintainerModal from "../../customer/CustomerMaintainerModal"
import { ContactSupportOutlined } from "@mui/icons-material"

const DocumentSale = ({
    information,
    payments,
    setPayments,
    detailsSale,
    setFormSend,
    setDisabledEmit
}) => {
    const INIT_FORM = {
        amountPayment: 0,
        customerID: null,
        paymentMethodID: information.paymentMethods ? information.paymentMethods[0].id : null,
        seriesID: information.vouchersSeries ? information.vouchersSeries[2].series[0].id : null,
        voucherToCancel: 'FACTURA',
        activeVoucherToCancel: false,
        additional: 0
    }

    const [openModalCustomer, setOpenModalCustomer] = useState(false)
    const [isCustomers, setCustomers] = useState([])
    const [isLoadingSearch, setLoadingSearch] = useState(false)
    const [isForm, setForm] = useState(INIT_FORM)
    const [totalDetail, setTotalDetails] = useState(0)
    const [additional, setAdditional] = useState(0)
    const [disabledAmountPayment, setDisabledAmountPayment] = useState(false)

    const [editCutomer, setEditCustomer] = useState(null)
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
            setEditCustomer(isForm.customerID)
            setOpenModalCustomer(true)
        },
    };

    const totalAmountDraft = payments.reduce(function (total, payment) {
        return total + payment.amount
    }, 0)

    const totalDetailDraft = detailsSale.reduce(function (total, detail) {
        return total + (detail.quantity * detail.amount)
    }, 0) + additional

    const getCustomersForSale = async (search) => {
        setLoadingSearch(true)
        const { data } = await CustomerService.getForSale(search)
        setCustomers(data)
        if (data.length === 1) {
            setForm({
                ...isForm,
                customerID: data[0].id,
                amountPayment: totalDetailDraft - totalAmountDraft
            })
        }
        setLoadingSearch(false)
    }

    const onSearchCustomers = (value) => {
        if (value.length > 4) {
            const searchLocal = isCustomers.filter(obj =>
                obj.name.toLowerCase().includes(value.toLowerCase()) ||
                obj.document.toLowerCase() == value.toLowerCase()
            )

            if (isCustomers.length === 0 || searchLocal.length === 0) {
                getCustomersForSale(value)
            } else {
                setCustomers(searchLocal)
            }
        }
    }

    const handleAddPaymentToSale = () => {
        const creditExists = payments.find(obj => ['Crédito', 'Credito'].includes(obj.name))
        if (creditExists) return;
        if (isForm.amountPayment <= 0) return;
        if ((totalDetailDraft - totalAmountDraft) <= 0) return;
        const modePayment = information.paymentMethods.find(obj => obj.id === isForm.paymentMethodID)

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
        const paymentMethod = information.paymentMethods.find(obj => obj.id == value)
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

        getCustomersForSale('S0000001')
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

    useEffect(() => {
        const pending = totalDetailDraft - totalAmountDraft
        setTotalDetails(totalDetailDraft)
        setDisabledEmit(pending > 0)
        setForm({
            ...isForm,
            additional: additional,
            amountPayment: pending <= 0 ? 0 : pending
        })
    }, [additional])

    return (
        <>
            {contextHolder}
            <div className="flex flex-wrap py-10">
                <div className="w-7/12 px-10 modal-select-product">
                    <div className="bg-white p-5 h-full">
                        <Divider orientation="left" orientationMargin="0">Documento</Divider>
                        <div className="flex ">
                            <Select
                                className="w-4/12"
                                placeholder="Elegir un documento"
                                onChange={(value) => setForm({
                                    ...isForm,
                                    seriesID: value
                                })}
                                value={isForm.seriesID}
                                options={information.vouchersSeries.map(obj => {
                                    return {
                                        label: obj.type,
                                        options: obj.series?.map(e => {
                                            return {
                                                label: `${obj.type} - ${e.name}`,
                                                value: e.id
                                            }
                                        })
                                    }
                                })}
                            />
                            <div className="w-8/12 flex">
                                <Select
                                    className="flex-1"
                                    showSearch
                                    placeholder="Elegir un cliente"
                                    loading={isLoadingSearch}
                                    optionFilterProp="children"
                                    onChange={(value) => setForm({
                                        ...isForm,
                                        customerID: value
                                    })}
                                    filterOption={false}
                                    onSearch={onSearchCustomers}
                                    options={isCustomers.map(obj => {
                                        return {
                                            value: obj.id,
                                            customer: obj,
                                            label: <div className="w-64 break-words">{obj.document} - {obj.name}</div>
                                        }
                                    })}
                                    optionRender={(oriOption, info) => {
                                        const customer = oriOption.data.customer
                                        return (
                                            <div className="w-64 break-words">
                                                <p>{customer.document}</p>
                                                <p>{customer.name}</p>
                                            </div>
                                        )
                                    }}
                                    value={isForm.customerID == '' ? null : isForm.customerID}
                                />
                                <Dropdown.Button className="w-20" type="primary" menu={menuProps} onClick={() => setOpenModalCustomer(true)}>
                                    <PlusOutlined />
                                </Dropdown.Button>
                            </div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="mt-2">
                                <label htmlFor="" className="block">Monto Adicional </label>
                                <InputNumber
                                    addonBefore={<span className="px-1">S/</span>}
                                    className="w-40"
                                    placeholder="0"
                                    disabled={totalAmountDraft > 0}
                                    min={0}
                                    value={isForm.additional}
                                    onChange={(value) => setAdditional(value ?? 0)}
                                />
                            </div>
                        </div>
                        {
                            payments.find(obj => obj.abbreviation == 'Cre') && (
                                <div>
                                    <Divider orientation="left" orientationMargin="0">
                                        Documento al cancelar pago
                                        <Tooltip title="Este comprobante se generara automaticamente cuando termine de pagar todo">
                                            <ContactSupportOutlined sx={{ color: 'blue' }} />
                                        </Tooltip>
                                    </Divider>
                                    <div className="flex gap-4">
                                        <div className="">
                                            <Switch value={isForm.activeVoucherToCancel} onChange={(checked) =>  setForm({
                                                ...isForm,
                                                activeVoucherToCancel: checked
                                            })} />
                                        </div>
                                        <div className="w-2/6">
                                            <Select
                                                className="w-full"
                                                value={isForm.voucherToCancel}
                                                placeholder="Elegir Comprobante"
                                                onChange={(value) => setForm({
                                                    ...isForm,
                                                    voucherToCancel: value
                                                })}
                                                options={[
                                                    {label: 'Boleta', value: 'BOLETA'},
                                                    {label: 'Factura', value: 'FACTURA'},
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div className="flex flex-wrap">
                            <Divider orientation="left" orientationMargin="0">Pagos</Divider>
                            <div className="w-4/12 pr-2">
                                <Select
                                    className="w-full"
                                    placeholder="Elegir medio de pago"
                                    onChange={onChangePeymentMethods}
                                    options={information.paymentMethods.map(obj => {
                                        return {
                                            value: obj.id,
                                            label: obj.name
                                        }
                                    })}
                                    value={isForm.paymentMethodID}
                                />
                            </div>
                            <div className="w-4/12 pr-2" >
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
                            <div className="w-4/12">
                                <Button
                                    onClick={handleAddPaymentToSale}
                                    className="bg-blue-600 !text-white w-full">
                                    Agregar Pago
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-5/12 px-10">
                    <div className="w-full text-center py-5">
                        <p className="text-4xl font-black">{FormatCurrency.formatCurrency(totalDetail)}</p>
                    </div>
                    <div className="flex flex-wrap gap-y-4">
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
                            <span>Debe:</span> <span>{FormatCurrency.formatCurrency(totalDetailDraft - totalAmountDraft)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <CustomerMaintainerModal
                edit={editCutomer}
                setEdit={setEditCustomer}
                open={openModalCustomer}
                setOpen={setOpenModalCustomer}
                customerTrigger={getCustomersForSale}
            />
        </>
    )
}

export default DocumentSale

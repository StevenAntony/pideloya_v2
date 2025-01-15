import { useSaleContext } from '@pages/sale/process/hooks/useSaleContext'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import { Divider, Dropdown, InputNumber, Select, Switch, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { ContactSupportOutlined } from '@mui/icons-material'
import CustomerMaintainerModal from '@pages/customer/CustomerMaintainerModal'

type Props = {
}

export default function DocumentSale({ }: Props) {

    const {
        informationInSale,
        setInformationInSale,
        isInformation,
        isCustomers,
        listCustomers,
        setCustomers,
        totalPayment,
        loadingCustomerList
    } = useSaleContext()

    const [editCutomer, setEditCustomer] = useState<number | null>(null)
    const [openModalCustomer, setOpenModalCustomer] = useState<boolean>(false)

    const menuCustomer = {
        items: [
            {
                label: 'Editar',
                key: '1',
                icon: <EditOutlined />,
            }
        ],
        onClick: () => {
            setEditCustomer(informationInSale.customerID)
            setOpenModalCustomer(true)
        },
    };

    const onSearchCustomers = (value: string) => {
        if (value.length > 4) {
            const searchLocal = isCustomers.filter(obj =>
                obj.name.toLowerCase().includes(value.toLowerCase()) ||
                obj.document.toLowerCase() == value.toLowerCase()
            )

            if (isCustomers.length === 0 || searchLocal.length === 0) {
                listCustomers(value)
            } else {
                setCustomers(searchLocal)
            }
        }
    }

    return (
        <div>
            <Divider orientation="left" orientationMargin="0">Documento</Divider>
            <div className="flex ">
                <Select
                    className="w-4/12"
                    placeholder="Elegir un documento"
                    onChange={(value) => setInformationInSale('serieID', value)}
                    value={informationInSale.serieID}
                    options={isInformation.vouchersSeries.map(obj => {
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
                        loading={loadingCustomerList}
                        optionFilterProp="children"
                        onChange={(value) => setInformationInSale('customerID', value)}
                        filterOption={false}
                        onSearch={onSearchCustomers}
                        options={isCustomers.map(obj => {
                            return {
                                value: obj.customerID,
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
                        value={informationInSale.customerID}
                    />
                    <Dropdown.Button className="w-20" type="primary" menu={menuCustomer} onClick={() => setOpenModalCustomer(true)}>
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
                        disabled={totalPayment > 0}
                        min={0}
                        value={informationInSale.additionalAmount}
                        onChange={(value) => setInformationInSale('additionalAmount', value ?? 0)}
                    />
                </div>
            </div>
            {
                informationInSale.payments.find(obj => obj.abbreviation == 'Cre') && (
                    <div>
                        <Divider orientation="left" orientationMargin="0">
                            Documento al cancelar pago
                            <Tooltip title="Este comprobante se generara automaticamente cuando termine de pagar todo">
                                <ContactSupportOutlined sx={{ color: 'blue' }} />
                            </Tooltip>
                        </Divider>
                        <div className="flex gap-4">
                            <div className="">
                                <Switch
                                    value={informationInSale.generateVoucherOnCancel}
                                    onChange={(checked) => setInformationInSale('generateVoucherOnCancel', checked)} />
                            </div>
                            <div className="w-2/6">
                                <Select
                                    className="w-full"
                                    value={informationInSale.voucherToCancel}
                                    placeholder="Elegir Comprobante"
                                    onChange={(value) => setInformationInSale('voucherToCancel', value)}
                                    options={[
                                        { label: 'Boleta', value: 'BOLETA' },
                                        { label: 'Factura', value: 'FACTURA' },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            <CustomerMaintainerModal
                edit={editCutomer}
                setEdit={setEditCustomer}
                open={openModalCustomer}
                setOpen={setOpenModalCustomer}
                customerTrigger={listCustomers}
            />
        </div>
    )
}

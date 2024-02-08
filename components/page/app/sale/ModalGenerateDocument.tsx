import { useSaleContext } from "@/contexts/SaleContext"
import FormatCurrency from "@/helpers/FormatCurrency"
import useStorage from "@/hooks/useStorage"
import CustomerService from "@/service/CustomerService"
import SaleService from "@/service/SaleService"
import { Button, InputNumber, Modal, Select, message } from "antd"
import { useEffect, useState } from "react"

const INIT_FORM = {
    amountPayment: 0,
    customerID: null,
    paymentMethodID: null,
    seriesID: null
}

const ModalGenerateDocument = ({
    closeOpenModal,
    isOpenModal,
    totalAmount,
    isTableSelected
}:{
    closeOpenModal: () => void;
    isOpenModal: boolean;
    totalAmount: number;
    isTableSelected: number;
}) => {

    const [ isCustomers, setCustomers ] = useState<Array<ICustomer>>([])
    const [ isLoadingSearch, setLoadingSearch ] = useState<boolean>(false)
    const [ isLoadingSendSale, setLoadingSendSale ] = useState<boolean>(false)
    const [ isForm, setForm ] = useState<IModalGenerateDocument>(INIT_FORM)

    const [ messageApi, contextHolder ] = message.useMessage()
    const { isSaleContext } = useSaleContext()
    const { getItem } = useStorage()

    
    const getCustomersForSale = async (search: string) => {
        setLoadingSearch(true)
        const response = await CustomerService.getForSale(search)
        setCustomers(response.data)
        setLoadingSearch(false)
    }

    const onSearchCustomers = (value: string) => {
        if(value.length > 4) {
            const searchLocal = isCustomers.filter(obj => 
                obj.name.toLowerCase().includes(value.toLowerCase()) ||
                obj.document.toLowerCase() == value.toLowerCase()
            )

            if (isCustomers.length === 0 || searchLocal.length === 0) {
                getCustomersForSale(value)
            }else{
                setCustomers(searchLocal)
            }
        }
    }

    const handleSendSaveSale =async () => {
        setLoadingSendSale(true)
        
        if (!isForm.paymentMethodID) {
            messageApi.warning('Revise formulario')
            setLoadingSendSale(false)
            return false
        }
        const response =await SaleService.saveSale({
            sale: {
                cashID: getItem('CASH_COMPANY'),
                customerID: isForm.customerID ?? '',
                seriesID: isForm.seriesID ?? '',
                tableID : `${isTableSelected}` , 
                type: 'Table',
                issue: null
            },
            detail: isSaleContext.detailsSale ?? [],
            payments: [
                {
                    amount: isForm.amountPayment,
                    paymentMethodID: isForm.paymentMethodID
                }
            ]
        })

        if (response.success) {
            messageApi.success('Venta registrada')
            setForm(INIT_FORM)
            closeOpenModal()
        }else{
            messageApi.error(response.message)
        }
        setLoadingSendSale(false)
    }

    useEffect(() => {
        setForm({
            ...isForm,
            amountPayment: totalAmount
        })
    }, [isOpenModal])

    return (
        <>
            {contextHolder}
            <Modal
                open={isOpenModal}
                onCancel={closeOpenModal}
                maskClosable={false}
                footer={
                    <div className="flex justify-between items-center">
                        <p className="font-bold text-[#172b4d] text-xl">{FormatCurrency.formatCurrency(totalAmount)}</p>
                        <Button 
                            onClick={handleSendSaveSale}
                            loading={isLoadingSendSale}
                            className="bg-blue-600 !text-white">
                            Guardar Venta
                        </Button>
                    </div>
                }
            >
                <div className="w-full py-10 modal-select-product grid gap-4">

                    <Select
                        className="w-full"
                        placeholder="Elegir un documento"
                        onChange={(value: string) => setForm({
                            ...isForm,
                            seriesID: value
                        })}
                        value={isForm.seriesID}
                        options={isSaleContext.information.vouchersSeries.map(obj => {
                            return {
                                label: obj.type,
                                options: obj.series?.map(e => {
                                    return {
                                        label: e.name,
                                        value: e.id
                                    }
                                })
                            }
                        })}
                    />
                    <Select
                        className="w-full"
                        showSearch
                        placeholder="Elegir un cliente"
                        loading={isLoadingSearch}
                        optionFilterProp="children"
                        onChange={(value: string) => setForm({
                            ...isForm,
                            customerID: value
                        })}
                        filterOption={false}
                        onSearch={onSearchCustomers}
                        options={isCustomers.map(obj => {
                            return {
                                value: obj.id,
                                label: `${obj.document} - ${obj.name}`
                            }
                        })}
                        value={isForm.customerID == '' ? null : isForm.customerID}
                    />
                    <Select
                        className="w-full"
                        placeholder="Elegir medio de pago"
                        onChange={(value: string) => setForm({
                            ...isForm,
                            paymentMethodID: value
                        })}
                        options={isSaleContext.information.paymentMethods.map(obj => {
                            return {
                                value: obj.id,
                                label: obj.name
                            }
                        })}
                        value={isForm.paymentMethodID}
                    />
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="w-6/12" >
                            <InputNumber 
                                addonBefore={<span className="px-3">S/</span>}
                                value={isForm.amountPayment}                    
                                onChange={(value: number|null) => setForm({
                                    ...isForm,
                                    amountPayment: value ?? 0
                                })}
                            />
                        </div>
                        <div>
                            <div className={`
                                ${isForm.amountPayment - totalAmount < 0 ? 'bg-red-600' : (
                                    isForm.amountPayment - totalAmount == 0 ? 'bg-slate-400' :  'bg-emerald-600'
                                )}
                                px-4 py-1 rounded text-white font-bold
                            `}>
                                {FormatCurrency.formatCurrency(isForm.amountPayment - totalAmount)}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ModalGenerateDocument
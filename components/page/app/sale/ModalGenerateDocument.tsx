import { useSaleContext } from "@/contexts/SaleContext"
import CustomerService from "@/service/CustomerService";
import { InputNumber, Modal, Select } from "antd"
import { useEffect, useState } from "react";

const ModalGenerateDocument = ({
    closeOpenModal,
    isOpenModal
}:{
    closeOpenModal: () => void;
    isOpenModal: boolean;
}) => {

    const [ isCustomers, setCustomers ] = useState<Array<ICustomer>>([])
    const [ isLoadingSearch, setLoadingSearch ] = useState<boolean>(false)
    // const [ isForm ]

    const { isSaleContext } = useSaleContext()

    
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

    return (
        <Modal
            open={isOpenModal}
            onCancel={closeOpenModal}
            maskClosable={false}
            footer={
                'TOTAL'
            }
        >
            <div className="w-full py-10 modal-select-product grid gap-4">

                <Select
                    className="w-full"
                    placeholder="Elegir un documento"
                    onChange={() => {}}
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
                    onChange={() => {}}
                    filterOption={false}
                    onSearch={onSearchCustomers}
                    options={isCustomers.map(obj => {
                        return {
                            value: obj.id,
                            label: <div>
                                        <p>{obj.document} - {obj.name}</p>
                                        <p>{obj.address}</p>
                                    </div>
                        }
                    })}
                    value={''}
                />
                <Select
                    className="w-full"
                    placeholder="Elegir medio de pago"
                    onChange={() => {}}
                    options={isSaleContext.information.paymentMethods.map(obj => {
                        return {
                            value: obj.id,
                            label: obj.name
                        }
                    })}
                    value={isSaleContext.information.paymentMethods[0].id}
                />
                <div className="flex flex-wrap justify-between">
                    <div >
                        <InputNumber 
                            addonBefore={<span className="px-3">S/</span>}
                            value={0}                    
                            onChange={() => {}}
                            className='w-32 text-center' 
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ModalGenerateDocument
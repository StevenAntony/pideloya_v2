import FormatCurrency from "@/helpers/FormatCurrency";
import { Button, Input, InputNumber, Modal, Select } from "antd"
import { useEffect, useState } from "react";

const ModalSelectProduct = ({
    closeOpenModalSelectProduct,
    isOpenModalSelectProduct,
    isProducts,
    addNewOrderToTableOrderData
}:{
    closeOpenModalSelectProduct: () => void;
    isOpenModalSelectProduct: boolean;
    isProducts: Array<IProductForSale>;
    addNewOrderToTableOrderData: (c: IOrder) => void
}) => {
    const [isOptions, setOptions] = useState<Array<any>>([])
    const [isOptionsUnit, setOptionsUnit] = useState<Array<any>>([])
    const [isForm, setForm] = useState<IModalSelectProduct>({
        idProduct: '',
        idPresentation: '',
        amount: 0,
        note: '',
        quantity: 1
    })

    const onChangeProduct = (value: string) => {
        const product = isProducts.find(obj => obj.id === value)
        const presentations = product?.presentations == undefined ? [] : product?.presentations
        setForm(prevState => ({
            ...prevState,
            idProduct: value
        }))
        setOptionsUnit(presentations.map(obj => { return {
            label: `${obj.unitName} : ${FormatCurrency.formatCurrency(obj.salePrice)}`,
            value: obj.id
        } }))
    }

    const onChangePresentation = (value: string) => {
        const product = isProducts.find(obj => obj.id === isForm.idProduct)
        const presentations = product?.presentations == undefined ? [] : product?.presentations
        const presentation = presentations.find(obj => obj.id == Number(value))

        setForm(prevState => ({
            ...prevState,
            idPresentation: value,
            amount: presentation ? presentation.salePrice : 0
        }))
    }

    const onChangeAmount = (value: number|null) => {
        setForm(prevState => ({
            ...prevState,
            amount: value ?? 0
        }))
    }

    const onChangeQuantity = (value: number|null) => {
        setForm(prevState => ({
            ...prevState,
            quantity: value ?? 1
        }))
    }

    const onChangeNote = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prevState => ({
            ...prevState,
            note: e.target.value
        }))
    }

    const filterOption = (input: string, option?: { label: string; value: string }) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

    const addQuantity = () => setForm(prevState => ({
        ...prevState,
        quantity: prevState.quantity + 1
    }))

    const subtractQuantity = () => setForm(prevState => ({
        ...prevState,
        quantity: (prevState.quantity - 1) == 0 ? 1 : (prevState.quantity - 1)
    }))

    const addOrder = () => {
        const product = isProducts.find(obj => obj.id === isForm.idProduct)
        const newOrder: IOrder = {
            action: 'new',
            amount: isForm.amount,
            description: product != null ? product.description : '',
            id: 0,
            idPresentation: isForm.idPresentation,
            idStore: 1,
            originalQuantity: isForm.quantity,
            quantity: isForm.quantity,
            note: isForm.note
        } 
        addNewOrderToTableOrderData(newOrder)
        closeOpenModalSelectProduct()
    }

    useEffect(() => {
        setOptions(isProducts.map(obj => { return {
            label: obj.description,
            value: obj.id
        } }))
    }, [isProducts])

    useEffect(() => {
        setForm({
            idProduct: '',
            idPresentation: '',
            amount: 0,
            note: '',
            quantity: 1
        })
    }, [isOpenModalSelectProduct])

    return (
        <Modal
            open={isOpenModalSelectProduct}
            onCancel={closeOpenModalSelectProduct}
            maskClosable={false}
            footer={
                <div>
                    <Button onClick={addOrder} className="bg-blue-500 !text-white">
                        Agregar
                    </Button>
                </div>
            }
        >
            <div className="w-full py-10 modal-select-product grid gap-4">
                <Select
                    className="w-full"
                    showSearch
                    placeholder="Elegir un producto"
                    optionFilterProp="children"
                    onChange={onChangeProduct}
                    onSearch={() => {}}
                    filterOption={filterOption}
                    options={isOptions}
                    value={isForm.idProduct == '' ? null : isForm.idProduct}
                />
                <Select
                    className="w-full"
                    placeholder="Elegir un unidad"
                    optionFilterProp="children"
                    onChange={onChangePresentation}
                    options={isOptionsUnit}
                    value={isForm.idPresentation == '' ? null : isForm.idPresentation}
                />
                <div className="flex flex-wrap justify-between">
                    <div >
                        <InputNumber 
                            addonBefore={<span className="px-3">S/</span>}
                            value={isForm.amount}                    
                            onChange={onChangeAmount}
                            className='w-32 text-center' 
                            min={0}
                        />
                    </div>
                    <div>
                        <InputNumber 
                            addonBefore={<Button onClick={subtractQuantity}  className='border-0 bg-[--color-app-500] rounded-sm text-white'>-</Button>} 
                            addonAfter={<Button onClick={addQuantity} className='border-0 bg-emerald-500 text-white rounded-sm'>+</Button>} 
                            value={isForm.quantity}
                            onChange={onChangeQuantity}
                            className='w-36 text-center' 
                            min={1}
                        />
                    </div>
                    
                </div>
                <div>
                    <Input.TextArea placeholder="Agregar un detalle" rows={4} onChange={onChangeNote} value={isForm.note} /> 
                </div>
            </div>
        </Modal>
    )
}

export default ModalSelectProduct
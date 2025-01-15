import { Button, Input, InputNumber, Modal, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import FormatCurrency from '../../../helpers/FormatCurrency';

export default function NewOrder({
    isProducts,
    detailsSale,
    setDetailsSale
}: {
    isProducts: any[];
    detailsSale: any[];
    setDetailsSale: (e: any[]) => void;
}) {
    const [isOptionsProducts, setOptionsProducts] = useState<any[]>([])
    const [isOptionsUnit, setOptionsUnit] = useState<any[]>([])
    const [isForm, setForm] = useState({
        idProduct: '',
        idPresentation: '',
        amount: 0,
        note: '',
        quantity: 1
    })

    const onChangeProduct = (value) => {
        const product = isProducts.find(obj => obj.id === value)
        const presentations = product?.presentations == undefined ? [] : product?.presentations

        setOptionsUnit(presentations.map(obj => { return {
            label: `${obj.unitName} : ${FormatCurrency.formatCurrency(obj.salePrice)}`,
            value: obj.id
        } }))

        setForm(prevState => ({
            ...prevState,
            idProduct: value,
            idPresentation: presentations && presentations[0].id,
            amount: presentations ? presentations[0].salePrice : 0
        }))
    }

    const onChangeQuantity = (value) => {
        setForm(prevState => ({
            ...prevState,
            quantity: value ?? 1
        }))
    }

    const onChangeNote = (e) => {
        setForm(prevState => ({
            ...prevState,
            note: e.target.value
        }))
    }

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

    const onChangePresentation = (value) => {
        const product = isProducts.find(obj => obj.id === isForm.idProduct)
        const presentations = product?.presentations == undefined ? [] : product?.presentations
        const presentation = presentations.find(obj => obj.id == Number(value))

        setForm(prevState => ({
            ...prevState,
            idPresentation: value,
            amount: presentation ? presentation.salePrice : 0
        }))
    }

    const onChangeAmount = (value) => {
        setForm(prevState => ({
            ...prevState,
            amount: value ?? 0
        }))
    }

    const addQuantity = () => setForm(prevState => ({
        ...prevState,
        quantity: prevState.quantity + 1
    }))

    const subtractQuantity = () => setForm(prevState => ({
        ...prevState,
        quantity: (prevState.quantity - 1) == 0 ? 1 : (prevState.quantity - 1)
    }))

    const buildNewOrder = (data) => {
        const newOrder = {
            action: 'new',
            amount: data.amount,
            description: data.description,
            id: 0,
            idPresentation: data.idPresentation,
            idStore: 1,
            originalQuantity: data.quantity,
            quantity: data.quantity,
            note: data.note,
            print: data.print
        }

        setForm({
            idProduct: '',
            idPresentation: '',
            amount: 0,
            note: '',
            quantity: 1
        })

        const detailsSaleDraft = [...detailsSale]
        const posIndex = detailsSaleDraft.findIndex(obj =>
                obj.idPresentation === data.idPresentation &&
                obj.amount === data.amount &&
                obj.note === data.note
            )

        if(posIndex !== -1){
            detailsSaleDraft[posIndex].quantity += data.quantity
            setDetailsSale([...detailsSaleDraft])
        }else{
            setDetailsSale([newOrder, ...detailsSaleDraft])
        }
    }

    const addOrder = () => {
        const product = isProducts.find(obj => obj.id === isForm.idProduct)
        if (product == null) return;

        buildNewOrder({
            ...isForm,
            description: product != null ? product.description : '',
            print: product.printers
        })
    }

    useEffect(() => {
        setOptionsProducts(isProducts.map(obj => { return {
            label: obj.description,
            value: obj.id,
            product: obj
        } }))
    }, [isProducts])

    return (
        <div>
            <div>
                <label>Producto</label>
                <Select
                    className="w-full"
                    showSearch
                    placeholder="Elegir un producto"
                    optionFilterProp="children"
                    onChange={onChangeProduct}
                    filterOption={filterOption}
                    options={isOptionsProducts}
                    value={isForm.idProduct == '' ? null : isForm.idProduct}
                />
            </div>
            <div >
                <label>Presentación</label>
                <Select
                    className="w-full"
                    placeholder="Elegir un unidad"
                    optionFilterProp="children"
                    onChange={onChangePresentation}
                    options={isOptionsUnit}
                    value={isForm.idPresentation == '' ? null : isForm.idPresentation}
                />
            </div>
            <div className="flex flex-col gap-2">
                <div>
                    <label htmlFor="">Precio</label>
                    <InputNumber
                        addonBefore={<span className="px-3">S/</span>}
                        value={isForm.amount}
                        onChange={onChangeAmount}
                        className='text-center w-full'
                        min={0}
                    />
                </div>
                <div className='quantity-select-product'>
                    <label htmlFor="">Cantidad</label>
                    <InputNumber
                        addonBefore={<Button onClick={subtractQuantity} className='border-0 bg-[--color-app-500] rounded-sm text-white'>-</Button>}
                        addonAfter={<Button onClick={addQuantity} className='border-0 bg-emerald-500 text-white rounded-sm'>+</Button>}
                        value={isForm.quantity}
                        onChange={onChangeQuantity}
                        className='text-center bg-transparent w-full'
                        min={1}
                    />
                </div>

            </div>
            <div>
                <label>Nota</label>
                <Input.TextArea placeholder="Agregar un detalle" rows={4} onChange={onChangeNote} value={isForm.note} />
            </div>
            <div>
                <Button
                    className='w-full'
                    type='primary'
                    onClick={addOrder}
                >
                    Agregar
                </Button>
            </div>
        </div>
    )
}

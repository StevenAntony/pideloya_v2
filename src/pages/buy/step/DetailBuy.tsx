import React from 'react'
import { InputNumber , Input, Select, Button } from 'antd'
import { useEffect, useState } from 'react'
import FormatCurrency from '../../../../helpers/FormatCurrency'
import ItemDetailSale from '../../../components/list/ItemDetailSale'

const DetailBuy = ({
    isProducts,
    detailsBuy,
    setDetailsBuy
}) => {
    const [isOptions, setOptions] = useState([])
    const [isOptionsUnit, setOptionsUnit] = useState([])
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
            label: `${obj.unitName} : ${FormatCurrency.formatCurrency(obj.purchasePrice)}`,
            value: obj.id
        } }))

        setForm(prevState => ({
            ...prevState,
            idProduct: value,
            idPresentation: presentations && presentations[0].id,
            amount: presentations ? presentations[0].purchasePrice : 0
        }))
    }

    const onChangePresentation = (value) => {
        const product = isProducts.find(obj => obj.id === isForm.idProduct)
        const presentations = product?.presentations == undefined ? [] : product?.presentations
        const presentation = presentations.find(obj => obj.id == Number(value))

        setForm(prevState => ({
            ...prevState,
            idPresentation: value,
            amount: presentation ? presentation.purchasePrice : 0
        }))
    }

    const onChangeAmount = (value) => {
        setForm(prevState => ({
            ...prevState,
            amount: value ?? 0
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

    const filterOption = (input, option : any = null) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

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
        if (product == null) return;
        const newOrder = {
            action: 'new',
            amount: isForm.amount,
            description: product != null ? product.description : '',
            id: 0,
            idPresentation: isForm.idPresentation,
            idStore: 1,
            originalQuantity: isForm.quantity,
            quantity: isForm.quantity,
            note: isForm.note,
            type_afe_igv: product.type_afe_igv
        }

        setDetailsBuy([newOrder, ...detailsBuy])
    }

    const subtractQuantityDetail = (index) => {
        const draftDetails = [...detailsBuy]
        draftDetails[index].quantity = draftDetails[index].quantity - 1 == 0 ? 1 : (draftDetails[index].quantity - 1)

        setDetailsBuy([...draftDetails])
    }

    const addQuantityDetail = (index) => {
        const draftDetails = [...detailsBuy]
        draftDetails[index].quantity = draftDetails[index].quantity + 1

        setDetailsBuy([...draftDetails])
    }

    const removeToDetail = (index) => {
        const draftDetails = [...detailsBuy]
        draftDetails.splice(index, 1)
        setDetailsBuy(draftDetails)
    }

    useEffect(() => {
        setOptions(isProducts.map(obj => { return {
            label: obj.description,
            value: obj.id
        } }))
    }, [isProducts])

    return (
        <div className='flex flex-wrap'>
            <div className="w-4/12 py-5 px-10 flex flex-col gap-2 bg-white">
                <div>
                    <label>Producto</label>
                    <Select
                        className="w-full"
                        showSearch
                        placeholder="Elegir un producto"
                        optionFilterProp="children"
                        onChange={onChangeProduct}
                        filterOption={filterOption}
                        options={isOptions}
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
            <div className='w-8/12 py-5 px-5'>
                <div className='h-[400px] overflow-y-auto scroll-app'>
                    {
                        detailsBuy.map((order, index) => {
                            return <ItemDetailSale
                                    key={`${order.id}${index}`}
                                    order={order}
                                    index={index}
                                    subtractQuantityDetail={subtractQuantityDetail}
                                    addQuantityDetail={addQuantityDetail}
                                    removeToDetail={removeToDetail}
                                />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailBuy

import { Add } from '@mui/icons-material'
import { Button, Input, InputNumber, InputRef, message, Select, Switch } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../../../contexts/AppContext'
import FormatCurrency from '../../../../helpers/FormatCurrency'

type DetailProps = {
    action: string;
    amount: number;
    description: string;
    id: number;
    idPresentation: number;
    idStore: number;
    originalQuantity: number;
    quantity: number;
    note: string;
}

type Props = {
    showPrice ?: boolean;
    products ?: any[];
    details: DetailProps[];
    setDetails: (e: DetailProps[]) => void;
}

export default function AddNewProduct({
    showPrice = true,
    products = [],
    details,
    setDetails
}: Props) {

    const inputRef = useRef<InputRef>(null)

    const [searchByBarCode, setSearchByBarCode] = useState<boolean>(false)
    const [presentations, setPresentations] = useState<any[]>([])
    const [textSearchBarCode, setTextSearchBarCode] = useState<string>('')

    const [productSelected, setProductSelected] = useState<string|null>(null)
    const [presentationsSelected, setPresentationsSelected] = useState<string|null>(null)
    const [quantity, setQuantity] = useState<number>(1)
    const [price, setPrice] = useState<number>(0)
    const [note, setNote] = useState<string>('')

    // Context
    const { priceTypeApp } = useAppContext()

    const handleProduct = (value, barCode = false) => {
        setProductSelected(value)
        const productDraft = products.find(product => barCode ? product.barcode === value : product.id === value)

        if (productDraft) {
            const presentationsDraft = productDraft.presentations == undefined ? [] : productDraft.presentations

            if(presentationsDraft.length > 0) {
                setPresentations(presentationsDraft.map(obj => {
                    const price = priceTypeApp === 'public' ? obj.salePrice : obj.dealerPrice
                    const label = `${obj.unitName} ${showPrice ? `: ${FormatCurrency.formatCurrency(price)}` : ''}`
                    return {
                        label: label,
                        value: obj.id
                    }
                }))
                setPresentationsSelected(presentationsDraft[0].id)
            }
        }
    }

    const buildNewOrder = (data) => {
        const presentationsDraft = data.presentations.find(obj => obj.id === data.idPresentation)
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
            unitSunat: presentationsDraft.unitSunat
        }

        const detailsSaleDraft = [...details]
        const posIndex = detailsSaleDraft.findIndex(obj =>
                obj.idPresentation === data.idPresentation &&
                obj.amount === data.amount &&
                obj.note === data.note
            )

        if(posIndex !== -1){
            detailsSaleDraft[posIndex].quantity += data.quantity
            setDetails([...detailsSaleDraft])
        }else{
            setDetails([newOrder, ...detailsSaleDraft])
        }
    }

    const addOrder = () => {
        const product = products.find(obj => obj.id === productSelected)
        if (product == null) return;
        buildNewOrder({
            description: product.description,
            amount: price,
            idPresentation: presentationsSelected,
            quantity: quantity,
            note: note,
            presentations: product.presentations
        })
    }

    const activeFocus = () => {
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus({
                    cursor: 'start'
                })
            }
        }, 1000)
    }

    useEffect(() => {
        if (searchByBarCode) activeFocus()
    }, [searchByBarCode])

    return (
        <div>
            <div className='w-6/12'>
                <label className='w-full block' htmlFor="">Lectura de Codigo Barra</label>
                <Switch value={searchByBarCode} onChange={(value) => setSearchByBarCode(value)} />
            </div>
            <div>
                <label>Producto</label>
                {
                    searchByBarCode
                        ? <Input id="myInput" onPressEnter={() => {}} onChange={(e) => setTextSearchBarCode(e.target.value)} ref={inputRef} value={textSearchBarCode}  />
                        : <Select
                            className="w-full"
                            showSearch
                            placeholder="Elegir un producto"
                            optionFilterProp="children"
                            onChange={(value) => handleProduct(value)}
                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            options={products.map(product => {
                                return {
                                    value: product.id,
                                    label: product.description,
                                    product
                                }
                            })}
                            // value={isForm.idProduct == '' ? null : isForm.idProduct}
                        />
                }
            </div>
            <div >
                <label>Presentación</label>
                <Select
                    className="w-full"
                    placeholder="Elegir un unidad"
                    optionFilterProp="children"
                    onChange={(value) => setPresentationsSelected(value)}
                    options={presentations}
                    value={presentationsSelected}
                />
            </div>
            <div className="flex flex-col gap-2">
                <div className={showPrice ? '' : 'hidden'}>
                    <label htmlFor="">Precio</label>
                    <InputNumber
                        addonBefore={<span className="px-3">S/</span>}
                        value={0}
                        onChange={(value) => setPrice(value ?? 0)}
                        className='text-center w-full'
                        min={0}
                    />
                </div>
                <div className='quantity-select-product'>
                    <label htmlFor="">Cantidad</label>
                    <InputNumber
                        addonBefore={<Button onClick={() => setQuantity(quantity - 1)} className='border-0 bg-[--color-app-500] rounded-sm text-white'>-</Button>}
                        addonAfter={<Button onClick={() => setQuantity(quantity + 1)} className='border-0 bg-emerald-500 text-white rounded-sm'>+</Button>}
                        value={quantity}
                        onChange={(value) => setQuantity(value ?? 1)}
                        className='text-center bg-transparent w-full'
                        min={1}
                    />
                </div>

            </div>
            <div>
                <label>Nota</label>
                <Input.TextArea placeholder="Agregar un detalle" rows={4} onChange={(e) => setNote(e.target.value)} value={note} />
            </div>
            <div className='mt-4'>
                <Button
                    className='w-full'
                    type='primary'
                    onClick={addOrder}
                >
                    <Add /> Agregar
                </Button>
            </div>
            <div>

            </div>
        </div>
    )
}

import { PackageIcon } from '@components/icons/IconApp'
import React from 'react'
import { IProductInSale } from './ISelectProducts'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Input, InputNumber, Select, Tag } from 'antd'
import FormatCurrency from '@helpers/FormatCurrency'

type Props = {
    productInSale: IProductInSale
    index: number
    subtractQuantity: (index: number) => void
    addQuantity: (index: number) => void
    removeProductInSale: (index: number) =>void
    onChangeProductInSale: (index: number, key: string, value: any) => void
    priceType?: string
    editable?: boolean
}

export default function ItemProductInSale({
    productInSale,
    index,
    subtractQuantity,
    addQuantity,
    removeProductInSale,
    editable = true,
    onChangeProductInSale,
    priceType = 'public'
}: Props) {
    return (
        <div className={`flex w-full my-2 px-3 py-2 rounded-md shadow-sm sm:flex-row relative flex-col gap-2 sm:items-center bg-white justify-between item-order-sale-table`}
        >
            <div className='flex items-center gap-2 flex-1'>
                <div>
                    <PackageIcon className="w-10 h-10" />
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                    <p className='text-lg font-semibold'>{productInSale.description}</p>
                    {
                        editable ? (
                            <Input.TextArea
                                rows={2}
                                style={{resize: 'none'}}
                                placeholder="Agregar nota"
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChangeProductInSale(index, 'note', e.target.value)}
                                value={productInSale.note}
                            />
                        ) : <Tag>Note: {productInSale.note}</Tag>
                    }
                    <div className='font-medium flex gap-4'>
                        {
                            editable && productInSale.presentations ? (
                                <Select
                                    value={productInSale.presentationID}
                                    options={productInSale.presentations.map(obj => {
                                        const price = priceType === 'public' ? obj.salePrice : obj.dealerPrice

                                        return {
                                            label: `${obj.unitSunat} : ${FormatCurrency.formatCurrency(price)}`,
                                            value: obj.presentationID
                                        }
                                    })}
                                    onChange={(value) => {
                                        const presentation = productInSale.presentations.find(obj => obj.presentationID === value)
                                        let price = 0
                                        if (presentation) {
                                            price = priceType === 'public' ? presentation.salePrice : presentation.dealerPrice
                                        }
                                        onChangeProductInSale(index, 'presentationID', value)
                                        onChangeProductInSale(index, 'price', price)
                                    }}
                                />
                            ) : (
                                FormatCurrency.formatCurrency(productInSale.price)
                            )
                        }
                        <div>
                            {FormatCurrency.formatCurrency(productInSale.price * productInSale.quantity)}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <InputNumber
                    addonBefore={<Button onClick={() => subtractQuantity(index)} className='border-0 bg-[--color-app-500] rounded-sm text-white'>-</Button>}
                    addonAfter={<Button onClick={() => addQuantity(index)} className='border-0 bg-emerald-500 text-white rounded-sm'>+</Button>}
                    value={productInSale.quantity}
                    disabled={false}
                    onChange={(value) => onChangeProductInSale(index, 'quantity', value)}
                    className='w-36 text-center font-bold !text-black'
                    min={1}
                />

                <Button
                    className='border-0 bg-rose-600 hover:!bg-rose-500 rounded-sm !text-white'
                    onClick={() => removeProductInSale(index)}
                >
                    <DeleteOutlined className='text-xl' />
                </Button>
            </div>
        </div>
    )
}

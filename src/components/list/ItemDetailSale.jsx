import { Badge, Button, Input, InputNumber, Select, Tag } from 'antd'
import { DeleteOutlined, BookOutlined } from '@ant-design/icons'
import FormatCurrency from '@/helpers/FormatCurrency'
import { PackageIcon } from '../icons/IconApp'

export default function ItemDetailSale({
    order,
    index,
    subtractQuantityDetail,
    addQuantityDetail,
    removeToDetail,
    showPrice = true,
    editable = true,
    changeDetail = {},
    priceType = 'public'
}) {


    return (
        <div className={`flex w-full my-2 px-3 py-2 rounded-md shadow-sm sm:flex-row relative flex-col gap-2 sm:items-center bg-white justify-between item-order-sale-table`}
        >
            <div className='flex items-center gap-2 flex-1'>
                <div>
                    <PackageIcon className="w-10 h-10" />
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                    <p className='text-lg font-semibold'>{order.description}</p>
                    {
                        editable ? (
                            <Input.TextArea
                                rows={2}
                                style={{resize: 'none'}}
                                placeholder="Agregar nota"
                                onChange={(e) => changeDetail(index, 'note', e.target.value)}
                                value={order.note}
                            />
                        ) : <Tag>Note: {order.note}</Tag>
                    }
                    <div className={`${showPrice ? '' : 'hidden'} font-medium flex gap-4`}>
                        {
                            editable && order.presentations ? (
                                <Select
                                    value={order.idPresentation}
                                    options={order.presentations.map(obj => {
                                        const price = priceType === 'public' ? obj.salePrice : obj.dealerPrice

                                        return {
                                            label: `${obj.unitSunat} : ${FormatCurrency.formatCurrency(price)}`,
                                            value: obj.id
                                        }
                                    })}
                                    onChange={(value) => {
                                        const presentation = order.presentations.find(obj => obj.id === value)
                                        const price = priceType === 'public' ? presentation.salePrice : presentation.dealerPrice
                                        changeDetail(index, 'idPresentation', value)
                                        changeDetail(index, 'amount', price)
                                    }}
                                />
                            ) : (
                                FormatCurrency.formatCurrency(order.amount)
                            )
                        }
                        <div>
                            {FormatCurrency.formatCurrency(order.amount*order.quantity)}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <InputNumber
                    addonBefore={<Button onClick={() => subtractQuantityDetail(index)} className='border-0 bg-[--color-app-500] rounded-sm text-white'>-</Button>}
                    addonAfter={<Button onClick={() => addQuantityDetail(index)} className='border-0 bg-emerald-500 text-white rounded-sm'>+</Button>}
                    value={order.quantity}
                    disabled={false}
                    onChange={(value) => changeDetail(index, 'quantity', value)}
                    className='w-36 text-center font-bold !text-black'
                    min={1}
                />

                <Button
                    className='border-0 bg-rose-600 hover:!bg-rose-500 rounded-sm !text-white'
                    onClick={() => removeToDetail(index)}
                >
                    <DeleteOutlined className='text-xl' />
                </Button>
            </div>
        </div>
    )
}

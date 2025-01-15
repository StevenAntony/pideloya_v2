import React from 'react';
import { Badge, Button, Input, InputNumber, Select } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import FormatCurrency from '../../../helpers/FormatCurrency';
import { PackageIcon } from '../icons/IconApp';
import { Presentation } from '../../models/ProductModel';

type TActionOrder = 'new'|'save'|'delete'|'edit'

export interface IOrder {
    id: number;
    quantity: number;
    amount: number;
    idPresentation: string;
    idStore?: number;
    description: string;
    action: TActionOrder;
    originalQuantity: number;
    note?: string;
    presentations: Presentation[];
}

type Props = {
    order: IOrder;
    index: number;
    editable: boolean;
    changeOrder: any;
    deleteOrder: (index: number) => void;
}

export default function ItemOrder({
    order,
    index,
    editable,
    changeOrder = {},
    deleteOrder
}: Props) {

    return (
        <div
            className={`flex sm:flex-row relative flex-col gap-2 sm:items-center
            justify-between item-order-sale-table mx-5 sm:mx-0 px-3 py-2 bg-white`}
        >
            {/* <PackageIcon className="w-10 h-10 text-slate-700" /> */}
            {
                order.action == 'new' && <span className='absolute top-0 right-0 px-1 shadow-sm text-white bg-amber-500'>
                    Nuevo
                </span>
            }
            <div className='flex items-center flex-1'>
                <div className='flex flex-col w-full gap-1'>
                    <p className='text-lg font-bold'>{order.description}</p>
                    {
                        editable ? (
                            <Input.TextArea
                                rows={2}
                                style={{resize: 'none'}}
                                placeholder="Agregar nota"
                                onChange={(e) => changeOrder(index, 'note', e.target.value)}
                                value={order.note}
                            />
                        ) : <p>{order.note}</p>
                    }
                    <div className='text-gray-500 flex items-center gap-2'>
                        <p className='w-24'>Cantidad:</p>
                        {
                            editable ? (
                                <InputNumber min={1} value={order.quantity} onChange={(value) => changeOrder(index, 'quantity', value)} />
                            ) : <strong>{order.quantity}</strong>
                        }
                    </div>
                    <div className='text-gray-500 flex items-center gap-2'>
                        <p className='w-24'>Precio:</p>
                        {
                            editable && order.presentations ? (
                                <Select
                                    value={order.idPresentation}
                                    options={order.presentations.map(obj => {
                                        return {
                                            label: `${obj.unitSunat} : ${FormatCurrency.formatCurrency(obj.salePrice)}`,
                                            value: obj.id
                                        }
                                    })}
                                    onChange={(value) => {
                                        const presentation = order.presentations.find(obj =>  `${obj.id}` == value)
                                        changeOrder(index, 'idPresentation', presentation?.id)
                                        changeOrder(index, 'amount', presentation?.salePrice)
                                    }}
                                />
                            ) : (
                                <strong>{FormatCurrency.formatCurrency(order.amount)}</strong>
                            )
                        }
                    </div>
                    <div>
                        <span className='mr-2 px-3 text-sm font-semibold rounded-md py-1 bg-slate-300'>{FormatCurrency.formatCurrency(order.amount*order.quantity)}</span>
                    </div>
                </div>
            </div>
            <div>
                <Button
                    className='border-0 !bg-pink-500 rounded-sm !text-white'
                    onClick={() => deleteOrder(index)}
                    style={{display: order.action == 'new' ? 'block' : 'none'}}
                >
                    <DeleteOutlined className='text-xl' />
                </Button>
            </div>
        </div>
    )
}

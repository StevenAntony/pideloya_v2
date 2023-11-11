import imgProduct from '@/public/image/product.png'
import { Badge, Button, InputNumber } from 'antd'
import Image from 'next/image'
import { DeleteOutlined } from '@ant-design/icons'
import FormatCurrency from '@/helpers/FormatCurrency'

export default function ItemOrder({
    order,
    updateOrderToTableOrderData,
    index,
    isForceRenderDetail
}:{
    order: IOrder;
    updateOrderToTableOrderData: (c: IOrder, n: number) => void,
    index: number;
    isForceRenderDetail: boolean;
}) {

    const addQuantity = () => {
        order.quantity += 1
        updateOrderToTableOrderData(order, index)
    }

    const subtractQuantity = () => {
        order.quantity = (order.quantity - 1) == 0 ? 1 : (order.quantity - 1)
        updateOrderToTableOrderData(order, index)
    }

    return (
        <div className={`flex sm:flex-row relative flex-col gap-2 sm:items-center justify-between item-order-sale-table`}
        >
            {
                order.action == 'new' && <span className='absolute bottom-0 right-0 px-1 shadow-sm text-white bg-amber-500'>
                    Nuevo
                </span>
            }
            <div className='flex items-center'>
                <div>
                    <Image 
                        src={imgProduct}
                        className='w-11 mr-3'
                        alt='image product'
                    />
                </div>
                <div>
                    <p>{order.description}</p>
                    <p className='font-medium'>
                        {FormatCurrency.formatCurrency(order.amount)}
                        <Badge 
                            overflowCount={10000000} 
                            count={FormatCurrency.formatCurrency(order.amount*order.quantity)} 
                            color='rgb(2,132,199)'
                            className='ml-4'
                        />
                    </p>
                </div>
            </div>
            <div>
                <InputNumber 
                    addonBefore={<Button onClick={subtractQuantity} className='border-0 bg-[--color-app-500] rounded-sm text-white'>-</Button>} 
                    addonAfter={<Button onClick={addQuantity} className='border-0 bg-emerald-500 text-white rounded-sm'>+</Button>} 
                    value={order.quantity}
                    className='w-32 text-center' 
                    min={1}
                />

                <Button className='border-0 bg-[--color-app-500] rounded-sm text-white'>
                    <DeleteOutlined className='text-xl' />
                </Button>
            </div>
        </div>
    )
}
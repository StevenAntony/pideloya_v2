import imgProduct from '@/public/image/product.png'
import { Badge, Button, InputNumber } from 'antd'
import Image from 'next/image'
import { DeleteOutlined } from '@ant-design/icons'
import FormatCurrency from '@/helpers/FormatCurrency'

export default function ItemOrder({
    order
}:{
    order: IOrder
}) {
    return (
        <div className='flex sm:flex-row flex-col gap-2 sm:items-center justify-between item-order-sale-table '>
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
                    addonBefore={<Button className='border-0 bg-[--color-app-500] rounded-sm text-white'>-</Button>} 
                    addonAfter={<Button className='border-0 bg-emerald-500 text-white rounded-sm'>+</Button>} 
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
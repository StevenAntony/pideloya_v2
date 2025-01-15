import { Badge, Button, InputNumber } from 'antd'
import { DeleteOutlined, BookOutlined } from '@ant-design/icons'
import FormatCurrency from '@/helpers/FormatCurrency'

export default function ItemPaymentSale({
    payment,
    index,
    removeToPayment
}) {
    return (
        <div className={`flex w-full my-2 px-3 py-2 shadow-sm sm:flex-row relative flex-col gap-2 sm:items-center bg-white justify-between item-order-sale-table`}
        >
            <div className='flex items-center gap-2'>
                <div>
                    <Badge
                        overflowCount={10000000}
                        count={payment.name}
                        color={`${payment.name == 'Crédito' || payment.name == 'Credito' ? 'rgb(220 38 38)' : 'rgb(2,132,199)'}`}
                        className='ml-4'
                    />
                </div>
                <div>
                    <p className='font-bold text-base'>
                        {FormatCurrency.formatCurrency(payment.amount)}
                    </p>
                </div>
            </div>
            <div>
                <Button
                    className='border-0 bg-[--color-app-500] rounded-sm text-white'
                    onClick={() => removeToPayment(index)}
                >
                    <DeleteOutlined className='text-xl' />
                </Button>
            </div>
        </div>
    )
}

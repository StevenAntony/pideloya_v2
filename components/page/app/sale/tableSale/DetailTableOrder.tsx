import { Button } from "antd"
import ItemOrder from "./ItemOrder"
import { PlusOutlined } from '@ant-design/icons'

export default function DetailTableOrder({
    orders,
    showOpenModalSelectProduct
}:{
    orders: Array<IOrder>;
    showOpenModalSelectProduct: () => void;
}) {
    return (
        <div className="grid gap-6">
            {
                orders.map(order => {
                    return <ItemOrder key={order.id} order={order} />
                })
            }
            <div>
                <Button
                    className="bg-teal-500 rounded-full h-14 w-14 absolute bottom-20 right-4"
                    onClick={showOpenModalSelectProduct}
                >
                    <PlusOutlined className="text-white text-2xl" />
                </Button>
            </div>
        </div>
    )
}
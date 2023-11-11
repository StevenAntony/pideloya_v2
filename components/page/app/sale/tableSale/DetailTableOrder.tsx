import { Button } from "antd"
import ItemOrder from "./ItemOrder"
import { PlusOutlined } from '@ant-design/icons'

export default function DetailTableOrder({
    orders,
    showOpenModalSelectProduct,
    updateOrderToTableOrderData,
    isForceRenderDetail
}:{
    orders: Array<IOrder>;
    showOpenModalSelectProduct: () => void;
    updateOrderToTableOrderData: (o: IOrder, i: number) => void;
    isForceRenderDetail: boolean
}) {
    return (
        <div className="grid gap-6">
            {
                orders.map((order, index) => {
                    return <ItemOrder 
                            key={order.id} 
                            order={order} 
                            index={index} 
                            updateOrderToTableOrderData={updateOrderToTableOrderData}
                            isForceRenderDetail={isForceRenderDetail}
                        />
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
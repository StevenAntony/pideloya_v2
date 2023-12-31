import { Button } from "antd"
import ItemOrder from "./ItemOrder"
import { ShoppingCartOutlined, DollarOutlined } from '@ant-design/icons'

export default function DetailTableOrder({
    orders,
    showOpenModalSelectProduct,
    showOpenModalGenerateDocument,
    updateOrderToTableOrderData,
    isForceRenderDetail
}:{
    orders: Array<IOrder>;
    showOpenModalSelectProduct: () => void;
    showOpenModalGenerateDocument: () => void;
    updateOrderToTableOrderData: (o: IOrder, i: number) => void;
    isForceRenderDetail: boolean
}) {
    return (
        <div className="grid gap-6 pb-12">
            {
                orders.map((order, index) => {
                    return <ItemOrder 
                            key={`${order.id}${index}`} 
                            order={order} 
                            index={index} 
                            updateOrderToTableOrderData={updateOrderToTableOrderData}
                            isForceRenderDetail={isForceRenderDetail}
                        />
                })
            }
            <div>
                <Button
                    className="bg-[--color-app-500] rounded-full h-14 w-14 absolute bottom-20 right-4"
                    onClick={showOpenModalSelectProduct}
                >
                    <ShoppingCartOutlined className="text-white text-2xl" />
                </Button>

                <Button
                    className="bg-indigo-600 rounded-full h-14 w-14 absolute bottom-36 right-4"
                    onClick={showOpenModalGenerateDocument}
                >
                    <DollarOutlined className="text-white text-2xl" />
                </Button>
            </div>
        </div>
    )
}
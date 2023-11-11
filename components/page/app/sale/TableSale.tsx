import { useState } from "react";
import ListTableSale from "./tableSale/ListTableSale"
import { Button, Drawer, Space } from 'antd'
import TableService from "@/service/TableService";
import LoadingApp from "@/components/loading/LoadingApp";
import DetailTableOrder from "./tableSale/DetailTableOrder";
import FormatCurrency from "@/helpers/FormatCurrency";
import ModalSelectProduct from "./ModalSelectProduct";

const TableSale = ({
    isTables,
    showOpenModalSelectProduct,
    closeOpenModalSelectProduct,
    isOpenModalSelectProduct,
    isProducts
}:{
    isTables: Array<ITable>;
    showOpenModalSelectProduct: () => void;
    closeOpenModalSelectProduct: () => void;
    isOpenModalSelectProduct: boolean;
    isProducts: Array<IProductForSale>;
}) => {
    const [isLoadingTableOrderData, setLoadingTableOrderData] = useState<boolean>(false)
    const [isTableOrderData, setTableOrderData] = useState<ITableOrder|null>(null)
    const [isOpenTableOrderInformation, setOpenTableOrderInformation] = useState<boolean>(false)
    const [isForceRenderDetail, setForceRenderDetail] = useState<boolean>(false)
    
    const onCloseTableOrderInformation = () => {
        setOpenTableOrderInformation(false)
    }

    const showDrawerTableOrderInformation = async(id: number) => {
        setLoadingTableOrderData(true)
        setOpenTableOrderInformation(true)
        const response = await TableService.getTableOrders(id)
        setTableOrderData(response.data)
        
        setLoadingTableOrderData(false)
    }

    const totalAmount = (orders: Array<IOrder> ) => {
        return orders.reduce(function(total, order) {
            return total + (order.amount* order.quantity)
            }, 0)
    }

    const addNewOrderToTableOrderData = (order: IOrder) => {
        if (isTableOrderData != null) {   
            isTableOrderData.order.push(order)
            setTableOrderData(isTableOrderData)
        }
    }

    const updateOrderToTableOrderData = (order: IOrder, index: number) => {
        
        if (isTableOrderData != null) {   
            isTableOrderData.order[index] = order
            setTableOrderData(isTableOrderData)
            setForceRenderDetail(!isForceRenderDetail)
        }
    }

    return (
        <div className="flex flex-wrap">
            {isTables.map(obj => {
                return (
                    <div className="xl:w-2/12 lg:w-3/12 md:w-4/12 w-6/12" key={obj.id}>
                        <div className="p-2">
                            <ListTableSale 
                                table={obj}
                                showDrawerTableOrderInformation={showDrawerTableOrderInformation}  
                            />
                        </div>
                    </div>
                )
            })}
            <div>
                <Drawer 
                    title={`Mesa : ${isLoadingTableOrderData ? 'cargando...' : isTableOrderData?.description}`} 
                    size="large" 
                    placement="right" 
                    onClose={onCloseTableOrderInformation} 
                    open={isOpenTableOrderInformation}
                    maskClosable={false}
                    extra={
                        <Space>
                            <Button className="bg-blue-600 !text-white"  onClick={() => {}}>
                                Actualizar
                            </Button>
                        </Space>
                    }
                    styles={{
                        footer:{background:'rgb(37 99 235 / 1)'}
                    }}
                    footer={
                        <div className="flex justify-between">
                            <div><p className="font-semibold text-3xl text-white">Total</p></div>
                            <div>
                                <p className="font-bold text-3xl  text-white">
                                    {FormatCurrency.formatCurrency(totalAmount(isTableOrderData != null ? isTableOrderData.order : []))}
                                </p>
                            </div>
                        </div>
                    }
                >
                        {
                            isLoadingTableOrderData 
                            ? (
                                <div className='bg-white h-[400px]'>
                                    <LoadingApp screen={false} />
                                </div>
                            ) 
                            : <DetailTableOrder 
                                showOpenModalSelectProduct={showOpenModalSelectProduct}
                                orders={isTableOrderData != null ? isTableOrderData.order : []}
                                updateOrderToTableOrderData={updateOrderToTableOrderData}
                                isForceRenderDetail={isForceRenderDetail}
                            />
                        }
                </Drawer>
                <ModalSelectProduct 
                    closeOpenModalSelectProduct={closeOpenModalSelectProduct}
                    isOpenModalSelectProduct={isOpenModalSelectProduct}
                    isProducts={isProducts}
                    addNewOrderToTableOrderData={addNewOrderToTableOrderData}
                />
            </div>
        </div>
    )
}

export default TableSale
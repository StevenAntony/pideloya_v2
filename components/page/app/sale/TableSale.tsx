import { useState } from "react"
import ListTableSale from "./tableSale/ListTableSale"
import { Button, Drawer, Space } from 'antd'
import TableService from "@/service/TableService"
import LoadingApp from "@/components/loading/LoadingApp"
import DetailTableOrder from "./tableSale/DetailTableOrder"
import FormatCurrency from "@/helpers/FormatCurrency"
import ModalSelectProduct from "./ModalSelectProduct"
import { useAuthContext } from "@/contexts/AuthContext"
import { SendOutlined } from "@ant-design/icons"
import ModalGenerateDocument from "./ModalGenerateDocument"
import { useSaleContext } from "@/contexts/SaleContext"

const TableSale = ({
    isTables,
    showOpenModalSelectProduct,
    closeOpenModalSelectProduct,
    isOpenModalSelectProduct,
    
    showOpenModalGenerateDocument,
    closeOpenModalGenerateDocument,
    isOpenModalGenerateDocument,

    isProducts
}:{
    isTables: Array<ITable>;
    showOpenModalSelectProduct: () => void;
    closeOpenModalSelectProduct: () => void;
    isOpenModalSelectProduct: boolean;
    
    showOpenModalGenerateDocument: () => void;
    closeOpenModalGenerateDocument: () => void;
    isOpenModalGenerateDocument: boolean;

    isProducts: Array<IProductForSale>;
}) => {
    const [isLoadingTableOrderData, setLoadingTableOrderData] = useState<boolean>(false)
    const [isLoadingSendOrders, setLoadingSendOrders] = useState<boolean>(false)

    const [isTableOrderData, setTableOrderData] = useState<ITableOrder|null>(null)
    const [isTableSelected, setTableSelected] = useState<number>(0)
    const [isOpenTableOrderInformation, setOpenTableOrderInformation] = useState<boolean>(false)
    const [isForceRenderDetail, setForceRenderDetail] = useState<boolean>(false)
    const [isAvailableToOrder, setAvailableToOrder] = useState<boolean>(false)

    const { setSaleContext, isSaleContext } = useSaleContext()
    
    const onCloseTableOrderInformation = () => {
        setOpenTableOrderInformation(false)
    }

    const showDrawerTableOrderInformation = async(id: number) => {
        
        setLoadingTableOrderData(true)
        setOpenTableOrderInformation(true)
        setAvailableToOrder(false)
        const response = await TableService.getTableOrders(id)
        setTableOrderData(response.data)
        setTableSelected(id)
        setSaleContext({
            ...isSaleContext,
            detailsSale: response.data 
                            ? response.data.order.map(obj => {
                                return {
                                    note: obj.note ?? '',
                                    orderDescription: obj.description,
                                    presentationID: obj.idPresentation,
                                    price: obj.amount,
                                    quantity: obj.quantity
                                }
                            })
                            : []
        }) 
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

            const availableToOrder = isTableOrderData.order.filter(obj => obj.action == 'new').length != 0
            setAvailableToOrder(availableToOrder)
        }
    }

    const updateOrderToTableOrderData = (order: IOrder, index: number) => {
        
        if (isTableOrderData != null) {   
            isTableOrderData.order[index] = order
            setTableOrderData(isTableOrderData)
            setForceRenderDetail(!isForceRenderDetail)
        }
    }

    const sendOrders = async () => {
        if (isTableOrderData != null) {
            setLoadingSendOrders(true)
            const filterSend = isTableOrderData.order.filter(obj => obj.action == 'new')
            
            const orders: Array<ISendOrder> = filterSend.map(obj => {
                return {
                    description: obj.description,
                    idPresentation: obj.idPresentation,
                    note: obj.note ?? '',
                    price: obj.amount,
                    quantity: obj.quantity
                }
            })
            
            const response = await TableService.sendOrders(isTableOrderData.id, {
                orders: orders
            })

            if (response.success) {
                showDrawerTableOrderInformation(isTableOrderData.id)
            }else{
                
            }
            setAvailableToOrder(false)
            setLoadingSendOrders(false)
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
                            <Button 
                                className="bg-blue-600 !text-white"  
                                onClick={sendOrders}
                                disabled={!isAvailableToOrder}
                                loading={isLoadingSendOrders}
                            >
                                <SendOutlined />
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
                                showOpenModalGenerateDocument={showOpenModalGenerateDocument}
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
                <ModalGenerateDocument
                    closeOpenModal={closeOpenModalGenerateDocument}
                    isOpenModal={isOpenModalGenerateDocument}
                    totalAmount={totalAmount(isTableOrderData != null ? isTableOrderData.order : [])}
                    isTableSelected={isTableSelected}
                />
            </div>
        </div>
    )
}

export default TableSale
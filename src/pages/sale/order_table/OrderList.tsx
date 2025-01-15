import React, { useEffect, useState } from 'react'
import ItemOrder from '../../../components/list/ItemOrder'
import { Button, message, Spin, Tooltip } from 'antd'
import { ShoppingCartOutlined, DollarOutlined, SendOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import NewOrderModal from './NewOrderModal'
import TableService from '../../../service/TableService'
import { ConnectPrintServe } from '../../../service/ConnectPrintServe'
import { useAuthContext } from '../../../contexts/AuthContext'
import { ArrowLeftIcon } from '../../../components/icons/IconApp'
import SearchProduct from '../../../components/app/SearchProduct'
import { CategoryModel } from '../../../models/CategoryModel'
import HeaderActions from './HeaderActions'

export default function OrderList({
    orders,
    setOrders,
    isProducts,
    table,
    reload,
    loading,
    setTable,
    setShowListOrder,
    setOpenFinishModal = () => { },
    setOrdersToDetails = () => { },
    isCategories = []
}: {
    orders: any[];
    setOrders: (e: any[]) => void;
    isProducts: any[];
    table: any;
    reload: (e: number) => void;
    loading: boolean;
    setTable: (e: any) => void;
    setShowListOrder: (e: boolean) => void;
    setOpenFinishModal?: (e: boolean) => void;
    setOrdersToDetails?: (e: any[]) => void;
    isCategories: CategoryModel[];
}) {
    const [open, setOpen] = useState<boolean>(false)
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
    const { auth } = useAuthContext()

    const newOrders = () => orders.filter(order => order.action == 'new')

    const buildGroupPrint = (orders) => {
        const printToSend: any = []
        orders.forEach(order => {
            if (order.print) {
                order.print.forEach(element => {
                    if (printToSend[element.name]) {
                        printToSend[element.name].orders.push(order)
                    } else {
                        printToSend[element.name] = {
                            controller: element.controller,
                            print: element.printer,
                            orders: [order]
                        }
                    }
                })
            }
        })

        for (const key in printToSend) {
            if (Object.prototype.hasOwnProperty.call(printToSend, key)) {
                const element = printToSend[key]
                sendToServerPrint(element.print, element.controller, element.orders)
            }
        }
    }

    const sendToServerPrint = async (name: string, controller: 'usb' | 'network', orders: any[]) => {
        const responsePrint = await ConnectPrintServe.printOrder({
            dateOrder: new Date(),
            nameTable: table.name,
            printer: {
                controller: controller,
                name: name
            },
            waiterName: auth.user.name,
            details: orders
        }, `${auth.config.serverPrint}/api/print/order`)

        // if (responsePrint.success) {
        //     message.success(responsePrint.message)
        // }else{
        //     message.warning('Impresión fallida ' + responsePrint.message)
        // }
    }

    const senOrden = async () => {
        setConfirmLoading(true)
        const response = await TableService.sendOrders(table.id, {
            orders: newOrders().map(order => {
                return { ...order, price: order.amount }
            })
        })
        if (response.success) {
            reload(table.id)
            if (auth.config.printOrders != "0") {
                buildGroupPrint(newOrders().map(order => {
                    return { ...order, price: order.amount }
                }))
            }
            message.success(response.message)
        } else {
            message.error(response.message)
        }
        setConfirmLoading(false)
    }

    const addInOrder = (product) => {
        const presentation = product.presentations[0]
        const newOrder = {
            action: 'new',
            amount: presentation.salePrice,
            description: product.name,
            id: 0,
            idPresentation: presentation.id,
            idStore: 1,
            originalQuantity: 1,
            quantity: 1,
            note: '',
            presentations: product.presentations,
            print: product.print
        }

        const detailsSaleDraft = [...orders]
        const posIndex = detailsSaleDraft.findIndex(obj =>
                obj.idPresentation === newOrder.idPresentation &&
                obj.amount === newOrder.amount &&
                obj.note === newOrder.note
            )

        if(posIndex !== -1){
            detailsSaleDraft[posIndex].quantity += 1
            setOrders([...detailsSaleDraft])
        }else{
            setOrders([newOrder, ...detailsSaleDraft])
        }
        // inputRef.current.focus({
        //     cursor: 'start'
        // })
    }

    const changeOrder = (index, field, value) => {
        const draftDetails = [...orders]
        draftDetails[index][field] = value
        setOrders([...draftDetails])
    }

    const deleteOrder = (index: number) => {
        const draftDetails = [...orders]
        draftDetails.splice(index, 1)
        setOrders([...draftDetails])
    }

    return (
        <div className='mt-5 sm:mt-0 w-full'>
            <div className='bg-slate-100 p-6 mb-2 flex justify-between'>
                <Button
                    className='inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-300
                        text-gray-700 hover:!bg-gray-400'
                    type='text'
                    onClick={() => {
                        setTable(null)
                        setShowListOrder(false)
                    }}
                >
                    <ArrowLeftIcon className="h-5 w-5" />
                    <span className='text-base'>Mesas</span>
                </Button>
                <p className="text-2xl font-bold text-gray-900">Mesa <span className='font-black'>{table?.name}</span></p>
                <HeaderActions
                    disabledCharge={orders.length == 0 || orders.filter(obj => obj.action == 'new').length != 0}
                    handleCharge={() => {
                        setOpenFinishModal(true)
                        setOrdersToDetails([...orders])
                    }}

                    disabledSendOrder={newOrders().length == 0}
                    handleSendOrder={() => senOrden()}
                    loadingSendOrder={confirmLoading}
                />
            </div>
            <div className='flex px-4'>
                <div className='w-7/12'>
                    <SearchProduct
                        categories={isCategories}
                        direction='Horizontal'
                        handleAddProduct={addInOrder}
                        inputRef={null}
                        products={isProducts}
                    />
                </div>
                <div className='w-5/12'>
                    <Spin tip="Cargando Ordenes..." spinning={loading}>
                        <div className="grid gap-4 pb-12 w-full h-[400px] overflow-y-auto">

                            {
                                orders.map((order: any, index) => {
                                    return <ItemOrder
                                        key={`${order.id}${index}`}
                                        index={index}
                                        order={order}
                                        editable={order.action === 'new'}
                                        changeOrder={changeOrder}
                                        deleteOrder={deleteOrder}
                                    />
                                })
                            }
                        </div>
                    </Spin>
                </div>
            </div>
        </div>
    )
}

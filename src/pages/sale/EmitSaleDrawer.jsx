import React, { useEffect, useState } from 'react'
import { Drawer, message, Steps, Button } from 'antd'
import DetailSale from './step/DetailSale'
import DocumentSale from './step/DocumentSale'
import { cashCurrentStorage } from '../../../helpers/LocalStorage'
import SaleService from '../../service/SaleService'
import printer from '../../helpers/printer'
import { useAuthContext } from '../../contexts/AuthContext'

const EmitSaleDrawer = ({
    open,
    setOpen,
    products,
    categories=[],
    information,
    getSales,
    typeSale='Ordinary',
    ordersToDetails=[],
    tableSelected=null,
    setShowListOrder=(e) => {}
}) => {
    const [messageApi, contextHolder] = message.useMessage()
    const [detailsSale, setDetailsSale] = useState([])
    const [payments, setPayments] = useState([])
    const [disabledEmit, setDisabledEmit] = useState(true)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const [ isForm, setForm ] = useState(null)
    const [current, setCurrent] = useState(0)

    const { getCash } = cashCurrentStorage()
    const { auth } = useAuthContext()

    const steps = [
        {
            title: 'Detalle',
            content: <DetailSale
                detailsSale={detailsSale}
                setDetailsSale={setDetailsSale}
                isProducts={products}
                categories={categories}
                typeSale={typeSale}
            /> ,
        },
        {
            title: 'Documento',
            content: <DocumentSale
                information={information}
                payments={payments}
                setPayments={setPayments}
                detailsSale={detailsSale}
                setFormSend={setForm}
                setDisabledEmit={setDisabledEmit}
            /> ,
        }
    ]

    const next = () => {
        if(!(current + 1 == 1 && detailsSale.length > 0)){
            message.info('Minimo debe agregar un producto!')
            return;
        }
        setCurrent(current + 1)
    }

    const prev = () => {
        setCurrent(current - 1)
    }

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }))

    const onClose = () => {

        setCurrent(0)
        setDetailsSale([])
        setPayments([])
        setOpen(false)
    }

    const onClickEmit = async () => {
        setConfirmLoading(true)
        const params = {
            sale : {
                customerID: isForm.customerID,
                cashID: getCash().id,
                seriesID: isForm.seriesID,
                type: typeSale,
                tableID: tableSelected ? tableSelected.id : null,
                issue: "",
                voucherToCancel: isForm.activeVoucherToCancel ? isForm.voucherToCancel : null,
                additional: isForm.additional
            },
            payments: payments ?? [],
            detail: detailsSale.map(obj => {
                return {
                    presentationID: obj.idPresentation,
                    quantity: obj.quantity,
                    orderDescription: obj.description,
                    note: obj.note,
                    price: obj.amount,
                    id: obj.id ?? 0
                }
            })
        }

        const response = await SaleService.saveSale(params);

        if (response.success) {
            const data = response.data
            messageApi.open({
                type: 'success',
                content: response.message,
            })
            setShowListOrder(false)
            getSales()
            onClose()
            const printServe = auth.config.printOrders != '0' ? auth.config.serverPrint : false
            try {
                data.printers.forEach(element => {
                    printer.ticket(
                        data.companyID,
                        data.id,
                        element,
                        printServe
                    )
                });
            } catch (error) {

            }
        } else {
            messageApi.open({
                type: 'error',
                content: response.message,
            })
        }
        setConfirmLoading(false)
    }

    useEffect(() => {
        if(typeSale === 'Table'){
            setDetailsSale([...ordersToDetails])
            setCurrent(1)
        }
    }, [])

    return (
        <Drawer
            title={`Registrar Venta ${typeSale && tableSelected ? ` Mesa: ${tableSelected.name}`: ''}`}
            extra={<div>
                {current > 0 && (
                    <Button className={`mr-2 ${typeSale === 'Table' ? 'hidden' : ''}`} onClick={() => prev()}>
                        Anterior
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Siguiente
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" loading={confirmLoading} disabled={disabledEmit} onClick={onClickEmit}>
                        Emitir Venta
                    </Button>
                )}
            </div>}
            className='!w-screen'
            onClose={onClose}
            destroyOnClose={true}
            maskClosable={false}
            open={open}
            styles={{
                body: {
                    paddingBottom: 80
                },
            }}
            placement='left'
        >
            {contextHolder}
            {/* <Steps current={current} items={items} /> */}
            <div className='bg-[--bg-app-50] border-dashed border rounded-md'>{steps[current].content}</div>
        </Drawer>
    )
}

export default EmitSaleDrawer


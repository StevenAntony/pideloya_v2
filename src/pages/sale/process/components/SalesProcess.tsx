import React, { useEffect, useState } from 'react'
import DetailProductInSale from './steps_process/DetailProductInSale'
import DocumentAndPaymentSale from './steps_process/DocumentAndPaymentSale'
import { Button, Drawer, message } from 'antd'
import { useSaleContext } from '@pages/sale/process/hooks/useSaleContext'
type Props = {
    typeSale: 'Ordinary' | 'Table'
    openModalSale: boolean
    onClose: () => void
    tableSelected?: any
}

export default function SalesProcess({
    typeSale = 'Ordinary',
    tableSelected,
    onClose,
    openModalSale
}: Props) {

    const {
        productsInSale,
        loadingForm,
        handleEmitSale,
        totalPayment,
        totalProductsInSale,
        resetProcess
    } = useSaleContext()

    const [currentStep, setCurrentStep] = useState<number>(0)

    const disabledEmit = (totalProductsInSale - totalPayment) > 0 || productsInSale.length === 0

    const stepsSale = [
        {
            title: 'Productos',
            content: <DetailProductInSale typeSale={typeSale} /> ,
        },
        {
            title: 'Documento',
            content: <DocumentAndPaymentSale /> ,
        }
    ]

    const next = () => {
        if(!(currentStep + 1 == 1 && productsInSale.length > 0)){
            message.info('Minimo debe agregar un producto!')
            return;
        }
        setCurrentStep(currentStep + 1)
    }

    const prev = () => {
        setCurrentStep(currentStep - 1)
    }

    useEffect(() => {
        if (!openModalSale) {
            resetProcess()
            setCurrentStep(0)
        }
    }, [openModalSale])


    return (
        <Drawer
            title={`Registrar Venta ${typeSale === 'Table' && tableSelected ? ` Mesa: ${tableSelected.name}`: ''}`}
            extra={<div>
                {currentStep > 0 && (
                    <Button className={`mr-2 ${typeSale === 'Table' ? 'hidden' : ''}`} onClick={() => prev()}>
                        Anterior
                    </Button>
                )}
                {currentStep < stepsSale.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Siguiente
                    </Button>
                )}
                {currentStep === stepsSale.length - 1 && (
                    <Button type="primary" loading={loadingForm} disabled={disabledEmit} onClick={() => {
                        handleEmitSale(typeSale, tableSelected)
                    }}>
                        Emitir Venta
                    </Button>
                )}
            </div>}
            className='!w-screen'
            onClose={onClose}
            destroyOnClose={true}
            maskClosable={false}
            open={openModalSale}
            styles={{
                body: {
                    paddingBottom: 80
                },
            }}
            placement='left'
        >
            {/* <Steps current={current} items={items} /> */}
            <div className='bg-[--bg-app-50] border-dashed border rounded-md'>{stepsSale[currentStep].content}</div>
        </Drawer>
    )
}

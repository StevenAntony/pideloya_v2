import { Button, InputNumber, Switch, message as messageNotify } from 'antd'
import React, { useEffect, useState } from 'react'
import { CompanyService } from '../../service/CompanyService'
import ContentainerConfig from '../../components/app/ContentainerConfig'
import { useAuthContext } from '@contexts/auth/AuthContext'

export default function Configurations() {
    const [searchByBarCode, setSearchByBarCode] = useState<boolean>(false)
    const [minimumStock, setMinimumStock] = useState<number>(0)
    const [showWithZeroStock, setShowWithZeroStock] = useState<boolean>(false)
    const [availableToUpdate, setAvailableToUpdate] = useState<boolean>(false)
    const [printOrders, setPrintOrders] = useState<boolean>(false)
    const [sendMail, setSendMail] = useState<boolean>(false)

    const [loading, setLoading] = useState<boolean>(false)

    const { account, config, company } = useAuthContext()

    const updatedConfig = async () => {
        setLoading(true)
        const service = CompanyService
        await service.updateConfig({
            searchByBarCode: searchByBarCode,
            notificationsStockMinimun: minimumStock,
            showWithZeroStock: showWithZeroStock,
            printOrders: printOrders,
            sendMail: sendMail
        })
        const { success, message } = service.getResponse()
        if (success) {
            account()
            messageNotify.success(message)
        }else{
            messageNotify.error(message)
        }
        setLoading(false)
    }

    const validButtonUpdated = () => {
        if (
            searchByBarCode != config.searchByBarCode ||
            minimumStock != config.notificationsStockMinimun ||
            showWithZeroStock != config.showWithZeroStock ||
            printOrders != config.printOrders ||
            sendMail != config.sendMail
        ) {
            setAvailableToUpdate(true)
        }else{
            setAvailableToUpdate(false)
        }
    }

    useEffect(() => {
        validButtonUpdated()
    }, [searchByBarCode, minimumStock, showWithZeroStock, printOrders, sendMail])

    useEffect(() => {
        setSearchByBarCode(config.searchByBarCode)
        setMinimumStock(config.notificationsStockMinimun ?? 0)
        setShowWithZeroStock(config.showWithZeroStock)

        setPrintOrders(config.printOrders)
        setSendMail(config.sendMail)
        validButtonUpdated()
    }, [])

    return (
        <div className='flex flex-col gap-2'>
            <ContentainerConfig
                key={'searchByBarCode'}
                title={'Lector Codigo Barra'}
                description={'En la venta al buscar producto automaticamente con leer el codigo de barra se agregara el producto.'}
            >
                <Switch value={searchByBarCode} onChange={(value) => setSearchByBarCode(value)} />
            </ContentainerConfig>
            <ContentainerConfig
                key={'notificationsStock'}
                title={'Notificación de Stock'}
                description={`Mostrara en las notificación que tienes producto con stock bajo al limite establecido,
                si lo establecido es 0 no se notificara.`}
            >
                <InputNumber min={0} value={minimumStock} onChange={(value) => setMinimumStock(value ?? 0)} />
            </ContentainerConfig>
            {
                company.businessActivity == 'restaurant' && (
                    <ContentainerConfig
                        key={'printOrders'}
                        title={'Imprimir Ordenes'}
                        description={`Indica que al realizar una nueva orden se imprimira los productos
                        segun su impresora seleccionada.`}
                    >
                        <Switch value={printOrders} onChange={(value) => setPrintOrders(value)} />
                    </ContentainerConfig>
                )
            }
            <ContentainerConfig
                key={'sendMail'}
                title={'Enviar por correo'}
                description={`Permitira enviar el comprobante de venta por correo electronico.`}
            >
                <Switch value={sendMail} onChange={(value) => setSendMail(value)} />
            </ContentainerConfig>
            {/* <ContentainerConfig
                key={'showWithZeroStock'}
                title={'Mostrar sin stock'}
                description={'En la venta al buscar producto me mostrara los proyectos sin stock tambien.'}
            >
                <Switch value={showWithZeroStock} onChange={(value) => setShowWithZeroStock(value)} />
            </ContentainerConfig> */}
            <div>
                <Button type='primary' onClick={updatedConfig} loading={loading} disabled={!availableToUpdate}>
                    Actualizar Configuración
                </Button>
            </div>
        </div>
    )
}

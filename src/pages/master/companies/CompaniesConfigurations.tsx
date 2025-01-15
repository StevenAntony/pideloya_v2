import { Button, Drawer, Input, message, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { CompaniesConfigurationsProps } from './CompaniesProps'
import ContentainerConfig from '../../../components/app/ContentainerConfig'
import { CompanyConfigurationModel } from '../../../models/ConfigurationModel'
import { CompanyService } from '../../../service/CompanyService'
import responseApi from '../../../components/responseApi'

export default function CompaniesConfigurations({
    openConfigurations,
    setOpenConfigurations,
    companySelected
}: CompaniesConfigurationsProps) {
    const [serverPrint, setServerPrint] = useState<string>('')

    const [isConfigurations, setConfiguration] = useState<CompanyConfigurationModel>({
        business_name: companySelected.businessName,
        id: companySelected.id ?? 0,
        ruc: companySelected.ruc,
        configurations: []
    })
    const [loading, setLoading] = useState<boolean>(false)

    const getConfigurations = async () => {
        setLoading(true)
        const service = CompanyService
        await service.show(companySelected.id ?? 0)

        setConfiguration(service.getConfigurations())
        setServerPrint(service.getConfigurations().configurations.find(obj => obj.key === 'serverPrint')?.value ?? '')
        setLoading(false)
    }

    const configurationValue = (key: string) => {
        return isConfigurations.configurations.find(obj => obj.key === key)?.value
    }

    const updatedConfig = async () => {
        const service = CompanyService
        await service.updateConfigaLL({
            config: {
                serverPrint: serverPrint
            },
            companyID: companySelected.id
        })
        const response = service.getResponse()
        if (response.success) {
            getConfigurations()
            message.success(response.message)
        }else{
            message.error(response.message)
        }
    }

    const handleGenerateToken = async () => {
        const service = CompanyService
        await service.generateToken(companySelected.id ?? 0)
        const response = service.getResponse()

        responseApi(response)
        if (response.success) {
            getConfigurations()
        }
    }

    useEffect(() => {
        if (openConfigurations) {
            getConfigurations()
        }
    },[openConfigurations])

    return (
        <Drawer
            title="Configuraciones"
            placement="right"
            open={openConfigurations}
            onClose={() => setOpenConfigurations(false)}
            size='large'
        >
            <Spin spinning={loading} tip="Cargando configuraciones...">
                <h1 className='font-black mb-2'>{companySelected.businessName}</h1>
                <ContentainerConfig
                    key={'serverPrint'}
                    title={'Servidor de Impresión'}
                    description={`Es el serividor de donde se conectara para la impresión de documentos a Ticketeras.`}
                >
                    <div>
                        <Input className='w-64' value={serverPrint} onChange={(e) => setServerPrint(e.target.value)}  />
                    </div>
                </ContentainerConfig>
                <br />
                <ContentainerConfig
                    key={'tokenBilling'}
                    title={'Token de facturación'}
                    description={`Token de facturación, permitira realizar envio a sunat. Mi Token: ${configurationValue('billing_token')}`}
                >
                    <div>
                        <Button type='primary' onClick={handleGenerateToken}>
                            {configurationValue('billing_token') ? 'Renovar token' : 'Generar token'}
                        </Button>
                    </div>
                </ContentainerConfig>

                <Button className='mt-3' onClick={updatedConfig} type='primary'>
                    Actualizar
                </Button>
            </Spin>
        </Drawer>
    )
}

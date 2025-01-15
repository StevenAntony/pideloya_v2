import React, { Provider, useEffect, useState } from 'react'
import { Button, Typography } from "antd"
import { PlusOutlined } from '@ant-design/icons'
import { ProviderModel } from '../../models/ProviderModel'
import { ProviderService } from '../../service/ProviderService'
import ProviderListTable from './ProviderListTable'
import ProviderMaintainerModal from './ProviderMaintainerModal'

const { Title } = Typography

export default function ProviderPage() {
    const [isProviders, setProviders] = useState<ProviderModel[]>([])
    const [providerSelected, setProviderSelected] =  useState<ProviderModel|null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const getProviders = async () => {
        setLoading(true)
        const service = ProviderService
        await service.list()
        setProviders(service.getProviders())
        setLoading(false)
    }

    useEffect(() => {
        getProviders()
    } , [])

    return (
        <div className="mx-20 my-8 shadow-md bg-white">
            <div className="p-8 flex justify-between ">
                <Title level={3}>Proveedores</Title>
                <div>
                    <Button
                        onClick={() => {
                            setProviderSelected(null)
                            setOpen(true)
                        }}
                        type='primary'
                    >
                        <PlusOutlined /> Nuevo Proveedor
                    </Button>
                </div>
            </div>
            <ProviderListTable
                loading={loading}
                dataSource={isProviders}
                setProviderSelected={setProviderSelected}
                setOpen={setOpen}
                providerSelected={providerSelected}
                reload={getProviders}
            />
            {
                open && <ProviderMaintainerModal
                getProviderToBuy={getProviders}
                open={open}
                providerSelected={providerSelected}
                setOpen={setOpen}
                setProviderSelected={setProviderSelected}
            />
            }
        </div>
    )
}

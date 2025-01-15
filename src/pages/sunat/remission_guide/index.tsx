import { Button, Drawer, message, Skeleton, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import RemissionGuideTable from './RemissionGuideTable'
import { Add } from '@mui/icons-material'
import RemissionGuideForm from './RemissionGuideForm'
import CustomerService from '../../../service/CustomerService'
import SeriesService from '../../../service/maintairner/SeriesService'
import { SeriesModel } from '../../../models/SeriesModel'
import ProductService from '../../../service/ProductService'
import { RemissionGuideService } from '../../../service/sunat/RemissionGuideService'
import { RemissionGuideModel } from '../../../models/RemissionGuideModel'

const { Title } = Typography

type Props = {}

export default function RemissionGuidePage({ }: Props) {
    const [isCustomers, setCustomers] = useState<any[]>([])
    const [isRemissionGuides, setRemissionGuides] = useState<RemissionGuideModel[]>([])
    const [isSeries, setSeries] = useState<SeriesModel[]>([])
    const [isProducts, setProducts] = useState<any[]>([])
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)
    const [loadingGetRemission, setLoadingGetRemission] = useState<boolean>(false)
    const [loadingShowRemission, setLoadingShowRemission] = useState<boolean>(false)

    const [remissionGuideSelected, setRemissionGuideSelected] = useState<RemissionGuideModel|null>(null)
    const [remissionGuideEdit, setRemissionGuideEdit] = useState<RemissionGuideModel|null>(null)

    const getRemissionGuides = async () => {
        setLoadingGetRemission(true)
        const service = new RemissionGuideService
        await service.index()
        setRemissionGuides(service.getRemissionGuides())
        setLoadingGetRemission(false)
    }

    const getCustomers = async () => {
        const response = await CustomerService.list()
        setCustomers(response.data)
    }

    const getSeries = async () => {
        const service = new SeriesService
        await service.listSeries()
        const seriesDraft = service.getSeries()
        setSeries(seriesDraft.filter(obj => obj.destination.includes('remission') && obj.active == true))
    }

    const getProducts = async () => {
        const response = await ProductService.getProductForSale()
        setProducts(response.data)
    }

    const handleOpenDrawer = () => {
        setRemissionGuideSelected(null)
        setRemissionGuideEdit(null)
        setOpenDrawer(true)
    }

    const handleCloseDrawer = () => {
        setRemissionGuideSelected(null)
        setRemissionGuideEdit(null)
        setOpenDrawer(false)
    }

    const triggerFinish = () => {
        setOpenDrawer(false)
        getRemissionGuides()
    }

    const getShowRemissionGuide = async () => {
        if(remissionGuideSelected){
            setLoadingShowRemission(true)
            const service = new RemissionGuideService
            await service.show(remissionGuideSelected.id)
            const remissionDraft = service.getRemissionGuide()
            if (remissionDraft) {
                setRemissionGuideEdit({...remissionDraft})
            }else{
                handleCloseDrawer()
                message.error('Error al cargar la guía de remisión')
            }
            setLoadingShowRemission(false)
        }
    }

    useEffect(() => {
        if (openDrawer && remissionGuideSelected) {
            getShowRemissionGuide()
        }
    }, [openDrawer])

    useEffect(() => {
        getCustomers()
        getSeries()
        getProducts()
        getRemissionGuides()
    }, [])

    return (
        <div className="mx-8 my-8 shadow-md bg-white min-h-80">
            <div className='p-4 flex justify-between items-center w-full'>
                <Title level={3} className='!m-0'>Guías Remisión</Title>
                <Button disabled={isSeries.length === 0} type='primary' onClick={handleOpenDrawer}><Add /> Nueva Guía</Button>
            </div>
            <div className='px-4'>
                <RemissionGuideTable
                    remissionGuides={isRemissionGuides}
                    loadingGetRemission={loadingGetRemission}
                    remissionGuideSelected={remissionGuideSelected}
                    setRemissionGuideSelected={setRemissionGuideSelected}
                    getRemissionGuides={getRemissionGuides}
                    setOpenDrawer={setOpenDrawer}
                />
            </div>

            <Drawer
                title="Crear Guía de Remisión"
                width={1000}
                placement="right"
                onClose={handleCloseDrawer}
                destroyOnClose
                open={openDrawer}
                maskClosable={false}
            >
                {
                    loadingShowRemission
                    ? (
                        <>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </>
                    )
                    : (
                        <RemissionGuideForm
                            customers={isCustomers}
                            products={isProducts}
                            series={isSeries}
                            triggerFinish={triggerFinish}
                            remissionGuideEdit={remissionGuideEdit}
                        />
                    )
                }
            </Drawer>
        </div>
    )
}

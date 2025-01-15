import { Button, DatePicker, Modal, Radio, Space, Spin } from 'antd'
import type { RadioChangeEvent } from 'antd'
import React, { useEffect, useState } from 'react'
import { CompaniesLicenseModalProps } from './CompaniesProps'
import { LicenseService } from '../../../service/LicenseService'
import responseApi from '../../../components/responseApi'
import { LicenseModel } from '../../../models/LicenseModel'
import { CalendarOutlined } from '@ant-design/icons'
import { formatDate } from '../../../../helpers/date'

const { RangePicker } = DatePicker

export default function CompaniesLicensesModal({
    companySelected,
    open,
    reload,
    setOpen
}: CompaniesLicenseModalProps) {
    const [dateRange, setDateRange] = useState<string[]>(['', ''])
    const [licenseActive, setLicensesActive] = useState<number>(0)
    const [storeLoading, setStoreLoading] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [isLicenses, setLicenses] = useState<LicenseModel[]>([])

    const storeLicense =async () => {
        setStoreLoading(true)
        const service = LicenseService
        await service.store({
            companyID: companySelected.id ?? 0,
            startDate: dateRange[0],
            endDate: dateRange[1]
        })
        const response = service.getResponse()
        responseApi(response)
        if (response.success) {
            getLicenses()
        }
        setStoreLoading(false)
    }

    const getLicenses = async () => {
        setLoading(true)
        const service = LicenseService
        await service.listMaster(companySelected.id ?? 0)
        const licenseCurrentDraft = service.getLicenses().find(obj => obj.active)
        setLicensesActive(licenseCurrentDraft?.id ?? 0)
        setLicenses(service.getLicenses())
        setLoading(false)
    }

    const activeLicenseCurrent = async (e: RadioChangeEvent) => {
        const service = LicenseService
        await service.update(e.target.value)
        const response = service.getResponse()
        responseApi(response)
        if (response.success) {
            getLicenses()
        }
    }

    const handleCancel = () => {
        setOpen(false)
    }

    useEffect(() => {
        getLicenses()
    }, [])

    return (
        <Modal
            title={`Licencias de Compañia: ${companySelected.businessName}`}
            open={open}
            onCancel={handleCancel}
            footer={null}
            destroyOnClose={true}
        >
            <div className='flex gap-2'>
                <RangePicker
                    onChange={(_, dateString) => {
                        setDateRange(dateString)
                    }}
                    placeholder={['Fecha inicial', 'Fecha final']}
                />
                <Button
                    type='primary'
                    loading={storeLoading}
                    onClick={storeLicense}
                    disabled={!(dateRange[0] && dateRange[1])}
                >
                    Agregar Licencia
                </Button>
            </div>
            <div className='my-3'>
                <Spin spinning={loading} >
                    <p className='text-lg font-bold'>Licencias</p>
                    <Radio.Group onChange={activeLicenseCurrent} value={licenseActive}>
                        <Space direction="vertical">
                            {
                                isLicenses.map((license) => {
                                    return (
                                        <Radio
                                            className='bg-slate-200 border border-slate-400 rounded-sm px-4 w-[400px] py-2'
                                            value={license.id}
                                            key={license.id}
                                        >
                                            <div><CalendarOutlined /> {formatDate(license.start, 'string')} - {formatDate(license.end, 'string')}</div>
                                        </Radio>
                                    )
                                })
                            }
                        </Space>
                    </Radio.Group>
                </Spin>
            </div>
        </Modal>
    )
}

import { Button, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import CompaniesMaintainerModal from './CompaniesMaintainerModal'
import { CompanyService } from '../../../service/CompanyService'
import { CompanyModel } from '../../../models/CompanyModel'
import CompaniesListTable from './CompaniesListTable'
import CompaniesLicensesModal from './CompaniesLicensesModal'
import CompaniesConfigurations from './CompaniesConfigurations'

const { Title } = Typography

export default function CompaniesPage() {
    const [open, setOpen] = useState<boolean>(false)
    const [openLicense, setOpenLicense] = useState<boolean>(false)
    const [openConfigurations, setOpenConfigurations] = useState<boolean>(false)
    const [companySelected, setCompanySelected] = useState<CompanyModel|null>(null)
    const [isCompanies, setCompanies] = useState<CompanyModel[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const getCompanies = async () => {
        setLoading(true)
        const service = CompanyService
        await service.list()
        setCompanies(service.getCompanies())
        setLoading(false)
    }

    useEffect(() => {
        getCompanies()
    }, [])

    return (
        <div className="mx-8 my-8 shadow-md bg-white">
            <div className="p-8 flex justify-between ">
                <Title level={3}>Compañias</Title>
                <div>
                    <Button
                        onClick={() => {
                            setCompanySelected(null)
                            setOpen(true)
                        }}
                        type='primary'
                    >
                        <PlusOutlined /> Nueva Compañia
                    </Button>
                </div>
            </div>
            <div>
                <CompaniesListTable
                    companySelected={companySelected}
                    dataSource={isCompanies}
                    loading={loading}
                    reload={getCompanies}
                    setCompanySelected={setCompanySelected}
                    setOpen={setOpen}
                    setOpenLicense={setOpenLicense}
                    setOpenConfigurations={setOpenConfigurations}
                />
            </div>
            { companySelected && <CompaniesConfigurations
                openConfigurations={openConfigurations}
                setOpenConfigurations={setOpenConfigurations}
                companySelected={companySelected}
            />}
            {
                open && <CompaniesMaintainerModal
                    companySelected={companySelected}
                    open={open}
                    reload={getCompanies}
                    setCompanySelected={setCompanySelected}
                    setOpen={setOpen}
                />
            }
            {
                openLicense && companySelected && <CompaniesLicensesModal
                    companySelected={companySelected}
                    open={openLicense}
                    reload={getCompanies}
                    setOpen={setOpenLicense}
                />
            }
        </div>
    )
}

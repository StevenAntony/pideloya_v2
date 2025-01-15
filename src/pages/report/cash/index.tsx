import React, { useEffect, useState } from 'react'
import ReportList from '../../../components/table/ReportList'
import { Select, Typography } from 'antd'
import CashService from '../../../service/CashService'
import { CashModel } from '../../../models/CashModel'
import DrawerSummary from './summary/DrawerSummary'
import LabelCashOption from '../../../components/app/select/LabelCashOption'

const { Title } = Typography

export default function ReportCashPage() {
    const [isCashes, setCashes] = useState<CashModel[]>([])

    // report summary
    const [cashSelected, setCashSelected] = useState<CashModel|null>(null)
    const [showDrawerSummary, setShowDrawerSummary] = useState<boolean>(false)

    const getCashes =async () => {
        const response = await CashService.listToReport()
        if(response.success){
            setCashes(response.data)
        }
    }

    const filterDateRange = () => {
        return (
            <div>
                <Select
                    className='w-80'
                    value={cashSelected?.id}
                    onChange={(value: number) => {
                        setCashSelected(isCashes.find(cash => cash.id == value) ?? null)
                    }}
                    placeholder={'Seleccione una caja'}
                    options={isCashes.map(cash => {
                        return {
                            label: <LabelCashOption value={cash} />,
                            value: cash.id
                        }
                    })}
                />
            </div>
        )
    }

    const handleSummaryCash = () => {
        if (cashSelected) {
            setShowDrawerSummary(true)
        }
    }

    useEffect(() => {
        getCashes()
    }, [])

    return (
        <div className="mx-8 my-8 shadow-md rounded bg-white">
            <Title level={3} className='p-6 !m-0'>Reporte de Caja</Title>
            <div className='grid gap-3 p-4 pt-0'>
                <ReportList
                    key={4}
                    title='Resumen'
                    description='Obtener resumen que muestra las ventas, compras y movimientos realiazado en la caja selecciona.'
                    resource={['graphic']}
                    renderFilters={filterDateRange()}
                    actions={
                        {
                            graphic: handleSummaryCash
                        }
                    }
                />
            </div>
            <div>
                {
                    showDrawerSummary && cashSelected && (
                        <DrawerSummary
                            open={showDrawerSummary}
                            cashSelected={cashSelected}
                            handleClose={() => setShowDrawerSummary(false)}
                        />
                    )
                }
            </div>
        </div>
    )
}

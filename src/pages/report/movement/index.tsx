import React, { useEffect, useState } from 'react'
import ReportList from '../../../components/table/ReportList'
import { DatePicker, Select, Typography } from 'antd'
import { CashModel } from '../../../models/CashModel'
import LabelCashOption from '../../../components/app/select/LabelCashOption'
import CashService from '../../../service/CashService'
import { useAuthContext } from '@contexts/auth/AuthContext'

const { Title } = Typography
const { RangePicker } = DatePicker

export default function ReportMovementPage() {
    const [isCashes, setCashes] = useState<CashModel[]>([])
    const [cashSelected, setCashSelected] = useState<CashModel|null>(null)
    const [dateRange, setDateRange] = useState<any>(['', ''])

    const { user } = useAuthContext()

    const getCashes =async () => {
        const response = await CashService.listToReport()
        setCashes(response.data)
    }

    const filterCash = () => {
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

    const filterDateRange = () => {
        return (
            <div>
                <RangePicker
                    onChange={(value, dateString) => {
                        setDateRange(dateString)
                    }}
                    placeholder={['Fecha inicial', 'Fecha final']}
                />
            </div>
        )
    }

    useEffect(() => {
        getCashes()
    }, [])

    return (
        <div className="mx-8 my-8 shadow-md rounded bg-white">
            <Title level={3} className='p-6 !m-0'>Reporte de Movimientos</Title>
            <div className='grid gap-3 p-4 pt-0'>
                <ReportList
                    key={1}
                    title='Movimientos por caja'
                    description='Obtener las todos los movimientos por caja seleccionada.'
                    resource={['excel']}
                    renderFilters={filterCash()}
                    actions={
                        {
                            excel: {
                                'type': 'url',
                                'url': (
                                    cashSelected
                                    ? `/excel/report/movement-cash/${user.id}/${cashSelected.id}`
                                    : '#'
                                ),
                            }
                        }
                    }
                />
                <ReportList
                    key={2}
                    title='Movimientos por periodo'
                    description='Obtener las todas los movimientos segun el periodo seleccionado.'
                    resource={['excel']}
                    renderFilters={filterDateRange()}
                    actions={
                        {
                            excel: {
                                'type': 'url',
                                'url': (
                                    dateRange[0] && dateRange[1]
                                    ? `/excel/report/movement-range/${user.id}/${dateRange[0]}/${dateRange[1]}`
                                    : '#'
                                ),
                            }
                        }
                    }
                />
            </div>
        </div>
    )
}

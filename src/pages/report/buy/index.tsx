import React from 'react'
import ReportList from '../../../components/table/ReportList'
import {useState} from "react"
import {DatePicker, Typography} from "antd"
import { useAuthContext } from '@contexts/auth/AuthContext'

const { RangePicker } = DatePicker
const { Title } = Typography

export default function ReportBuyPage() {

    const { user } = useAuthContext()

    const [dateRange, setDateRange] = useState<any>(['', ''])

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

    return (
        <div className="mx-8 my-8 shadow-md rounded bg-white">
            <Title level={3} className='p-6 !m-0'>Reporte de ventas</Title>
            <div className='grid gap-3 p-4 pt-0'>
                <ReportList
                    key={1}
                    title='Compras por periodo'
                    description='Obtener las todas las compras registrado por rango de fechas.'
                    resource={['excel']}
                    renderFilters={filterDateRange()}
                    actions={
                        {
                            excel: {
                                'type': 'url',
                                'url': (
                                    dateRange[0] && dateRange[1]
                                        ? `/excel/report/buy-range/${user.id}/${dateRange[0]}/${dateRange[1]}`
                                        : '#'
                                ),
                            }
                        }
                    }
                />
                <ReportList
                    key={4}
                    title='Compras por pagar. ("No disponible por el momento")'
                    description='Obtener las todas las compras que se tienen pagos por realizar.'
                    resource={['pdf', 'excel']}
                />
            </div>
        </div>
    )
}

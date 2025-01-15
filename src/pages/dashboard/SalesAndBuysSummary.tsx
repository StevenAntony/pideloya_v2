import React, { useEffect, useState } from 'react'
import { Select, Typography } from 'antd'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import FormatCurrency from '../../../helpers/FormatCurrency'
import { current } from '../../../helpers/date'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
}

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre']

export default function SalesAndBuysSummary({
    dataSource,
    dataSourceGraphic,
    yearSelected,
    setYearSelected
}) {

    const { year } = current()

    const [data, setData] = useState<any>( {
        labels,
        datasets: dataSourceGraphic,
    })

    const optionYear = () => {
        let option: Array<any> = []
        for (let i = 2020; i <= year; i++) {
            option.push({
                label: i,
                value: i
            })
        }
        return option
    }

    useEffect(() => {
        setData({
            labels,
            datasets: dataSourceGraphic,
        })
    }, [dataSourceGraphic])

    return (
        <div>
            <div className='flex justify-between'>
                <div className='w-4/12'>
                    <Typography.Title level={4} className='!m-0'>Resumen de venta y compra</Typography.Title>
                    <p className='text-slate-400 font-medium text-sm'>Resumen del último mes</p>
                    <div className='mt-6'>
                        <Typography.Title level={1} className='!m-0 !font-bold' >{FormatCurrency.formatCurrency(dataSource?.currentMonth.totalSales)}</Typography.Title>
                        <p className='text-gray-400 text-sm'>Ventas del último mes</p>
                    </div>
                    <div className='mt-6'>
                        <Typography.Title level={2} className='!m-0 !font-bold' >{dataSource?.currentMonth.countSales}</Typography.Title>
                        <p className='text-gray-400 text-sm'>Cantidad de Ventas del último mes</p>
                    </div>
                    <div className='mt-6'>
                        <Typography.Title level={1} className='!m-0 !font-bold' >{FormatCurrency.formatCurrency(dataSource?.currentMonth.totalBuys)}</Typography.Title>
                        <p className='text-gray-400 text-sm'>Compras del último mes</p>
                    </div>
                    <div className='mt-6'>
                        <Typography.Title level={2} className='!m-0 !font-bold' >{dataSource?.currentMonth.countBuys}</Typography.Title>
                        <p className='text-gray-400 text-sm'>Cantidad de Compras del último mes</p>
                    </div>
                </div>
                <div className='w-8/12'>
                    <div className='text-right'>
                        <Select
                            className='w-32 text-left'
                            options={optionYear()}
                            value={yearSelected}
                            onChange={(value) => setYearSelected(value)}
                        />
                    </div>
                    <Line className='!w-full !h-auto' options={options} data={data} />
                </div>
            </div>
        </div>
    )
}

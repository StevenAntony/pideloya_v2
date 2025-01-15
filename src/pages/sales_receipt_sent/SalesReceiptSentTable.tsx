import React from 'react'
import SaleTable from '../../components/table/SaleTable'
import { Select } from 'antd';
import { current } from '../../../helpers/date';

export default function SalesReceiptSentTable({
    loadingList,
    sales,
    yearSelected,
    setYearSelected,
    monthSelected,
    setMonthSelected
} : {
    loadingList: boolean;
    sales:any;
    yearSelected: number;
    setYearSelected: (e: number) => void;
    monthSelected: string;
    setMonthSelected: (e: string) => void;
}) {

    const { year } = current()

    const optionMonth = [
        {label: 'Enero', value: '1'},
        {label: 'Febrero', value: '2'},
        {label: 'Marzo', value: '3'},
        {label: 'Abril', value: '4'},
        {label: 'Mayo', value: '5'},
        {label: 'Junio', value: '6'},
        {label: 'Julio', value: '7'},
        {label: 'Agosto', value: '8'},
        {label: 'Setiembre', value: '9'},
        {label: 'Octubre', value: '10'},
        {label: 'Noviembre', value: '11'},
        {label: 'Diciembre', value: '12'}
    ]

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

    return (
        <div className="px-8 pb-8">
            <div className='flex gap-4 py-3'>
                <div>
                    <label htmlFor="">Mes</label>
                    <Select
                        className='w-full'
                        value={monthSelected}
                        options={optionMonth}
                        onChange={(value) => setMonthSelected(value)}
                    />
                </div>
                <div>
                    <label htmlFor="">Año</label>
                    <Select
                        className='w-full'
                        value={yearSelected}
                        options={optionYear()}
                        onChange={(value) => setYearSelected(value)}
                    />
                </div>
            </div>
            <SaleTable
                loading={loadingList}
                data={sales}
                view={'sales-receipt-sent'}
                actionRender={null}
            />
        </div>
    )
}

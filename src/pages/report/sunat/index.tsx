import React from 'react'
import ReportList from '../../../components/table/ReportList'

export default function ReportSunatPage() {
    return (
        <div className="mx-8 my-8 shadow-md rounded bg-white">
            <div className='grid gap-3 p-4'>
                <ReportList
                    key={1}
                    title='Comprobantes'
                    description='Obtener los comprobantes de ventas enviados a sunat por mes.'
                    resource={['excel']}
                />
            </div>
        </div>
    )
}

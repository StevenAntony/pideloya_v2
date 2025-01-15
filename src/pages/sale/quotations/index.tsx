import React from 'react'
import QuotationHead from './components/QuotationHead'
import QuotationTable from './components/QuotationTable'
import QuotationFormLateral from './components/QuotationFormLateral'
import { QuotationContextProvider } from './context/QuotationContext'

type Props = {}

export default function QuotationsPage({ }: Props) {
    return (
        <QuotationContextProvider>
            <div className="mx-8 my-8 shadow-md bg-white">
                <QuotationHead />
                <QuotationTable />
                <QuotationFormLateral />
            </div>
        </QuotationContextProvider>
    )
}

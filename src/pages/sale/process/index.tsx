import React from 'react'
import SaleOrdinary from './ordinary'
import { SaleContextProvider } from './contexts/SaleContext'

type Props = {
    type: 'Ordinary' | 'Table'
}

export default function SaleProcessPage({ type }: Props) {

    const typeProcess: any = {
        'Ordinary': <SaleOrdinary />
    }

    return(
        <SaleContextProvider>
            {typeProcess[type]}
        </SaleContextProvider>
    )
}

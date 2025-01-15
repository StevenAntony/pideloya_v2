import { Button, Typography } from 'antd'
import React from 'react'
import { useQuotationContext } from '../hooks/useQuotationContext'
import AuthorizedButton from '@components/app/button/AuthorizedButton'
import { QUOTATION_ACTIONS } from '@constants/authorized'

type Props = {}

const { Title } = Typography

export default function QuotationHead({ }: Props) {

    const { setOpenLateral, setSelectedQuotation } = useQuotationContext()

    return (
        <div className='p-6 flex justify-between'>
            <Title level={3}>Cotizaciones</Title>
            <AuthorizedButton
                action={QUOTATION_ACTIONS.create}
                onClick={() => {
                    setSelectedQuotation(null)
                    setOpenLateral(true)
                }}
                className='!bg-blue-600 !text-white'
            >
                Nueva Cotiazación
            </AuthorizedButton>
        </div>
    )
}

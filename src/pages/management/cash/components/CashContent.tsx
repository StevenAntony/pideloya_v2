import React from 'react'
import CashHead from './CashHead'
import Authorized from '@components/Authorized'
import CashListTable from './CashListTable'
import { CASH_ACTIONS } from '@constants/authorized'

type Props = {}


export default function CashContent({ }: Props) {
    return (
        <div className="">
            <CashHead />
            <Authorized title="Listar cajas" action={CASH_ACTIONS.list}>
                <CashListTable />
            </Authorized>
        </div>
    )
}
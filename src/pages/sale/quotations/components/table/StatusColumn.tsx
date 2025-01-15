import React from 'react'
import { Tag } from 'primereact/tag'
import { statusQuation, StatusQuotationKey } from '@constants/status'


type Props = {
    status: string
}

export default function StatusColumn({ status }: Props) {
    const statusProp = statusQuation[status as StatusQuotationKey] ?? statusQuation.REJECTED

    return <Tag style={{ backgroundColor: statusProp.color }} value={statusProp.name} />
}

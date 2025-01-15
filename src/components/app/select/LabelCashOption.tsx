import React from 'react'
import { CashModel } from '../../../models/CashModel';
import { CloseFullscreen, OpenInFull } from '@mui/icons-material';

type Props = {
    value: CashModel;
}

export default function LabelCashOption({
    value
}: Props) {
    return (
        <div>
            { value.status === 'APERTURADO' ? <OpenInFull sx={{ color: 'green' }} /> : <CloseFullscreen sx={{ color: 'red' }} />}
            <span className='ml-2'>{value.code} - {value.openingDate} : {value.user}</span>
        </div>
    )
}

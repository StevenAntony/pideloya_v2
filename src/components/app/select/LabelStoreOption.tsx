import React from 'react'
import { StoreOutlined } from '@mui/icons-material'
import { StoreModel } from '../../../models/StoreModel'

type Props = {
    value: StoreModel;
}

export default function LabelStoreOption({
    value
}: Props) {
    return (
        <div>
            <StoreOutlined sx={{ color: 'blue' }} />
            <span className='ml-2'>{value.name}</span>
        </div>
    )
}

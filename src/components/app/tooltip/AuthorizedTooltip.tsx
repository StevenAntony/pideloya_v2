import { MESSAGE_UNAUTHORIZED } from '@constants/authorized'
import { useAuthContext } from '@contexts/auth/AuthContext'
import { Warning } from '@mui/icons-material'
import { Tooltip } from 'antd'
import React from 'react'

type Props = {
    action: string
    children: React.ReactNode
}

export default function AuthorizedTooltip({
    action,
    children
}: Props) {

    const { authorizedAction } = useAuthContext()

    const authorized = authorizedAction(action)

    const messageUnauthorized = () => {
        return (
            <div className='flex items-center gap-2'>
                <Warning sx={{ color: 'red' }} /> {MESSAGE_UNAUTHORIZED[action] ?? 'No tiene autorización para esta acción'}
            </div>
        )
    }

    return (
        <Tooltip title={!authorized && messageUnauthorized} overlayClassName='tooltip-white'>
            { children }
        </Tooltip>
    )
}

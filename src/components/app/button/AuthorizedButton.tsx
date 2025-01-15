import { MESSAGE_UNAUTHORIZED } from '@constants/authorized'
import { useAuthContext } from '@contexts/auth/AuthContext'
import { Warning } from '@mui/icons-material'
import { Button, Tooltip } from 'antd'
import type { ButtonProps } from 'antd'
import React from 'react'

type Props = ButtonProps & {
    action: string
}

export default function AuthorizedButton({
    action,
    ...props
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
            <Button {...props} disabled={!authorized}>
                {props.children}
            </Button>
        </Tooltip>
    )
}

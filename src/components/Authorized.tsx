import { Alert } from 'antd'
import React from 'react'
import { useAuthContext } from '@contexts/auth/AuthContext'
import { MESSAGE_UNAUTHORIZED } from '@constants/authorized'

type Props = {
    children: React.ReactNode
    action: string
    title: string
}

export default function Authorized({ children, action, title }: Props) {

    const { authorizedAction } = useAuthContext()

    const authorized = authorizedAction(action)
    const textMessage = MESSAGE_UNAUTHORIZED [action] ?? 'No tiene autorización para esta acción'

    return (
        <>
            {
                authorized ? children : (
                    <div className='px-5 py-4'>
                        <Alert message={title} description={textMessage} type="error" showIcon />
                    </div>
                )
            }
        </>
    )
}

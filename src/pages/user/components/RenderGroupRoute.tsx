import { Checkbox } from 'antd'
import React from 'react'

type Props = {
    children: React.ReactNode
    name: string
    description: string
    action: string
    handleCheckbox: (e: any, action: string) => void
    verifyPolicy: (action: string) => boolean
}

export default function RenderGroupRoute({
    children,
    name,
    description,
    action,
    handleCheckbox,
    verifyPolicy
}: Props) {
    const disabledCheckbox = action === 'web:Home:Home' &&  verifyPolicy(action)

    return (
        <div className='w-3/6 p-2'>
            <div className='border h-full border-gray-400 p-2 rounded'>
                <div>
                    <Checkbox disabled={disabledCheckbox} checked={verifyPolicy(action)} onChange={(e) => handleCheckbox(e, action)}><strong>{name}</strong></Checkbox>
                    <p>{description}</p>
                </div>
                <div className='px-4'>
                    {children}
                </div>
            </div>
        </div>
    )
}

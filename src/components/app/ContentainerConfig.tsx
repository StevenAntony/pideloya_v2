import React from 'react'

export default function ContentainerConfig({ children, title, description }) {
    return (
        <div className='bg-indigo-50 border-indigo-400 border w-[600px] px-3 py-1 rounded-md flex justify-between items-center'>
            <div className='w-[400px]'>
                <p className='font-semibold text-base'>{title}</p>
                <p className='text-[--text-app-muted]'>
                    {description}
                </p>
            </div>
            {children}
        </div>
    )
}

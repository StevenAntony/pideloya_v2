'use client'
import { useAuthContext } from '@/contexts/AuthContext'
import { AlignLeftOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import logo from '@/public/icon-192x192.png'
import onda from '@/public/image/onda.svg'
import Image from 'next/image'
import { useState } from 'react'

const HeaderBar = () => {
    const [isActivePanelOption, setActivePanelOption] = useState<boolean>(false)
    const { authTokens } = useAuthContext()

    return (
        <>
            <div className='bg-[--color-app-500] h-[60px] z-10 fixed w-full shadow-lg flex justify-between items-center px-4 text-white'>
                <button
                    onClick={() => setActivePanelOption(true)}
                >
                    <AlignLeftOutlined style={{ fontSize: '26px' }} />
                </button>
                <div>
                    {authTokens.user.name}
                </div>
                <div>
                    <Image
                        src={logo}
                        priority={true}
                        alt="Picture of the author"
                        className='w-10 h-10'
                    />
                </div>
            </div>
            <div className={`bg-white w-full h-screen z-10 transition-all duration-300 ${isActivePanelOption ? '' : '-translate-x-[100vw]'} fixed top-0`}>
                <div className='bg-[--color-app-500] w-full relative '>
                    <div className='flex justify-between items-center p-4'>
                        <div>
                            <Image
                                src={logo}
                                priority={true}
                                alt="Picture of the author"
                                className='w-10 h-10'
                            />
                        </div>
                        <div className='text-white'>
                            {authTokens.user.name}
                        </div>
                        <button className='bg-white px-3 py-2 rounded-3xl' onClick={() => setActivePanelOption(false)}>
                            <ArrowLeftOutlined style={{color:'#ff2c53'}} />
                        </button>
                    </div>
                    <Image
                        src={onda}
                        priority={true}
                        alt="onda"
                        className='w-full absolute -bottom-[70px]'
                    />
                </div>
            </div>
        </>
    )
}

export default HeaderBar
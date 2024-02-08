'use client'
import { useAuthContext } from '@/contexts/AuthContext'
import { 
    AlignLeftOutlined, 
    ArrowLeftOutlined, 
    KeyOutlined, 
    LogoutOutlined, 
    SettingOutlined,
    QuestionCircleOutlined,
    CommentOutlined,
    BellOutlined
} from '@ant-design/icons'
import logo from '@/public/icon-192x192.png'
import onda from '@/public/image/onda.svg'
import user from '@/public/image/man.png'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Divider, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { useSaleContext } from '@/contexts/SaleContext'
import useStorage from '@/hooks/useStorage'

const HeaderBar = () => {
    const [isActivePanelOption, setActivePanelOption] = useState<boolean>(false)
    const [isCashsItems, setCashsItems] = useState<MenuProps['items']>([])
    const [isCashCurrent, setCashCurrent] = useState<ICash>()

    const { authTokens } = useAuthContext()
    const { isSaleContext } = useSaleContext()
    const { getItem, setItem } = useStorage()

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        const cashCompany = isSaleContext.information.cashCompany
        setItem('CASH_COMPANY', Number(e.key))
        setCashCurrent(cashCompany.find(c => Number(c.id) === Number(e.key)))
    }

    useEffect(() => {
        const cashCompany = isSaleContext.information.cashCompany
        if (cashCompany.length > 0) {
            let cashCurrent = getItem('CASH_COMPANY')
            if (cashCurrent) {
                if (!cashCompany.find(c => c.id === cashCurrent)) { 
                    cashCurrent = cashCompany[0].id
                    setItem('CASH_COMPANY', cashCompany[0].id)
                }
            }else{
                cashCurrent = cashCompany[0].id
                setItem('CASH_COMPANY', cashCompany[0].id)
            }

            setCashCurrent(cashCompany.find(c => c.id === cashCurrent))
        }

        setCashsItems(cashCompany.map( cash => {
            return {
                key: cash.id,
                label: cash.openingDate
            }
        }))

    }, [isSaleContext])

    return (
        <>
            <div className='bg-[--color-app-500] h-[70px] z-10 fixed w-full shadow-lg flex justify-between items-center px-4 text-white'>
                <button
                    onClick={() => setActivePanelOption(true)}
                >
                    <AlignLeftOutlined style={{ fontSize: '26px' }} />
                </button>
                <div className='text-center'>
                    <div>
                        <strong className='text-sm'>Caja Actual</strong>
                    </div>
                    <Dropdown menu={{ items:isCashsItems, onClick: handleMenuClick }}>
                        <a className='text-sm' onClick={(e) => e.preventDefault()}>
                            {isCashCurrent?.openingDate}
                        </a>
                    </Dropdown>
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
                <div className='bg-[--color-app-500] w-full relative h-[70px] flex flex-wrap items-center shadow-md'>
                    <div className='flex justify-between items-center px-4 w-full'>
                        <div>
                            <Image
                                src={logo}
                                priority={true}
                                alt="Picture of the author"
                                className='w-10 h-10'
                            />
                        </div>
                        <div className='text-white'>
                            {process.env.NEXT_PUBLIC_APP_NAME}
                        </div>
                        <button className='bg-white px-3 py-2 rounded-3xl' onClick={() => setActivePanelOption(false)}>
                            <ArrowLeftOutlined style={{color:'#ff2c53'}} />
                        </button>
                    </div>
                    
                    <Image
                        src={onda}
                        priority={true}
                        alt="onda"
                        className='w-full hidden absolute -bottom-[70px]'
                    />
                </div>
                <div className='bg-[--color-app-200] w-full relative shadow-md'>
                    <div className='px-4 py-6 flex items-center'>
                        <div className='pr-3'>
                            <Image
                                src={user}
                                priority={true}
                                alt="onda"
                                className='w-14'
                            />
                        </div>
                        <div className='text-sm'>   
                            <p>{authTokens.user.name}</p>
                            <p>{authTokens.user.email}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full py-4'>
                    <p className='font-bold text-center'>MENU</p>
                    <div className='px-4'>
                        <Link
                            href={'change_password'}
                            className='items-center flex py-2'
                        >
                            <KeyOutlined className='text-[--text-app] text-xl' /> <span className='pl-2 font-semibold'>Cambiar Contraseña</span>
                        </Link>
                        <Link
                            href={'setting'}
                            className='items-center flex py-2'
                        >
                            <SettingOutlined className='text-[--text-app] text-xl' /> <span className='pl-2 font-semibold'>Configuración</span>
                        </Link>

                        <Link
                            href={'setting'}
                            className='items-center flex py-2'
                        >
                            <BellOutlined className='text-[--text-app] text-xl' /> <span className='pl-2 font-semibold'>Notificación</span>
                        </Link>

                        <Divider />

                        <Link
                            href={'#'}
                            className='items-center flex py-2'
                        >
                            <LogoutOutlined className='text-[--text-app] text-xl' /> <span className='pl-2 font-semibold'>Cerrar Sesión</span>
                        </Link>
                        
                        <Link
                            href={'#'}
                            className='items-center flex py-2'
                        >
                            <QuestionCircleOutlined className='text-[--text-app] text-xl' /> <span className='pl-2 font-semibold'>Ayuda</span>
                        </Link>

                        <Link
                            href={'#'}
                            className='items-center flex py-2'
                        >
                            <CommentOutlined className='text-[--text-app] text-xl' /> <span className='pl-2 font-semibold'>Enviar Sugerencias</span>
                        </Link>

                        <div className='pt-16 text-center '>
                            <p className='text-[--text-app-muted]'>PideloYa V1.0.0</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderBar
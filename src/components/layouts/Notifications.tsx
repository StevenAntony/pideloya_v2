import React, { useEffect, useRef, useState } from 'react'
import { BellOutlined, ApartmentOutlined } from '@ant-design/icons'
import { AppService } from '../../service/AppService'
import { NotificationAllModel } from '../../models/AppModel'
import { Link } from 'react-router-dom'

const iconsNotification = (icon: string, type: string) => {
    const color = type === 'warning' ? 'text-amber-400' : 'text-blue-400'

    const icons = {
        'stock': <ApartmentOutlined
            className={`text-2xl ${color}`}
            color='text-blue'
        />
    }

    return icons[icon]
}

const ItemNotification = ({ icon, title, description, link, type }: {
    icon: string;
    title: string;
    description: string;
    link: string|null;
    type: string;
}) => {

    const color = type === 'warning' ? 'amber' : 'blue'

    return (
        <div className='flex flex-row w-full items-center'>
            <div className={`bg-${color}-200 px-[10px] py-2 rounded-full `}>
                {iconsNotification(icon, type)}
            </div>
            <div className='px-2'>
                <p className='text-sm font-bold'>{title}</p>
                <p className='text-xs'>{description}</p>
                { link && <div className='text-right '><Link to={link} className='text-sm text-indigo-500'>Ir a notificación</Link></div> }
            </div>
        </div>
    )
}

export default function Notifications() {
    const [isNotifications, setNotifications] = useState<NotificationAllModel[]>([])
    const [openListNotification, setOpenListNotification] = useState<boolean>(false)
    const boxRef = useRef<any>(null)

    const getNotifications = async () => {
        const service = AppService
        await service.allNotification()
        setNotifications(service.getNotifications())
    }

    const handleClickOutside = (event) => {
        if (boxRef.current && !boxRef.current.contains(event.target)) {
          setOpenListNotification(false);
        }
      }

    useEffect(() => {
        getNotifications()
        document.addEventListener('click', handleClickOutside, true);
        return () => {
        document.removeEventListener('click', handleClickOutside, true);
        }
    }, [])

    return (
        <div className='relative'>
            <div className='relative cursor-pointer' onClick={() => setOpenListNotification(!openListNotification)}>
                <BellOutlined className="text-2xl text-white cursor-pointer" />
                {
                    isNotifications.length > 0 && (
                        <div
                            className='w-5 h-5 rounded-full bg-red-500 text-white absolute
                            -top-2 -right-2 flex justify-center items-center font-bold'
                        >
                            {isNotifications.length}
                        </div>
                    )
                }
            </div>
            {
                openListNotification && (
                    <div ref={boxRef} className='absolute w-[350px] right-0 bg-white shadow-md rounded-md z-20'>
                        <div className='p-4 py-3 font-black'>
                            Notificaciones
                        </div>
                        <hr />
                        <div className='p-4 py-3'>
                            {isNotifications.map((notification, index) => (
                                <ItemNotification
                                    description={notification.description}
                                    icon={notification.icon}
                                    key={index}
                                    link={notification.link}
                                    title={notification.title}
                                    type={notification.type}
                                />
                            ))}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

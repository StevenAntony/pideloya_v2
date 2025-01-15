import React, { useEffect, useState } from 'react'
import ReportList from '../../../components/table/ReportList'
import { Typography, DatePicker, Select } from 'antd'
import CashService from '../../../service/CashService'
import { UserService } from '../../../service/UserService'
import { UserModel } from '../../../models/UserModel'
import { useAuthContext } from '@contexts/auth/AuthContext'

const { Title } = Typography
const { RangePicker } = DatePicker

export default function ReportSalePage() {
    const [dateRange, setDateRange] = useState<any>(['', ''])
    const [cashSelected, setCashSelected] = useState<number|null>(null)
    const [userSelected, setUserSelected] = useState<number|null>(null)

    const [isCashes, setCashes] = useState<any>([])
    const [isUsers, setUsers] = useState<UserModel[]>([])

    const { user } = useAuthContext()

    const getCashes =async () => {
        const response =await CashService.listToReport()
        setCashes(response.data)
    }

    const getUsers =async () => {
        const userService = UserService;
        await userService.all()
        setUsers(userService.getUsers())
    }

    const filterDateRange = () => {
        return (
            <div>
                <RangePicker
                    onChange={(value, dateString) => {
                        setDateRange(dateString)
                    }}
                    placeholder={['Fecha inicial', 'Fecha final']}
                />
            </div>
        )
    }

    const filterCashes = () => {
        return (
            <Select
                placeholder={'Filtrar por caja'}
                className='w-[400px]'
                value={cashSelected}
                options={isCashes.map((value: any) => {
                    return {
                        label: `${value.code} - ${value.openingDate} : ${value.user}`,
                        value: value.id
                    }
                })}
                onChange={(value) => setCashSelected(value)}
            />
        )
    }

    const filterUsers = () => {
        return (
            <Select
                placeholder={'Filtrar por usuario'}
                className='w-[400px]'
                value={userSelected}
                options={isUsers.map((value) => {
                    return {
                        label: `${value.name}`,
                        value: value.id
                    }
                })}
                onChange={(value) => setUserSelected(value)}
            />
        )
    }

    useEffect(() => {
        getCashes()
        getUsers()
    }, [])

    return (
        <div className="mx-8 my-8 shadow-md rounded bg-white">
            <Title level={3} className='p-6 !m-0'>Reporte de ventas</Title>
            <div className='grid gap-3 p-6 pt-0'>
                <ReportList
                    key={1}
                    title='Ventas por periodo'
                    description='Obtener las todas las ventas registrado por rango de fechas.'
                    resource={['excel']}
                    renderFilters={filterDateRange()}
                    actions={
                        {
                            excel: {
                                'type': 'url',
                                'url': (
                                    dateRange[0] && dateRange[1]
                                    ? `/excel/report/sale-range/${user.id}/${dateRange[0]}/${dateRange[1]}`
                                    : '#'
                                ),
                            }
                        }
                    }
                />
                <ReportList
                    key={2}
                    title='Ventas por caja'
                    description='Obtener las todas las ventas registrados en una caja especifica.'
                    resource={['excel']}
                    renderFilters={filterCashes()}
                    actions={
                        {
                            excel: {
                                'type': 'url',
                                'url': (
                                    cashSelected
                                    ? `/excel/report/sale-cash/${user.id}/${cashSelected}`
                                    : '#'
                                ),
                            }
                        }
                    }
                />
                <ReportList
                    key={3}
                    title='Ventas por usuario'
                    description='Obtener las todas las ventas registrados por un usuario.'
                    resource={['excel']}
                    renderFilters={filterUsers()}
                    actions={
                        {
                            excel: {
                                'type': 'url',
                                'url': (
                                    userSelected
                                    ? `/excel/report/sale-user/${user.id}/${userSelected}`
                                    : '#'
                                ),
                            }
                        }
                    }
                />
                <ReportList
                    key={4}
                    title='Ventas con deuda'
                    description='Obtener las todas las ventas que se tienen pagos por cobrar.'
                    resource={['excel']}
                    actions={
                        {
                            excel: {
                                'type': 'url',
                                'url': `/excel/report/sale-debit/${user.id}`,
                            }
                        }
                    }
                />
            </div>
        </div>
    )
}

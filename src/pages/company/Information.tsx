import { Button, Input, InputNumber, Switch, message } from 'antd'
import React, { useEffect, useState } from 'react'
import Logo from './components/Logo'
import { CompanyModel } from '../../models/CompanyModel'
import { CompanyService } from '../../service/CompanyService'


export default function Information() {

    const [isCompany, setCompany] = useState<CompanyModel>({
        ruc: '',
        address: '',
        betaBilling: true,
        businessName: '',
        demo: true,
        email: '',
        key_sol: '',
        phone: '',
        user_sol: '',
        logo: ''
    })
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

    const findCompany = async () => {
        const service = CompanyService
        await service.find()
        if (service.getResponse().success) {
            setCompany(service.getCompany())
        }
    }

    const updateCompany = async () => {
        setConfirmLoading(true)
        const service = CompanyService
        await service.update(isCompany)
        if (service.getResponse().success) {
            message.success(service.getResponse().message)
            findCompany()
        }else{
            message.error(service.getResponse().message)
        }
        setConfirmLoading(false)
    }

    useEffect(() => {
        findCompany()
    }, [])

    return (
        <div className='flex flex-wrap pr-10 w-6/12'>
            <div className='w-4/12 p-2'>
                <Logo
                    company={isCompany}
                    changeLogo={(url: string) => setCompany({...isCompany, logo: url})}
                />
            </div>
            <div className='w-8/12 p-2'>
                <div>
                    <label htmlFor="value">RUC</label>
                    <InputNumber
                        className='w-full'
                        placeholder=""
                        name={'ruc'}
                        value={isCompany?.ruc}
                        onChange={(value) => setCompany({...isCompany, ruc: value ?? ''})}
                    />
                </div>
                <div>
                    <label htmlFor="name">Razon Social</label>
                    <Input
                        placeholder=""
                        name={'name'}
                        value={isCompany.businessName}
                        onChange={(e) => setCompany({...isCompany, businessName: e.target.value ?? ''})}
                    />
                </div>
            </div>
            <div className='w-full p-2'>
                <label htmlFor="address">Dirección</label>
                <Input
                    placeholder=""
                    name={'address'}
                    value={isCompany.address}
                    onChange={(e) => setCompany({...isCompany, address: e.target.value ?? ''})}
                />
            </div>
            <div className='w-6/12 p-2'>
                <label htmlFor="email">Email</label>
                <Input
                    placeholder=""
                    name={'email'}
                    value={isCompany.email}
                    onChange={(e) => setCompany({...isCompany, email: e.target.value ?? ''})}
                />
            </div>
            <div className='w-6/12 p-2'>
                <label htmlFor="phone">Telefono</label>
                <Input
                    placeholder=""
                    name={'phone'}
                    value={isCompany.phone}
                    onChange={(e) => setCompany({...isCompany, phone: e.target.value ?? ''})}
                />
            </div>
            <div className='w-4/12 p-2'>
                <label htmlFor="user_sol">Usuario Sol</label>
                <Input
                    placeholder=""
                    name={'user_sol'}
                    value={isCompany.user_sol}
                    onChange={(e) => setCompany({...isCompany, user_sol: e.target.value ?? ''})}
                />
            </div>
            <div className='w-4/12 p-2'>
                <label htmlFor="key_sol">Clave Sol</label>
                <Input
                    placeholder=""
                    name={'key_sol'}
                    value={isCompany.key_sol}
                    onChange={(e) => setCompany({...isCompany, key_sol: e.target.value ?? ''})}
                />
            </div>

            <div className='w-full p-2'>
                <Button
                    loading={confirmLoading}
                    onClick={updateCompany}
                >
                    Actualizar
                </Button>
            </div>
        </div>
    )
}

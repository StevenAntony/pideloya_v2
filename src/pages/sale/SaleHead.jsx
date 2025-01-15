import React from 'react'
import { Typography , Button, Tooltip, Select } from 'antd'
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useAuthContext } from '../../contexts/AuthContext'
import { useAppContext } from '../../contexts/AppContext'

const { Title } = Typography

const SaleHead = ({
    setOpen,
    disabled
  }) => {
    const { auth } = useAuthContext()
    const { priceTypeApp, updatedPriceTypeApp } = useAppContext()

    return (
        <>
            <div className="p-8 pb-0 flex justify-between ">
                <Title level={3} className='flex px-2'>Ventas
                    <Tooltip title="Se muestran las ventas de la caja seleccionada" color={'blue'}>
                        <div className='px-2 cursor-pointer'><QuestionCircleOutlined className='text-base text-blue-800' /></div>
                    </Tooltip>
                </Title>
                {
                    auth.company.businessActivity === 'distributor' && (
                        <div>
                            <Select
                                className='w-40'
                                value={priceTypeApp}
                                onChange={(value) => updatedPriceTypeApp(value)}
                                options={[
                                    {
                                        'label': 'Precio Público',
                                        'value': 'public'
                                    },
                                    {
                                        'label': 'Precio Distribuidor',
                                        'value': 'dristributor'
                                    }
                                ]}
                            />
                        </div>
                    )
                }
                <div>
                    <Button
                        disabled={disabled}
                        onClick={() => {
                            setOpen(true)
                        }}
                        type='primary'
                    >
                        <PlusOutlined /> Emitir Venta
                    </Button>
                </div>
            </div>
        </>
    )
}

export default SaleHead

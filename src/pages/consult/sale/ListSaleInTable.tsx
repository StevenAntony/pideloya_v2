import React, { useState } from 'react'
import SaleTable from '../../../components/table/SaleTable'
import { Button, Dropdown, message, notification, Select, Tooltip } from 'antd'
import type { MenuProps } from 'antd'
import { UnorderedListOutlined, FilePdfOutlined, EllipsisOutlined, PrinterOutlined, MailOutlined } from '@ant-design/icons'
import { MailService } from '../../../service/MailService'
import { useAuthContext } from '@contexts/auth/AuthContext'

type Props = {
    sales: any[];
    loading: boolean;
    setOpenViewPaymentHistory: (open: boolean) => void;
    setSaleSelected: (sale: any | null) => void;
    saleSelected: any | null;
}

export default function ListSaleInTable({
    sales,
    loading,
    setOpenViewPaymentHistory,
    saleSelected,
    setSaleSelected
}: Props) {
    const [api, contextHolder] = notification.useNotification()
    const [loadingMail, setLoadingMail] = useState<boolean>(false)

    const { config } = useAuthContext()

    const openNotificationWithIcon = (message: string) => {
        api.open({
            message: 'Correo',
            type: 'success',
            description: message,
            duration: 5
        })
    }

    const items: MenuProps['items'] = [
        {
            key: 'view-pdf',
            icon: <FilePdfOutlined />,
            label: (
                <a href={`/pdf/saleA4/${saleSelected?.companyID}/${saleSelected?.key}`} target='_black'>Visualizar Pdf</a>
            ),
        },
        {
            key: 'view-ticket',
            icon: <PrinterOutlined />,
            label: (
                <a href={`/pdf/sale_ticket/${saleSelected?.companyID}/${saleSelected?.key}`} target='_black'>Visualizar Ticket</a>
            ),
        },
        {
            key: 'send-mail',
            icon: <MailOutlined />,
            disabled: loadingMail || !config.sendMail,
            label: (
                <Tooltip title={!config.sendMail ? 'No tiene configurado el envio de correos' : ''}  placement='leftBottom'>
                    <span>Enviar Correo</span>
                </Tooltip>
            ),
        },
        {
            key: 'view-payment-history',
            icon: <UnorderedListOutlined />,
            label: (
                <span>Historial Pagos</span>
            ),
        }
    ]

    const sendMail = async () => {
        setLoadingMail(true)
        message.loading('Enviando Correo', 0)
        const service = new MailService()
        await service.sendInvoice(saleSelected?.key)
        message.destroy()
        openNotificationWithIcon(service.getResponse().message)
        setLoadingMail(false)
    }

    const onClick = (props) => {
        if (props.key === 'view-payment-history') {
            setOpenViewPaymentHistory(true)
        } else if (props.key === 'send-mail') {
            sendMail()
        }
    }

    return (
        <div>
            {contextHolder}
            <SaleTable
                loading={loading}
                data={sales}
                view={'Ordinary'}
                actionRender={(_, record) => (
                    <div className='text-center'>
                        <Dropdown menu={{ items, onClick }} trigger={['click']} placement="bottomRight">
                            <Button
                                onClick={() => setSaleSelected(record)}
                                icon={<EllipsisOutlined />}
                            />
                        </Dropdown>
                    </div>
                )}
            />
        </div>
    )
}

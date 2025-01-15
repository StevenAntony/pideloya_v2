import { Button, Dropdown, MenuProps, Spin } from 'antd'
import React from 'react'
import StatusColumn from './StatusColumn'
import { QuotationListModel } from '@models/sale/QuotationModel'
import { FilePdfOutlined, MailFilled, MoreOutlined } from '@ant-design/icons'
import { Delete, Edit, Update } from '@mui/icons-material'
import { confirmDialog } from 'primereact/confirmdialog'
import { useAuthContext } from '@contexts/auth/AuthContext'
import AuthorizedTooltip from '@components/app/tooltip/AuthorizedTooltip'
import { QUOTATION_ACTIONS } from '@constants/authorized'

type Props = {
    record: QuotationListModel,
    setSelectedQuotation: React.Dispatch<React.SetStateAction<QuotationListModel|null>>
    loadingOption: boolean
    deleteQuotation: () => void
    changeStatus: (status: string) => void
    setOpenLateral: React.Dispatch<React.SetStateAction<boolean>>
    showQuotation: () => void
    sendMail: () => void
}

export default function OptionsColumn({
    record,
    setSelectedQuotation,
    loadingOption,
    deleteQuotation,
    changeStatus,
    setOpenLateral,
    showQuotation,
    sendMail
}: Props) {

    const { config, authorizedAction } = useAuthContext()

    const itemsOptions: MenuProps['items'] = [
        {
            key: 'send_mail',
            label:   (
                <AuthorizedTooltip action={QUOTATION_ACTIONS.sendMail}>
                    <Spin spinning={loadingOption}>Enviar correo</Spin>
                </AuthorizedTooltip>
            ),
            icon: <MailFilled />,
            disabled: !config.sendMail || !authorizedAction(QUOTATION_ACTIONS.sendMail)
        },
        { key: 'pdf', label: <a href={`${record.urlPDF}`} target="_blank" rel="noopener noreferrer">PDF</a>, icon: <FilePdfOutlined /> },
        {
            key: 'edit',
            label: (
                <AuthorizedTooltip action={QUOTATION_ACTIONS.update}>
                    <Spin spinning={loadingOption}>Editar</Spin>
                </AuthorizedTooltip>
            ),
            icon: <Edit />,
            disabled: ['rejected', 'done', 'approved'].includes(record.status)  || !authorizedAction(QUOTATION_ACTIONS.update)
        },
        {
            key: 'delete',
            label: (
                <AuthorizedTooltip action={QUOTATION_ACTIONS.delete}>
                    <Spin spinning={loadingOption}>Eliminar</Spin>
                </AuthorizedTooltip>
            ),
            icon: <Delete />,
            disabled: ['rejected', 'done', 'approved'].includes(record.status) || !authorizedAction(QUOTATION_ACTIONS.delete)
        },
    ];

    let items: MenuProps['items'] = []

    if (record.status === 'pending') {
        items.push({
            key: 'approved',
            label: (
                <AuthorizedTooltip action={QUOTATION_ACTIONS.changeStatus}>
                    <Spin spinning={loadingOption}><StatusColumn status="APPROVED" /></Spin>
                </AuthorizedTooltip>
            ),
            icon: <Update />,
            disabled: !authorizedAction(QUOTATION_ACTIONS.changeStatus)
        })
    }

    if (['approved', 'pending'].includes(record.status)) {
        items.push({
            key: 'rejected',
            label: (
                <AuthorizedTooltip action={QUOTATION_ACTIONS.changeStatus}>
                    <Spin spinning={loadingOption}><StatusColumn status="REJECTED" /></Spin>
                </AuthorizedTooltip>
            ),
            icon: <Update />,
            disabled: !authorizedAction(QUOTATION_ACTIONS.changeStatus)
        })
    }

    const onClick: MenuProps['onClick'] = ({ key }) => {

        if (key === 'delete') {
            confirmDialog({
                message: '¿Desea eliminar la cotización, este proceso no se puede revertir?',
                header: 'Eliminar la cotización',
                icon: 'pi pi-info-circle',
                acceptClassName: 'p-button-danger',
                contentClassName: '!w-[400px]',
                defaultFocus: 'accept',
                acceptLabel: 'Eliminar',
                minX: 400,
                accept: () => deleteQuotation(),
                reject: () => {}
            })
        }

        if (key === 'approved') {
            confirmDialog({
                message: '¿Desea aprobar la cotización, este proceso no se puede revertir?',
                header: 'Aprobar cotización',
                icon: 'pi pi-exclamation-triangle',
                contentClassName: '!w-[400px]',
                defaultFocus: 'accept',
                acceptLabel: 'Aprobar',
                minX: 400,
                accept: () => changeStatus('approved'),
                reject: () => {}
            })
        }

        if (key === 'rejected') {
            confirmDialog({
                message: '¿Desea Rechazar la cotización, este proceso no se puede revertir?',
                header: 'Rechazar cotización',
                icon: 'pi pi-info-circle',
                contentClassName: '!w-[400px]',
                acceptClassName: 'p-button-danger',
                defaultFocus: 'accept',
                acceptLabel: 'Rechazar',
                minX: 400,
                accept: () => changeStatus('rejected'),
                reject: () => {}
            })
        }

        if (key === 'edit') {
            showQuotation()
            setOpenLateral(true)
        }

        if(key === 'send_mail') {
            sendMail()
        }
    }

    return (
        <Dropdown
            menu={{ items: [...itemsOptions, ...items], onClick }}
            placement="bottomLeft"
            trigger={['click']}
        >
            <Button size='small' onClick={() => setSelectedQuotation(record)}><MoreOutlined /></Button>
        </Dropdown>
    )
}

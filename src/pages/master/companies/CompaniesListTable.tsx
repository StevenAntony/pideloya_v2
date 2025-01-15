import React from 'react'
import { Button, Dropdown, message } from 'antd'
import {
    EditOutlined,
    SyncOutlined,
    EllipsisOutlined,
    AuditOutlined,
    SettingOutlined
} from '@ant-design/icons'
import { ComapiesListTableProps } from './CompaniesProps'
import CompanyTable from '../../../components/table/CompanyTable'
import { CompanyService } from '../../../service/CompanyService'

export default function CompaniesListTable({
    loading,
    dataSource,
    setCompanySelected,
    setOpen,
    companySelected,
    reload,
    setOpenLicense,
    setOpenConfigurations
}: ComapiesListTableProps) {

    const items = (row) => [
        {
            key: 'edit',
            label: <><EditOutlined /> Editar</>
        },
        {
            key: 'licenses',
            label: <><AuditOutlined /> Licencias</>
        },
        {
            key: 'configuration',
            label: <><SettingOutlined /> Configuraciones</>
        },
        {
            key: 'status',
            label: <><SyncOutlined /> {row.status ? 'Desactivar' : 'Activar'}</>,
        }
    ]

    const updatedStatus =async (id) => {
        const service = CompanyService
        await service.changeStatus(id)
        const response = service.getResponse()
        if (response.success) {
            reload()
            message.success('Dado de baja correctamente')
        }else{
            message.error(response.message)
        }
    }

    const onClick = (props) => {
        if (props.key === 'edit') {
            setOpen(true)
        } else if (props.key === 'status') {
            updatedStatus(companySelected?.id)
        } else if (props.key === 'licenses') {
            setOpenLicense(true)
        } else if (props.key === 'configuration') {
            setOpenConfigurations(true)
        }
    }

    return (
        <CompanyTable
            actionRender={(_, record) => (
                <Dropdown trigger={['click']} menu={{ items: items(record), onClick }} placement="bottomLeft" arrow>
                    <Button onClick={() => setCompanySelected(record)} ><EllipsisOutlined /></Button>
                </Dropdown>
            )}
            dataSource={dataSource}
            loading={loading}
            view='maintainer'
        />
    )
}

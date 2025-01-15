import { Table, Tag } from 'antd'

const CustomerTable = ({
    loading,
    data,
    view,
    actionRender = null,
    rowClassName
}) => {
    const columns = [
        {
            title: 'Nombres',
            dataIndex: 'firstName',
            key: 'firstName'
        },
        {
            title: 'Apellidos',
            dataIndex: 'lastName',
            key: 'lastName'
        },
        {
            title: 'Tipo',
            dataIndex: 'documentType',
            key: 'documentType'
        },
        {
            title: 'Documento',
            dataIndex: 'document',
            key: 'document'
        },
        {
            title: 'Dirección',
            dataIndex: 'address',
            key: 'address'
        }
    ]

    if (view === 'maintainer') {
        columns.push({
            title: 'Telefono',
            dataIndex: 'phone',
            key: 'phone'
        })

        columns.push({
            title: 'Correo',
            dataIndex: 'email',
            key: 'email'
        })

        columns.push({
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: (_, { status }) => (
                <>
                    <Tag color={status ? 'geekblue' : 'red'} >
                        {status ? 'Disponible' : 'Anulado'}
                    </Tag>
                </>
            )
        })
    }

    if (actionRender) {
        columns.push({
            title: 'Acción',
            key: 'action',
            render: actionRender
        })
    }

    return (
        <div className="px-8 pb-8">
            <Table
                loading={loading}
                bordered={true}
                columns={columns}
                dataSource={data}
                rowClassName={rowClassName}
            />
        </div>
    )
}

export default CustomerTable

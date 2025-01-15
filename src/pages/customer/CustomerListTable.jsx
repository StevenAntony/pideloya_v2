import { Button, Dropdown, message } from 'antd'
import {
    EditOutlined,
    SyncOutlined,
    EllipsisOutlined
} from '@ant-design/icons'
import CustomerTable from "../../components/table/CustomerTable"
import CustomerService from '../../service/CustomerService'

const CustomerListTable = ({
    isCustomer,
    loadingList,
    getCustomer,
    setOpen,
    setEdit,
    setSelectedCustomer,
    selectedCustomer
}) => {

    const items = (row) => [
        {
            key: 'edit',
            label: <><EditOutlined /> Editar</>
        },
        {
            key: 'status',
            label: <><SyncOutlined /> {row.status ? 'Desactivar' : 'Activar'}</>,
        }
    ]

    const updatedStatus =async (id) => {
        const response =await CustomerService.updatedStatus(id)
        if (response.success) {
            getCustomer()
            message.success('Dado de baja correctamente')
        }else{
            message.error(response.message)
        }
    }

    const onClick = (props) => {
        if (props.key === 'edit') {
            setEdit(true)
            setOpen(true)
        } else if (props.key === 'status') {
            updatedStatus(selectedCustomer?.key)
        }
    }

    return (
        <CustomerTable
            data={isCustomer}
            loading={loadingList}
            view={'maintainer'}
            actionRender={(_, record) => (
                <Dropdown trigger={['click']} menu={{ items: items(record), onClick }} placement="bottomLeft" arrow>
                    <Button onClick={() => setSelectedCustomer(record)} ><EllipsisOutlined /></Button>
                </Dropdown>
            )}
            rowClassName={(record, index) => {
                return record.status ? 'row-active' : '!bg-rose-100 !text-rose-700'
            }}
        />
    )
}

export default CustomerListTable

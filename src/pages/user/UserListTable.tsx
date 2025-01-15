import React from 'react'
import { Table, Tag, Dropdown, Button } from 'antd'
import type { TableProps } from 'antd'
import {
  EditOutlined,
  PartitionOutlined,
  EllipsisOutlined,
  SyncOutlined
} from '@ant-design/icons'
import { UserListModel } from '../../models/security/UserModel'
import { useUserContext } from '../../contexts/page/security/UserContext'
import { UserListProps } from './UserProps'

const UserListTable = ({ setSelectedRow } : UserListProps) => {

  const {
    isUsers,
    loadingList,
    changeStatus,
    setOpenFormModal,
    setOpenPolicyModal
  } = useUserContext()

  const handleClickMenu = (props: any, userID: number) => {
    if (props.key === 'edit') {
      setOpenFormModal(true)
    } else if (props.key === 'access') {
      // setOpenAccess(true)
    } else if (props.key === 'status') {
      changeStatus(userID)
    } else if (props.key === 'policy') {
      setOpenPolicyModal(true)
    }
  }

  const items = (row: UserListModel) => [
    {
      key: 'edit',
      disabled: row.active ? false : true,
      label: <><EditOutlined /> Editar</>
    },
    {
      key: 'access',
      disabled: true,
      label: <><PartitionOutlined /> Acceso</>
    },
    {
      key: 'policy',
      disabled: row.active ? false : true,
      label: <><PartitionOutlined /> Politicas</>
    },
    {
      key: 'status',
      label: <><SyncOutlined /> {row.active ? 'Desactivar' : 'Activar'}</>,
    }
  ]

  const columns: TableProps<UserListModel>['columns'] = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Usuario',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      render: (_, { type }) => (
        <>
          <Tag color={type.color}>
            {type.name}
          </Tag>
        </>
      )
    },
    {
      title: 'Acción',
      key: 'action',
      render: (_, record) => (
        <Dropdown
          trigger={['click']}
          menu={{ items: items(record), onClick: (props) => handleClickMenu(props, record.id) }}
          placement="bottomLeft"
          arrow
        >
          <Button onClick={() => setSelectedRow(record)} ><EllipsisOutlined /></Button>
        </Dropdown>
      ),
    },
  ]

  return (
    <div className="p-8">
      <Table
        loading={loadingList}
        bordered={true}
        columns={columns}
        dataSource={isUsers}
        rowClassName={(record, index) => {
          return record.active ? 'row-active' : '!bg-rose-100 !text-rose-700'
        }}
        rowKey={record => record.id}
      />
    </div>
  )
}

export default UserListTable

import React from 'react'
import { Typography, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useUserContext } from '../../contexts/page/security/UserContext'

const { Title } = Typography

const UserHead = ({ setSelectedRow }) => {

  const { setOpenFormModal } = useUserContext()

  return (
    <>
      <div className="p-8 flex justify-between ">
        <Title level={3}>Usuarios</Title>
        <div>
          <Button
            onClick={() => {
              setOpenFormModal(true)
              setSelectedRow(null)
            }}
            type='primary'
          >
            <PlusOutlined /> Nuevo Usuario
          </Button>
        </div>
      </div>
    </>
  )
}

export default UserHead

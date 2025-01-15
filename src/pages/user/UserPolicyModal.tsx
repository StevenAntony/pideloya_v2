import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Drawer, Space, Spin, Tabs } from 'antd';
import { UserPolicyModalProps } from './UserProps';
import { useUserContext } from '@contexts/page/security/UserContext';
import RoutesList from './components/RoutesList';

const UserPolicyModal = ({
  selectedUser
}: UserPolicyModalProps) => {

  const { openPolicyModal, setOpenPolicyModal, isRoutes, loadingPolicy, createOrUpdatePolicy } = useUserContext()
  const [actions, setActions] = useState<string[]>([])

  const handleSubmit = () => createOrUpdatePolicy(actions, selectedUser.id)

  useEffect(() => {
    setActions([])
    if (selectedUser?.policies) {
      const policies = JSON.parse(selectedUser.policies)
      const actionsUser = policies.Statement.map((statement: any) => {
        if (statement.Effect === 'Allow') {
          return statement.Action
        }
      })
      setActions(actionsUser[0])
    }
  }, [openPolicyModal])

  return (
    <Drawer
      title="Políticas de acceso"
      placement="right"
      closable={true}
      size='large'
      onClose={() => setOpenPolicyModal(false)}
      open={openPolicyModal}
      extra={
        <Space>
          <Button onClick={() => setOpenPolicyModal(false)}>Cancel</Button>
          <Button onClick={() => handleSubmit()} loading={loadingPolicy} type="primary">
            Actualizar
          </Button>
        </Space>
      }
    >
      <div>
        <Spin spinning={loadingPolicy}>
            <Tabs
                className='h-[550px]'
                tabPosition={'left'}
                items={isRoutes.map((route, index) => {
                    return {
                        label: route.name,
                        key: route.id,
                        children: <RoutesList
                            routes={route.routes}
                            actions={actions}
                            setActions={setActions}
                            key={route.id}
                        />,
                    }
                })}
            />
        </Spin>
      </div>
    </Drawer>
  )
}

export default UserPolicyModal

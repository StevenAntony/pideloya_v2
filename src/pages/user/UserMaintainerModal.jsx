import React, { useEffect, useState } from 'react'
import { Select, Modal, Input, Button } from 'antd'
import { TYPES_USER_STORE } from '../../../helpers/Init'
import { useAuthContext } from '../../contexts/AuthContext'
import { useUserContext } from '../../contexts/page/security/UserContext'

const UserMaintainerModal = ({
  edit,
  setEdit
}) => {
  const INIT = {
    type: 'admin',
    name: '',
    email: '',
    password: ''
  }
  const [form, setForm] = useState(INIT)
  const { auth } = useAuthContext()

  const { createOrUpdateUser, loadingForm, setOpenFormModal, openFormModal } = useUserContext()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSelect = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    })
  }

  const onSend = () => {
    form.userID = edit?.id
    createOrUpdateUser({ ...form }, edit)
  }

  useEffect(() => {
    setForm(INIT)
    if (edit) {
      setForm({
        type: edit.type.value,
        name: edit.name,
        email: edit.email,
        password: ''
      })
    }
  }, [openFormModal])

  return (
    <Modal
      title={edit ? 'Editar Usuario' : 'Registrar Usuario'}
      open={openFormModal}
      confirmLoading={loadingForm}
      onCancel={() => {
        setOpenFormModal(false)
        setEdit(null)
      }}
      footer={
        <>
          <Button onClick={() => {
            setOpenFormModal(false)
            setEdit(null)
          }}>Cancelar</Button>
          <Button onClick={onSend} disabled={loadingForm} type="primary">
            {!edit ? 'Registrar' : 'Editar'}
          </Button>
        </>
      }
    >
      <div className='flex flex-wrap'>
        <div className='w-4/12 p-2'>
          <label htmlFor="type">Tipo</label>
          <Select
            className='w-full'
            name={'type'}
            value={form.type}
            options={TYPES_USER_STORE.filter(value => value.typeActivity == 'ALL' || value.typeActivity.includes(auth.company.businessActivity))}
            onChange={(value) => handleSelect('type', value)}
          />
        </div>
        <div className='w-8/12 p-2'>
          <label htmlFor="name">Nombre</label>
          <Input
            placeholder=""
            name={'name'}
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className='w-6/12 p-2'>
          <label htmlFor="email">Correo</label>
          <Input
            placeholder=""
            name={'email'}
            disabled={edit ? true : false}
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className={`w-6/12 p-2 ${edit ? 'hidden' : ''}`}>
          <label htmlFor="password">Contraseña</label>
          <Input.Password
            name={'password'}
            placeholder="**********"
            value={form.password}
            onChange={handleChange}
          />
        </div>
      </div>
    </Modal>
  )
}

export default UserMaintainerModal

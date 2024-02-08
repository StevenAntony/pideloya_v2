'use client'
import React, { useEffect, useState } from 'react'
import { Drawer, Space, Form, Input, Row, Select, Button, Col, DatePicker, Switch } from 'antd'
import type { TableProps, MenuProps } from 'antd'
import { EditOutlined, DollarOutlined, ApartmentOutlined, EllipsisOutlined, SyncOutlined } from '@ant-design/icons'
import CategoryService from '@/service/CategoryService'

const { Option } = Select

const ProductRegisterDrawer = ({
  open,
  setOpen,
  edit,
  groups
} : {
  open: boolean,
  setOpen: (c: boolean) => void,
  edit: boolean,
  groups: IGroup[]
}) => {
  const [isCategories, setCategories] = useState<ICategory[]>([])
  const [form, setForm] = useState<IProductForm>({
    service: false,
    type: 'product',
    group: '0',
    category: '0'
  })

  const getCategories = async (id: string) => {
    const response = await CategoryService.list(id)
    const draftCategories = response.data
    setCategories(draftCategories)
    setForm({...form, category: draftCategories.length > 0 ? draftCategories[0].id : '0'})
  }

  const onChangeGroup = (value: string) => {
    setForm({...form, group: value})
    getCategories(value)
  }

  const onClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    if (groups.length > 0) {
      setForm({...form, group: `${groups[0].id}`})
      getCategories(groups[0].id)
    }
  }, [groups])

  return (
    <Drawer
      title={!edit ? 'Registrar Producto' : 'Editar Producto'}
      width={720}
      onClose={onClose}
      open={open}
      styles={{
        body: {
          paddingBottom: 80,
        },
      }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onClose} type="primary">
            {!edit ? 'Registrar' : 'Editar'}
          </Button>
        </Space>
      }
    >
      <Form 
        layout="vertical" 
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="barcode"
              label="Codigo Barra"
            >
              <Input autoComplete='off' placeholder="###########" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Nombre"
              rules={[{ required: true, message: 'Nombre es obligatorio' }]}
            >
              <Input
                autoComplete='off'
                placeholder="Nombre..."
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="brand"
              label="Marca"
            >
              <Input autoComplete='off' placeholder="Ingrese Marca" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="service"
              label="Servicio"
            >
              <Switch checked={form.service} onChange={(checked: boolean) => setForm({...form, service: checked})} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="type"
              label="Tipo"
              rules={[{ required: true, message: 'El tipo es Obligatorio' }]}
            >
              <Select value={form.type} placeholder="Seleccione tipo" onChange={(value: string) => setForm({...form, type: value})}>
                <Option value="product">Producto</Option>
                <Option value="food">Comida</Option>
                <Option value="supply">Insumo</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="group"
              label="Grupo"
              rules={[{ required: true, message: 'Grupo Obligatorio' }]}
            >
              <Select value={form.group} onChange={onChangeGroup} placeholder="Seleccione grupo">
                {
                  groups.map(obj => <Option key={obj.id} value={obj.id}>{obj.description}</Option>)
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="category"
              label="Categoria"
              rules={[{ required: true, message: 'Categoria Obligatorio' }]}
            >
              <Select value={form.category} placeholder="Seleccione categoria">
                {
                  isCategories.map(obj => <Option key={obj.id} value={obj.id}>{obj.description}</Option>)
                }
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  )
}

export default ProductRegisterDrawer
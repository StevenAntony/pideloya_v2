'use client'
import React, { useEffect, useState } from 'react'
import { Drawer, Space, message, Input, Row, Select, Button, Col, Switch } from 'antd'
import CategoryService from '@/service/CategoryService'
import ProductService from '@/service/ProductService'

const { Option } = Select
const initForm = {
  service: {
    value: false,
    required: false, 
  },
  type: {
    value: 'product',
    required: false
  },
  group: {
    value: '0',
    required: false
  },
  category: {
    value: '',
    required: true,
    valid: true
  },
  barcode: {
    value: '',
    required: false
  },
  name: {
    value: '',
    required: true,
    valid: true
  },
  brand: {
    value: '',
    required: false
  },
}

const ProductRegisterDrawer = ({
  open,
  setOpen,
  edit,
  groups,
  product,
  getProducts
} : {
  open: boolean,
  setOpen: (c: boolean) => void,
  edit: boolean,
  groups: IGroup[],
  product: IProductTable|null,
  getProducts: () => void
}) => {
  const [messageApi, contextHolder] = message.useMessage()
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false)

  const [isCategories, setCategories] = useState<ICategory[]>([])
  const [form, setForm] = useState<IProductForm>(initForm)

  const setValueForm = (key: string|string[] , value: any) => {
    if (key instanceof Array) {
      key.forEach((item, index) => {
        form[item].value = value[index]
      })
    }else{
      form[key].value = value 
    }
    setForm({...form})
  }

  const getCategories = async (id: string) => {
    setLoadingCategories(true)
    const response = await CategoryService.list(id)
    const draftCategories = response.data
    setCategories(draftCategories)
    if (draftCategories.length > 0) {
      setValueForm(['group','category'], [id, draftCategories[0].id])
    }else{
      setValueForm('category', '')    
    }
    setLoadingCategories(false)
  }

  const onChangeGroup = (value: string) => {
    setValueForm('group', value)
    getCategories(value)
  }

  const onClose = () => {
    setOpen(false);
  }

  const onSend =async () => {
    const response = await ProductService.store({
      categoryID: form.category.value,
      name: form.name.value,
      service: form.service.value,
      type: form.type.value,
      barcode: form.barcode.value,
      brand: form.brand.value,
      presentations:[]
    })

    if (response.success) {
      messageApi.open({
        type: 'success',
        content: response.message,
      })
      getProducts()
      onClose()
    }else{
      messageApi.open({
        type: 'error',
        content: response.message,
      })
    }
  }

  useEffect(() => {
    if (groups.length > 0) {
      setValueForm('group', groups[0].id)
      getCategories(groups[0].id)
    }
  }, [groups])

  useEffect(() => {
    setForm({...initForm})
  }, [open])

  return (
    <Drawer
      title={!edit ? 'Registrar Producto' : `Editar: ${product?.name}`}
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
          <Button onClick={onSend} type="primary">
            {!edit ? 'Registrar' : 'Editar'}
          </Button>
        </Space>
      }
    >
      {contextHolder}
      <Row gutter={[16, 24]} >
        <Col span={8}>
          <Input autoComplete='off' value={form.barcode.value} onChange={(e) => setValueForm('barcode' , e.target.value)} placeholder="###########" />
        </Col>
        <Col span={16}>
          <Input
            value={form.name.value}
            autoComplete='off'
            placeholder="Nombre..."
            onChange={(e) => setValueForm('name' , e.target.value)}
          />
        </Col>
        <Col span={12}>
          <Input autoComplete='off' value={form.brand.value} onChange={(e) => setValueForm('brand' , e.target.value)} placeholder="Ingrese Marca" />
        </Col>
        <Col span={12}>
          <Switch checked={Boolean(form.service.value)} onChange={(checked: boolean) => setValueForm('service' , checked)} />
        </Col>
        <Col span={8}>
          <Select className='w-full' value={String(form.type.value)} placeholder="Seleccione tipo" onChange={(value: string) => setValueForm('type' , value)}>
            <Option value="product">Producto</Option>
            <Option value="food">Comida</Option>
            <Option value="supply">Insumo</Option>
          </Select>
        </Col>
        <Col span={8}>
          <Select className='w-full' value={String(form.group.value)} onChange={onChangeGroup} placeholder="Seleccione grupo">
            {
              groups.map(obj => <Option key={obj.id} value={`${obj.id}`}>{obj.description}</Option>)
            }
          </Select>
        </Col>
        <Col span={8}>
          <Select loading={loadingCategories} disabled={loadingCategories} className='w-full' value={String(form.category.value)} placeholder="Seleccione categoria">
            {
              isCategories.map(obj => <Option key={obj.id} value={`${obj.id}`}>{obj.description}</Option>)
            }
          </Select>
        </Col>
      </Row>
    </Drawer>
  )
}

export default ProductRegisterDrawer
'use client'
import React, { useEffect, useState } from 'react'
import { Drawer, Space, message, Input, Row, Select, Button, Col, Switch } from 'antd'
import CategoryService from '@/service/CategoryService'
import ProductService from '@/service/ProductService'

const { Option } = Select

const ProductRegisterDrawer = ({
  open,
  setOpen,
  edit,
  setEdit,
  groups,
  product,
  getProducts
} : {
  open: boolean,
  setOpen: (c: boolean) => void,
  edit: boolean,
  setEdit: (c: boolean) => void,
  groups: IGroup[],
  product: IProductTable|null,
  getProducts: () => void
}) => {

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
  
  const validateSend = () => {
    let pass: boolean = true
    const object = {...form}
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        if (object[key].required) {
          const validated = object[key].value != '' && object[key].value != null
          object[key].valid = validated
          pass = pass ? validated : false 
        }else{
          object[key].valid = true
        }
      }
    }
    setForm({...object})

    return pass
  }

  const onChangeGroup = (value: string) => {
    setValueForm('group', value)
    getCategories(value)
  }

  const onChangeCategory = (value: string) => {
    setValueForm('category', value)
  }

  const onClose = () => {
    setOpen(false);
    setEdit(false)
  }

  const onSend =async () => {
    if (!validateSend()) {
      return true
    }
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
      setValueForm('name', '')
      setValueForm('barcode', '')
      setValueForm('brand', '')
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

  const getCategoriesEdit = async (id?: string) => {
    if (id) {
      setLoadingCategories(true)
      const response = await CategoryService.list(id)
      const draftCategories = response.data
      setValueForm(['category'], [String(draftCategories[0].id)])
      setLoadingCategories(false)
    }
  }

  useEffect(() => {
    if (edit) {
      
      getCategoriesEdit(product?.idGroup)
      setValueForm([
        'name',
        'barcode',
        'brand',
        'type',
        'service',
        'group'
      ], [
        product?.name,
        product?.barcode,
        product?.brand,
        product?.type,
        product?.service,
        product?.idGroup
      ])
    }
  }, [edit])

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
          <label htmlFor="barCode">Código Barra</label>
          <Input 
            autoComplete='off'
            value={form.barcode.value} 
            onChange={(e) => setValueForm('barcode' , e.target.value)} 
            placeholder="###########" 
            name='barCode'
          />
        </Col>
        <Col span={16}>
          <label htmlFor="name">Nombre</label>
          <Input
            value={form.name.value}
            status={form.name.valid ? "" : 'error'}
            name='name'
            autoComplete='off'
            placeholder="Nombre..."
            onChange={(e) => setValueForm('name' , e.target.value)}
          />
        </Col>
        <Col span={8}>
          <label htmlFor="brand">Marca</label>
          <Input 
            autoComplete='off' 
            value={form.brand.value} 
            onChange={(e) => setValueForm('brand' , e.target.value)} 
            placeholder="Ingrese Marca" 
            name='brand'
          />
        </Col>
        <Col span={8}>
          <label htmlFor="type">Tipo</label>
          <Select 
            className='w-full' 
            value={String(form.type.value)} 
            placeholder="Seleccione tipo" 
            onChange={(value: string) => setValueForm('type' , value)}
          >
            <Option value="product">Producto</Option>
            <Option value="food">Comida</Option>
            <Option value="supply">Insumo</Option>
          </Select>
        </Col>
        <Col span={8}>        
          <label htmlFor="service" className='w-full block'>Servicio</label>
          <Switch
            checked={Boolean(form.service.value)} 
            onChange={(checked: boolean) => setValueForm('service' , checked)} 
          />
        </Col>
        <Col span={8}>
          <label htmlFor="group">Grupo</label>
          <Select className='w-full' value={String(form.group.value)} onChange={onChangeGroup} placeholder="Seleccione grupo">
            {
              groups.map(obj => <Option key={obj.id} value={`${obj.id}`}>{obj.description}</Option>)
            }
          </Select>
        </Col>
        <Col span={8}>
          <label htmlFor="category">Categoria</label>
          <Select 
            loading={loadingCategories} 
            disabled={loadingCategories} 
            className='w-full' 
            value={String(form.category.value)} 
            placeholder="Seleccione categoria"
            status={form.category.valid ? "" : 'error'}
            onChange={onChangeCategory}
          >
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
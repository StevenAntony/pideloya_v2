import React, { useEffect, useState } from 'react'
import { Drawer, Space, message, Input, Row, Select, Button, Col, Switch, Radio } from 'antd'
import CategoryService from '../../service/CategoryService'
import ProductService from '../../service/ProductService'

const { Option } = Select

const ProductMaintainerDrawer = ({
  open,
  setOpen,
  edit,
  setEdit,
  groups,
  product,
  getProducts,
  isPrinters
} ) => {

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
    afeIgv: {
      value: 'Gravado',
      required: false
    },
    printers: {
        value: [],
        required: false
    }
  }

  const [confirmLoading, setConfirmLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [loadingCategories, setLoadingCategories] = useState(false)

  const [isCategories, setCategories] = useState([])
  const [form, setForm] = useState(initForm)

  const optionsIgv = [
    { label: 'Gravado', value: 'Gravado', key: 'gravado' },
    { label: 'Exonerado', value: 'Exonerado', key: 'exonerado' },
    { label: 'Inafecto', value: 'Inafecto', key: 'inafecto'},
  ]

  const setValueForm = (key , value) => {
    if (key instanceof Array) {
      key.forEach((item, index) => {
        form[item].value = value[index]
      })
    }else{
      form[key].value = value
    }
    setForm({...form})
  }

  const getCategories = async (id) => {
    setLoadingCategories(true)
    const response = await CategoryService.list(id)
    const draftCategories = response.data
    setCategories(draftCategories)
    if (draftCategories.length > 0) {
      const verify = draftCategories.find(obj => obj.id === product?.idCategory)
      setValueForm(['group','category'], [id, verify ? product?.idCategory : String(draftCategories[0].id)])
    }else{
      setValueForm('category', '')
    }
    setLoadingCategories(false)
  }

  const validateSend = () => {
    let pass = true
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

  const onChangeGroup = (value) => {
    setValueForm('group', value)
    getCategories(value)
  }

  const onChangeCategory = (value) => {
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
    setConfirmLoading(true)
    const params = {
        categoryID: form.category.value,
        name: form.name.value,
        service: form.service.value,
        type: form.type.value,
        barcode: form.barcode.value,
        brand: form.brand.value,
        presentations:[],
        typeAfeIGV: form.afeIgv.value,
        printers: form.printers.value
    }

    let response = null

    if (edit && product.key) {
        response = await ProductService.update(params, product.key)
    }else{
        response = await ProductService.store(params)
    }

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
    setConfirmLoading(false)
  }

  useEffect(() => {
    if (groups.length > 0) {
      setValueForm('group', groups[0].id)
      getCategories(groups[0].id)
    }
  }, [groups])

  useEffect(() => {
    if (edit) {
      onChangeGroup(product?.idGroup)
      setValueForm([
        'name',
        'barcode',
        'brand',
        'type',
        'service',
        'group',
        'afeIgv',
        'category',
        'printers'
      ], [
        product?.name,
        product?.barcode,
        product?.brand,
        product?.type,
        product?.service,
        product?.idGroup,
        product?.afeIGV,
        product?.idCategory,
        product?.printers
      ])
    }else{
        if (groups.length > 0) {
            setValueForm('group', groups[0].id)
            getCategories(groups[0].id)
        }
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
          <Button onClick={onSend} loading={confirmLoading} type="primary">
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
            onChange={(value) => setValueForm('type' , value)}
          >
            <Option value="product">Producto</Option>
            <Option value="food">Comida</Option>
            <Option value="supply">Insumo</Option>
          </Select>
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
        <Col span={12}>
            <label htmlFor="afe-igv" className='w-full block'>Afect. Igv</label>
            <Radio.Group options={optionsIgv} value={form.afeIgv.value} onChange={({ target: { value } }) => setValueForm('afeIgv', value)} optionType='button' />
        </Col>

        <Col span={4}>
          <label htmlFor="service" className='w-full block'>Servicio</label>
          <Switch
            checked={Boolean(form.service.value)}
            onChange={(checked) => setValueForm('service' , checked)}
          />
        </Col>
        <Col span={12}>
            <label htmlFor="printers" className='w-full block'>Impresoras</label>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Seleccione una impresora"
                value={form.printers.value}
                onChange={(value) => setValueForm('printers', value)}
                options={isPrinters.map((obj) => ({ label: obj.name, value: `${obj.id}` }))}
            />
        </Col>
      </Row>
    </Drawer>
  )
}

export default ProductMaintainerDrawer


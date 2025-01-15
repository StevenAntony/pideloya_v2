import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { Select, Modal, Input, DatePicker, Radio, message, Button, Space } from 'antd'
import CustomerService from '../../service/CustomerService'
import {
    SearchOutlined
} from '@ant-design/icons'
import { _CustomerService } from '../../service/_CustomerService'

dayjs.extend(customParseFormat)
const dateFormat = 'YYYY-MM-DD'

const CustomerMaintainerModal = ({
    edit,
    setEdit,
    open,
    setOpen,
    customerTrigger
}) => {

    const currentDate = new Date()
    const date18 =new Date(currentDate)
    date18.setFullYear(currentDate.getFullYear() - 18)

    const INIT_FORM = {
        documentType: {
          value: 'DNI',
          required: false,
          valid: true
        },
        document: {
          value: '',
          required: true
        },
        firstName: {
          value: '',
          required: true
        },
        lastName: {
          value: '',
          required: true
        },
        adress: {
          value: '',
          required: true
        },
        email: {
          value: '',
          required: false,
          valid: true
        },
        sexo: {
          value: 'F',
          required: false,
          valid: true
        },
        phone: {
          value: '',
          required: false,
          valid: true
        },
        birth: {
          value: date18.toISOString().split('T')[0],
          required: false,
          valid: true
        }
    }

    const [confirmLoading, setConfirmLoading] = useState(false)
    const [documentLoading, setDocumentLoading] = useState(false)
    const [form, setForm] = useState(INIT_FORM)
    const [disabledDocument, setDisabledDocument] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()

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

    const documents = [
        {
            value: 'DNI',
            label: 'DNI',
        },
        {
            value: 'RUC',
            label: 'RUC',
        },
        {
            value: 'S/D',
            label: 'S/D',
        }
    ]

    const showCustomer = async () => {
        const { data } = await CustomerService.show(edit)
        setValueForm([
            'documentType',
            'document',
            'firstName',
            'lastName',
            'adress',
            'email',
            'sexo',
            'phone',
            'birth'
        ],[
            data.documentType,
            data.document,
            data.firstName,
            data.lastName,
            data.address,
            data.email,
            data.sex,
            data.phone,
            data.birth
        ])
    }

    const handleCancel = () => {
        setOpen(false)
        setEdit(null)
        setForm(INIT_FORM)
        setDisabledDocument(false)
    }

    const onChangeDocumentType = (value) => {
        if (value == 'S/D') {
            setValueForm(['document','adress'], ['S0000001', ''])
            setDisabledDocument(true)
        }else{
            setDisabledDocument(false)
        }
        setValueForm('documentType', value)
    }

    const onSend =async () => {
        if (!validateSend()) {
          return true
        }
        setConfirmLoading(true)
        const params = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            document: form.document.value,
            documentType: form.documentType.value,
            address: form.adress.value,
            phone: form.phone.value,
            email: form.email.value,
            birth: form.birth.value,
            sex: form.sexo.value
        }

        let response = null

        if (edit) {
            response = await CustomerService.update(params, edit)
        }else{
            response = await CustomerService.store(params)
        }

        if (response.success) {
            customerTrigger(response.data.document)
            messageApi.open({
                type: 'success',
                content: response.message,
            })
            handleCancel()
        }else{
            messageApi.open({
                type: 'error',
                content: response.message,
            })
        }

        setConfirmLoading(false)
    }

    const searchDocument = async () => {
        setDocumentLoading(true)
        const service = new _CustomerService()
        if (form.documentType.value === 'DNI') {
            await service.consultReniec(form.document.value)
        }else if(form.documentType.value === 'RUC') {
            await service.consultSunat(form.document.value)
        }

        if (service.getResponse().data) {
            const person = service.getResponse().data
            if (form.documentType.value === 'DNI') {
                message.info('DNI encontrado')
                setValueForm([
                    'firstName',
                    'lastName'
                ],
                [
                    person.nombres,
                    `${person.apellidoPaterno} ${person.apellidoMaterno}`
                ])
            }else if(form.documentType.value === 'RUC') {
                message.info('RUC encontrado')
                setValueForm([
                    'firstName',
                    'lastName',
                    'adress'
                ],
                [
                    person.nombre_o_razon_social,
                    person.nombre_o_razon_social,
                    person.direccion_completa
                ])
            }

        }else{
            message.warning('Problema al buscar el documento')
        }
        setDocumentLoading(false)
    }

    useEffect(() => {
        if (edit) showCustomer()
    }, [edit])

    return (
        <Modal
            title={edit ? 'Editar Cliente' : 'Registrar Cliente'}
            open={open}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={
                <>
                    <Button onClick={handleCancel}>Cancelar</Button>
                    <Button onClick={onSend} loading={confirmLoading} type="primary">
                        {!edit ? 'Registrar' : 'Editar'}
                    </Button>
                </>
            }
        >
            <div className='flex flex-wrap'>
                <div className='w-4/12 p-2'>
                    <label htmlFor="">Tipo</label>
                    <Select
                        className='w-full'
                        defaultValue="DNI"
                        value={form.documentType.value}
                        options={documents}
                        onChange={onChangeDocumentType}
                    />
                </div>
                <div className='w-8/12 p-2'>
                    <label htmlFor="">Documento</label>
                    <Space.Compact style={{ width: '100%' }}>
                        <Input
                            placeholder="00000000"
                            disabled={disabledDocument}
                            value={form.document.value}
                            status={form.document.valid ? "" : 'error'}
                            onChange={(e) => setValueForm('document', e.target.value)}
                        />
                        <Button type="primary" onClick={searchDocument} icon={<SearchOutlined />} loading={documentLoading} />
                    </Space.Compact>

                </div>
                <div className='w-6/12 p-2'>
                    <label htmlFor="">{form.documentType.value == 'RUC' ? 'Razón Social' : 'Nombre'}</label>
                    <Input
                        placeholder="..."
                        value={form.firstName.value}
                        status={form.firstName.valid ? "" : 'error'}
                        onChange={(e) => setValueForm('firstName', e.target.value)}
                    />
                </div>
                <div className='w-6/12 p-2'>
                    { form.documentType.value != 'RUC' &&  <label htmlFor="">Apellidos</label>}
                    { form.documentType.value != 'RUC' && <Input
                        placeholder="Steven ..."
                        value={form.lastName.value}
                        status={form.lastName.valid ? "" : 'error'}
                        onChange={(e) => setValueForm('lastName', e.target.value)}
                    />}
                </div>
                <div className='w-full p-2'>
                    <label htmlFor="">Dirección</label>
                    <Input
                        placeholder="Perú ..."
                        value={form.adress.value}
                        status={form.adress.valid ? "" : 'error'}
                        onChange={(e) => setValueForm('adress', e.target.value)}
                    />
                </div>
                <div className='w-8/12 p-2'>
                    <label htmlFor="">Email</label>
                    <Input
                        placeholder="demo@gmail..."
                        value={form.email.value}
                        onChange={(e) => setValueForm('email', e.target.value)}
                    />
                </div>
                <div className='w-4/12 p-2'>
                    <label htmlFor="">Celular/Telefono</label>
                    <Input
                        value={form.phone.value}
                        placeholder="900000000"
                        onChange={(e) => setValueForm('phone', e.target.value)}
                    />
                </div>
                {form.documentType.value == 'DNI' && <><div className='w-6/12 p-2'>
                    <label htmlFor="">Nacimiento</label>
                    <DatePicker
                        maxDate={dayjs(date18.toISOString().split('T')[0], dateFormat)}
                        className='w-full'
                        onChange={(value, dateString) => setValueForm('birth', dateString)}
                        value={dayjs(form.birth.value, dateFormat)}
                    />
                </div>
                <div className='w-6/12 p-2'>
                    <label className='w-full block' htmlFor="">Sexo</label>
                    <Radio.Group
                        className='w-full'
                        value={form.sexo.value}
                        defaultValue={form.sexo.value}
                        buttonStyle="solid"
                        onChange={(e) => setValueForm('sexo', e.target.value)}
                    >
                        <Radio.Button value="F">Femenino</Radio.Button>
                        <Radio.Button value="M">Masculino</Radio.Button>
                    </Radio.Group>
                </div></>}
            </div>
            {contextHolder}
        </Modal>
    )
}

export default CustomerMaintainerModal

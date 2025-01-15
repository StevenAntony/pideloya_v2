import {
    Button,
    Modal,
    Col,
    Row,
    InputNumber,
    Select,
    Form,
    Table,
    Typography,
    Popconfirm,
    Input,
    message
} from 'antd'
import { useEffect, useState } from 'react'
import UnitSunat from '../../service/data/UnitSunat.json'
import UnitService from '../../service/UnitService'
import ProductService from '../../service/ProductService'
import FormatCurrency from '../../../helpers/FormatCurrency'
import { EditOutlined, CloseOutlined, SaveOutlined, DeleteOutlined } from '@ant-design/icons'

const { Option } = Select

const ProductPresentationModal = ({
    open,
    setOpen,
    product,
    getProducts
}) => {
    const [isUnits, setUnits] = useState([])
    const [isPresentations, setPresentations] = useState([])
    const [loadingPresentations, setLoadingPresentations] = useState(false)
    const [formTable] = Form.useForm()
    const [form, setForm] = useState({
        unit: 1,
        sale: 0,
        dealer: 0,
        purchase: 0
    })

    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        formTable.setFieldsValue({
            sale: record.sale,
            dealer: record.dealer,
            purchase: record.purchase,
            ...record
        });
        setEditingKey(record.key);
    }

    const getUnits = async () => {
        const response =await UnitService.list()
        const unitsDraft = response.data ?? []

        setUnits(response.data)
        setForm({...form, unit: unitsDraft.length > 0 && unitsDraft[0].id })
    }

    const getPresentations = async () => {
        setLoadingPresentations(true)
        const response =await ProductService.presentations(product?.key)
        setPresentations(response.data)
        setLoadingPresentations(false)
    }

    const save = async (key) => {
        try {
            const row = (await formTable.validateFields()) ;
            const response = await ProductService.presentationUpdated(row, key)
            if (response.success) {
                const index = isPresentations.findIndex(obj => obj.key == key)
                isPresentations[index].sale = row.sale
                isPresentations[index].dealer = row.dealer
                isPresentations[index].purchase = row.purchase
                setPresentations([...isPresentations])
                setEditingKey('');
            }
        } catch (errInfo) {
        }
    }

    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

        return (
          <td {...restProps}>
            {editing ? (
              <Form.Item
                name={dataIndex}
                style={{ margin: 0 }}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]}
              >
                {inputNode}
              </Form.Item>
            ) : (
              children
            )}
          </td>
        );
    }

    const deletePresentation = async (id) => {
        const response =await ProductService.presentationsDelete(id)
        if (response.success) {
            message.success(response.message)
            getProducts()
            getPresentations()
        }else{
            message.error(response.message)
        }
    }

    const columns = [
        {
          title: 'Unidad',
          dataIndex: 'unit.name',
          width: '25%',
          editable: false,
          render: (_, record) => {
            const unit = record.unit[0]
            return `[${unit.abbreviation}] ${unit.name} - ${unit.valueInUnit}`
          }
        },
        {
          title: 'Venta',
          dataIndex: 'sale',
          editable: true,
          render: ( data , record) => FormatCurrency.formatCurrency(data)
        },
        {
          title: 'Distribuidor',
          dataIndex: 'dealer',
          editable: true,
          render: ( data , record) => FormatCurrency.formatCurrency(data)
        },
        {
          title: 'Compra',
          dataIndex: 'purchase',
          editable: true,
          render: ( data , record) => FormatCurrency.formatCurrency(data)
        },
        {
          title: 'Acción',
          dataIndex: 'operation',
          render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
              <span>
                <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                    <SaveOutlined />
                </Typography.Link>
                <Popconfirm title="¿Quiere cancelar?" onConfirm={() => setEditingKey('')}>
                    <CloseOutlined />
                </Popconfirm>
              </span>
            ) : (
              <span className='gap-2'>
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                    <EditOutlined />
                </Typography.Link>
                <Popconfirm title="¿Quieres Eliminar la presentación?" onConfirm={() => deletePresentation(record.key)}>
                    <DeleteOutlined className="text-red-500 ml-2" />
                </Popconfirm>
              </span>
            );
          },
        },
      ]

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: (record) => ({
            record,
            inputType: 'number',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        }
    })

    const handleCreate = async () => {
        const response = await ProductService.presentationStore({
            "presentations": [
                {
                    "unitID": form.unit,
                    "salePrice": form.sale,
                    "dealerPrice": form.dealer,
                    "purchasePrice": form.purchase
                }
            ]
        }, product?.key)

        if (response.success) {
            getPresentations()
            getProducts()
        }
    }

    useEffect(() => {
        getUnits()
        getPresentations()
    }, [product])

    return (
        <Modal
            title={`Presentación: ${product?.name}`}
            open={open}
            onCancel={() => setOpen(false)}
            footer=''
            width={800}
        >
            <Row gutter={[16, 8]}>
                <Col span={8}>
                    <label>Venta</label>
                    <InputNumber
                        addonBefore="S/"
                        className='w-full'
                        onChange={(value) => setForm({...form, sale: value})}
                        value={form.sale}
                    />
                </Col>
                <Col span={8}>
                    <label>Distribuidor</label>
                    <InputNumber
                        addonBefore="S/"
                        className='w-full'
                        value={form.dealer}
                        onChange={(value) => setForm({...form, dealer: value})}
                    />
                </Col>
                <Col span={8}>
                    <label>Compra</label>
                    <InputNumber
                        addonBefore="S/"
                        className='w-full'
                        value={form.purchase}
                        onChange={(value) => setForm({...form, purchase: value})}
                    />
                </Col>
                <Col span={18}>
                    <label>Unidad</label>
                    <Select
                        className='w-full'
                        value={form.unit}
                        placeholder="Seleccione unidad"
                        onChange={(value) => setForm({...form, unit: value})}
                    >
                        {
                            isUnits.map(unit =>
                                <Option key={unit.id} value={unit.id}>
                                    [{unit.abbreviation}] {unit.name} - {unit.valueInUnit}
                                </Option>
                            )
                        }
                    </Select>
                </Col>

                <Col span={6}>
                    <Button
                        type='primary'
                        className='mt-[20px]'
                        onClick={handleCreate}
                    >
                        Agregar
                    </Button>
                </Col>
            </Row>
            <Form form={formTable} component={false}>
                <Table
                    className='mt-4'
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    loading={loadingPresentations}
                    dataSource={isPresentations}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: () => setEditingKey(''),
                    }}
                />
            </Form>
        </Modal>
    )
}

export default ProductPresentationModal

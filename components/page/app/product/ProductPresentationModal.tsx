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
    Input
} from 'antd'
import { useState } from 'react'
import UnitSunat from '@/service/data/UnitSunat.json'

const { Option } = Select

const ProductPresentationModal = ({
    open,
    product
} : {
    open: boolean,
    product: IProductTable|null
}) => {
    const [formTable] = Form.useForm()
    const [form, setForm] = useState({
        unit: 'NIU',
        amount: 1
    })
    const [data, setData] = useState<IPresentationModal[]>([]);
    const [editingKey, setEditingKey] = useState('');
  
    const isEditing = (record: any) => record.key === editingKey;
  
    const edit = (record: Partial<any> & { key: React.Key }) => {
        formTable.setFieldsValue({ unit: '', amount: '', price: '', ...record });
        setEditingKey(`${record.key}`);
    }

    const save = async (key: React.Key) => {
        try {
          const row = (await formTable.validateFields()) as any;
    
          const newData = [...data];
          const index = newData.findIndex((item) => key === item.key);
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, {
              ...item,
              ...row,
            });
            setData(newData);
            setEditingKey('');
          } else {
            newData.push(row);
            setData(newData);
            setEditingKey('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
    }

    const EditableCell: React.FC<EditablePresentationCellProps> = ({
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

    const columns = [
        {
          title: 'Unidad',
          dataIndex: 'unit',
          width: '25%',
          editable: true,
        },
        {
          title: 'Cantidad',
          dataIndex: 'amount',
          width: '15%',
          editable: true,
        },
        {
          title: 'Precio',
          dataIndex: 'price',
          width: '40%',
          editable: true,
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          render: (_: any, record: any) => {
            const editable = isEditing(record);
            return editable ? (
              <span>
                <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={() => setEditingKey('')}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                Edit
              </Typography.Link>
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
          onCell: (record: IPresentation) => ({
            record,
            inputType: col.dataIndex === 'amount' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        }
    })

    return (
        <Modal 
            title={`Presentación: ${product?.name}`} 
            open={open}
            footer=''
        >
            <Row gutter={16}>
                <Col span={12}>
                    <Select className='w-full' value={form.unit} placeholder="Seleccione unidad" onChange={(value: string) => setForm({...form, unit: value})}>
                        {
                            UnitSunat.map(unit => <Option key={unit.key} value={unit.abbreviation}>{unit.name}</Option>)
                        }
                    </Select>
                </Col>
                <Col span={3}>
                    <InputNumber className='w-full' placeholder='1' value={form.amount} />
                </Col>
                <Col span={5}>
                    <InputNumber className='w-full' placeholder='1' value={form.amount} />
                </Col>
                <Col span={4}>
                    <Button type='primary'>
                        Agregar
                    </Button>
                </Col>
            </Row>
            <Form form={formTable} component={false}>
                <Table
                    components={{
                    body: {
                        cell: EditableCell,
                    },
                    }}
                    bordered
                    dataSource={[]}
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
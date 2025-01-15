import { Button, Col, DatePicker, Divider, Drawer, Form, Row, Select, Spin, Switch, Tooltip } from 'antd'
import React, { useEffect } from 'react'
import { useQuotationContext } from '../hooks/useQuotationContext'
import dayjs from 'dayjs'
import { Help } from '@mui/icons-material'
import { ProductListToQuotationModel } from '@models/managment/ProductModel'
import ItemProductToTransaction from '@components/list/item_product_to_transaction'
import FormatCurrency from '@helpers/FormatCurrency'

const dateFormat = 'YYYY/MM/DD'

type Props = {}

interface ProductOption {
    value: number;
    product: ProductListToQuotationModel;
    label: React.ReactNode;
}


export default function QuotationFormLateral({ }: Props) {
    const currentDate = (new Date()).toISOString().split('T')[0]
    const [form] = Form.useForm()

    const {
        isCustomers,
        isProducts,
        loadingSave,
        openLateral,
        listProducts,
        setOpenLateral,
        loadingProducts,
        isProductInQuotation,
        store,
        selectedQuotation,
        setSelectedQuotation,
        update,
        loadingQuotationFind,
        isQuotationFind
    } = useQuotationContext()

    const sendStoreQuotation = () => {
        form.validateFields().then(values => {
            const details = isProductInQuotation.items.map(item => ({
                presentationID: Number(item.id),
                price: item.price,
                quantity: item.quantity
            }))

            const body = {
                customerID: values.customer,
                withIgv: values.igv,
                expire: values.expire,
                issue: values.issue,
                details: details
            }

            if(selectedQuotation) {
                update(body)
            }else{
                store(body)
            }

        })
        .catch(() => {})
    }

    useEffect(() => {
        if(openLateral && selectedQuotation && isQuotationFind){
            form.setFieldsValue({
                customer: isQuotationFind.customerID,
                issue: dayjs(isQuotationFind.issue, dateFormat),
                expire: dayjs(isQuotationFind.expire, dateFormat),
                igv: isQuotationFind.withIGV
            })

            isQuotationFind.details.forEach(element => {
                isProductInQuotation.addItem({
                    id: `${element.presentationID}`,
                    price: element.price,
                    quantity: Number(element.quantity),
                    name: element.name,
                    brand: element.brand,
                    note: '',
                    unitName: element.unitName
                })
            });
        }
    }, [isQuotationFind])

    return (
        <Drawer
            open={openLateral}
            width={1000}
            onClose={() => {
                form.setFieldsValue({
                    customer: undefined,
                    issue: dayjs(currentDate , dateFormat),
                    expire: dayjs(currentDate, dateFormat),
                    igv: true
                })
                isProductInQuotation.removeAll()
                setSelectedQuotation(null)

                setOpenLateral(false)
            }}
            destroyOnClose={true}
            footer={
                <div className='flex justify-end gap-3'>
                    <p className='text-[20px] font-semibold'>
                        Total: {FormatCurrency.formatCurrency(isProductInQuotation.items.reduce( (total:number, obj) => total + Number(obj.price * obj.quantity), 0))}
                    </p>
                    <Button>
                        Cancelar
                    </Button>
                    <Button type='primary' loading={loadingSave} onClick={sendStoreQuotation}>
                        Cotizar
                    </Button>
                </div>
            }
        >
            <Spin spinning={loadingQuotationFind}>
                <Form
                    form={form}
                    layout='vertical'
                >
                    <div className='flex flex-wrap'>
                        <div className='w-5/12'>
                            <Divider orientation='left'>Cotización</Divider>
                            <Row gutter={[8, 16]}>
                                <Col span={24}>
                                    <Form.Item
                                        name={'customer'}
                                        label={'Cliente'}
                                        className='m-0 w-full'
                                        rules={[{ required: true }]}
                                        hasFeedback
                                        validateFirst
                                    >
                                        <Select
                                            showSearch
                                            placeholder='Seleccionar cliente'
                                            notFoundContent='No se encontraron resultados'
                                            options={isCustomers.map((value) => {
                                                return {
                                                    value: value.customerID,
                                                    label: <><strong>{value.document}</strong> - {value.name}</>
                                                }
                                            })}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name={'issue'}
                                        label={'Emisión'}
                                        className='m-0'
                                        hasFeedback
                                        validateFirst
                                        rules={[{ required: true }]}
                                    >
                                        <DatePicker placeholder='Fecha emisión' className='w-full' />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name={'expire'}
                                        label={'Expiración'}
                                        className='m-0 w-full'
                                        hasFeedback
                                        validateFirst
                                        rules={[{ required: true }]}
                                    >
                                        <DatePicker placeholder='Fecha expiración' className='w-full' />
                                    </Form.Item>
                                </Col>
                                <Form.Item
                                    name={'igv'}
                                    label={'Incluye IGV'}
                                    className='m-0'
                                    hasFeedback
                                    validateFirst
                                    rules={[{ required: true }]}
                                >
                                    <Switch />
                                </Form.Item>
                            </Row>

                        </div>
                        <div className='w-7/12 px-2'>
                            <Divider orientation='left'>Productos</Divider>
                            <p className='mb-2'>
                                Productos
                                <Tooltip overlayClassName='tooltip-white' title='Minimo 4 caracteres para realizar una nueva busqueda'>
                                    <Help sx={{ fontSize: 18 }} />
                                </Tooltip>
                            </p>
                            <Select
                                className='w-full'
                                placeholder='Seleccionar productos'
                                showSearch
                                optionFilterProp="children"
                                filterOption={false}
                                onChange={(value, option) => {
                                    const selectedOption = option as ProductOption;
                                    const product = selectedOption.product

                                    isProductInQuotation.addItem({
                                        name: product.name,
                                        id: `${product.presentationID}`,
                                        brand: product.brand,
                                        unitName: product.unitName,
                                        price: product.salePrice,
                                        quantity: 1,
                                        note: ''
                                    })
                                }}
                                notFoundContent='No se encontraron resultados'
                                loading={loadingProducts}
                                options={isProducts.map((value) => {
                                    return {
                                        value: value.presentationID,
                                        product: value,
                                        label: <><strong>{value.barcode}</strong> - {value.unitName} {value.name}</>
                                    }
                                })}
                                onSearch={(value: string) => {
                                    if (value.length > 4) {
                                        listProducts(value)
                                    }
                                }}
                            />
                            <div className='py-4 mt-2 max-h-[400px] overflow-auto'>
                                {
                                    isProductInQuotation.items.map((value) => {
                                        const item = {
                                            name: value.name,
                                            brand: value.brand,
                                            unitName: value.unitName,
                                            quantity: value.quantity,
                                            price: value.price
                                        }
                                        return (
                                            <ItemProductToTransaction
                                                key={value.id}
                                                item={item}
                                                changeQuantity={(quantity) => { isProductInQuotation.updateQuantity(value.id, quantity) }}
                                                decreaseQuantity={() => { isProductInQuotation.decreaseQuantity(value.id, 1) }}
                                                increaseQuantity={() => { isProductInQuotation.increaseQuantity(value.id, 1) }}
                                                changePrice={(price) => { isProductInQuotation.updatePrice(value.id, price) }}
                                                removeItem={() => { isProductInQuotation.removeItem(value.id) }}
                                            />
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </Form>
            </Spin>
        </Drawer>
    )
}

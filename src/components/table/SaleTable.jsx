import { Table, Tag, Popover, Button, Input, Tooltip } from 'antd'
import { InfoOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import FormatCurrency from '../../../helpers/FormatCurrency'
import { useState } from 'react'
import { uuid } from '@helpers/uuid'

const { Search } = Input

const SaleTable = ({
    loading,
    data,
    view,
    actionRender,
    rowKey
}) => {

    const [searchText, setSearchText] = useState('')

    const columns = [
        {
            title: 'Documento',
            dataIndex: 'document',
            key: 'document',
            width: '135px',
            fixed: 'left'
        },
        {
            title: 'Emisión',
            dataIndex: 'issue',
            width: '115px',
            key: 'issue'
        },
        {
            title: 'Mesa',
            dataIndex: 'tableName',
            width: '120px',
            ellipsis: true,
            key: 'tableName',
            hidden: view != 'Table'
        },
        {
            title: 'Cliente',
            dataIndex: 'customer',
            width: '150px',
            ellipsis: true,
            key: 'customer'
        },
        {
            title: 'Vendido',
            dataIndex: 'userName',
            width: '130px',
            ellipsis: true,
            key: 'userName'
        },
        {
            title: 'Monto',
            dataIndex: 'totalAmount',
            width: '150px',
            ellipsis: true,
            key: 'totalAmount',
            render: (_, { totalAmount }) => <h4 className='font-bold text-base'>{FormatCurrency.formatCurrency(Number(totalAmount))}</h4>
        },
        {
            title: 'Método Pago',
            dataIndex: 'methodPaymentSunat',
            width: '120px',
            key: 'methodPaymentSunat',
            hidden: view === 'collect',
            render: (_, { methodPaymentSunat }) => (
                <Tag color={methodPaymentSunat == 'Contado' ? 'blue' : 'gold' } >{methodPaymentSunat}</Tag>
            )
        },
    ]

    if (view === 'sales-receipt-sent') {
        columns.push({
            title: 'Código',
            dataIndex: 'code',
            key: 'code',
            width:'80px',
            className: 'text-center',
            render: (_, { answerSunat }) => {
                const response = JSON.parse(answerSunat)
                return <>{response.code}</>
            }
        })
        columns.push({
            title: 'Mensaje',
            dataIndex: 'message',
            key: 'message',
            ellipsis: true,
            render: (_, { answerSunat }) => {
                const response = JSON.parse(answerSunat)
                return <>{response.description}</>
            }
        })
        columns.push({
            title: 'Observación',
            dataIndex: 'observation',
            key: 'observation',
            width:'115px',
            className: 'text-center',
            render: (_, { answerSunat }) => {
                const response = JSON.parse(answerSunat)
                const responseObservation = response.observation ? JSON.parse(response.observation) : []
                return responseObservation.length > 0 && (
                    <Popover
                        content={
                            <ul>
                                {responseObservation.map(obj => <li>{obj}</li>)}
                            </ul>
                        }
                        title="Observaciones"
                        trigger="click"
                    >
                        <Button type="primary" icon={<InfoOutlined />} />
                    </Popover>
                )
            }
        })
        columns.push({
            title: 'XML',
            dataIndex: 'xml',
            key: 'xml',
            width:'70px',
            render: (_, { answerSunat }) => {
                const response = JSON.parse(answerSunat)
                return response.xml ? <a href={response.xml} target='_blank'>XML</a> : 'Sin archivo'
            }
        })
        columns.push({
            title: 'CDR',
            dataIndex: 'cdr',
            key: 'cdr',
            width:'70px',
            render: (_, { answerSunat }) => {
                const response = JSON.parse(answerSunat)
                return response.cdr ? <a href={response.cdr} target='_blank'>CDR</a> : 'Sin archivo'
            }
        })
    }

    if (view === 'Ordinary' || view === 'Table') {
        columns.push({
            title: 'Modo Pago',
            dataIndex: 'modePayment',
            key: 'modePayment',
            ellipsis: true,
            render: (_, { modePayment }) => {
                const arrayMode = modePayment ? modePayment.split(',') : []
                return (
                    <Popover
                        content={(
                            <div>
                                {arrayMode.map((mode, index) => <p key={index}>{mode}</p>)}
                            </div>
                        )}
                        title="Modo Pago"
                        trigger="hover"
                    >
                        {arrayMode.map((mode, index) => {
                            return (
                                <Tag color={['Crédito','Credito'].includes(mode) ? 'red' : 'green'} key={index}>
                                    {mode}
                                </Tag>
                            );
                        })}
                    </Popover>
                )
            }
        })

        columns.push({
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            width: '110px',
            ellipsis: true,
            fixed: 'right',
            render: (_ , record) => {
                const status = record.status ?? record.active
                return (
                    <Tag color={status ? 'geekblue' : 'red'} >
                        {status ? 'Realizado' : 'Anulado'}
                    </Tag>
                )
            }
        })
    }

    if (view === 'collect') {
        columns.push({
            title: 'Pagado',
            dataIndex: 'amountPaid',
            key: 'amountPaid',
            render: (_, { amountPaid }) => (
                <Tag color='green' className='font-bold text-base'>
                    {FormatCurrency.formatCurrency(Number(amountPaid))}
                </Tag>
            )
        })

        columns.push({
            title: 'Debe',
            dataIndex: 'amountDebit',
            key: 'amountDebit',
            render: (_, { amountDebit }) => (
                <Tag color='red' className='font-bold text-base'>
                    {FormatCurrency.formatCurrency(Number(amountDebit))}
                </Tag>
            )
        })
    }

    if (actionRender) {
        columns.push({
            title: 'Acción',
            key: 'action',
            width: '100px',
            fixed: 'right',
            render: actionRender
        })
    }

    return (
        <div>
            <div className='flex justify-end pb-2'>
                <Tooltip title="Busca por Nro Documento, Fecha y nombre del cliente" color={'blue'}>
                    <div className='px-2 cursor-pointer'><QuestionCircleOutlined className='text-base text-blue-800' /></div>
                </Tooltip>
                <Search
                    placeholder="Buscar Venta"
                    allowClear
                    enterButton
                    className='w-80'
                    size="middle"
                    onChange={(e) => {
                        if(e.target.value == '') setSearchText(e.target.value)
                    }}
                    onSearch={(value) => {
                        setSearchText(value)
                    }}
                />
            </div>
            <Table
                loading={loading}
                bordered={true}
                columns={columns}
                dataSource={searchText
                    ? data.filter(obj =>
                        obj.document.toLowerCase().includes(searchText.toLowerCase()) ||
                        obj.issue.includes(searchText) ||
                        obj.customer.toLowerCase().includes(searchText.toLowerCase())
                    )
                    : data}
                scroll={{
                    x: 1300
                }}
                rowKey={rowKey ?? (record => uuid())}
            />
        </div>
    )
}

export default SaleTable

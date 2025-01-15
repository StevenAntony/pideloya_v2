import React from 'react'
import { CancelListTableInterface } from './CancelListTableInterface'
import { Button, message, Popconfirm } from 'antd'
import BuyTable from '../../components/table/BuyTable'
import { BuyService } from '../../service/BuyService'

export default function CancelListTable({
    dataSource,
    loading,
    reload
}: CancelListTableInterface) {

    const deleteSale =async (id) => {
        const service = BuyService
        await service.delete(id)
        const response = service.getResponse()
        if (response.success) {
            reload()
            message.success('Dado de baja correctamente')
        }else{
            message.error(response.message)
        }
    }

    return (
        <BuyTable
            data={dataSource}
            loading={loading}
            view='cancel'
            actionRender={(_, record) => (
                <Popconfirm
                    title="Dar baja Comprobante"
                    description="Se descontara el stock al almacen, Este proceso no se podra revertir."
                    onConfirm={() => deleteSale(record.id)}
                    onCancel={() => {}}
                    okText="SI"
                    cancelText="No"
                >
                    <Button danger>Dar baja</Button>
                </Popconfirm>
            )}
        />
    )
}

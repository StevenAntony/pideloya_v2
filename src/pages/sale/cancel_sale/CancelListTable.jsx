import SaleTable from "@components/table/SaleTable"
import { Button, Popconfirm, message } from 'antd'
import {
    DollarOutlined
} from '@ant-design/icons'
import SaleService from "@services/SaleService"
import AuthorizedButton from "@components/app/button/AuthorizedButton"
import { SALE_ACTIONS } from "@constants/authorized"

const CancelListTable = ({
    isSales,
    loadingList,
    getSales
}) => {

    const deleteSale =async (id) => {
        const response =await SaleService.cancelSale(id)
        if (response.success) {
            getSales()
            message.success('Dado de baja correctamente')
        }else{
            message.error(response.message)
        }
    }

    return (
        <SaleTable
            data={isSales}
            loading={loadingList}
            view={'cancel'}
            actionRender={(_, record) => (
                <Popconfirm
                    title={`Dar baja Comprobante ${record.answerSunat > 0 ? 'y generar nota de crédito' : ''}`}
                    description="Se añadira el stock al almacen, Este proceso no se podra revertir."
                    onConfirm={() => deleteSale(record.saleID)}
                    onCancel={() => {}}
                    okText="SI"
                    cancelText="No"
                >
                    <AuthorizedButton danger action={SALE_ACTIONS.deleteSale}>
                        Dar baja
                    </AuthorizedButton>
                </Popconfirm>
            )}
        />
    )
}

export default CancelListTable

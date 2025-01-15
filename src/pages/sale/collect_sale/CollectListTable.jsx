import SaleTable from "@components/table/SaleTable"
import { Button, Tooltip } from 'antd'
import {
    DollarOutlined
} from '@ant-design/icons'
import { useEffect, useState } from "react"
import AuthorizedButton from "@components/app/button/AuthorizedButton"
import { SALE_ACTIONS } from "@constants/authorized"

const CollectListTable = ({
    isSales,
    loadingList,
    setOpenModal,
    setSelectedSale,
    disabled,
    information
}) => {
    const [seriesAvailable, setSeriesAvailable] = useState([])

    useEffect(() => {
        if (information) {
            setSeriesAvailable(information.vouchersSeries ?? [])
        }
    }, [information])

    return (
        <SaleTable
            data={isSales}
            loading={loadingList}
            view={'collect'}
            actionRender={(_, record) => {
                let disabledNotSerie = false
                if (record.voucherToCancel) {
                    const seriesDraft = seriesAvailable.find(item => item.type.toUpperCase() == record.voucherToCancel)
                    disabledNotSerie = seriesDraft ? seriesDraft.series.length == 0 : true
                }
                return (
                    <div className='flex gap-2'>
                        <Tooltip title={disabledNotSerie ? `No hay series disponibles en ${record.voucherToCancel}` : ''}>
                            <AuthorizedButton
                                type="primary"
                                disabled={disabled || disabledNotSerie}
                                onClick={() => {
                                    setOpenModal(true)
                                    setSelectedSale(record)
                                }}
                                icon={<DollarOutlined />}
                                action={SALE_ACTIONS.collect}
                            />
                        </Tooltip>
                    </div>
                )
            }}
        />
    )
}

export default CollectListTable

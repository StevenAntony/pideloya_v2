import React, {useState} from 'react'
import { Button, notification, message  } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import SaleTable from '../../components/table/SaleTable'
import { _SaleService } from '../../service/_SaleService'
import { useAuthContext } from '../../contexts/AuthContext'

const ActionRender = ( { record, getListSale } : { record: any, getListSale: any } ) => {

    const [loadingSend, setLoadingSend] = useState<boolean>(false)
    const [api, contextHolder] = notification.useNotification()
    const { auth } = useAuthContext()

    const openNotification = (message: string, description: any) => {
        api.info({
            message: message,
            description: description,
            placement: 'topRight',
            duration: 10000
        });
    };

    const sendSunat = async (id: number) => {
        setLoadingSend(true)
        const service = new _SaleService
        await service.sendSalesToSunat(id)
        if (service.getResponse().success) {
            const observation = service.getResponse().data?.observations ?? []
            openNotification(
                service.getResponse().data?.description ?? service.getResponse().data?.message,
                observation.length > 0 ? (
                    <><li><strong>Observaciones</strong></li>{observation.map((obj: any, index: any) => {
                        return <li key={index} >{obj}</li>
                    })}</>
                ) : ''
            )
        }else{
            message.error(service.getResponse().message, 30)
        }
        getListSale()
        setLoadingSend(false)
    }

    return (
        <div className='flex gap-2'>
            {contextHolder}
            <Button
            disabled={auth?.company?.billingToken == null || auth?.company?.billingToken == ""}
            loading={loadingSend}
            type="primary" onClick={() => sendSunat(record.key)} icon={<SendOutlined />} size={'small'} />
        </div>
    )
}

const SendSalesReceiptTable = ({
    sales,
    loadingList,
    getListSale
}) => {

    return (
        <div className="px-8 pb-8">
            <SaleTable
                loading={loadingList}
                data={sales}
                view={'send-sales-receipt'}
                actionRender={(_, record: any) => <ActionRender record={record} getListSale={getListSale} />}
            />
        </div>
    )
}

export default SendSalesReceiptTable

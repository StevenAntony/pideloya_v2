import { Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import PayListTable from './PayListTable'
import { BuyService } from '../../service/BuyService'
import { BuyModel } from '../../models/BuyModel'
import PayModal from './PayModal'
import SaleService from '../../service/SaleService'

const { Title } = Typography

export default function PayBuyPage() {
    const [isBuys, setBuys] = useState<BuyModel[]>([])
    const [isInformation, setInformation] = useState<any>(null)
    const [buySelected, setBuySelected] = useState<BuyModel|null>(null)
    const [open, setOpen] = useState<boolean>(false)
    const [isLoadingList, setLoadingList] = useState<boolean>(false)
    const [payments, setPayments] = useState<any[]>([])

    const getBuysToPay = async () => {
        setLoadingList(true)
        const service = BuyService
        await service.listToPay()
        setBuys(service.getBuys())
        setLoadingList(false)
    }

    const getInformation = async () => {
        const { data } = await SaleService.getInformationForSale()
        setInformation(data)
    }

    useEffect(() => {
        getBuysToPay()
        getInformation()
    }, [])

    return (
        <div className="mx-20 my-8 shadow-md bg-white">
            <div>
                <div className="p-8 flex justify-between ">
                    <Title level={3}>Pagar Compras</Title>
                </div>
            </div>
            <PayListTable
                dataSource={isBuys}
                loading={isLoadingList}
                setBuySelected={setBuySelected}
                setOpenModal={setOpen}
            />
            {
                buySelected && open && (
                    <PayModal
                        buySelected={buySelected}
                        information={isInformation}
                        open={open}
                        payments={payments}
                        setOpen={setOpen}
                        setPayments={setPayments}
                        reload={getBuysToPay}
                    />
                )
            }
        </div>
    )
}

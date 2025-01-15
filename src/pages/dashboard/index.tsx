import React, { useEffect, useState } from "react"
import SalesAndBuysSummary from "./SalesAndBuysSummary"
import { useAuthContext } from "@contexts/auth/AuthContext"
import { DashboardService } from "../../service/DashboardService"
import { Spin } from "antd"
import { current } from "../../helpers/date"
import useMobile from "../../hooks/useMobile"
import DashBoardMobile from "./DashBoardMobile"

const DashboardPage = () => {
    const { user, company } = useAuthContext()
    const { isMobile } = useMobile()
    const { year } = current()

    const [loadingSummarySalesAndBuys, setLoadingSummarySalesAndBuys] = useState<boolean>(false)
    const [isSummarySalesAndBuys, setSummarySalesAndBuys] = useState<any>(null)
    const [isSummarySalesAndBuysGraphic, setSummarySalesAndBuysGraphic] = useState<any>([
        {
            label: 'Ventas',
            data: [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Compras',
            data: [],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }
    ])
    const [yearSummarySalesAndBuys, setYearSummarySalesAndBuys] = useState<number>(year)

    const getSummarySalesAndBuys = async () => {
        setLoadingSummarySalesAndBuys(true)
        const service = DashboardService
        await service.listSummarySalesAndBuys(`${yearSummarySalesAndBuys}`)
        const summaryDraft = isSummarySalesAndBuysGraphic

        summaryDraft[0].data = service.getSummary().sale.map(item => parseFloat(item.totalAmount))
        summaryDraft[1].data = service.getSummary().buy.map(item => parseFloat(item.totalAmount))
        setSummarySalesAndBuys(service.getSummary())
        setSummarySalesAndBuysGraphic([...summaryDraft])
        setLoadingSummarySalesAndBuys(false)
    }

    if(isMobile) {
        return <DashBoardMobile />
    }

    useEffect(() => {
        if (company.motherCompany == 0 && user.superAdmin == 1 && ['admin', 'cashier'].includes(user.type.value)) {
            getSummarySalesAndBuys()
        }
    }, [])

    useEffect(() => {
        getSummarySalesAndBuys()
    }, [yearSummarySalesAndBuys])

    return (
        <div className="p-8">
            {
                company.motherCompany == 0 && user.superAdmin == 1 && ['admin', 'cashier'].includes(user.type.value) && (
                    <div className="bg-white p-8 rounded-lg shadow-sm">
                        <Spin tip="Cargando datos..." spinning={loadingSummarySalesAndBuys}>
                            <SalesAndBuysSummary
                                dataSource={isSummarySalesAndBuys}
                                dataSourceGraphic={isSummarySalesAndBuysGraphic}
                                yearSelected={yearSummarySalesAndBuys}
                                setYearSelected={setYearSummarySalesAndBuys}
                            />
                        </Spin>
                    </div>
                )
            }
        </div>
    )
}

export default DashboardPage

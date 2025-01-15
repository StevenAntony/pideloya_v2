import { useEffect, useState } from "react"
import SaleService from "@services/SaleService"
import CancelHead from "./CancelHead"
import CancelListTable from "./CancelListTable"
import { useAuthContext } from "@contexts/auth/AuthContext"
import Authorized from "@components/Authorized"
import { SALE_ACTIONS } from "@constants/authorized"

const CancelSalePage = () => {

    const [isSales, setSales] = useState([])
    const [loadingList, setLoadingList] = useState(false)
    const { authorizedAction } = useAuthContext()

    const getSales =async () => {
        if(!authorizedAction(SALE_ACTIONS.listDelete)){
            return
        }
        setLoadingList(true)
        const response =await SaleService.listCancel()
        setSales(response.data.list)
        setLoadingList(false)
    }

    useEffect(() => {
        getSales()
    }, [])

    return (
        <div className="mx-8 my-8 shadow-md bg-white">
            <div>
                <CancelHead
                />
            </div>
            <div className="px-8">
                <Authorized title="Listar ventas para dar de baja" action={SALE_ACTIONS.listDelete} >
                    <CancelListTable
                        isSales={isSales}
                        loadingList={loadingList}
                        getSales={getSales}
                    />
                </Authorized>
            </div>
        </div>
    )
}

export default CancelSalePage

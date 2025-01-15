import { useEffect, useState } from "react"
import SaleService from "@services/SaleService"
import { cashCurrentStorage } from "@helpers/LocalStorage"
import CollectHead from "./CollectHead"
import CollectListTable from "./CollectListTable"
import CollectModal from "./CollectModal"
import { Alert } from "antd"
import Authorized from "@components/Authorized"
import { SALE_ACTIONS } from "@constants/authorized"
import { useAuthContext } from "@contexts/auth/AuthContext"

const CollectSalePage = () => {

    const [isSales, setSales] = useState([])
    const [isInformation, setInformation] = useState(null)

    const [openModal, setOpenModal] = useState(false)
    const [loadingList, setLoadingList] = useState(false)
    const [payments, setPayments] = useState([])
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [selectedSale, setSelectedSale] = useState(null)

    const { getCash } = cashCurrentStorage()
    const { authorizedAction } = useAuthContext()

    const getSales =async () => {
        if(!authorizedAction(SALE_ACTIONS.listCollect)){
            return
        }
        setLoadingList(true)
        const response =await SaleService.listDebit()
        setSales(response.data.list)
        setLoadingList(false)
    }

    const getInformation = async () => {
        if(!authorizedAction(SALE_ACTIONS.collect)){
            return
        }
        const { data } = await SaleService.getInformationForSale()
        setInformation(data)
    }

    useEffect(() => {
        getSales()
        getInformation()
    }, [])

    return (
        <div className="mx-8 my-8 shadow-md bg-white">
            <div className="px-8 pt-4">
                {
                    !getCash() && <Alert message={'Se requiere que seleccione una caja'} className="my-1" type="warning" showIcon />
                }
            </div>
            <div >
                <CollectHead
                    setOpen={setOpenModal}
                />
            </div>
            <div className="px-8">
                <Authorized action={SALE_ACTIONS.listCollect} title="Lista de ventas a cobrar" >
                    <CollectListTable
                        isSales={isSales}
                        loadingList={loadingList}
                        setOpenModal={setOpenModal}
                        setSelectedSale={setSelectedSale}
                        disabled={!getCash()}
                        information={isInformation}
                    />
                </Authorized>
            </div>
            {selectedSale && openModal && <CollectModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                information={isInformation}
                confirmLoading={confirmLoading}
                setConfirmLoading={setConfirmLoading}
                payments={payments}
                setPayments={setPayments}
                getSales={getSales}
                dataSale={selectedSale}
            />}
        </div>
    )
}

export default CollectSalePage

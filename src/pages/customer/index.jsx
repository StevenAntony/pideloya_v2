import { useEffect, useState } from "react"
import CustomerHead from "./CustomerHead"
import CustomerService from "../../service/CustomerService"
import CustomerListTable from "./CustomerListTable"
import CustomerMaintainerModal from "./CustomerMaintainerModal"

const CustomerPage = () => {

    const [openModal, setOpenModal] = useState(false)
    const [isCustomer, setCustomer] = useState([])
    const [loadingList, setLoadingList] = useState(false)
    const [editCutomer, setEditCustomer] = useState(null)
    const [edit, setEdit] = useState(false)

    const getCustomer =async () => {
        setLoadingList(true)
        const response =await CustomerService.list()
        setCustomer(response.data)
        setLoadingList(false)
    }

    useEffect(() => {
        getCustomer()
    }, [])

    return (
        <div className="mx-20 my-8 shadow-md bg-white">
            <div>
                <CustomerHead
                    setOpen={setOpenModal}
                />
            </div>
            <div>
                <CustomerListTable
                    isCustomer={isCustomer}
                    loadingList={loadingList}
                    setOpen={setOpenModal}
                    getCustomer={getCustomer}
                    setEdit={setEdit}
                    setSelectedCustomer={setEditCustomer}
                    selectedCustomer={editCutomer}
                />
            </div>
            <CustomerMaintainerModal
                edit={editCutomer?.key}
                setEdit={setEditCustomer}
                open={openModal}
                setOpen={setOpenModal}
                customerTrigger={getCustomer}
            />
        </div>
    )
}

export default CustomerPage

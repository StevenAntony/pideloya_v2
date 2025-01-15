
import CashFormModal from "./components/CashFormModal"
import { CashContextProvider } from "./context/CashContext"
import SquareCashModal from "./components/SquareCashModal"
import { useAuthContext } from "@contexts/auth/AuthContext"
import GroupCashList from "./components/group-cash/GroupCashList"
import CashContent from "./components/CashContent"

const CashPage = () => {

    const { user } = useAuthContext()  

    return (
        <CashContextProvider>
            {
                user.type.name == 'Administrador' 
                ? <GroupCashList />
                : 
                <CashContent />
            }
            <CashFormModal />
            <SquareCashModal />
        </CashContextProvider>
    )
}

export default CashPage

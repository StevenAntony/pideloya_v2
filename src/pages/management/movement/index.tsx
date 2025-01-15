import MovementHead from "./MovementHead"
import MovementListTable from "./MovementListTable"
import { MovementContextProvider } from "@contexts/page/management/movement/MovementContext"
import MovementFormModel from "./MovementFormModel"
import Authorized from "@components/Authorized"
import { MOVEMENT_ACTIONS } from "@constants/authorized"

const MovementPage = () => {

    return (
        <MovementContextProvider>
            <div className="mx-20 my-8 shadow-md bg-white">
                <MovementHead />
                <Authorized title="Listar movimientos" action={MOVEMENT_ACTIONS.list}>
                    <MovementListTable />
                </Authorized>
            </div>
            <MovementFormModel />
        </MovementContextProvider>
    )
}

export default MovementPage

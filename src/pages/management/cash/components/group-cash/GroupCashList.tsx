import { useCashContext } from "../../hooks/useCashContext"
import GroupCashItem from "./GroupCashItem"


type Props = {
}

const GroupCashList = ({

}: Props) => {

    const { isGroupCash } = useCashContext()

    return (
        <div className="flex w-full flex-wrap">
            {
                isGroupCash.map((item, index) => (
                    <GroupCashItem key={index} name={item.name} />
                ))
            }
            <div className="flex w-3/12 pt-2 pb-1 px-1 cursor-pointer">
                <div className="w-full flex justify-center items-center bg-white rounded-md">
                    <i className="pi pi-plus text-8xl"></i>
                </div>
            </div>
        </div>
    )
}

export default GroupCashList

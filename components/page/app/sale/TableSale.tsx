import DetailTable from "./tableSale/DetailTable"

const TableSale = ({
    isTables
}:{
    isTables: Array<ITable>
}) => {
    return (
        <div className="flex flex-wrap">
            {isTables.map(obj => {
                return (
                    <div className="w-6/12" key={obj.id}>
                        <div className="p-2">
                            <DetailTable table={obj}  />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TableSale
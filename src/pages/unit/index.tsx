import React, { useEffect, useState } from "react"
import { _GroupService } from "../../service/_GroupService"
import UnitHead from "./UnitHead"
import UnitListTable from "./UnitListTable"
import { _UnitService } from "../../service/_UnitService"
import UnitModal from "./UnitModal"
import { UnitModel } from "../../models/UnitModel"

const UnitPage = () => {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [isUnits, setUnits] = useState<UnitModel[]>([])
    const [selectedRow, setSelectedRow] = useState<UnitModel|null>(null)
    const [loadingList, setLoadingList] = useState(false)

    const getUnits = async () => {
        setLoadingList(true)
        const service = new _UnitService()
        await service.list()
        setUnits(service.getUnits())
        setLoadingList(false)
    }

    const changeStatus = async () => {
        if(!selectedRow) return

        const service = new _UnitService()
        await service.status(selectedRow.id)
        getUnits()
    }

    const closeModal = () => {
        setOpenModal(false)
        setSelectedRow(null)
    }

    useEffect(() => {
        getUnits()
    }, [])

    return (
        <div className="mx-20 my-8 shadow-md bg-white">
            <div>
                <UnitHead
                    setOpen={setOpenModal}
                    setSelectedRow={setSelectedRow}
                />
            </div>
            <div className="px-8 pb-20">
                <UnitListTable
                    loadingList={loadingList}
                    dataSource={isUnits}
                    setSelectedRow={setSelectedRow}
                    setOpen={setOpenModal}
                    changeStatus={changeStatus}
                />
            </div>
            <UnitModal
                closeModal={closeModal}
                open={openModal}
                getData={getUnits}
                selectedRow={selectedRow}
            />
        </div>
    )
}

export default UnitPage

import React, { useEffect, useState } from "react"
import GroupCategoryHead from "./GroupCategoryHead"
import GroupCategoryList from "./GroupCategoryList"
import { _GroupService } from "../../service/_GroupService"
import { GroupAllModel, GroupModel } from "../../models/GroupModel"
import { CategoryModel } from "../../models/CategoryModel"
import GroupCategoryModal from "./GroupCategoryModal"
import { Spin } from "antd"

type typeMaintainer = 'Grupo'|'Categoria'
export interface ISelectedRow extends GroupModel,CategoryModel{
    type: typeMaintainer
}

const GroupCategoryPage = () => {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [editRow, setEditRow] = useState<boolean>(false)
    const [isGroups, setGroups] = useState<GroupAllModel[]>([])
    const [selectedRow, setSelectedRow] = useState<ISelectedRow|null>(null)
    const [loadingList, setLoadingList] = useState(false)

    const getGroupsAll = async () => {
        setLoadingList(true)
        const service = new _GroupService()
        await service.listAll()
        setGroups(service.getGroups())
        setLoadingList(false)
    }

    const changeStatus = async (id: number, type:typeMaintainer) => {
        const service = new _GroupService()
        if (type === 'Grupo') {
            await service.status(id)
        }else{
            await service.statusCategory(id)
        }
        getGroupsAll()
    }

    const editSelectRow = (row:ISelectedRow) =>{
        setOpenModal(true)
        setSelectedRow(row)
        setEditRow(true)
    }

    const newCategory = (row:ISelectedRow) =>{
        setOpenModal(true)
        setSelectedRow(row)
        setEditRow(false)
    }

    const closeModal = () => {
        setOpenModal(false)
        setEditRow(false)
        setSelectedRow(null)
    }

    useEffect(() => {
        getGroupsAll()
    }, [])

    return (
        <div className="mx-20 my-8 shadow-md bg-white">
            <div>
                <GroupCategoryHead
                    setOpen={setOpenModal}
                    setSelectedRow={setSelectedRow}
                />
            </div>
            <div className="px-8 pb-20">
                <Spin tip="Cargando..." spinning={loadingList}>
                    <GroupCategoryList
                        newCategory={newCategory}
                        editSelectRow={editSelectRow}
                        dataSource={isGroups}
                        changeStatus={changeStatus}
                    />
                </Spin>
            </div>
            <GroupCategoryModal
                open={openModal}
                closeModal={closeModal}
                edit={editRow}
                selectedRow={selectedRow}
                getData={getGroupsAll}
            />
        </div>
    )
}

export default GroupCategoryPage

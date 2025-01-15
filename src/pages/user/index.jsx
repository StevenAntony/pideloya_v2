import { useState } from "react"
import UserHead from "./UserHed"
import UserMaintainerModal from "./UserMaintainerModal"
import UserAccessModal from "./UserAccessModal"
import UserPolicyModal from "./UserPolicyModal"
import UserListTable from "./UserListTable"
import UserContextProvider from "../../contexts/page/security/UserContext"

const UserPage = () => {
  const [openModalAccess, setOpenModalAccess] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  return (
    <UserContextProvider>
      <div className="mx-20 my-8 shadow-md bg-white">
        <div>
          <UserHead setSelectedRow={setSelectedRow} />
        </div>
        <div>
          <UserListTable setSelectedRow={setSelectedRow} />
        </div>
        <UserMaintainerModal
          edit={selectedRow}
          setEdit={setSelectedRow}
        />
        <UserAccessModal
          open={openModalAccess}
          setOpen={setOpenModalAccess}
          selectedRow={selectedRow}
        />
        <UserPolicyModal selectedUser={selectedRow} />
      </div>
    </UserContextProvider>
  )
}

export default UserPage

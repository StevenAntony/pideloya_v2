import { RouteModel } from "../../../models/security/RouteModel"
import { UserListModel } from "../../../models/security/UserModel"

export default interface UserContextProps {
  loadingList: boolean
  loadingForm: boolean
  loadingPolicy: boolean

  openFormModal: boolean
  setOpenFormModal: (e: boolean) => void
  openPolicyModal: boolean
  setOpenPolicyModal: (e: boolean) => void

  changeStatus: (userID: number) => void
  createOrUpdateUser: (form: UserFormProps, updated: boolean) => void
  createOrUpdatePolicy: (policies: string[], userID: number) => void

  isUsers: UserListModel[]
  isRoutes: RouteModel[]
}

export interface UserFormProps {
  userID: number
  type: string
  email: string
  password: string
  name: string
}

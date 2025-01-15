import { UserListModel } from "../../models/security/UserModel";

export interface UserListProps {
  setSelectedRow: (e: UserListModel) => void
}

export interface UserPolicyModalProps {
  selectedUser: UserListModel
}

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserListModel } from "@models/security/UserModel";
import UserService from "@services/security/UserService";
import { UserService as UserServiceOld } from '@services/UserService';
import UserContextProps, { UserFormProps } from "./UserContextProps";
import { message } from "antd";
import RouteService from "@services/security/RouteService";
import { RouteModel } from "@models/security/RouteModel";
import UserPolicyService from "@services/security/UserPolicyService";

export const UserContext = createContext<UserContextProps>({
  loadingList: false,
  loadingForm: false,
  loadingPolicy: false,

  isUsers: [],
  isRoutes: [],

  changeStatus: (userID: number) => { },
  createOrUpdateUser: (form: UserFormProps, updated: boolean) => { },
  createOrUpdatePolicy: (policies: string[], userID: number) => { },

  openFormModal: false,
  setOpenFormModal: (e: boolean) => { },
  openPolicyModal: false,
  setOpenPolicyModal: (e: boolean) => { }
})

export default function UserContextProvider({ children } : { children: React.ReactNode}) {
  const authorizedList = true;
  const authorizedListRoutes = true;

  const [loadingList, setLoadingList] = useState<boolean>(false)
  const [loadingForm, setLoadingForm] = useState<boolean>(false)
  const [loadingPolicy, setLoadingPolicy] = useState<boolean>(false)

  const [openFormModal, setOpenFormModal] = useState<boolean>(false)
  const [openPolicyModal, setOpenPolicyModal] = useState<boolean>(false)

  const [isUsers, setUsers] = useState<UserListModel[]>([])
  const [isRoutes, setRoutes] = useState<RouteModel[]>([])

  const listRoutes = async () => {
    if (!authorizedListRoutes) return
    const service = new RouteService()
    await service.listToPolicy()
    setRoutes(service.getRoutes())
  }

  const listUsers = async () => {
    if (!authorizedList) return
    setLoadingList(true)
    const userService = new UserService();
    const response = await userService.listToMaintainer()
    setUsers(response.data)
    setLoadingList(false)
  }

  const changeStatus = async (userID: number) => {
    const userService = UserServiceOld
    await userService.status(userID)
    const response = userService.getResponse()
    if (response.success) {
      listUsers()
    }
  }

  const createOrUpdateUser = async (form: UserFormProps, updated: boolean = false) => {
    setLoadingForm(true)
    const params = {
      type: form.type,
      email: form.email,
      password: form.password,
      name: form.name
    }
    const userService = UserServiceOld
    if (!updated) {
      await userService.store(params)
    } else {
      await userService.edit(form.userID, params)
    }
    const response = userService.getResponse()
    if (response.success) {
      message.success(response.message)
      setOpenFormModal(false)
      listUsers()
    } else {
      message.error(response.message)
    }
    setLoadingForm(false)
  }

  const createOrUpdatePolicy = async (policies: string[], userID: number) => {
    setLoadingPolicy(true)
    const service = new UserPolicyService()
    await service.store({
      policy: policies,
      userID: userID
    })
    setLoadingPolicy(false)
    listUsers()
  }

  useEffect(() => {
    listUsers()
    listRoutes()
  }, [])

  return (
    <UserContext.Provider value={{
      isUsers,
      isRoutes,

      loadingList,
      loadingForm,
      loadingPolicy,

      openFormModal,
      setOpenFormModal,
      openPolicyModal,
      setOpenPolicyModal,

      changeStatus,
      createOrUpdateUser,
      createOrUpdatePolicy
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext)

import { RouteToWebModel } from "../../models/security/RouteModel"

export interface AuthContextProviderProps {
    children: React.ReactNode
}

export interface AuthContextProps {
    token: string
    loadingAccount: boolean
    refreshToken: string
    user: UserToAuthContext
    config: ConfigToAuthContext
    company: CompanyToAuthContext
    isLoggedIn: boolean
    login: (token: string) => void
    logout: () => void
    isRoutesWeb: RouteToWebModel[]
    loadingRouteWeb: boolean
    authorizedAction: (action: string) => boolean
    account: () => void
}

export interface UserToAuthContext {
    id: number
    email: string
    name: string
    type: Type
    superAdmin: number
    remenberToken: any
    routeAllow: string[]
    resourceAllow: string[]
}

export interface Type {
    name: string
    color: string
    value: string
  }

export interface ConfigToAuthContext {
    plan: string
    count_users: number
    count_stores: number
    count_send_sunat: number
    count_send_email: number
    billing_token: string
    notificationsStockMinimun: number
    searchByBarCode: boolean
    showWithZeroStock: boolean
    serverPrint: string
    printOrders: boolean
    sendMail: boolean
}

export interface CompanyToAuthContext {
    ruc: string
    businessName: string
    tradeName: string
    logo: string
    branch: number
    address: string
    phone: string
    email: string
    demo: number
    keySol: string
    userSol: string
    betaBilling: number
    businessActivity: string
    motherCompany: number
}


import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { AuthContextProps, AuthContextProviderProps, CompanyToAuthContext, ConfigToAuthContext, UserToAuthContext } from './AuthContextProps'
import { keyStorage } from '../../constants/keyStorage';
import AuthService from '../../service/AuthService';
import RouteService from '../../service/security/RouteService';
import { RouteToWebModel } from '../../models/security/RouteModel';

const authTokensInLocalStorage = typeof window !== 'undefined'
    ? localStorage.getItem(keyStorage.AUTH_TOKEN)
    : ''

const AuthContext = createContext<AuthContextProps>({
    token: '',
    loadingAccount: true,
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
    user: {} as UserToAuthContext,
    company: {} as CompanyToAuthContext,
    refreshToken: '',
    config: {} as ConfigToAuthContext,
    isRoutesWeb: [],
    loadingRouteWeb: true,
    authorizedAction: (action: string) => false,
    account: () => { }
})

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [isRoutesWeb, setRoutesWeb] = useState<RouteToWebModel[]>([])
    const [user, setUser] = useState<UserToAuthContext>({} as UserToAuthContext)
    const [company, setCompany] = useState<CompanyToAuthContext>({} as CompanyToAuthContext)
    const [configurations, setConfigurations] = useState<ConfigToAuthContext>({} as ConfigToAuthContext)

    const [loadingAccount, setLoadingAccount] = useState<boolean>(true)
    const [loadingRouteWeb, setLoadingRouteWeb] = useState<boolean>(false)

    const [authToken, setAuthToken] = useState<string>(authTokensInLocalStorage ?? '')

    const login = useCallback(function (token: string) {
        localStorage.setItem(keyStorage.AUTH_TOKEN, token)
        setAuthToken(token);
    }, [])

    const logout = useCallback(function () {
        //const { removeCash } = cashCurrentStorage()
        localStorage.removeItem(keyStorage.AUTH_TOKEN)
        // removeCash()
        setAuthToken('');
    }, [])

    const account = async () => {
        setLoadingAccount(true)
        const response = await AuthService.accountData()

        setCompany(response.data.company)
        setUser(response.data.user)
        setConfigurations(response.data.config)
        setLoadingAccount(false)
    }

    const getRoutes = async () => {
        setLoadingRouteWeb(true)
        const routeService = new RouteService()
        const response = await routeService.listToWeb()
        setRoutesWeb(response.success === true ? response.data : [])
        setLoadingRouteWeb(false)
    }

    const authorizedAction = (action: string) => {
        return user?.routeAllow?.includes(action) || user.superAdmin === 1
    }

    useEffect(() => {
        getRoutes()
        account()
    }, [])

    return (
        <AuthContext.Provider value={{
            token: authToken,
            loadingAccount,
            isLoggedIn: authToken ? true : false,
            login,
            logout,
            user,
            company,
            refreshToken: '',
            config: configurations,
            isRoutesWeb,
            loadingRouteWeb,
            authorizedAction,
            account
        }}>
            <>
                {loadingAccount && <div className="spinner-wrapper">
                    <div className="spinner">
                        <div className="sk-folding-cube">
                            <div className="sk-cube1 sk-cube"></div>
                            <div className="sk-cube2 sk-cube"></div>
                            <div className="sk-cube4 sk-cube"></div>
                            <div className="sk-cube3 sk-cube"></div>
                        </div>
                    </div>
                </div>}
                {children}
            </>
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)

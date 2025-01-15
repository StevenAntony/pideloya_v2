import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { cashCurrentStorage } from "../../helpers/LocalStorage";
import AuthService from "../service/AuthService";

const AUTH_TOKENS_KEY = "MARKETEXPRESS_AUTH";

const INIT_AUTH = {
    token: '',
    refresh_token: '',
    user: {
      id: 0,
      name: '',
      email: '',
      type: '',
      access: [],
      superAdmin: 0,
      urls: [],
      masterCompany: 0
    },
    config: {
        searchByBarCode: "0",
        notificationsStockMinimun: 0,
        showWithZeroStock: "0",
        serverPrint: '',
        printOrders: "0",
        sendMail: false
    },
    company: {
        id: 0,
        billingToken: null,
        demo: 1,
        betaBilling: 1,
        businessActivity: 'store',
        address: '',
        businessName: '',
        email: '',
        key_sol: '',
        phone: '',
        ruc: '',
        user_sol: '',
        logo: '',
        plan: ''
    }
}

export const AuthContext = createContext({
  login: (auth) => {},
  logout: () => {},
  isLoggedIn: false,
  auth: INIT_AUTH,
  account: () => {},
  loadingAccount: true
})

export default function AuthContextProvider({
  children,
}) {
  const authTokensInLocalStorage = typeof window !== 'undefined' ? localStorage.getItem(AUTH_TOKENS_KEY) : null;
  const [loadingAccount, setLoadingAccount] = useState(true)
  const [auth, setAuthTokens] = useState(
    authTokensInLocalStorage === null
      ? null
      : { ...INIT_AUTH, ...JSON.parse(authTokensInLocalStorage) }
  )

  const login = useCallback(function (auth) {
    localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(auth))
    setAuthTokens(auth);
  }, [])

  const logout = useCallback(function () {
    const { removeCash } = cashCurrentStorage()
    localStorage.removeItem(AUTH_TOKENS_KEY)
    removeCash()
    setAuthTokens(null);
  }, [])

  const captureConfig = (config) => {
    return {
        ...config,
        sendMail: config?.sendMail ? (config.sendMail != "0") : false
    }
  }

  const account = async () => {
    setLoadingAccount(true)
    const response = await AuthService.accountData()
    const authDraft = { ...auth }
    authDraft.user = response.data.user
    authDraft.company = response.data.company
    authDraft.config = captureConfig(response.data.config)
    setAuthTokens({...authDraft})
    setLoadingAccount(false)
  }

  const value = useMemo(
    () => ({
      login,
      logout,
      auth,
      isLoggedIn: auth !== null,
      account,
      loadingAccount
    }),
    [auth, login, logout, account, loadingAccount]
  )

  useEffect(() => {
    account()
  }, [])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}

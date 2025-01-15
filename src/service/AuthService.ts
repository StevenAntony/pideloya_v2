import { Api } from "./Api"

const login = async (user, password ) => {

    const params = { email: user, password }

    const response = await Api.Post(`login`, params)

    return response
}

const logout = async () => await Api.Post(`logout`)

const accountData = async () => await Api.Get(`account`)

const AuthService = {
    login,
    logout,
    accountData
}

export default AuthService

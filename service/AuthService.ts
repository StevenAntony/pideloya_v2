import { Api } from "./Api"

const login = async (user: string, password: string ) => {

    const params = { email: user, password }

    const response = await Api.Post(`acceso`, params)

    return response
}

const AuthService = {
    login
}

export default AuthService
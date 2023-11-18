import { Api } from "./Api"

const login = async (user: string, password: string ) => {

    const params = { email: user, password }

    const response = await Api.Post(`login`, params)

    return response
}

const AuthService = {
    login
}

export default AuthService
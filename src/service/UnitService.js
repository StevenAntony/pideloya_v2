import { Api } from "./Api"

const list = async () => {
    const response = await Api.Get(`units`)
    return response
}

const UnitService = {
    list
}

export default UnitService

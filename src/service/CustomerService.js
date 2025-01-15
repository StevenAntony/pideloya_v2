import { Api } from "./Api"

const getForSale = async (search) => {
    const response = await Api.Get(`customers?search=${search}`)
    let data = []
    if (response.success) {
       data = response.data
    }

    return {
        success: response.success,
        data: data,
        message: response.message
    }
}

const store = async (params) => await Api.Post(`customers`, params)

const update = async (params , id) => await Api.Put(`customers/${id}`, params)

const show = async (id) => await Api.Get(`customers/${id}`)

const list = async () => await Api.Get(`customers?filter=maintainer`)

const updatedStatus = async (id) => await Api.Delete(`customers/${id}`)

const CustomerService = {
    getForSale,
    store,
    update,
    show,
    list,
    updatedStatus
}

export default CustomerService

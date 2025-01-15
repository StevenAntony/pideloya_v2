import tableToSaleAdapter from "../adapters/tableToSaleAdapter"
import { Api } from "./Api"

const list = async () => {
    let data = []
    const response = await Api.Get(`tables?filter=available`)

    if (response.success) {
        data = tableToSaleAdapter(response.data)
    }

    return {
        success: true,
        data: data,
        message: 'Datos obtenidos'
    }
}

const all = async () => {
    const response = await Api.Get(`tables`)
    return response
}

const getTableOrders = async (id) => {
    const response = await Api.Get(`tables/${id}/orders`)
    let data = null
    let order= []

    if(response.success){
        const orders = response.data.orders
        const table = response.data.table
        orders.forEach((element) => {
            const quantity = Number(element.quantity)
            const quantityCharged = Number(element.quantityCharged)
            if(quantity > quantityCharged){
                order.push({
                    id: element.id,
                    amount: element.price,
                    description: element.orderDescription,
                    idPresentation: element.idPresentation,
                    quantity: quantity - quantityCharged,
                    action: 'save',
                    originalQuantity: quantity,
                    quantityCharged: quantityCharged,
                    note: element.note ?? ''
                })
            }
        })

        data = {
            id: table.id,
            description: table.name,
            state: order.length === 0 ? 'Libre' : 'Ocupado' ,
            order: order
        }
    }

    return {
        success: true,
        data: data,
        message: 'Datos obtenidos'
    }
}

const sendOrders = async (id, params) => {
    const response = await Api.Post(`tables/${id}/orders`, params)

    return {
        success: response.success,
        data: null,
        message: response.success ? 'Registro correctamente' : 'Error al registrar'
    }
}

const store = async (params) => {
    const response = await Api.Post(`tables`, params)

    return response
}

const update = async (id, params) => {
    const response = await Api.Put(`tables/${id}`, params)

    return response
}

const changeStatus = async (id) => {
    const response = await Api.Delete(`tables/${id}`)

    return response
}

const TableService = {
    list,
    getTableOrders,
    sendOrders,
    all,
    store,
    update,
    changeStatus
}

export default TableService

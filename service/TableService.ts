import { Api } from "./Api"

const list = async () => {
    let data: Array<ITable> = []
    const response = await Api.Get(`tables`)

    if (response.success) {
        response.data.forEach((table: any) => {
            data.push({
                description: table.name,
                id: table.id,
                nameUser: table.cashOrder ? table.cashOrder.user.name : '',
                state: table.cashOrder ? 'Ocupado' : 'Libre',
                time: table.cashOrder && table.cashOrder.busyTime
            })
        })
    }
    
    
    return {
        success: true,
        data: data,
        message: 'Datos obtenidos'
    }
}

const getTableOrders = async (id:number) => {
    const response = await Api.Get(`tables/${id}/orders`)
    let data: ITableOrder|null = null
    let order: Array<IOrder> = [] 

    if(response.success){
        const orders = response.data.orders
        const table = response.data.table
        orders.forEach((element:any) => {
            order.push({
                id: element.id,
                amount: element.price,
                description: element.orderDescription,
                idPresentation: element.idPresentation,
                quantity: element.quantity,
                action: 'save',
                originalQuantity: element.quantity
            })
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

const sendOrders = async (id:number, params: IRequestSendOrder) => {
    const response = await Api.Post(`tables/${id}/orders`, params)    
    
    return {
        success: response.success,
        data: null,
        message: response.success ? 'Registro correctamente' : 'Error al registrar'
    }
}

const TableService = {
    list,
    getTableOrders,
    sendOrders
}

export default TableService
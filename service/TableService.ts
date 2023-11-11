import { Api } from "./Api"

const list = async () => {
    let data: Array<ITable> = []
    const response = await Api.Get(`mesa`)

    if (response.datos) {
        for (const key in response) {
            if (Object.prototype.hasOwnProperty.call(response, key)) {
                const element = response[key];
                if (element.descripcion != undefined) {
                    data.push({
                        description: element.descripcion,
                        id: element.id,
                        nameUser: element.user,
                        state: element.estado,
                        time: element.tiempo
                    })
                }
            }
        }
    }
    
    
    return {
        success: true,
        data: data,
        message: 'Datos obtenidos'
    }
}

const getTableOrders = async (id:number) => {
    const response = await Api.Get(`mesa/${id}`)
    let data: ITableOrder|null = null

    if (response) {
        let order: Array<IOrder> = [] 
        if(response.datosMesa){
            response.datosMesa.forEach((element:any) => {
                order.push({
                    id: element.idDM,
                    amount: element.precio,
                    description: element.descripcionPro,
                    idProduct: element.idProducto,
                    idStore: element.idAlmacen,
                    quantity: element.cantidad,
                    action: 'save',
                    originalQuantity: element.cantidad
                })
            })
        }

        data = {
            id: response.id,
            description: response.descripcion,
            state: response.estado,
            order: order
        }
    }
    
    
    return {
        success: true,
        data: data,
        message: 'Datos obtenidos'
    }
}

const TableService = {
    list,
    getTableOrders
}

export default TableService
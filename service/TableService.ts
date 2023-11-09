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

const TableService = {
    list
}

export default TableService
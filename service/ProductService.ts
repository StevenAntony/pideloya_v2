import { Api } from "./Api"

const getProductForSale = async () => {
    const response = await Api.Get(`producto`)
    let data: Array<IProductForSale> = []

    if (response.datos) {
        for (const key in response) {
            if (Object.prototype.hasOwnProperty.call(response, key)) {
                const element = response[key];
                if (element.descripcion != undefined) {
                    data.push({
                        description: element.descripcion,
                        id: element.id,
                        brand: element.marca,
                        category:{
                            id: element.id,
                            description: element.descripcion
                        },
                        price: element.precio,
                        unitDescription: element.unidadMedida
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

const ProductService = {
    getProductForSale
}

export default ProductService
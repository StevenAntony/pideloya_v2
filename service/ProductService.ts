import { Api } from "./Api"

const getProductForSale = async () => {
    const response = await Api.Get(`products`)
    let data: Array<IProductForSale> = []

    if (response.success) {
        response.data.forEach((element: any) => {
            if (element.presentation) {
                const presentations = element.presentation.split('|').map((obj: any) => {return JSON.parse(obj)} )
                
                data.push({
                    description: element.name,
                    id: element.id,
                    brand: element.brand,
                    category:{
                        id: element.category,
                        description: element.category
                    },
                    presentations: presentations.map((obj: any) => { 
                        const { unit, salePrice , id  } = obj
                        return {unitName: unit, salePrice, id  }
                    })
                })
            }
        });
    }
    
    return {
        success: true,
        data: data,
        message: 'Datos obtenidos'
    }
}

const list = async () => {
    const response = await Api.Get(`products`)
    let data: Array<IProductTable> = []

    if (response.success) {
        response.data.forEach((element: any) => {
            if (element.presentation) {
                const presentations = element.presentation.split('|').map((obj: any) => {return JSON.parse(obj)} )
                
                data.push({
                    name: element.name,
                    brand: element.brand,
                    category: element.category,
                    prices: presentations.map((obj: any) => { 
                        const { salePrice } = obj
                        return `${salePrice}`
                    }),
                    barcode: element.barcode,
                    key: element.id,
                    service: element.service
                })
            }
        });
    }
    
    return {
        success: response.success,
        data: data,
        message: response.message
    }
}

const ProductService = {
    getProductForSale,
    list
}

export default ProductService
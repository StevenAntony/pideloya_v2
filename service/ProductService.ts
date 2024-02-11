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
                        id: element.nameCategory,
                        description: element.nameCategory
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
        message: response.message
    }
}

const list = async () => {
    const response = await Api.Get(`products?filter=maintainer`)
    let data: Array<IProductTable> = []

    if (response.success) {
        response.data.forEach((element: any) => {
            const presentations = element.presentation ? element.presentation.split('|').map((obj: any) => {return JSON.parse(obj)} ) : []
            
            data.push({
                name: element.name,
                brand: element.brand,
                category: element.nameCategory,
                prices: presentations.map((obj: any) => { 
                    const { salePrice } = obj
                    return `${salePrice}`
                }),
                barcode: element.barcode,
                key: element.id,
                service: element.service,
                active: element.active === 1,
                type: element.type,
                idCategory: element.idCategory,
                idGroup: element.idGroup
            })
        });
    }
    
    return {
        success: response.success,
        data: data,
        message: response.message
    }
}

const store = async (params: IRequestProduct) => {
    const response = await Api.Post(`products`, params)
    
    return {
        success: response.success,
        data: response.data,
        message: response.message
    }
}

const update = async (params: IRequestProduct, id: string) => {
    const response = await Api.Post(`products/${id}`, params)
    
    return {
        success: response.success,
        data: response.data,
        message: response.message
    }
}

const ProductService = {
    getProductForSale,
    list,
    store,
    update
}

export default ProductService